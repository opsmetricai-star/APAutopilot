"use client";
import Link from "next/link";
import { useState } from "react";
import { menus } from "@/lib/content";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="APAutopilot home">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <circle cx="17" cy="17" r="15" fill="#16a34a" />
        <path d="M9 21l5-9 4 6 3-4 4 7" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`text-base font-semibold tracking-[0.12em] sm:text-xl sm:tracking-[0.18em] ${light ? "text-white" : ""}`}>
        AP<span className="text-brand">AUTOPILOT</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const keys = Object.keys(menus);
  return (
    <header className="sticky top-0 z-50 bg-[#d9f5e3]/95 backdrop-blur" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {keys.map((k) => (
            <button key={k} onMouseEnter={() => setOpen(k)} onClick={() => setOpen(open === k ? null : k)}
              className={`rounded-lg px-4 py-2 text-[16px] ${open === k ? "bg-white/70 text-brand" : ""}`}>{k}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/login" className="hidden text-[15px] font-medium sm:block">Log in</Link>
          <Link href="/signup" className="btn-primary whitespace-nowrap !px-4 !py-2 !text-sm sm:!px-5 sm:!py-2.5 sm:!text-[15px]">Sign up</Link>
          <button className="lg:hidden" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={mobile ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute left-0 right-0 hidden lg:block">
          <div className="mx-auto max-w-[1000px] rounded-2xl bg-white p-8 shadow-xl">
            <div className={`grid gap-10 ${menus[open].cols.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
              {menus[open].cols.map((col, i) => (
                <div key={i} className={`space-y-6 ${i > 0 ? "border-l border-gray-100 pl-8" : ""}`}>
                  {col.map((it) => (
                    <div key={it.t}>
                      {it.h ? <Link href={it.h} onClick={() => setOpen(null)} className="text-[15px] font-medium hover:text-brand">{it.t}</Link> : <div className="text-[15px] font-medium">{it.t}</div>}
                      <p className="mt-1 text-[13px] text-gray-600">{it.d}</p>
                      <ul className="mt-3 space-y-3">
                        {it.sub?.map(([l, h]) => (
                          <li key={h}><Link href={h} onClick={() => setOpen(null)} className="text-[13px] text-brand hover:underline">{l}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {mobile && (
        <div className="max-h-[80vh] overflow-auto bg-white px-6 py-4 lg:hidden">
          {keys.map((k) => (
            <details key={k} className="border-b py-3">
              <summary className="font-medium">{k}</summary>
              <ul className="mt-2 space-y-2 pl-3">
                {menus[k].cols.flat().flatMap((i) => [...(i.h ? [[i.t, i.h]] : []), ...(i.sub ?? [])]).map(([l, h]) => (
                  <li key={h}><Link href={h} onClick={() => setMobile(false)} className="text-sm text-brand">{l}</Link></li>
                ))}
              </ul>
            </details>
          ))}
          <Link href="/login" onClick={() => setMobile(false)} className="mt-4 block font-medium">Log in</Link>
        </div>
      )}
    </header>
  );
}
