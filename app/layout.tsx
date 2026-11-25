import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "APAutopilot | The AI-native accounts payable platform",
  description: "APAutopilot reads, validates and processes invoices autonomously, cutting cost per invoice and closing faster.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Header />{children}<Footer /></body></html>);
}
