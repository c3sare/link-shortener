import { ThemeSwitch } from "@/components/theme-switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { LoginButton } from "./login-button";
import { ScissorsIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "@/components/icons/github-icon";

export const experimental_ppr = true;

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="border-b">
        <div className="max-w-7xl px-4 mx-auto flex justify-between items-center h-20 shadow-sm">
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

            <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
              <LoginButton />
            </Suspense>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 h-full flex items-center justify-center mx-auto max-w-7xl">
          {children}
        </div>
      </main>
      <footer className="border-t shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
          >
            Powered by
            <div className="flex ml-2">
              <Image
                alt="Vercel Logo"
                className="dark:invert"
                width={71}
                height={16}
                src="/vercel.svg"
              />
            </div>
          </a>
          <div className="flex items-center gap-4">
            <a href="https://github.com/c3sare/link-shortener">
              <GithubIcon className="dark:invert" width={32} height={32} />
            </a>
            <ThemeSwitch />
          </div>
        </div>
      </footer>
    </>
  );
}
