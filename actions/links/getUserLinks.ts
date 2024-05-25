import { db } from "@/drizzle";

export const getLinksByUserId = async (userId: string) => {
  const items = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, userId),
  });

  return items;
};
