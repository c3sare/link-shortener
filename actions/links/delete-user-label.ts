"use server";

import { db } from "@/drizzle";
import { authAction } from "../safe-action";
import * as v from "valibot";
import * as s from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteUserLabel = authAction
  .schema(v.pipe(v.number(), v.minValue(1)))
  .action(async ({ parsedInput: labelId, ctx: { session } }) => {
    const deletedItem = await db
      .delete(s.labels)
      .where(and(eq(s.labels.id, labelId), eq(s.labels.userId, session.id!)))
      .returning();

    revalidatePath("/profile", "page");
    revalidatePath("/[locale]/profile", "page");

    return deletedItem;
  });
