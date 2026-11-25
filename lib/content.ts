export const menus = {
  "Why APAutopilot?": { cols: [[
    { t: "Why APAutopilot?", d: "AI-first. People-centric. Industry leadership. Discover the difference.", h: "/why/why-apautopilot" },
    { t: "Customers", d: "See why finance teams achieve unmatched ROI with APAutopilot.", h: "/why/customers" }]] },
  Products: { cols: [
    [{ t: "Accounts Payable", d: "Experience the power of AI-first AP automation.", h: "/products/apsuite", sub: [["Invoice Processing","/products/invoice-processing"],["PO Matching","/products/po-matching"],["Approvals","/products/approvals"]] },
     { t: "AP Inbox", d: "Meet Autie, our agent-powered AP inbox.", h: "/products/inbox" }],
    [{ t: "Bill Pay and Vendor Portal", d: "Save money and take full control of your cash flow.", h: "/products/pay" },
     { t: "Expense Management", d: "Put AI-powered expense management at your fingertips.", h: "/products/card" },
     { t: "Analytics and Insights", d: "Uncover AI-powered insights for your business.", h: "/products/analytics" }],
    [{ t: "Autonomous Finance Platform", d: "The AI-native accounting platform.", h: "/products/platform", sub: [["How It Works","/products/how-it-works"],["ERP Integrations","/products/integrations"],["Trust and Security","/products/security"]] },
     { t: "Agents", d: "Agentic AI partners built for finance workflows.", h: "/products/agents" }]] },
  Solutions: { cols: [
    [{ t: "By Use Case", d: "Built for real-world complexity, designed for your business needs.", sub: [["Centralize AP Operations","/solutions/centralize-ap"],["Faster Monthly Close","/solutions/monthly-close"],["Fraud Prevention","/solutions/fraud-prevention"],["Vendor Management","/solutions/vendor-management"],["Scale For Growth","/solutions/scale"]] }],
    [{ t: "By Role", d: "Today's finance leaders use APAutopilot to stay ahead.", sub: [["CFO","/solutions/cfo"],["Controller","/solutions/controller"],["Accounts Payable","/solutions/accounts-payable"]] }],
    [{ t: "By Industry", d: "Move your business forward at the speed of AI.", sub: [["Freight and Logistics","/solutions/logistics"],["Construction","/solutions/construction"],["Manufacturing","/solutions/manufacturing"],["Retail","/solutions/retail"]] }]] },
  Resources: { cols: [[{ t: "Resources", d: "Guides, webinars and reports.", sub: [["Blog","/resources/blog"],["Guides","/resources/guides"],["Webinars","/resources/webinars"],["Help Center","/resources/help"]] }]] },
  Company: { cols: [[{ t: "Company", d: "Who we are.", sub: [["About","/about"],["Careers","/company/careers"],["Contact","/contact"],["Pricing","/pricing"]] }]] },
} as Record<string, { cols: { t: string; d: string; h?: string; sub?: string[][] }[][] }>;

export const plans = [
  { name: "Starter", price: "$47", url: process.env.NEXT_PUBLIC_SELAR_STARTER_URL || "https://selar.com/47plan?currency=USD", feats: ["100 invoices / month","AI data capture","Basic approvals","Email support"] },
  { name: "Growth", price: "$57", url: process.env.NEXT_PUBLIC_SELAR_GROWTH_URL || "https://selar.com/57plan?currency=USD", feats: ["500 invoices / month","PO matching","Multi-step approvals","Analytics"], hot: true },
  { name: "Scale", price: "$97", url: process.env.NEXT_PUBLIC_SELAR_SCALE_URL || "https://selar.com/97plan?currency=USD", feats: ["2,000 invoices / month","ERP integrations","Fraud detection","Priority support"] },
];
