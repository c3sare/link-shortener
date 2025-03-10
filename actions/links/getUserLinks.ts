import { auth } from "@/auth";
import { db } from "@/drizzle";
import { like } from "drizzle-orm";

export const getUserLinks = async (search: string = "", labelIds: string[]) => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const items = await db.query.links.findMany({
    where: (links, { eq, and, or }) =>
      and(
        eq(links.userId, userId),
        or(
          like(links.title, `%${search}%`),
          like(links.description, `%${search}%`),
        ),
      ),
    orderBy: (links, { desc }) => desc(links.createdAt),
    with: {
      redirects: true,
      labelLinks: {
        columns: {},
        with: {
          label: true,
        },
      },
    },
  });

  return labelIds.length === 0
    ? items
    : items.filter((item) =>
        item.labelLinks.some((labelLink) =>
          labelIds.includes(labelLink.label.id.toString()),
        ),
      );
};
