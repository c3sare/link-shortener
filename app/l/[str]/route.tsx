import { notFound, redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { registerRedirect } from "@/actions/links/register-redirect";
import { db } from "@/drizzle";

export const runtime = "edge";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ str: string }> },
) {
	const { str } = await params;

	const item = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.id, str),
	});

	if (!item) return notFound();

	if (item.passcode) return redirect(`/lp/${item.id}`);

	await registerRedirect(item.id);

	return redirect(item.url);
}
