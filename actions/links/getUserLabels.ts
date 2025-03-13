import { auth } from "@/auth";
import { db } from "@/drizzle";

export const getUserLabels = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return [];

  const labels = await db.query.labels.findMany({
    where: {
      userId,
    },
  });

  return labels;
};
