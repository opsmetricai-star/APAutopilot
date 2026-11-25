"use client";
import Link from "next/link";
import { useState } from "react";
import { supabaseBrowser, siteUrl } from "@/lib/supabase";

export default function AuthForm({ mode }: { mode: "login" | "signup" | "reset" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    try {
      const sb = supabaseBrowser();
      const origin = siteUrl();
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/dashboard";
        return;
      }
      if (mode === "signup") {
        const { error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: origin + "/dashboard" } });
        if (error) throw error;
        setMsg({ ok: true, text: "Account created. Check your email and confirm your address to continue." });
      } else {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: origin + "/dashboard/settings" });
        if (error) throw error;
        setMsg({ ok: true, text: "If that address has an account, a reset link is on its way." });
      }
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Something went wrong. Try again." });
    }
    setBusy(false);
  }

  const title = { login: "Log in", signup: "Create account", reset: "Reset password" }[mode];
  const sub = { login: "Access your invoice workspace.", signup: "Start processing invoices with AI.", reset: "Enter your work email to receive a reset link." }[mode];
  return (
    <main className="hero-bg px-4 py-16 sm:py-24">
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-3xl font-medium">{title}</h1>
        <p className="text-sm text-gray-600">{sub}</p>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="w-full rounded-lg border p-3" />
        {mode !== "reset" && (
          <input type="password" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border p-3" />
        )}
        <button disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? "Please wait" : title}</button>
        {msg && <p role="status" className={`text-sm ${msg.ok ? "text-brand-dark" : "text-red-600"}`}>{msg.text}</p>}
        <div className="flex justify-between text-sm text-brand">
          {mode === "login" ? <Link href="/signup">Create account</Link> : <Link href="/login">Log in</Link>}
          {mode === "login" && <Link href="/login/reset">Forgot password</Link>}
        </div>
      </form>
    </main>
  );
}
