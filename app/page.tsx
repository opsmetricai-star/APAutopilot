import Link from "next/link";
import Pricing from "@/components/Pricing";
import ProductTabs from "@/components/ProductTabs";
import RoiCalculator from "@/components/RoiCalculator";
import Faq from "@/components/Faq";

const compare = [
  ["Data entry", "Keyed by hand from each invoice", "Extracted by AI in seconds"],
  ["Accuracy checks", "Spot checks when time allows", "Every total recomputed in code"],
  ["Duplicates", "Found after payment, if at all", "Flagged on upload"],
  ["Review effort", "Every invoice is read", "Only flagged invoices need a person"],
  ["Visibility", "Spreadsheets and inboxes", "One live record with a full audit trail"],
];
const industries = [
  ["Freight and Logistics", "High-volume carrier invoices captured and validated.", "/solutions/logistics"],
  ["Construction", "Subcontractor and supplier invoices under control.", "/solutions/construction"],
  ["Manufacturing", "Supplier invoices reconciled to what was ordered.", "/solutions/manufacturing"],
  ["Retail", "Seasonal supplier volume absorbed without added headcount.", "/solutions/retail"],
];

const steps = [
  ["Capture", "The model reads each invoice, whatever the layout, and extracts vendor, dates, amounts and line items."],
  ["Validate", "Code recomputes every total, checks for duplicates and flags any figure that does not reconcile."],
  ["Decide", "Each result carries a confidence score. High-confidence invoices pass. Uncertain ones go to a reviewer."],
  ["Record", "Approved invoices are stored in a consistent schema with a complete audit trail."],
];
const feats = [
  ["Autonomous invoice processing", "AI extracts and structures invoices from PDFs and images in seconds, with no manual keying."],
  ["Arithmetic you can trust", "Totals and line sums are computed deterministically, so a model error never reaches the ledger."],
  ["Confidence-gated review", "Teams review only the invoices the AI is unsure about, which removes most of the queue."],
  ["Fraud and error detection", "Duplicate invoice numbers and mismatched totals are caught before payment."],
  ["Spend intelligence", "Track volume, vendors and cycle time from live data to see where cost and risk concentrate."],
  ["Isolated by design", "Row-level security keeps every customer's financial data separate at the database level."],
];
const stats = [["Seconds", "from upload to structured invoice"], ["0", "manual keystrokes on a clean invoice"], ["100%", "of totals recomputed in code"], ["1 queue", "for every exception"]];
const rows = [["Northwind Freight", "INV-1040", "$1,200.00", "98%"], ["Acme Supplies", "INV-1041", "$1,630.00", "96%"], ["Globex Logistics", "INV-1042", "$2,060.00", "99%"]];

export default function Home() {
  return (
    <main>
      <section className="hero-bg px-6 pb-24 pt-20 text-center md:pt-24">
        <h1 className="mx-auto max-w-5xl text-4xl font-normal md:text-7xl">AP automation, run by AI</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">APAutopilot analyzes every invoice, validates the math, and decides what needs a human. Finance teams cut processing cost, close faster and reduce payment risk.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/signup" className="btn-primary">Sign up</Link>
          <Link href="/login" className="btn-ghost">Log in</Link>
        </div>
        <div className="mx-auto mt-16 max-w-[1000px] overflow-hidden rounded-2xl border bg-white text-left shadow-2xl">
          <div className="flex items-center gap-6 overflow-x-auto bg-gradient-to-r from-[#0f3d26] to-brand px-5 py-3 text-xs text-white whitespace-nowrap">
            <b>INVOICES</b><span>Dashboard</span><span className="rounded bg-white/20 px-2 py-1">Invoices</span><span>Billing</span><span>Settings</span>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-4 bg-brand-tint px-5 py-3 text-xs font-medium text-gray-600"><span>Vendor</span><span>Invoice</span><span>Amount</span><span>AI confidence</span></div>
              {rows.map(([v, n, a, c]) => (
                <div key={n} className="grid grid-cols-4 border-t px-5 py-3 text-xs"><span>{v}</span><span>{n}</span><span>{a}</span><span className="text-brand">{c}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {stats.map(([n, l]) => (<div key={l}><div className="text-4xl font-medium text-brand md:text-5xl">{n}</div><div className="mt-2 text-sm text-gray-600">{l}</div></div>))}
        </div>
      </section>
      <section className="bg-brand-tint px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-medium md:text-4xl">How the AI engine works</h2>
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
        <h2 className="mb-12 text-center text-3xl font-medium md:text-4xl">Built for finance operations at scale</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {feats.map(([t, d]) => (<div key={t} className="rounded-2xl border p-6"><div className="font-medium">{t}</div><p className="mt-2 text-sm text-gray-600">{d}</p></div>))}
        </div>
      </section>
      <section className="bg-brand-tint px-0 py-20">
        <h2 className="mb-4 px-6 text-center text-3xl font-medium md:text-4xl">One platform, four stages of control</h2>
        <p className="mx-auto mb-10 max-w-2xl px-6 text-center text-gray-600">From the first upload to the final record, each stage is automated and measured.</p>
        <ProductTabs />
      </section>
      <section className="mx-auto max-w-[1000px] px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-medium md:text-4xl">Manual AP versus APAutopilot</h2>
        <div className="overflow-hidden rounded-2xl border">
          <div className="grid grid-cols-3 bg-brand-tint px-5 py-3 text-sm font-medium"><span /><span>Manual process</span><span className="text-brand-dark">APAutopilot</span></div>
          {compare.map(([k, a, b]) => (
            <div key={k} className="grid grid-cols-3 gap-2 border-t px-5 py-4 text-sm"><span className="font-medium">{k}</span><span className="text-gray-600">{a}</span><span className="text-brand-dark">{b}</span></div>
          ))}
        </div>
      </section>
      <section className="bg-brand-tint px-6 py-20">
        <h2 className="mb-4 text-center text-3xl font-medium md:text-4xl">Model your savings</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">Enter your own volumes and costs to estimate what autonomous processing returns each month.</p>
        <RoiCalculator />
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-medium md:text-4xl">Tuned to how your industry buys and pays</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {industries.map(([t, d, h]) => (
            <Link key={h} href={h} className="rounded-2xl border p-6 transition hover:border-brand hover:shadow-md"><div className="font-medium">{t}</div><p className="mt-2 text-sm text-gray-600">{d}</p></Link>
          ))}
        </div>
      </section>
      <section className="bg-ink px-6 py-20 text-white">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-green-400">Trust and security</p>
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">Financial data, isolated by design</h2>
            <p className="mt-4 text-gray-300">Every account is separated at the database level. AI credentials never leave the server, and every decision leaves a record.</p>
            <Link href="/products/security" className="mt-6 inline-block font-medium text-green-400 hover:underline">Read the security overview</Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {["Row-level security on every table", "Server-side AI processing", "Encrypted authentication", "Full audit trail"].map((s) => (
              <li key={s} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-20">
        <h2 className="mb-12 px-6 text-center text-3xl font-medium md:text-4xl">Pricing that scales with volume</h2>
        <Pricing />
      </section>
      <section className="bg-brand-tint px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-medium md:text-4xl">Questions finance leaders ask</h2>
        <Faq />
      </section>
      <section className="hero-bg px-6 py-24 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-medium md:text-4xl">Put accounts payable on autopilot</h2>
        <div className="mt-8 flex justify-center gap-3"><Link href="/signup" className="btn-primary">Sign up</Link><Link href="/login" className="btn-ghost">Log in</Link></div>
      </section>
    </main>
  );
}
