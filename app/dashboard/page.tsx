"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { useUser } from "@/lib/user-context";

type Invoice = {
  id: string; vendor: string; invoice_number: string; amount: number; currency: string; status: string;
  source: string; confidence: number | null; due_date: string | null; extracted: { flags?: string[] } | null;
};

export default function Invoices() {
  const user = useUser();
  const [rows, setRows] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [form, setForm] = useState({ vendor: "", invoice_number: "", amount: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const { data } = await supabaseBrowser().from("invoices").select("*").order("created_at", { ascending: false });
    setRows((data as Invoice[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function upload(file: File) {
    setBusy(true); setNote(null);
    try {
      const { data } = await supabaseBrowser().auth.getSession();
      const fd = new FormData(); fd.append("file", file);
      const r = await fetch("/api/extract", { method: "POST", headers: { Authorization: `Bearer ${data.session?.access_token}` }, body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Processing failed.");
      setNote({ ok: !j.flags.length, text: j.flags.length ? `Extracted with ${j.flags.length} flag(s): ${j.flags.join(" ")}` : "Invoice extracted and validated." });
      await load();
    } catch (e) {
      setNote({ ok: false, text: e instanceof Error ? e.message : "Processing failed." });
    }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseBrowser().from("invoices").insert({ user_id: user.id, vendor: form.vendor, invoice_number: form.invoice_number, amount: Number(form.amount) });
    if (error) setNote({ ok: false, text: "The invoice could not be saved." });
    else { setNote(null); setForm({ vendor: "", invoice_number: "", amount: "" }); load(); }
  }

  async function approve(id: string) {
    await supabaseBrowser().from("invoices").update({ status: "Approved" }).eq("id", id);
    load();
  }

  return (
    <>
      <section className="mb-8 rounded-2xl border-2 border-dashed border-brand/40 bg-brand-tint p-6 text-center">
        <h1 className="text-2xl font-medium">Process an invoice with AI</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">Upload a PDF, PNG or JPG up to 8 MB. The AI extracts every field, then code verifies the totals.</p>
        <input ref={fileRef} id="file" type="file" accept="application/pdf,image/png,image/jpeg" className="sr-only" disabled={busy}
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        <label htmlFor="file" className={`btn-primary mt-5 cursor-pointer ${busy ? "opacity-60" : ""}`}>{busy ? "Analyzing invoice" : "Upload invoice"}</label>
        {note && <p role="status" className={`mt-4 text-sm ${note.ok ? "text-brand-dark" : "text-red-600"}`}>{note.text}</p>}
      </section>

      <form onSubmit={add} className="mb-8 grid gap-3 md:grid-cols-4">
        <input required placeholder="Vendor" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} className="rounded-lg border p-2.5" />
        <input required placeholder="Invoice number" value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} className="rounded-lg border p-2.5" />
        <input required type="number" step="0.01" min="0" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-lg border p-2.5" />
        <button className="btn-ghost justify-center">Add manually</button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-gray-500"><tr><th className="py-2">Vendor</th><th>Invoice</th><th>Amount</th><th>Confidence</th><th>Status</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b align-top">
                <td className="py-3">{r.vendor}</td>
                <td>{r.invoice_number}</td>
                <td>{r.currency} {Number(r.amount).toFixed(2)}</td>
                <td>{r.confidence != null ? `${Math.round(r.confidence * 100)}%` : "Manual"}</td>
                <td>
                  <span className={r.status === "Needs review" ? "text-amber-600" : "text-brand-dark"}>{r.status}</span>
                  {r.extracted?.flags?.map((f) => <div key={f} className="mt-1 max-w-xs text-xs text-gray-500">{f}</div>)}
                </td>
                <td>{r.status !== "Approved" && <button onClick={() => approve(r.id)} className="font-medium text-brand">Approve</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && rows.length === 0 && <p className="py-10 text-center text-gray-500">No invoices yet. Upload your first invoice to see the AI at work.</p>}
    </>
  );
}
