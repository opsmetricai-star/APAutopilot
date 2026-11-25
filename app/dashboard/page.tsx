"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, supabaseConfigured } from "@/lib/supabase";

type Invoice = { id: string; vendor: string; invoice_number: string; amount: number; status: string };

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [rows, setRows] = useState<Invoice[]>([]);
  const [form, setForm] = useState({ vendor: "", invoice_number: "", amount: "" });
  const [err, setErr] = useState("");

  async function load() {
    const sb = supabaseBrowser();
    const { data } = await sb.from("invoices").select("*").order("created_at", { ascending: false });
    setRows((data as Invoice[]) ?? []);
  }

  useEffect(() => {
    if (!supabaseConfigured) return;
    const sb = supabaseBrowser();
    sb.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = "/login"; return; }
      setEmail(data.user.email ?? "");
      load();
    });
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabaseBrowser();
    const { data: u } = await sb.auth.getUser();
    const { error } = await sb.from("invoices").insert({
      user_id: u.user!.id, vendor: form.vendor, invoice_number: form.invoice_number, amount: Number(form.amount),
    });
    if (error) setErr(error.message); else { setErr(""); setForm({ vendor: "", invoice_number: "", amount: "" }); load(); }
  }

  if (!supabaseConfigured)
    return <main className="px-6 py-24 text-center">Supabase is not configured. Copy .env.example to .env.local and add your keys.</main>;

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Invoices</h1>
        <div className="text-sm text-gray-600">{email} · <button className="text-brand" onClick={async () => { await supabaseBrowser().auth.signOut(); window.location.href = "/"; }}>Log out</button></div>
      </div>
      <form onSubmit={add} className="mb-8 grid gap-3 rounded-2xl bg-brand-tint p-4 md:grid-cols-4">
        <input required placeholder="Vendor" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} className="rounded-lg border p-2" />
        <input required placeholder="Invoice #" value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} className="rounded-lg border p-2" />
        <input required type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-lg border p-2" />
        <button className="btn-primary justify-center">Add invoice</button>
      </form>
      {err && <p className="mb-4 text-sm text-red-600">{err}</p>}
      <table className="w-full text-left text-sm">
        <thead className="border-b text-gray-500"><tr><th className="py-2">Vendor</th><th>Invoice #</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r.id} className="border-b"><td className="py-2">{r.vendor}</td><td>{r.invoice_number}</td><td>${Number(r.amount).toFixed(2)}</td><td className="text-brand">{r.status}</td></tr>))}</tbody>
      </table>
      {rows.length === 0 && <p className="py-6 text-center text-gray-500">No invoices yet.</p>}
    </main>
  );
}
