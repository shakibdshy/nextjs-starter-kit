import type { Metadata } from "next";
import { Suspense } from "react";

import { SessionProvider } from "next-auth/react";

import CustomNavbar from "@/components/navbar";
import Provider from "@/config/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description:
    "A Next.js starter template with custom Geist fonts, NextUI provider, and TypeScript support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="h-screen w-screen">
        <SessionProvider>
          <Provider>
            <CustomNavbar />
            <main className="flex-grow">
              <Suspense>{children}</Suspense>
            </main>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
