"use client";
import Link from "next/link";
import { useState } from "react";
import { menus } from "@/lib/content";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15" fill="#16a34a" />
        <path d="M9 21l5-9 4 6 3-4 4 7" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-semibold tracking-[0.18em]">
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
    <header className="sticky top-0 z-50 bg-[#d9f5e3]/90 backdrop-blur" onMouseLeave={() => setOpen(null)}>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-2 lg:flex">
          {keys.map((k) => (
            <button
              key={k}
              onMouseEnter={() => setOpen(k)}
              onClick={() => setOpen(open === k ? null : k)}
              className={`rounded-lg px-4 py-2 text-[16px] ${open === k ? "bg-white/70 text-brand" : ""}`}
            >
              {k}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" aria-label="Account" className="hidden sm:block">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
            </svg>
          </Link>
          <Link href="/signup" className="btn-primary !py-2.5">Request demo</Link>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMobile(!mobile)}>☰</button>
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
                      <div className="text-[15px] font-medium">{it.t}</div>
                      <p className="mt-1 text-[13px] text-gray-600">{it.d}</p>
                      {it.h && (
                        <Link href={it.h} onClick={() => setOpen(null)} className="mt-2 block text-[13px] font-medium">
                          Explore ↗
                        </Link>
                      )}
                      <ul className="mt-3 space-y-3">
                        {it.sub?.map(([l, h]) => (
                          <li key={h}>
                            <Link href={h} onClick={() => setOpen(null)} className="text-[13px] text-brand hover:underline">{l}</Link>
                          </li>
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
                {menus[k].cols.flat().flatMap((i) => i.sub ?? (i.h ? [[i.t, i.h]] : [])).map(([l, h]) => (
                  <li key={h}>
                    <Link href={h} onClick={() => setMobile(false)} className="text-sm text-brand">{l}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </header>
  );
}
