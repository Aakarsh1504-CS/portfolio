import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aakarsh Arora // Backend × AI Systems",
  description:
    "Backend engineer building payment rails, KYC automation, and LLM-powered systems. Java · Go · Node · Postgres · Redis · Aerospike · LangChain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${mono.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
