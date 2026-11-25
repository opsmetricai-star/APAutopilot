import Link from "next/link";
import { notFound } from "next/navigation";
import { pages, pageKeys } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return pageKeys.map((k) => { const [section, slug] = k.split("/"); return { section, slug }; });
}

export default function Page({ params }: { params: { section: string; slug: string } }) {
  const d = pages[`${params.section}/${params.slug}`];
  if (!d) notFound();
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
    </main>
  );
}
