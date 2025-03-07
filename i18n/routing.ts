import { defineRouting } from "next-intl/routing";

export const locales = ["en", "pl"] as const;

export const routing = defineRouting({
	locales,

	defaultLocale: locales[0],
});
