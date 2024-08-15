import { getTranslations } from "next-intl/server";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";
import { DropdownMenuSetLocale } from "./dropdown-menu-set-locale";
import { getUserLocale } from "@/actions/locale";

const locales = {
  pl: "Polski",
  en: "English",
};

const localeKeys = Object.keys(locales) as (keyof typeof locales)[];

export const LangSwitch = async () => {
  const currentLocale = await getUserLocale();
  const t = await getTranslations();

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
          <DropdownMenuSetLocale
            locale={locale}
            currentLocale={currentLocale}
            key={locale}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
