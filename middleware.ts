import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const locales = ["en", "pl"];

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale: "en",
});

const protectedRoutes = ["/profile"];

const protectedRoutesWithLocale = [
  ...protectedRoutes,
  ...protectedRoutes.flatMap((route) =>
    locales.map((locale) => `/${locale}${route}`)
  ),
];

export default auth((req) => {
  const isAuthorized = !!req.auth?.user;

  if (!isAuthorized) {
    if (
      protectedRoutesWithLocale.some((url) =>
        req.nextUrl.pathname.startsWith(url)
      )
    )
      return NextResponse.redirect(new URL("/", req.url));
  }

  return I18nMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
