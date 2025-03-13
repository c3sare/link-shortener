"use server";

import * as v from "valibot";
import { action } from "../safe-action";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle";
import { redirect } from "next/navigation";
import { registerRedirect } from "./register-redirect";

export const confirmLinkPasscode = action
  .schema(
    v.object({
      passcode: v.pipe(v.string(), v.length(6)),
      id: v.string(),
    }),
  )
  .action(async ({ parsedInput: { passcode, id } }) => {
    const link = await db.query.links.findFirst({
      where: {
        id,
      },
    });

    if (!link || link.passcode === null) throw new Error("Link not found");

    if (!bcrypt.compareSync(passcode, link.passcode)) return { isValid: false };

    await registerRedirect(link.id);

    return redirect(link.url);
  });
