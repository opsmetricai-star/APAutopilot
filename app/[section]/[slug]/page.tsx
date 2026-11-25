import Link from "next/link";
import { notFound } from "next/navigation";
import { pages, pageKeys } from "@/lib/content";
import Faq, { faqs } from "@/components/Faq";

export const dynamicParams = false;
export function generateStaticParams() {
  return pageKeys.map((k) => { const [section, slug] = k.split("/"); return { section, slug }; });
}

export default function Page({ params }: { params: { section: string; slug: string } }) {
  const d = pages[`${params.section}/${params.slug}`];
  if (!d) notFound();
  const related = pageKeys.filter((k) => k.startsWith(params.section + "/") && k !== `${params.section}/${params.slug}`).slice(0, 4);
  return (
    <main>
      <section className="hero-bg px-6 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-brand">{d.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-medium md:text-6xl">{d.headline}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700">{d.sub}</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/signup" className="btn-primary">Sign up</Link>
          <Link href="/login" className="btn-ghost">Log in</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-6 px-6 py-20 md:grid-cols-3">
        {d.points.map(([h, t]) => (
          <div key={h} className="rounded-2xl border p-6">
            <div className="mb-3 h-1 w-10 rounded bg-brand" />
            <div className="text-lg font-medium">{h}</div>
            <p className="mt-2 text-sm text-gray-600">{t}</p>
          </div>
        ))}
      </section>
      <section className="bg-brand-tint px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-medium">The same engine behind every workflow</h2>
        <div className="mx-auto grid max-w-[1100px] gap-4 md:grid-cols-4">
          {[["Capture", "AI reads the document."], ["Validate", "Code verifies every number."], ["Review", "People handle only exceptions."], ["Record", "Every decision is stored and auditable."]].map(([t, x], i) => (
            <div key={t} className="rounded-2xl bg-white p-5"><div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white">{i + 1}</div><div className="font-medium">{t}</div><p className="mt-1 text-sm text-gray-600">{x}</p></div>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-6 py-16">
          <h2 className="mb-8 text-2xl font-medium">Related in {params.section}</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {related.map((k) => (
              <Link key={k} href={`/${k}`} className="rounded-2xl border p-5 transition hover:border-brand hover:shadow-md">
                <div className="font-medium">{pages[k].title}</div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{pages[k].sub}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="bg-brand-tint px-6 py-16">
        <h2 className="mb-8 text-center text-3xl font-medium">Frequently asked questions</h2>
        <Faq items={faqs.slice(0, 5)} />
      </section>
      <section className="hero-bg px-6 py-20 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-medium">Put accounts payable on autopilot</h2>
        <div className="mt-8 flex justify-center gap-3"><Link href="/signup" className="btn-primary">Sign up</Link><Link href="/login" className="btn-ghost">Log in</Link></div>
      </section>
    </main>
  );
}
