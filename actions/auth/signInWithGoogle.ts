"use server";

import { signIn } from "@/auth";
import { getCurrentLocale } from "@/locales/server";

export const signInWithGoogle = async () => {
  const currentLocale = getCurrentLocale();

  await signIn("google", {
    redirectTo: `/${currentLocale}/`,
  });
};
