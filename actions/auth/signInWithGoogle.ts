"use server";

import { signIn } from "@/auth";

export const signInWithGoogle = async () => {
  await signIn("google");
};
