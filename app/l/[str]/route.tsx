import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { str } }: { params: { str: string } }
) {
  const geo = {
    host: headers().get("host"),
    "x-vercel-id": headers().get("x-vercel-id"),
    "x-forwarded-host": headers().get("x-forwarded-host"),
    "x-forwarded-proto": headers().get("x-forwarded-proto"),
    "x-forwarded-for": headers().get("x-forwarded-for"),
    "x-vercel-forwarded-for": headers().get("x-vercel-forwarded-for"),
    "x-real-ip": headers().get("x-real-ip"),
    "x-vercel-deployment-url": headers().get("x-vercel-deployment-url"),
    "x-vercel-ip-continent": headers().get("x-vercel-ip-continent"),
    "x-vercel-ip-country": headers().get("x-vercel-ip-country"),
    "x-vercel-ip-country-region": headers().get("x-vercel-ip-country-region"),
    "x-vercel-ip-city": headers().get("x-vercel-ip-city"),
    "x-vercel-ip-latitude": headers().get("x-vercel-ip-latitude"),
    "x-vercel-ip-timezone": headers().get("x-vercel-ip-timezone"),
    "x-vercel-signature": headers().get("x-vercel-signature"),
  }

  console.log(geo);

  const items = await db
    .update(links)
    .set({
      redirects: sql`${links.redirects} + 1`,
    })
    .where(eq(links.id, str))
    .returning();

  const item = items.at(0);

  if (!item) return notFound();

  return redirect(item.url);
}
