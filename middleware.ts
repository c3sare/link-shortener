import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const locales = ["en", "pl"];

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

const protectedRoutes = ["/profile"];

const localeProtectedRoutes = locales.flatMap((locale) =>
  protectedRoutes.flatMap((url) => "/" + locale + url)
);

export default auth((req) => {
  const isAuthorized = !!req.auth?.user;

  const response = NextResponse.next(I18nMiddleware(req));

  if (!isAuthorized) {
    if (
      localeProtectedRoutes.some((url) => req.nextUrl.pathname.startsWith(url))
    )
      return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
