"use server";

import { z } from "zod/v4-mini";
import { action } from "../safe-action";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle";
import { redirect } from "next/navigation";
import { registerRedirect } from "./register-redirect";

export const confirmLinkPasscode = action
  .inputSchema(
    z.object({
      passcode: z.string().check(z.length(6)),
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput: { passcode, id } }) => {
    const link = await db.query.links.findFirst({
      where: (link, { eq }) => eq(link.id, id),
    });

    if (!link || link.passcode === null) throw new Error("Link not found");

    if (!bcrypt.compareSync(passcode, link.passcode)) return { isValid: false };

    await registerRedirect(link.id);

    return redirect(link.url);
  });
