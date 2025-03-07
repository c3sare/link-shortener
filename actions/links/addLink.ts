"use server";

import { action } from "../safe-action";
import { auth } from "@/auth";
import { db } from "@/drizzle";
import { links } from "@/drizzle/schema";
import { getBaseUrl } from "@/lib/utils";
import { nanoid } from "nanoid";
import { count } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as v from "valibot";

export const addLink = action
	.schema(
		v.object({
			url: v.pipe(v.string(), v.url()),
			passcode: v.nullable(v.optional(v.pipe(v.string(), v.length(6)))),
		}),
	)
	.action(async ({ parsedInput: { url, passcode } }) => {
		const session = await auth();

		const [{ count: linkCount }] = await db
			.select({ count: count() })
			.from(links);

		const spaces = Math.ceil(linkCount / 100000);

		let searchMore = false;

		const hashedPasscode = passcode ? bcrypt.hashSync(passcode, 10) : null;

		do {
			try {
				const item = await db
					.insert(links)
					.values({
						id: nanoid(2 + spaces),
						url,
						userId: session?.user?.id ?? null,
						passcode: hashedPasscode,
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
