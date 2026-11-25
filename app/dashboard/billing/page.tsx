"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { plans, TRIAL_LIMIT } from "@/lib/content";

export default function Billing() {
  const [used, setUsed] = useState<number | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);

  useEffect(() => {
    const sb = supabaseBrowser();
    const start = new Date(); start.setUTCDate(1); start.setUTCHours(0, 0, 0, 0);
    sb.from("invoices").select("id", { count: "exact", head: true }).eq("source", "ai").gte("created_at", start.toISOString()).then(({ count }) => setUsed(count ?? 0));
    sb.from("subscriptions").select("plan,status").maybeSingle().then(({ data }) => setPlanId(data?.status === "active" ? data.plan : null));
  }, []);

  const current = plans.find((p) => p.id === planId);
  const limit = current?.limit ?? TRIAL_LIMIT;
  const pct = used === null ? 0 : Math.min(100, Math.round((used / limit) * 100));

  return (
    <>
      <h1 className="text-2xl font-medium">Billing and usage</h1>
      <section className="mt-6 rounded-2xl border p-6">
        <div className="text-sm text-gray-500">Current plan</div>
        <div className="text-2xl font-medium">{current ? current.name : "Free trial"}</div>
        <div className="mt-5 flex justify-between text-sm"><span>AI invoices this month</span><span>{used ?? "..."} of {limit}</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded bg-gray-100"><div className="h-full bg-brand" style={{ width: `${pct}%` }} /></div>
      </section>
      <h2 className="mb-4 mt-10 text-lg font-medium">Plans</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`rounded-2xl border p-6 ${p.id === planId ? "border-brand" : ""}`}>
            <div className="font-medium">{p.name}</div>
            <div className="mt-1 text-2xl font-semibold">{p.price}<span className="text-sm font-normal text-gray-500"> per month</span></div>
            <p className="mt-2 text-sm text-gray-600">{p.limit.toLocaleString()} AI invoices per month</p>
            {p.id === planId ? <div className="mt-4 text-sm font-medium text-brand-dark">Current plan</div> : <a href={p.url} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full justify-center">Sign up</a>}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500">Plan changes are applied after payment is confirmed by our team.</p>
    </>
  );
}
