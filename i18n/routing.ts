import { defineRouting } from "next-intl/routing";

export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,

  defaultLocale: locales[0],
});
