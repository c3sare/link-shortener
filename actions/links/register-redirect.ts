import { db } from "@/drizzle";
import { headers } from "next/headers";
import * as schema from "@/drizzle/schema";

export const registerRedirect = async (linkId: string) => {
	const header = await headers();

	const ip = header.get("x-forwarded-for");
	const country = header.get("x-vercel-ip-country");
	const city = header.get("x-vercel-ip-city");
	const continent = header.get("x-vercel-ip-continent");
	const latitude = header.get("x-vercel-ip-latitude");
	const timezone = header.get("x-vercel-ip-timezone");

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
