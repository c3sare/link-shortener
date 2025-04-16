"use client";

import { addLabelToLink } from "@/actions/links/add-label-to-link";
import { getUserLabels } from "@/actions/links/getUserLabels";
import { getUserLinks } from "@/actions/links/getUserLinks";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

type Props = {
  item: Awaited<ReturnType<typeof getUserLinks>>[number];
  labels: Awaited<ReturnType<typeof getUserLabels>>;
};

export const ItemLabels = ({ item, labels }: Props) => {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-gray-100/10 cursor-pointer rounded-sm p-1 text-xs space-x-2">
          {item.labels.length > 0 ? (
            item.labels.map((label) => (
              <Badge key={label.id}>{label.label}</Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">
              {t("no_labels")}...
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start">
        <DropdownMenuLabel>{t("labels")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {labels.map((label) => (
          <DropdownMenuCheckboxItem
            key={label.id}
            checked={item.labels.some((labelx) => label.id === labelx.id)}
            onCheckedChange={async (value) => {
              await addLabelToLink({
                labelId: label.id,
                linkId: item.id,
                value: !!value,
              });
            }}
          >
            {label.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
