"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Provider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const navigate = (path: any) => {
    router.push(path);
  };

  return (
    <NextUIProvider navigate={navigate} className="flex h-full w-full flex-col">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
