import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import lz from "lzutf8";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { str } }: { params: { str: string } }
) {
  const items = await db
    .update(links)
    .set({
      redirects: sql`${links.redirects} + 1`,
    })
    .where(eq(links.id, str))
    .returning();

  const item = items.at(0);

  if (!item) return notFound();

  const url = lz.decompress(lz.decodeBase64(item.compressedUrl));

  return redirect(url);
}
