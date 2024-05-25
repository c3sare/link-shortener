import { auth } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";

export function middleware(request: NextApiRequest, response: NextApiResponse) {
  return auth(request, response);
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
