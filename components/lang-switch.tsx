"use client";

import { useChangeLocale, useCurrentLocale, useI18n } from "@/locales/client";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";

const locales = {
  pl: "Polski",
  en: "English",
};

const localeKeys = Object.keys(locales) as (keyof typeof locales)[];

export const LangSwitch = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

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
            onClick={() => changeLocale(locale)}
            checked={locale === currentLocale}
          >
            {locales[locale]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
