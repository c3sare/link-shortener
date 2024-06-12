import { auth } from "@/auth";
import { db } from "@/drizzle";

export const getUserLinks = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const items = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, userId),
  });

  return items;
};
