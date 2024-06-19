import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Core } from "nextjs-darkmode";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Link shortener",
  description: "Created with Next.js 15, Drizzle ORM, Shadcn/ui, TailwindCSS",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-dvh h-s flex flex-col bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Core />
          {children}
        </body>
      </html>
    </Suspense>
  );
}
