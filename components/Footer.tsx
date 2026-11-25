import Link from "next/link";
import { Logo } from "./Header";

const cols: Record<string, [string, string][]> = {
  Products: [["Accounts Payable", "/products/apsuite"], ["AP Inbox", "/products/inbox"], ["Bill Pay", "/products/pay"], ["Analytics", "/products/analytics"]],
  Solutions: [["Centralize AP", "/solutions/centralize-ap"], ["Fraud Prevention", "/solutions/fraud-prevention"], ["CFO", "/solutions/cfo"]],
  Company: [["About", "/about"], ["Pricing", "/pricing"], ["Log in", "/login"], ["Sign up", "/signup"]],
  Legal: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Security", "/products/security"]],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-300">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-5">
        <div>
          <Logo light />
          <p className="mt-4 text-sm">The AI-native accounts payable platform for finance teams.</p>
        </div>
        {Object.entries(cols).map(([h, l]) => (
          <div key={h}>
            <div className="mb-3 font-medium text-white">{h}</div>
            <ul className="space-y-2 text-sm">
              {l.map(([t, u]) => (<li key={u}><Link href={u} className="hover:text-white">{t}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© 2026 APAutopilot. All rights reserved.</div>
    </footer>
  );
}
