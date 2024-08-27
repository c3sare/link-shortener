"use server";

import { z } from "zod";
import { authAction } from "../safe-action";
import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteLink = authAction
  .schema(z.object({ linkId: z.string() }))
  .action(
    async ({
      parsedInput: { linkId },
      ctx: {
        session: { id: userId },
      },
    }) => {
      const result = await db
        .delete(schema.links)
        .where(
          and(eq(schema.links.id, linkId), eq(schema.links.userId, userId!))
        );

      if (result.rowCount !== 1)
        return {
          success: false,
        };

      revalidatePath("/profile");

      return {
        success: true,
      };
    }
  );
