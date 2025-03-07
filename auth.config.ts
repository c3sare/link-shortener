import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";

import { db } from "./drizzle";

export const authConfig = {
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id as string;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token.id) {
				session.user.id = token.id as unknown as string;
			}
			return session;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
