"use server";

import { z } from "zod";
import { action } from "../safe-action";
import { auth } from "@/auth";
import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import { getBaseUrl } from "@/lib/utils";
import { nanoid } from "nanoid";
import { count } from "drizzle-orm";

export const addLink = action
  .schema(
    z.object({
      url: z.string().url(),
    })
  )
  .action(async ({ parsedInput: { url } }) => {
    const session = await auth();

    const [{ count: linkCount }] = await db
      .select({ count: count() })
      .from(links);

    const spaces = Math.ceil(linkCount / 100000);

    let searchMore = false;

    do {
      try {
        const item = await db
          .insert(links)
          .values({
            id: nanoid(2 + spaces),
            url,
            userId: session?.user?.id ?? null,
          })
          .returning();

        const link = item.at(0);

        if (!link) throw new Error("Can't insert link!");

        return { shorterUrl: getBaseUrl() + "/l/" + link.id };
      } catch {
        searchMore = true;
      }
    } while (searchMore);
  });
