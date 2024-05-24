"use server";

import { z } from "zod";
import { action } from "../safe-action";
import { auth } from "@/auth";
import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import lz from "lzutf8";
import { encodeNumber, getBaseUrl } from "@/lib/utils";

const schema = z.object({
  url: z.string().url(),
});

export const addLink = action(schema, async ({ url }) => {
  const session = await auth();

  const compressedUrl = lz.encodeBase64(lz.compress(url));

  const item = await db
    .insert(links)
    .values({
      compressedUrl,
      userId: session?.user?.id ?? null,
    })
    .returning();

  const link = item.at(0);

  if (!link) throw new Error("Can't insert link!");

  const codedUrl = encodeNumber(link.id);

  return { shorterUrl: getBaseUrl() + "/l/" + codedUrl };
});
