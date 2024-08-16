"use server";

import { signIn } from "@/auth";
import { getCurrentLocale } from "@/locales/server";

export const signInWithGithub = async () => {
  const currentLocale = getCurrentLocale();

  await signIn("github", {
    redirectTo: `/${currentLocale}/`,
  });
};
