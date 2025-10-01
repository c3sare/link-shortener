"use server";

import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod/mini";
import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema";
import { authAction } from "../safe-action";

export const addChangePasscode = authAction
  .inputSchema(
    z.object({
      linkId: z.string(),
      passcode: z.string().check(z.length(6)),
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
          and(eq(schema.links.id, linkId), eq(schema.links.userId, userId)),
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
