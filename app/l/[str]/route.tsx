import { db } from "@/drizzle";
import { links, redirects } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { str } }: { params: { str: string } }
) {
  const item = await db.query.links.findFirst({
    where: eq(links.id, str),
  })

  if (!item) return notFound();

  const ip = headers().get("x-forwarded-for");
  const country = headers().get("x-vercel-ip-country");
  const city = headers().get("x-vercel-ip-city");
  const continent = headers().get("x-vercel-ip-continent");
  const latitude = headers().get("x-vercel-ip-latitude");
  const timezone = headers().get("x-vercel-ip-timezone");

  await db.insert(redirects).values({
    linkId: item.id,
    ip,
    country,
    city,
    continent,
    latitude,
    timezone,
  })

  return redirect(item.url);
}
