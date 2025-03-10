"use server";

import { db } from "@/drizzle";
import * as s from "@/drizzle/schema";
import { authAction } from "../safe-action";
import * as v from "valibot";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const schema = v.object({
  linkId: v.string(),
  labelId: v.pipe(v.number(), v.minValue(1)),
  value: v.boolean(),
});

export const addLabelToLink = authAction
  .schema(schema)
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
