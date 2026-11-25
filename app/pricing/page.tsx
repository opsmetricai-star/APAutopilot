import Pricing from "@/components/Pricing";

export default function Page() {
  return (
    <main className="hero-bg py-24">
      <h1 className="mb-3 text-center text-5xl font-medium">Simple, transparent pricing</h1>
      <p className="mb-12 text-center text-gray-600">Pick the plan that fits your invoice volume.</p>
      <Pricing />
    </main>
  );
}
