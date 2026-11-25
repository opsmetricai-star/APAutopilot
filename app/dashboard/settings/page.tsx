"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { useUser } from "@/lib/user-context";

export default function Settings() {
  const user = useUser();
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function change(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.updateUser({ password: pw });
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "Password updated." });
    if (!error) setPw("");
  }

  return (
    <>
      <h1 className="text-2xl font-medium">Account settings</h1>
      <section className="mt-6 rounded-2xl border p-6">
        <div className="text-sm text-gray-500">Email</div>
        <div className="font-medium">{user.email}</div>
      </section>
      <form onSubmit={change} className="mt-6 max-w-md space-y-3 rounded-2xl border p-6">
        <div className="font-medium">Change password</div>
        <input type="password" required minLength={6} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" className="w-full rounded-lg border p-3" />
        <button className="btn-primary">Update password</button>
        {msg && <p role="status" className={`text-sm ${msg.ok ? "text-brand-dark" : "text-red-600"}`}>{msg.text}</p>}
      </form>
    </>
  );
}
