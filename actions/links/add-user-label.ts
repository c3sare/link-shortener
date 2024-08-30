"use server";

import { z } from "zod";
import { authAction } from "../safe-action";
import { db } from "@/drizzle";
import * as s from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export const addUserLabel = authAction
  .schema(
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
          userId: userId!,
        })
        .returning();

      revalidatePath("/profile");
      revalidatePath("/[locale]/profile", "page");

      return mutation;
    },
  );
