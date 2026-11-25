import Link from "next/link";
import { Logo } from "./Header";

const cols: Record<string, [string, string][]> = {
  Products: [["AP Suite", "/products/apsuite"], ["AP Inbox", "/products/inbox"], ["Bill Pay", "/products/pay"], ["Expense Management", "/products/card"], ["Analytics", "/products/analytics"]],
  Solutions: [["Centralize AP", "/solutions/centralize-ap"], ["Fraud Prevention", "/solutions/fraud-prevention"], ["CFO", "/solutions/cfo"], ["Construction", "/solutions/construction"]],
  Resources: [["Blog", "/resources/blog"], ["Guides", "/resources/guides"], ["Help Center", "/resources/help"]],
  Company: [["About", "/about"], ["Contact", "/contact"], ["Pricing", "/pricing"], ["Log in", "/login"]],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-300">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-5">
        <div>
          <div className="text-white"><Logo /></div>
          <p className="mt-4 text-sm">AI-first accounts payable automation for modern finance teams.</p>
        </div>
        {Object.entries(cols).map(([h, l]) => (
          <div key={h}>
            <div className="mb-3 font-medium text-white">{h}</div>
            <ul className="space-y-2 text-sm">
              {l.map(([t, u]) => (
                <li key={u}><Link href={u} className="hover:text-white">{t}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© 2026 APAutopilot. All rights reserved.</div>
    </footer>
  );
}
