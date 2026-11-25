"use client";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { id: "capture", label: "Capture", title: "Every invoice, read in seconds", body: "Upload a PDF or image and the model extracts vendor, dates, currency, PO number, totals and every line item. Nothing is typed by hand.", bullets: ["Any layout, any vendor", "Confidence score on every record", "Structured, schema-validated output"], href: "/products/invoice-processing" },
  { id: "validate", label: "Validate", title: "Numbers verified in code", body: "Totals, tax and line sums are recomputed deterministically and compared with the invoice. Duplicates are caught before they reach approval.", bullets: ["Total and tax reconciliation", "Duplicate vendor and number checks", "Low-confidence results held for review"], href: "/solutions/fraud-prevention" },
  { id: "approve", label: "Approve", title: "Exceptions only, never the whole queue", body: "Clean invoices arrive marked Ready to approve. Flagged ones list exactly what to check, so reviewers spend time only where risk exists.", bullets: ["Needs review and Ready to approve states", "Flag reasons shown on each invoice", "One-click approval with a record"], href: "/products/approvals" },
  { id: "insight", label: "Insight", title: "Usage and spend you can act on", body: "Track monthly volume against plan limits and see vendor-level history, built from the invoices your team actually processes.", bullets: ["Live usage against your plan", "Vendor and amount history", "Audit-ready records"], href: "/products/analytics" },
];

export default function ProductTabs() {
  const [id, setId] = useState("capture");
  const t = tabs.find((x) => x.id === id)!;
  return (
    <div className="mx-auto max-w-[1000px] px-6">
      <div role="tablist" className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === id} onClick={() => setId(x.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium ${x.id === id ? "bg-brand text-white" : "bg-white text-gray-700 hover:bg-brand-soft"}`}>{x.label}</button>
        ))}
      </div>
      <div role="tabpanel" className="grid gap-8 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-2 md:p-10">
        <div>
          <h3 className="text-2xl font-medium">{t.title}</h3>
          <p className="mt-3 text-gray-600">{t.body}</p>
          <Link href={t.href} className="mt-5 inline-block font-medium text-brand hover:underline">View the product</Link>
        </div>
        <ul className="space-y-3 self-center">
          {t.bullets.map((b) => (
            <li key={b} className="flex gap-3 rounded-xl bg-brand-tint p-4 text-sm">
              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
