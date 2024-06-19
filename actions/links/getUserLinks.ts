import { auth } from "@/auth";
import { db } from "@/drizzle";
import { links, redirects } from "@/drizzle/schema";
import { count, desc, eq } from "drizzle-orm";

export const getUserLinks = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const items = await db
    .select({
      id: links.id,
      url: links.url,
      redirects: count(redirects.id),
      createdAt: links.createdAt,
    })
    .from(links)
    .leftJoin(redirects, eq(links.id, redirects.linkId))
    .where(eq(links.userId, userId))
    .groupBy(links.id)
    .orderBy(desc(links.createdAt));

  return items;
};
