import Link from "next/link";
import Pricing from "@/components/Pricing";

const steps = [
  ["Capture", "Invoices arrive by email or upload and AI extracts every field."],
  ["Match", "Line items are matched against purchase orders and receipts."],
  ["Approve", "Routing rules send each bill to the right approver."],
  ["Pay", "Schedule payments and sync to your ERP automatically."],
];
const feats = [
  ["Invoice Processing", "Touchless capture with confidence scores."],
  ["PO Matching", "Two- and three-way matching on autopilot."],
  ["Approvals", "Configurable multi-step workflows."],
  ["Fraud Prevention", "Spot duplicates and changed bank details."],
  ["Analytics", "Spend, cycle time and savings in one view."],
  ["ERP Sync", "Two-way sync with your accounting system."],
];
const stats = [["80%", "lower cost per invoice"], ["5x", "faster processing"], ["99%", "extraction accuracy"], ["10 days", "faster monthly close"]];
const rows = [["Northwind Freight", "INV-1040", "$1,200.00"], ["Acme Supplies", "INV-1041", "$1,630.00"], ["Globex Logistics", "INV-1042", "$2,060.00"]];

export default function Home() {
  return (
    <main>
      <section className="hero-bg px-6 pb-24 pt-24 text-center">
        <h1 className="text-5xl font-normal md:text-7xl">AP automation, reimagined</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl">Cut costs, improve accuracy, and scale smarter with AI-first accounting.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/signup" className="btn-primary">Request demo</Link>
          <Link href="/products/platform" className="btn-ghost">Our platform</Link>
        </div>
        <div className="mx-auto mt-16 max-w-[1000px] overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center gap-6 bg-gradient-to-r from-[#0f3d26] to-brand px-5 py-3 text-xs text-white">
            <b>INVOICES</b><span>Dashboard</span><span className="rounded bg-white/20 px-2 py-1">Invoices</span><span>Purchase Orders</span><span>Approval</span><span>Payment</span>
          </div>
          <div className="grid grid-cols-[180px_1fr] text-left text-xs">
            <div className="bg-brand p-4 text-white">View • Default<br /><b>Review</b></div>
            <div className="p-4">Status: Open Invoices · Approval: Process Required</div>
          </div>
          {rows.map(([v, n, a]) => (
            <div key={n} className="grid grid-cols-4 border-t px-5 py-3 text-left text-xs">
              <span>{v}</span><span>{n}</span><span>{a}</span><span className="text-brand">Ready to approve</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="grid gap-8 text-center md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l}><div className="text-5xl font-medium text-brand">{n}</div><div className="mt-2 text-sm text-gray-600">{l}</div></div>
          ))}
        </div>
      </section>
      <section className="bg-brand-tint px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-medium">How APAutopilot works</h2>
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div key={t} className="rounded-2xl bg-white p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">{i + 1}</div>
              <div className="font-medium">{t}</div>
              <p className="mt-2 text-sm text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-medium">Everything accounts payable needs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {feats.map(([t, d]) => (
            <div key={t} className="rounded-2xl border p-6"><div className="font-medium">{t}</div><p className="mt-2 text-sm text-gray-600">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="py-20">
        <h2 className="mb-12 text-center text-4xl font-medium">Plans</h2>
        <Pricing />
      </section>
      <section className="hero-bg px-6 py-24 text-center">
        <h2 className="text-4xl font-medium">Ready to put AP on autopilot?</h2>
        <Link href="/signup" className="btn-primary mt-8">Request demo</Link>
      </section>
    </main>
  );
}
