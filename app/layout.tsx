import "./globals.css";

import type { Metadata } from "next";
import { Suspense } from "react";

export const runtime = "edge";

// export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Link shortener",
  description: "Created with Next.js 15, Drizzle ORM, Shadcn/ui, TailwindCSS",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
