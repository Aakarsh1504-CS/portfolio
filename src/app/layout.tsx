import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aakarsh Arora - Backend Developer",
  description: "Backend Developer specializing in Financial Systems, Payments, and KYC Automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head />
      <body className={inter.className}>
        <Providers>
          <div className="bg-white dark:bg-gray-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
