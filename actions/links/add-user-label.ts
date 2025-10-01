"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod/mini";
import { db } from "@/drizzle";
import * as s from "@/drizzle/schema";
import { authAction } from "../safe-action";

export const addUserLabel = authAction
  .inputSchema(
    z.object({
      label: z.string(),
    }),
  )
  .action(
    async ({
      parsedInput: { label },
      ctx: {
        session: { id: userId },
      },
    }) => {
      const mutation = await db
        .insert(s.labels)
        .values({
          label,
          userId,
        })
        .returning();

      revalidatePath("/profile");
      revalidatePath("/[locale]/profile", "page");

      return mutation;
    },
  );
