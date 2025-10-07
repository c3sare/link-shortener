"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod/mini";
import { db } from "@/drizzle";
import * as s from "@/drizzle/schema";
import { authAction } from "../safe-action";

export const updateTitleDesc = authAction
  .inputSchema(
    z.object({
      linkId: z.string(),
      title: z.optional(z.string()),
      description: z.optional(z.string()),
    }),
  )
  .action(
    async ({
      ctx: {
        session: { id: userId },
      },
      parsedInput: { linkId, title, description },
    }) => {
      const result = await db
        .update(s.links)
        .set({
          title: title === "" ? null : title,
          description: description === "" ? null : description,
        })
        .where(and(eq(s.links.id, linkId), eq(s.links.userId, userId)));

      if (result.rowCount === 0)
        return {
          success: false,
        };

      revalidatePath("/[locale]/profile", "page");
      revalidatePath("/profile");

      return {
        success: true,
      };
    },
  );
