import { Inter as FontSans } from "next/font/google";

import Image from "next/image";
import { Suspense } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { ScissorsIcon } from "lucide-react";
import vercelLogo from "@/public/images/vercel.svg";
import { GithubIcon } from "@/components/icons/github-icon";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/navigation";

import { LoginButton } from "./login-button";
import { ThemeSwitchWrapper } from "@/components/theme-switch-wrapper";
import { LangSwitchWrapper } from "@/components/lang-switch-wrapper";
import { DynamicToaster } from "./dynamic-toaster";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <DynamicToaster />
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
                    <GithubIcon
                      className="dark:invert"
                      width={32}
                      height={32}
                    />
                    <span className="sr-only">Github</span>
                  </a>
                  <ThemeSwitchWrapper />
                  <LangSwitchWrapper />
                </div>
              </div>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
