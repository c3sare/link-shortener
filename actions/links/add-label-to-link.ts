"use server";

import { db } from "@/drizzle";
import * as s from "@/drizzle/schema";
import { authAction } from "../safe-action";
import { z } from "zod/v4-mini";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = z.object({
  linkId: z.string(),
  labelId: z.number().check(z.minimum(1)),
  value: z.boolean(),
});

export const addLabelToLink = authAction
  .inputSchema(schema)
  .action(async ({ parsedInput: { linkId, labelId, value } }) => {
    if (value) {
      const addItem = await db
        .insert(s.labelsLinks)
        .values({
          linkId,
          labelId,
        })
        .returning();

      revalidatePath("/[locale]/profile", "page");
      revalidatePath("/profile", "page");

      return addItem;
    } else {
      const deleteItem = await db
        .delete(s.labelsLinks)
        .where(
          and(
            eq(s.labelsLinks.linkId, linkId),
            eq(s.labelsLinks.labelId, labelId),
          ),
        )
        .returning();

      revalidatePath("/[locale]/profile", "page");
      revalidatePath("/profile", "page");

      return deleteItem;
    }
  });
