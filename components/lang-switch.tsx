"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "@/navigation";

const locales = {
  pl: "Polski",
  en: "English",
};

const localeKeys = Object.keys(locales) as (keyof typeof locales)[];

export const LangSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const currentLocale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1">
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {localeKeys.map((locale) => (
          <DropdownMenuCheckboxItem
            key={locale}
            checked={locale === currentLocale}
            onClick={() => router.push(pathname, { locale })}
          >
            {locales[locale]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
