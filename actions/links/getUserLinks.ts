import { auth } from "@/auth";
import { db } from "@/drizzle";
import { SQL, asc, desc, like } from "drizzle-orm";
import { links } from "@/drizzle/schema";

export const getUserLinks = async (
  search: string = "",
  labelIds: string[],
  order: string = "asc",
) => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const orderBy: Record<string, SQL<unknown>> = {
    asc: asc(links.createdAt),
    desc: desc(links.createdAt),
  };

  const items = await db.query.links.findMany({
    where: (links, { eq, and, or }) =>
      and(
        eq(links.userId, userId),
        or(
          like(links.title, `%${search}%`),
          like(links.description, `%${search}%`),
        ),
      ),
    orderBy: orderBy?.[order] ?? orderBy.asc,
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
