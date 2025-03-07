import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		id: string;
	}

	interface Session {
		user?: User & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
	}
}
