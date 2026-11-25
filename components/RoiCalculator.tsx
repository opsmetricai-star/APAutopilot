"use client";
import { useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function RoiCalculator() {
  const [volume, setVolume] = useState(1000);
  const [manual, setManual] = useState(12);
  const [auto, setAuto] = useState(3);
  const [minutes, setMinutes] = useState(10);

  const monthly = Math.max(0, volume * (manual - auto));
  const hours = (volume * Math.max(0, minutes - 1)) / 60;
  const field = "w-full rounded-lg border p-2.5";
  return (
    <div className="mx-auto grid max-w-[1000px] gap-8 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div className="space-y-4">
        <label className="block text-sm">Invoices per month
          <input type="number" min={0} value={volume} onChange={(e) => setVolume(Number(e.target.value) || 0)} className={field} />
        </label>
        <label className="block text-sm">Current cost per invoice (USD)
          <input type="number" min={0} step="0.5" value={manual} onChange={(e) => setManual(Number(e.target.value) || 0)} className={field} />
        </label>
        <label className="block text-sm">Cost per invoice with AI (USD)
          <input type="number" min={0} step="0.5" value={auto} onChange={(e) => setAuto(Number(e.target.value) || 0)} className={field} />
        </label>
        <label className="block text-sm">Minutes of handling per invoice today
          <input type="number" min={1} value={minutes} onChange={(e) => setMinutes(Number(e.target.value) || 1)} className={field} />
        </label>
        <p className="text-xs text-gray-500">Defaults are editable planning estimates, not guarantees. Replace them with your own figures.</p>
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-2xl bg-brand-tint p-6 text-center">
        <div><div className="text-4xl font-semibold text-brand md:text-5xl">${fmt(monthly)}</div><div className="mt-1 text-sm text-gray-600">estimated monthly savings</div></div>
        <div><div className="text-3xl font-semibold text-brand-dark">${fmt(monthly * 12)}</div><div className="mt-1 text-sm text-gray-600">estimated annual savings</div></div>
        <div><div className="text-3xl font-semibold text-brand-dark">{fmt(hours)}</div><div className="mt-1 text-sm text-gray-600">team hours returned each month</div></div>
      </div>
    </div>
  );
}
