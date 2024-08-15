"use client";

import { startTransition } from "react";
import { DropdownMenuCheckboxItem } from "./ui/dropdown-menu";
import { setUserLocale } from "@/actions/locale";
import { Locale, localeName } from "@/i18n";

type Props = {
  locale: Locale;
  currentLocale: string;
};

export const DropdownMenuSetLocale = ({ locale, currentLocale }: Props) => {
  return (
    <DropdownMenuCheckboxItem
      checked={locale === currentLocale}
      onClick={() => startTransition(() => setUserLocale(locale))}
    >
      {localeName[locale]}
    </DropdownMenuCheckboxItem>
  );
};
