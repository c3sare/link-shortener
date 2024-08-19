import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "pl"];

const I18nMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",

  localePrefix: "as-needed",
});

const protectedRoutes = ["/profile"];

const protectedRoutesWithLocale = [
  ...protectedRoutes,
  ...protectedRoutes.flatMap((route) =>
    locales.map((locale) => `/${locale}${route}`)
  ),
];

export async function middleware(req: NextRequest) {
  const session = await auth();

  const isAuthorized = !!session?.user;

if(req.nextUrl.pathname.startsWith('/l/'))
return;

  if (!isAuthorized) {
    if (
      protectedRoutesWithLocale.some((url) =>
        req.nextUrl.pathname.startsWith(url)
      )
    )
      return NextResponse.redirect(new URL("/", req.url));
  }

  return I18nMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
