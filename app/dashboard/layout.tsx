"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCtx } from "@/lib/user-context";
import type { User } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase";




const tabs: [string, string][] = [["Invoices", "/dashboard"], ["Billing", "/dashboard/billing"], ["Settings", "/dashboard/settings"]];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const path = usePathname();

  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/login";
      else setUser(data.user);
    });
  }, []);

  if (!user) return <main className="px-6 py-24 text-center text-gray-500">Loading workspace</main>;
  return (
    <UserCtx.Provider value={user}>
      <main className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <nav className="flex gap-1" aria-label="Workspace">
            {tabs.map(([l, h]) => (
              <Link key={h} href={h} className={`rounded-lg px-4 py-2 text-sm font-medium ${path === h ? "bg-brand text-white" : "text-gray-700 hover:bg-brand-tint"}`}>{l}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="max-w-[200px] truncate">{user.email}</span>
            <button className="font-medium text-brand" onClick={async () => { await supabaseBrowser().auth.signOut(); window.location.href = "/"; }}>Log out</button>
          </div>
        </div>
        {children}
      </main>
    </UserCtx.Provider>
  );
}
