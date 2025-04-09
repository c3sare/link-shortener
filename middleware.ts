import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/profile"];

export async function middleware(req: NextRequest) {
  const session = await auth();

  const isAuthorized = !!session?.user;

  if (req.nextUrl.pathname.startsWith("/l/")) return;

  if (!isAuthorized) {
    const [, locale, ...segments] = req.nextUrl.pathname.split("/");

    if (locale != null) {
      const restUrl = segments.join("/");

      if (restUrl) {
        const pathname = "/" + restUrl;
        const route = protectedRoutes.find((item) => pathname.startsWith(item));

        if (route) return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }

  const I18nMiddleware = createMiddleware({
    locales: routing.locales,

    defaultLocale: "en",

    localePrefix: "as-needed",
  });

  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/",
    "/(pl|en)/:path*",
  ],
};
