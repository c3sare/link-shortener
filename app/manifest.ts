import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "../i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
  });

  return {
    name: t("title"),
    start_url: "/",
    theme_color: "#101E33",
  };
}
