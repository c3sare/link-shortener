import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import { decodeString } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import lz from "lzutf8";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { str } }: { params: { str: string } }) {
  const id = decodeString(str);

  if (isNaN(id)) return notFound();

  const items = await db
    .update(links)
    .set({
      redirects: sql`${links.redirects} + 1`,
    })
    .where(eq(links.id, id))
    .returning();

  const item = items.at(0);

  if (!item) return notFound();

  const url = lz.decompress(lz.decodeBase64(item.compressedUrl));

  return redirect(url);
}
