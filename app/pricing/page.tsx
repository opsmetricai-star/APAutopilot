import Pricing from "@/components/Pricing";

export const metadata = { title: "Pricing | APAutopilot" };

export default function Page() {
  return (
    <main className="hero-bg py-24">
      <h1 className="mb-3 px-6 text-center text-4xl font-medium md:text-5xl">Pricing that scales with invoice volume</h1>
      <p className="mx-auto mb-12 max-w-2xl px-6 text-center text-gray-700">Flat monthly tiers. Every plan includes AI extraction, validation and a full audit trail.</p>
      <Pricing />
    </main>
  );
}
