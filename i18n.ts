import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "pl"] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.some((item) => item === locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
