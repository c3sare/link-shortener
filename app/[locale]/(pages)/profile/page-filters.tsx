"use client";

import { ArrowUpDownIcon, SettingsIcon } from "lucide-react";

import type { getUserLabels } from "@/actions/links/getUserLabels";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";

import { AddLabelForm } from "./add-label-form";
import { LabelListElement } from "./label-list-element";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";

type Props = {
  labels: Awaited<ReturnType<typeof getUserLabels>>;
};

export const PageFilters = ({ labels }: Props) => {
  const t = useTranslations();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleOrder = () => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("o") || params.get("o") === "asc") params.set("o", "desc");
    else params.set("o", "asc");

    router.push(`${pathname}?${params.toString()}`);
  };

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) params.set("s", e.target.value);
      else params.delete("s");

      router.push(`${pathname}?${params.toString()}`);
    }, 300);
  };

  const options = labels.map((label) => ({
    label: label.label,
    value: label.id.toString(),
  }));

  const values = searchParams.getAll("l");

  return (
    <div className="w-full flex gap-2 flex-col">
      <div className="flex gap-2 items-center">
        <Input
          defaultValue={searchParams.get("s") ?? ""}
          placeholder={`${t("search")}...`}
          onChange={onChangeSearchValue}
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        <MultiSelect
          placeholder={`${t("labels")}...`}
          options={options}
          defaultValue={searchParams.getAll("l")}
          onValueChange={(newValues) => {
            const params = new URLSearchParams(searchParams);
            if (newValues.length === 0) params.delete("l");

            const findItem = newValues.find(
              (item) => !values.map((item) => item).includes(item),
            );

            if (findItem)
              if (params.getAll("l").length === 0) params.set("l", findItem);
              else params.append("l", findItem);

            const findItemDelete = values.find(
              (item) => !newValues.map((item) => item).includes(item),
            );

            if (findItemDelete) params.delete("l", findItemDelete);

            router.push(`${pathname}?${params.toString()}`);
          }}
        />
        <Button size="icon" onClick={handleToggleOrder}>
          <ArrowUpDownIcon />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="aspect-square px-1">
              <SettingsIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("labels")}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-2 w-full [&>div:not(:last-child)]:border-b border-muted-foreground">
              {labels.length > 0 ? (
                labels.map((label) => (
                  <LabelListElement key={label.id} label={label} />
                ))
              ) : (
                <span className="text-muted-foreground text-sm">
                  {t("no_labels")}...
                </span>
              )}
            </div>
            <Separator />
            <AddLabelForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
