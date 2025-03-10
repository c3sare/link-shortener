import { createSafeActionClient } from "next-safe-action";
import { valibotAdapter } from "next-safe-action/adapters/valibot";
import { auth } from "@/auth";

export const action = createSafeActionClient({
  validationAdapter: valibotAdapter(),
});

export const authAction = action.use(async (req) => {
  const session = await auth();

  if (!session?.user || !session.user.id)
    throw new Error("User is not logged in");

  return req.next({ ctx: { session: session.user } });
});
