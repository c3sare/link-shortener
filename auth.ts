import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [google, github],
});
