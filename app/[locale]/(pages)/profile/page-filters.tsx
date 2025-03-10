"use client";

import { SettingsIcon } from "lucide-react";

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
import MultipleSelector from "@/components/ui/multiple-selector";
import { Separator } from "@/components/ui/separator";

import { AddLabelForm } from "./add-label-form";
import { LabelListElement } from "./label-list-element";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

type Props = {
  labels: Awaited<ReturnType<typeof getUserLabels>>;
};

export const PageFilters = ({ labels }: Props) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const values = options.filter((item) =>
    searchParams.getAll("l").includes(item.value),
  );

  return (
    <div className="w-full flex gap-2 flex-col">
      <div className="flex gap-2 items-center">
        <Input
          defaultValue={searchParams.get("s") ?? ""}
          placeholder="Search"
          onChange={onChangeSearchValue}
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        <MultipleSelector
          placeholder="labels..."
          commandProps={{ className: "flex-1" }}
          defaultOptions={options}
          value={values}
          onChange={(newValues) => {
            const params = new URLSearchParams(searchParams);
            if (newValues.length === 0) params.delete("l");

            const findItem = newValues.find(
              (item) => !values.map((item) => item.value).includes(item.value),
            );

            if (findItem)
              if (params.getAll("l").length === 0)
                params.set("l", findItem.value);
              else params.append("l", findItem.value);

            const findItemDelete = values.find(
              (item) =>
                !newValues.map((item) => item.value).includes(item.value),
            );

            if (findItemDelete) params.delete("l", findItemDelete.value);

            router.push(`${pathname}?${params.toString()}`);
          }}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="aspect-square px-1">
              <SettingsIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Labels</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-2 w-full [&>div:not(:last-child)]:border-b border-muted-foreground">
              {labels.length > 0 ? (
                labels.map((label) => (
                  <LabelListElement key={label.id} label={label} />
                ))
              ) : (
                <span className="text-muted-foreground text-sm">
                  No labels created yet...
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
