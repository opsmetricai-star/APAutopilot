export const metadata = { title: "Privacy Policy | APAutopilot" };

const sections: [string, string][] = [
  ["Information we collect", "We collect the account details you provide, such as your email address, and the invoice documents and extracted data you upload to the service."],
  ["How we use it", "We use this information to authenticate you, process your invoices, enforce plan limits and operate and secure the platform. Uploaded documents are sent to our AI provider solely to extract invoice data."],
  ["Data isolation", "Access to invoice records is restricted to the account that created them through database-level row security."],
  ["Sharing", "We do not sell your data. We share it only with service providers that run the platform, including hosting, authentication, database and AI processing, under obligations to protect it."],
  ["Retention and deletion", "We keep your data while your account is active. You may ask us to delete your account and associated records."],
  ["Changes", "We may update this policy. Material changes will be reflected on this page with a new effective date."],
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-medium">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Effective November 2026</p>
      {sections.map(([h, t]) => (<section key={h} className="mt-8"><h2 className="text-xl font-medium">{h}</h2><p className="mt-2 text-gray-600">{t}</p></section>))}
    </main>
  );
}
