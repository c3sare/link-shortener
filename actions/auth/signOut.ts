"use server";
import { signOut as signOutNextAuth } from "@/auth";

export const signOut = async () => {
	await signOutNextAuth({ redirectTo: "/" });
};
