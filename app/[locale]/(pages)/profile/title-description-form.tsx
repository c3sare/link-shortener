"use client";

import { useState } from "react";
import { z } from "zod/mini";

import { updateTitleDesc } from "@/actions/links/update-title-desc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useZodForm } from "@/hooks/useZodForm";
import { useTranslations } from "next-intl";

type Props = {
  children: React.ReactNode;
  title: string | null;
  description: string | null;
  linkId: string;
};

export const TitleDescriptionForm = ({
  children,
  title,
  description,
  linkId,
}: Props) => {
  const t = useTranslations();
  const [open, setOpen] = useState<boolean>(false);
  const form = useZodForm({
    schema: z.object({
      title: z.optional(z.string()),
      description: z.optional(z.string()),
    }),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
    },
  });

  const { isLoading, isSubmitting } = form.formState;

  const disabled = isLoading || isSubmitting;

  const onSubmit = form.handleSubmit(async (data) => {
    await updateTitleDesc({
      linkId,
      ...data,
    });

    setOpen(false);
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => (isSubmitting ? null : setOpen(value))}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader className="mb-4">
          <DialogTitle>{t("edit")}</DialogTitle>
          <DialogDescription>
            {t("change_title_and_description_link")}
          </DialogDescription>
        </DialogHeader>
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <Label className="flex flex-col gap-2">
            {t("title")}
            <Input
              {...form.register("title")}
              disabled={disabled}
              className="w-full"
            />
          </Label>
          <Label className="flex flex-col gap-2">
            {t("description")}
            <Textarea
              {...form.register("description")}
              disabled={disabled}
              className="w-full resize-none"
            />
          </Label>
          <Button
            disabled={form.disabledSubmit}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? t("loading") + "..." : t("save")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
