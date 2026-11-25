import { plans } from "@/lib/content";

function Check() {
  return (<svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>);
}

export default function Pricing() {
  return (
    <div className="mx-auto grid max-w-[1100px] gap-6 px-6 md:grid-cols-3">
      {plans.map((p) => (
        <div key={p.id} className={`flex flex-col rounded-2xl border bg-white p-8 ${p.hot ? "border-brand shadow-xl" : ""}`}>
          <div className="text-lg font-medium">{p.name}</div>
          <div className="mt-2 text-4xl font-semibold">{p.price}<span className="text-base font-normal text-gray-500"> per month</span></div>
          <ul className="my-6 flex-1 space-y-3 text-sm text-gray-600">
            {p.feats.map((f) => (<li key={f} className="flex gap-2"><Check />{f}</li>))}
          </ul>
          <a href={p.url} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">Sign up</a>
        </div>
      ))}
    </div>
  );
}
