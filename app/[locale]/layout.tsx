import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Core } from "nextjs-darkmode";

import { ScissorsIcon } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { Suspense } from "react";
import { LoginButton } from "./login-button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import vercelLogo from "@/public/images/vercel.svg";
import { LangSwitch } from "@/components/lang-switch";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Link } from "@/navigation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Link shortener",
  description: "Created with Next.js 15, Drizzle ORM, Shadcn/ui, TailwindCSS",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const runtime = "edge";

// export const experimental_ppr = true;

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-dvh h-s flex flex-col bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <Core />
          <header className="border-b sticky top-0 z-10 bg-background shadow-sm">
            <div className="max-w-7xl px-4 mx-auto flex justify-between items-center h-20">
              <div>
                <Link href="/">
                  <h1 className="flex items-center gap-2 font-bold select-none">
                    <ScissorsIcon className="size-8" strokeWidth={2} />{" "}
                    <span className="flex flex-col">
                      <span className="border-b-4 border-foreground border-dashed">
                        Link
                      </span>
                      <span>Shortener</span>
                    </span>
                  </h1>
                </Link>
              </div>
              <nav className="flex gap-4 items-center">
                <Suspense
                  fallback={<Skeleton className="size-10 rounded-full" />}
                >
                  <LoginButton />
                </Suspense>
              </nav>
            </div>
          </header>
          <main className="flex-1 flex flex-col w-full">
            <div className="flex-1 w-full mx-auto max-w-7xl h-full flex flex-col">
              {children}
            </div>
          </main>
          <footer className="border-t shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center min-h-20 px-4 flex-col-reverse py-4 justify-center gap-4 sm:flex-row sm:justify-between">
              <a
                className="flex items-center justify-center text-xs text-nowrap"
                href="https://vercel.com/"
                target="_blank"
                rel="noreferrer"
              >
                Powered by
                <div className="flex ml-2">
                  <Image
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={55}
                    height={12}
                    src={vercelLogo}
                  />
                </div>
              </a>
              <div className="flex items-center gap-4 flex-wrap sm:justify-center w-full justify-between sm:w-auto">
                <a href="https://github.com/c3sare/link-shortener">
                  <GithubIcon className="dark:invert" width={32} height={32} />
                  <span className="sr-only">Github</span>
                </a>
                <ThemeSwitch />
                <Suspense>
                  <LangSwitch />
                </Suspense>
              </div>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
