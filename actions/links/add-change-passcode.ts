"use server";

import * as v from "valibot";
import { authAction } from "../safe-action";
import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addChangePasscode = authAction
  .schema(
    v.object({
      linkId: v.string(),
      passcode: v.pipe(v.string(), v.length(6)),
    }),
  )
  .action(
    async ({
      parsedInput: { linkId, passcode },
      ctx: {
        session: { id: userId },
      },
    }) => {
      const passcodeHash = bcrypt.hashSync(passcode, 10);

      const result = await db
        .update(schema.links)
        .set({
          passcode: passcodeHash,
        })
        .where(
          and(eq(schema.links.id, linkId), eq(schema.links.userId, userId!)),
        );

      if (result.rowCount !== 1)
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
