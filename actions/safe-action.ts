import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/auth";

export const action = createSafeActionClient();

export const authAction = action.use(async (req) => {
  const session = await auth();

  if (!session?.user || !session.user.id)
    throw new Error("User is not logged in");

  return req.next({ ctx: { session: session.user } });
});
