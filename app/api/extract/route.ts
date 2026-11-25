import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { plans, TRIAL_LIMIT } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 90;

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ["application/pdf", "image/png", "image/jpeg"];
const MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

const schema = {
  type: "OBJECT",
  properties: {
    vendor: { type: "STRING" },
    invoice_number: { type: "STRING" },
    invoice_date: { type: "STRING", description: "YYYY-MM-DD or empty" },
    due_date: { type: "STRING", description: "YYYY-MM-DD or empty" },
    currency: { type: "STRING", description: "ISO 4217 code" },
    po_number: { type: "STRING" },
    subtotal: { type: "NUMBER" },
    tax: { type: "NUMBER" },
    total: { type: "NUMBER" },
    line_items: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { description: { type: "STRING" }, quantity: { type: "NUMBER" }, unit_price: { type: "NUMBER" }, amount: { type: "NUMBER" } },
        required: ["description", "amount"],
      },
    },
    confidence: { type: "NUMBER", description: "0 to 1 overall certainty" },
  },
  required: ["vendor", "invoice_number", "total", "currency", "line_items", "confidence"],
};

const PROMPT = `Extract the invoice data from this document. Return only values that are printed on the document. Use empty string for missing text and 0 for missing numbers. Dates must be YYYY-MM-DD. Currency must be an ISO 4217 code. Report your overall confidence from 0 to 1.`;

const isDate = (s: unknown) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : 0);

async function callGemini(mime: string, b64: string) {
  const body = JSON.stringify({
    contents: [{ parts: [{ inline_data: { mime_type: mime, data: b64 } }, { text: PROMPT }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema, temperature: 0 },
  });
  let last = "";
  for (let i = 0; i < 3; i++) {
    let r: Response;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: { "x-goog-api-key": process.env.GEMINI_API_KEY!, "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(25000),
      });
    } catch {
      last = "timeout";
      continue;
    }
    if (r.ok) return r.json();
    last = `${r.status}`;
    if (r.status !== 503 && r.status !== 429) break;
    await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
  }
  throw new Error("AI_UNAVAILABLE:" + last);
}

export async function POST(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "Invoice processing is temporarily unavailable." }, { status: 503 });

  // User-scoped client: every query below runs under the caller's row-level security.
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });
  const { data: u, error: ue } = await sb.auth.getUser(token);
  if (ue || !u.user) return NextResponse.json({ error: "Your session has expired. Log in again." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Attach an invoice file." }, { status: 400 });
  if (!TYPES.includes(file.type)) return NextResponse.json({ error: "Upload a PDF, PNG or JPG file." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File exceeds the 8 MB limit." }, { status: 400 });

  // Usage limit for the current month, based on the user's plan.
  const { data: sub } = await sb.from("subscriptions").select("plan,status").maybeSingle();
  const plan = sub?.status === "active" ? plans.find((p) => p.id === sub.plan) : undefined;
  const limit = plan?.limit ?? TRIAL_LIMIT;
  const start = new Date(); start.setUTCDate(1); start.setUTCHours(0, 0, 0, 0);
  const { count, error: ce } = await sb.from("invoices").select("id", { count: "exact", head: true }).eq("source", "ai").gte("created_at", start.toISOString());
  if (ce) return NextResponse.json({ error: "Usage data is unavailable. Try again shortly." }, { status: 500 });
  if ((count ?? 0) >= limit) {
    return NextResponse.json({ error: `Monthly limit of ${limit} AI invoices reached. Upgrade your plan to continue.`, code: "LIMIT" }, { status: 402 });
  }

  let raw;
  try {
    const out = await callGemini(file.type, Buffer.from(await file.arrayBuffer()).toString("base64"));
    raw = JSON.parse(out.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
  } catch {
    return NextResponse.json({ error: "The AI could not process this document. Try again in a moment." }, { status: 502 });
  }

  // Validate and normalise model output.
  const items = (Array.isArray(raw.line_items) ? raw.line_items : []).map((l: Record<string, unknown>) => ({
    description: String(l.description ?? "").slice(0, 300),
    quantity: num(l.quantity),
    unit_price: num(l.unit_price),
    amount: num(l.amount),
  }));
  const total = num(raw.total);
  const vendor = String(raw.vendor ?? "").trim();
  const invoice_number = String(raw.invoice_number ?? "").trim();
  if (!vendor || !invoice_number || total <= 0) {
    return NextResponse.json({ error: "No valid invoice was found in this document." }, { status: 422 });
  }

  // Deterministic checks (never trust model arithmetic).
  const flags: string[] = [];
  const lineSum = Math.round(items.reduce((s: number, l: { amount: number }) => s + l.amount, 0) * 100) / 100;
  const expected = Math.round((num(raw.subtotal) || lineSum) * 100) / 100 + num(raw.tax);
  if (items.length && Math.abs(Math.round(expected * 100) / 100 - total) > 0.02) flags.push(`Total ${total.toFixed(2)} does not match line items and tax (${expected.toFixed(2)}).`);
  const { count: dup } = await sb.from("invoices").select("id", { count: "exact", head: true }).eq("vendor", vendor).eq("invoice_number", invoice_number);
  if ((dup ?? 0) > 0) flags.push("An invoice with this vendor and number already exists.");
  const confidence = Math.min(1, Math.max(0, num(raw.confidence)));
  if (confidence < 0.8) flags.push("Low AI confidence. Review before approving.");

  const row = {
    user_id: u.user.id,
    vendor,
    invoice_number,
    amount: total,
    currency: String(raw.currency || "USD").toUpperCase().slice(0, 3),
    invoice_date: isDate(raw.invoice_date) ? raw.invoice_date : null,
    due_date: isDate(raw.due_date) ? raw.due_date : null,
    po_number: String(raw.po_number ?? "").trim() || null,
    status: flags.length ? "Needs review" : "Ready to approve",
    source: "ai",
    confidence,
    extracted: { line_items: items, subtotal: num(raw.subtotal), tax: num(raw.tax), flags },
  };
  const { data, error } = await sb.from("invoices").insert(row).select().single();
  if (error) return NextResponse.json({ error: "The invoice could not be saved. Try again." }, { status: 500 });
  return NextResponse.json({ invoice: data, flags });
}
