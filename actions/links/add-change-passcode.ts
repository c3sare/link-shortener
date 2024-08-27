"use server";

import { z } from "zod";
import { authAction } from "../safe-action";
import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema";
import bcrypt from "bcrypt-edge";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addChangePasscode = authAction
  .schema(
    z.object({
      linkId: z.string(),
      passcode: z.string().length(6),
    })
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
          and(eq(schema.links.id, linkId), eq(schema.links.userId, userId!))
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
    }
  );
