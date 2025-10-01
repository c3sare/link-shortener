"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod/mini";
import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema";
import { authAction } from "../safe-action";

export const deleteLinkPasscode = authAction
  .inputSchema(z.object({ linkId: z.string() }))
  .action(
    async ({
      parsedInput: { linkId },
      ctx: {
        session: { id: userId },
      },
    }) => {
      const result = await db
        .update(schema.links)
        .set({
          passcode: null,
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
