"use server";

import { z } from "zod";
import { action } from "../safe-action";
import bcrypt from "bcrypt-edge";
import { db } from "@/drizzle";
import { redirect } from "next/navigation";
import { registerRedirect } from "./register-redirect";

export const confirmLinkPasscode = action
  .schema(
    z.object({
      passcode: z.string().length(6),
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { passcode, id } }) => {
    const link = await db.query.links.findFirst({
      where: (links, { eq }) => eq(links.id, id),
    });

    if (!link || link.passcode === null) throw new Error("Link not found");

    if (!bcrypt.compareSync(passcode, link.passcode)) return { isValid: false };

    await registerRedirect(link.id);

    return redirect(link.url);
  });
