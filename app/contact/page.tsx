export default function Page() {
  return (
    <main className="hero-bg px-6 py-24">
      <form className="mx-auto max-w-md space-y-4 rounded-2xl bg-white p-8">
        <h1 className="text-3xl font-medium">Contact us</h1>
        <input className="w-full rounded-lg border p-3" placeholder="Name" />
        <input className="w-full rounded-lg border p-3" placeholder="Work email" />
        <textarea className="w-full rounded-lg border p-3" placeholder="Message" />
        <button className="btn-primary" type="button">Send</button>
      </form>
    </main>
  );
}
