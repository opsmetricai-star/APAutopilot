import Link from "next/link";

export default function Page({ params }: { params: { section: string; slug: string } }) {
  const title = params.slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  return (
    <main>
      <section className="hero-bg px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-brand">{params.section}</p>
        <h1 className="mt-2 text-5xl font-medium">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg">Learn how APAutopilot uses AI to bring {title.toLowerCase()} under control.</p>
        <Link href="/signup" className="btn-primary mt-8">Request demo</Link>
      </section>
    </main>
  );
}
