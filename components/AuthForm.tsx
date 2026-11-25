"use client";
import Link from "next/link";
import { useState } from "react";
import { supabaseBrowser, supabaseConfigured } from "@/lib/supabase";

export default function AuthForm({ mode }: { mode: "login" | "signup" | "reset" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (!supabaseConfigured) {
      setMsg("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.");
      return;
    }
    setBusy(true);
    const sb = supabaseBrowser();
    const origin = window.location.origin;
    let error;
    if (mode === "login") {
      ({ error } = await sb.auth.signInWithPassword({ email, password }));
      if (!error) window.location.href = "/dashboard";
    } else if (mode === "signup") {
      ({ error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: origin + "/dashboard" } }));
      if (!error) setMsg("Check your email to confirm your account.");
    } else {
      ({ error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: origin + "/login" }));
      if (!error) setMsg("Password reset email sent.");
    }
    if (error) setMsg(error.message);
    setBusy(false);
  }

  const title = { login: "Log in", signup: "Create your account", reset: "Reset password" }[mode];
  return (
    <main className="hero-bg px-6 py-24">
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-medium">{title}</h1>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="w-full rounded-lg border p-3" />
        {mode !== "reset" && (
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border p-3" />
        )}
        <button disabled={busy} className="btn-primary w-full justify-center">{busy ? "Please wait…" : title}</button>
        {msg && <p className="text-sm text-gray-700">{msg}</p>}
        <div className="flex justify-between text-sm text-brand">
          {mode === "login" ? <Link href="/signup">Create account</Link> : <Link href="/login">Log in</Link>}
          {mode === "login" && <Link href="/login/reset">Forgot password?</Link>}
        </div>
      </form>
    </main>
  );
}
