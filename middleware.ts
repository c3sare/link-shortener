import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const protectedRoutes = ["/profile"];

export async function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);

  const isAuthorized = !!sessionCookie;

  if (req.nextUrl.pathname.startsWith("/l/")) return;

  if (!isAuthorized) {
    const [, locale, ...segments] = req.nextUrl.pathname.split("/");

    if (locale != null) {
      const restUrl = segments.join("/");

      if (restUrl) {
        const pathname = `/${restUrl}`;
        const route = protectedRoutes.find((item) => pathname.startsWith(item));

        if (route)
          return NextResponse.redirect(
            new URL(
              `/${locale}/login?backUrl=${encodeURIComponent(
                req.nextUrl.pathname,
              )}`,
              req.url,
            ),
          );
      }
    }
  }

  const I18nMiddleware = createMiddleware(routing);

  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
    "/",
    "/(pl|en)/:path*",
  ],
};
