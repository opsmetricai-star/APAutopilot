export type MenuItem = { t: string; d: string; h?: string; sub?: string[][] };

export const menus: Record<string, { cols: MenuItem[][] }> = {
  "Why APAutopilot": {
    cols: [[
      { t: "Why APAutopilot", d: "An AI engine that reads, decides and executes accounts payable end to end.", h: "/why/why-apautopilot" },
    ]],
  },
  Products: {
    cols: [
      [
        { t: "Accounts Payable", d: "Autonomous invoice capture, matching and approval.", h: "/products/apsuite", sub: [["Invoice Processing", "/products/invoice-processing"], ["PO Matching", "/products/po-matching"], ["Approvals", "/products/approvals"]] },
        { t: "AP Inbox", d: "An agent that triages every vendor email on arrival.", h: "/products/inbox" },
      ],
      [
        { t: "Bill Pay and Vendor Portal", d: "Pay on the optimal date and protect cash flow.", h: "/products/pay" },
        { t: "Expense Management", d: "Policy-aware spend control at the point of purchase.", h: "/products/card" },
        { t: "Analytics and Insights", d: "Predictive visibility into spend, liabilities and risk.", h: "/products/analytics" },
      ],
      [
        { t: "Autonomous Finance Platform", d: "The AI-native core behind every workflow.", h: "/products/platform", sub: [["How It Works", "/products/how-it-works"], ["ERP Integrations", "/products/integrations"], ["Trust and Security", "/products/security"]] },
        { t: "AI Agents", d: "Specialized agents that own finance tasks outright.", h: "/products/agents" },
      ],
    ],
  },
  Solutions: {
    cols: [
      [{ t: "By Use Case", d: "Built for the complexity of real finance operations.", sub: [["Centralize AP Operations", "/solutions/centralize-ap"], ["Faster Monthly Close", "/solutions/monthly-close"], ["Fraud Prevention", "/solutions/fraud-prevention"], ["Vendor Management", "/solutions/vendor-management"], ["Scale for Growth", "/solutions/scale"]] }],
      [{ t: "By Role", d: "Control and clarity for every finance leader.", sub: [["CFO", "/solutions/cfo"], ["Controller", "/solutions/controller"], ["Accounts Payable", "/solutions/accounts-payable"]] }],
      [{ t: "By Industry", d: "Workflows tuned to how your sector buys and pays.", sub: [["Freight and Logistics", "/solutions/logistics"], ["Construction", "/solutions/construction"], ["Manufacturing", "/solutions/manufacturing"], ["Retail", "/solutions/retail"]] }],
    ],
  },
  Company: {
    cols: [[{ t: "Company", d: "The team building autonomous finance.", sub: [["About", "/about"], ["Pricing", "/pricing"]] }]],
  },
};

export type Plan = { id: "starter" | "growth" | "scale"; name: string; price: string; limit: number; url: string; feats: string[]; hot?: boolean };

export const plans: Plan[] = [
  { id: "starter", name: "Starter", price: "$47", limit: 100, url: "https://selar.com/47plan?currency=USD", feats: ["100 AI-processed invoices per month", "Automated field extraction with confidence scoring", "Duplicate and total-mismatch detection", "Email support"] },
  { id: "growth", name: "Growth", price: "$57", limit: 500, url: "https://selar.com/57plan?currency=USD", feats: ["500 AI-processed invoices per month", "Everything in Starter", "Purchase order matching", "Spend analytics"], hot: true },
  { id: "scale", name: "Scale", price: "$97", limit: 2000, url: "https://selar.com/97plan?currency=USD", feats: ["2,000 AI-processed invoices per month", "Everything in Growth", "Priority processing", "Priority support"] },
];

export const TRIAL_LIMIT = 10;

export type PageDef = { eyebrow: string; title: string; headline: string; sub: string; points: [string, string][] };

const p = (eyebrow: string, title: string, headline: string, sub: string, points: [string, string][]): PageDef => ({ eyebrow, title, headline, sub, points });

export const pages: Record<string, PageDef> = {
  "why/why-apautopilot": p("Why APAutopilot", "Why APAutopilot", "Accounts payable that runs itself, with a human on the exceptions", "APAutopilot puts a reasoning model at the center of the AP function. It reads every document, decides what to do and executes, so finance teams manage outcomes instead of queues.", [["AI is the engine", "Extraction, coding, matching and routing are decisions made by the model, not rules bolted onto a form."], ["Measured accuracy", "Every field carries a confidence score, and low-confidence items go to a person before they reach the ledger."], ["Deterministic where it counts", "Totals, tax and line sums are recomputed in code, so arithmetic never depends on a model guess."], ["Built for operators", "Finance teams get an audit trail for every decision the system makes."]]),
  "products/apsuite": p("Products", "Accounts Payable", "Cut cost per invoice with an autonomous AP workflow", "From inbox to ledger, APAutopilot captures, codes, matches and routes invoices with no manual keying.", [["Touchless capture", "Vendor, dates, totals and line items are extracted from PDFs and images in seconds."], ["Automatic validation", "Line sums are checked against totals and flagged on mismatch."], ["Exception-only review", "Teams handle the small share of invoices that the AI marks as uncertain."]]),
  "products/invoice-processing": p("Products", "Invoice Processing", "Turn unstructured invoices into ledger-ready data", "Upload a PDF or image and receive structured fields with a confidence score for each invoice.", [["Multi-format input", "PDF, PNG and JPG invoices are accepted."], ["Structured output", "Every result is validated against a strict schema before it is stored."], ["Confidence scoring", "Each extraction reports how certain the model is."]]),
  "products/po-matching": p("Products", "PO Matching", "Match invoices to purchase orders before money moves", "Compare invoice lines to purchase orders and receipts to stop overpayment at the source.", [["Two- and three-way matching", "Invoice, order and receipt are reconciled automatically."], ["Tolerance rules", "Set the variance you accept and escalate the rest."], ["Clear variance reports", "See exactly which line failed and by how much."]]),
  "products/approvals": p("Products", "Approvals", "Route every invoice to the right approver without chasing", "Approval paths are chosen from amount, vendor and department, with a full record of who approved what.", [["Policy-based routing", "Invoices reach the right owner based on your rules."], ["Audit trail", "Every approval and rejection is recorded."], ["Escalation", "Stalled approvals move to a backup approver."]]),
  "products/inbox": p("Products", "AP Inbox", "An agent that triages every vendor email on arrival", "Invoices, statements and queries are classified, extracted and answered from one monitored inbox.", [["Classification", "The agent separates invoices from statements and questions."], ["Auto-extraction", "Attached invoices are processed on receipt."], ["Vendor replies", "Status questions are answered from live invoice data."]]),
  "products/pay": p("Products", "Bill Pay and Vendor Portal", "Pay on the date that protects cash and earns discounts", "Schedule payments against due dates and early-pay terms, and give vendors self-service status.", [["Payment timing", "Capture early-pay discounts while keeping cash flexible."], ["Vendor portal", "Suppliers see invoice and payment status without emailing your team."], ["Reconciliation", "Payments sync back to the ledger."]]),
  "products/card": p("Products", "Expense Management", "Control spend at the moment it happens", "Policy-aware spend management that codes transactions and flags violations as they occur.", [["Automatic coding", "Transactions are categorized to the right account."], ["Policy checks", "Out-of-policy spend is flagged immediately."], ["Receipt matching", "Receipts are attached to transactions automatically."]]),
  "products/analytics": p("Products", "Analytics and Insights", "See liabilities, spend and risk before they surface in the close", "Live dashboards built from your invoice data, with the AI surfacing anomalies worth acting on.", [["Spend visibility", "Track spend by vendor, department and period."], ["Cycle-time tracking", "Measure how long invoices take from receipt to payment."], ["Anomaly detection", "Unusual amounts and duplicate invoices are surfaced automatically."]]),
  "products/platform": p("Products", "Autonomous Finance Platform", "One AI-native core behind every finance workflow", "The platform combines document intelligence, deterministic accounting logic and workflow automation in a single system.", [["Document intelligence", "Reads invoices the way an experienced clerk does, at machine speed."], ["Accounting logic", "Totals, tax and sums are computed in code and verified."], ["Workflow engine", "Routing, approval and payment run on defined policy."]]),
  "products/how-it-works": p("Products", "How It Works", "Four steps from document to decision", "Every invoice follows the same pipeline: capture, validate, review and record.", [["Capture", "The model extracts structured data from the document."], ["Validate", "Code verifies arithmetic and checks for duplicates."], ["Review", "Low-confidence results are held for a person."], ["Record", "Approved invoices are stored with a full audit trail."]]),
  "products/integrations": p("Products", "ERP Integrations", "Connect extracted data to the systems that run the business", "Structured invoice data is stored in a consistent schema that is ready to move to your accounting system.", [["Consistent schema", "Every invoice is stored with the same fields."], ["Export-ready data", "Records are structured for downstream accounting tools."], ["API-first design", "Built on a standard database so teams can connect their own tools."]]),
  "products/security": p("Products", "Trust and Security", "Financial data protected by design", "Each customer's data is isolated at the database level, and sensitive operations run only on the server.", [["Row-level isolation", "Users can access only their own records, enforced by the database."], ["Server-side processing", "Credentials for AI processing never reach the browser."], ["Audited access", "Authentication is handled by a dedicated, industry-standard provider."]]),
  "products/agents": p("Products", "AI Agents", "Specialized agents that own finance tasks outright", "Each agent is built for one job, such as extraction, triage or matching, and reports its confidence on every decision.", [["Extraction agent", "Converts documents into validated records."], ["Triage agent", "Sorts incoming mail and routes it."], ["Matching agent", "Reconciles invoices to orders and receipts."]]),
  "solutions/centralize-ap": p("Solutions", "Centralize AP Operations", "One system for every invoice, entity and approver", "Replace scattered inboxes and spreadsheets with a single, auditable pipeline.", [["Single intake", "Every invoice enters through one controlled path."], ["Consistent data", "The same fields and checks apply to every vendor."], ["Shared visibility", "Finance sees the full state of payables at any time."]]),
  "solutions/monthly-close": p("Solutions", "Faster Monthly Close", "Close with payables already reconciled", "Invoices are captured and validated as they arrive, so the close does not start with a backlog.", [["No backlog", "Invoices are processed on receipt."], ["Early accruals", "Open liabilities are visible throughout the month."], ["Fewer adjustments", "Validation at intake prevents late corrections."]]),
  "solutions/fraud-prevention": p("Solutions", "Fraud Prevention", "Catch duplicate and inflated invoices before payment", "Arithmetic checks and duplicate detection stop errors and manipulation at the point of entry.", [["Duplicate detection", "Repeated invoice numbers from the same vendor are flagged."], ["Total verification", "Line sums are recomputed and compared to stated totals."], ["Confidence gating", "Uncertain extractions require human review."]]),
  "solutions/vendor-management": p("Solutions", "Vendor Management", "Know every vendor, every invoice and every balance", "Maintain a clean vendor record built from the invoices you actually receive.", [["Vendor history", "See all invoices by supplier."], ["Spend concentration", "Understand where spend is concentrated."], ["Cleaner records", "Consistent vendor names across invoices."]]),
  "solutions/scale": p("Solutions", "Scale for Growth", "Handle ten times the invoices without ten times the headcount", "Capacity grows with plan limits, not with manual effort.", [["Volume tiers", "Plans scale from 100 to 2,000 invoices a month."], ["Consistent quality", "The same checks apply at any volume."], ["Predictable cost", "Flat monthly pricing by volume tier."]]),
  "solutions/cfo": p("Solutions", "CFO", "Real-time command of liabilities and cost to process", "Give finance leadership live numbers on spend, cycle time and exposure.", [["Cost per invoice", "Track the unit cost of processing."], ["Liability visibility", "See open payables at any moment."], ["Audit readiness", "Every decision has a record."]]),
  "solutions/controller": p("Solutions", "Controller", "Tighter controls with less manual review", "Enforce validation and review policy on every invoice without reading each one.", [["Policy enforcement", "Checks run on every document."], ["Exception queues", "Review only what the AI flags."], ["Traceable records", "Full history for every invoice."]]),
  "solutions/accounts-payable": p("Solutions", "Accounts Payable", "Spend time on exceptions, not data entry", "Capture and validation are automated, leaving AP specialists to resolve real issues.", [["No keying", "Fields are extracted automatically."], ["Fewer errors", "Totals are verified in code."], ["Faster cycles", "Invoices move from receipt to review in seconds."]]),
  "solutions/logistics": p("Solutions", "Freight and Logistics", "Process carrier invoices at the pace freight moves", "High-volume, multi-format carrier invoices are captured and validated automatically.", [["High volume", "Built for heavy invoice flow."], ["Multi-format", "Handles PDFs and scans."], ["Line-level validation", "Charges are checked against totals."]]),
  "solutions/construction": p("Solutions", "Construction", "Keep subcontractor and supplier invoices under control", "Capture project invoices accurately and keep a clean record by vendor.", [["Project invoices", "Extract references and PO numbers."], ["Clear vendor record", "All subcontractor invoices in one place."], ["Fewer disputes", "Accurate data supports faster resolution."]]),
  "solutions/manufacturing": p("Solutions", "Manufacturing", "Reconcile supplier invoices against what was ordered", "Structured invoice data, including PO numbers, supports accurate matching for production purchasing.", [["PO capture", "Purchase order numbers are extracted."], ["Line detail", "Item-level data is preserved."], ["Supplier visibility", "Track spend by supplier."]]),
  "solutions/retail": p("Solutions", "Retail", "Handle supplier invoice volume across the seasonal cycle", "Absorb peaks in supplier invoices without adding manual work.", [["Peak capacity", "Process spikes in volume."], ["Vendor accuracy", "Consistent supplier records."], ["Spend insight", "See which suppliers drive cost."]]),
};

export const pageKeys = Object.keys(pages);
