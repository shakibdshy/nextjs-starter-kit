import type { Metadata } from "next";

import Provider from "@/components/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description:
    "A Next.js starter template with custom Geist fonts, NextUI provider, and TypeScript support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
