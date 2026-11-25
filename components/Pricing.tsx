import { plans } from "@/lib/content";

export default function Pricing() {
  return (
    <div className="mx-auto grid max-w-[1100px] gap-6 px-6 md:grid-cols-3">
      {plans.map((p) => (
        <div key={p.name} className={`rounded-2xl border bg-white p-8 ${p.hot ? "border-brand shadow-xl" : ""}`}>
          <div className="text-lg font-medium">{p.name}</div>
          <div className="mt-2 text-4xl font-semibold">
            {p.price}<span className="text-base font-normal text-gray-500"> /mo</span>
          </div>
          <ul className="my-6 space-y-2 text-sm text-gray-600">
            {p.feats.map((f) => <li key={f}>✓ {f}</li>)}
          </ul>
          <a href={p.url} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">Upgrade to {p.name}</a>
        </div>
      ))}
    </div>
  );
}
