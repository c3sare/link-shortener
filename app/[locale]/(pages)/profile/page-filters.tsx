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

type Props = {
  labels: Awaited<ReturnType<typeof getUserLabels>>;
};

export const PageFilters = ({ labels }: Props) => {
  const options = labels.map((label) => ({
    label: label.label,
    value: label.id.toString(),
  }));

  return (
    <div className="w-full flex gap-2 flex-col">
      <div className="flex gap-2 items-center">
        <Input placeholder="Search" className="flex-1" />
      </div>
      <div className="flex gap-2">
        <MultipleSelector
          commandProps={{ className: "flex-1" }}
          defaultOptions={options}
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
