import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";

const { auth } = NextAuth(authConfig);

const I18nMiddleware = createMiddleware({
  locales: routing.locales,

  defaultLocale: "en",

  localePrefix: "as-needed",
});

const protectedRoutes = ["/profile"];

const protectedRoutesWithLocale = [
  ...protectedRoutes,
  ...protectedRoutes.flatMap((route) =>
    routing.locales.map((locale) => `/${locale}${route}`),
  ),
];

export async function middleware(req: NextRequest) {
  const session = await auth();

  const isAuthorized = !!session?.user;

  if (req.nextUrl.pathname.startsWith("/l/")) return;

  if (!isAuthorized) {
    if (
      protectedRoutesWithLocale.some((url) =>
        req.nextUrl.pathname.startsWith(url),
      )
    )
      return NextResponse.redirect(new URL("/", req.url));
  }

  return I18nMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
