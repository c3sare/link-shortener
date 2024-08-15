import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

const locales = ["en", "pl"];

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

const protectedRoutes = ["/profile"];

const localeProtectedRoutes = [
  ...locales.flatMap((locale) =>
    protectedRoutes.flatMap((url) => "/" + locale + url)
  ),
  ...protectedRoutes,
];

export const middleware = async (req: NextRequest) => {
  const session = await auth();

  const isAuthorized = !!session?.user;

  if (!isAuthorized) {
    if (
      localeProtectedRoutes.some((url) => req.nextUrl.pathname.startsWith(url))
    )
      return NextResponse.redirect(new URL("/", req.url));
  }

  return I18nMiddleware(req);
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
