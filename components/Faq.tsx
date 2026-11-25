export const faqs: [string, string][] = [
  ["Which file types can the AI process?", "PDF, PNG and JPG invoices up to 8 MB. Layout does not matter: the model reads vendor, dates, currency, PO number, totals and line items from any format."],
  ["How do you prevent the AI from getting numbers wrong?", "Arithmetic is never left to the model. Line sums, tax and totals are recomputed in code and compared with the stated total. Any mismatch is flagged and the invoice is held for review."],
  ["What happens when the AI is unsure?", "Every extraction carries a confidence score. Results below 80 percent, and any invoice with a failed check, are placed in Needs review instead of Ready to approve."],
  ["How are duplicate invoices handled?", "Each upload is checked against your existing records by vendor and invoice number. A repeat is flagged before it can be approved or paid."],
  ["Is my financial data isolated from other customers?", "Yes. Row-level security is enforced in the database, so every query is limited to the signed-in account's own records. AI credentials stay on the server."],
  ["How does pricing work?", "Three flat monthly tiers based on AI-processed invoice volume: Starter at 100, Growth at 500 and Scale at 2,000 invoices a month. New accounts include a free trial allowance."],
  ["What happens if I reach my monthly limit?", "Processing pauses and you are prompted to move to a higher tier. Existing invoices stay available and the allowance resets at the start of each month."],
  ["How do I get started?", "Create an account, upload an invoice and review the extracted record in your dashboard within seconds."],
];

export default function Faq({ items = faqs }: { items?: [string, string][] }) {
  return (
    <div className="mx-auto max-w-[800px] divide-y rounded-2xl border bg-white">
      {items.map(([q, a]) => (
        <details key={q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {q}
            <svg className="shrink-0 transition group-open:rotate-45" width="18" height="18" viewBox="0 0 18 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 3v12M3 9h12" /></svg>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{a}</p>
        </details>
      ))}
    </div>
  );
}
