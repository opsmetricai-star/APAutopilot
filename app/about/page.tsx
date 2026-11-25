import Link from "next/link";

export const metadata = { title: "About | APAutopilot" };

const items = [
  ["Our mission", "Make accounts payable an autonomous function, where software handles the work and finance teams handle the decisions."],
  ["Our approach", "A reasoning model reads every document. Deterministic code verifies every number. People review only what the system is unsure about."],
  ["Our standard", "Every extraction is scored, every total is recomputed and every record is isolated to its owner."],
];

export default function Page() {
  return (
    <main>
      <section className="hero-bg px-6 py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-medium md:text-6xl">We are building the autonomous finance function</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">APAutopilot gives finance teams an AI engine that processes payables end to end.</p>
        <div className="mt-10 flex justify-center gap-3"><Link href="/signup" className="btn-primary">Sign up</Link><Link href="/login" className="btn-ghost">Log in</Link></div>
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-6 px-6 py-20 md:grid-cols-3">
        {items.map(([h, t]) => (<div key={h} className="rounded-2xl border p-6"><div className="mb-3 h-1 w-10 rounded bg-brand" /><div className="text-lg font-medium">{h}</div><p className="mt-2 text-sm text-gray-600">{t}</p></div>))}
      </section>
    </main>
  );
}
