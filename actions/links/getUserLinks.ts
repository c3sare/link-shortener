import { auth } from "@/auth";
import { db } from "@/drizzle";

export const getUserLinks = async (
  search: string = "",
  labelIds: string[],
  order: string = "asc"
) => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const items = await db.query.links.findMany({
    where: {
      userId,
      OR: [
        {
          title: {
            like: `%${search}%`,
          },
        },
        {
          description: {
            like: `%${search}%`,
          },
        },
      ],
    },
    orderBy: {
      createdAt: order === "asc" ? "asc" : "desc",
    },
    with: {
      redirects: true,
      labels: true,
    },
  });

  return labelIds.length === 0
    ? items
    : items.filter((item) =>
        item.labels.some((label) => labelIds.includes(label.id.toString()))
      );
};
