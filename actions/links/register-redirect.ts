import { db } from "@/drizzle";
import { headers } from "next/headers";
import * as schema from "@/drizzle/schema";

export const registerRedirect = async (linkId: string) => {
  const ip = headers().get("x-forwarded-for");
  const country = headers().get("x-vercel-ip-country");
  const city = headers().get("x-vercel-ip-city");
  const continent = headers().get("x-vercel-ip-continent");
  const latitude = headers().get("x-vercel-ip-latitude");
  const timezone = headers().get("x-vercel-ip-timezone");

  await db.insert(schema.redirects).values({
    linkId,
    ip,
    country,
    city,
    continent,
    latitude,
    timezone,
  });
};
