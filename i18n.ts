import { getRequestConfig } from "next-intl/server";

export type Locale = (typeof locales)[number];

export const locales = ["en", "pl"] as const;
export const defaultLocale: Locale = "en";

export const localeName = {
  pl: "Polski",
  en: "English",
};

import { getUserLocale } from "@/actions/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
