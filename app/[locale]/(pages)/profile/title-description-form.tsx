"use client";

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
import { useState } from "react";
import { z } from "zod";

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
  const [open, setOpen] = useState<boolean>(false);
  const form = useZodForm({
    schema: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
    },
  });

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
      onOpenChange={(value) => (form.isLoading ? null : setOpen(value))}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader className="mb-4">
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Change title and description of the link
          </DialogDescription>
        </DialogHeader>
        <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <Label className="flex flex-col gap-2">
            Title
            <Input
              {...form.register("title")}
              disabled={form.isLoading}
              className="w-full"
            />
          </Label>
          <Label className="flex flex-col gap-2">
            Description
            <Textarea
              {...form.register("description")}
              disabled={form.isLoading}
              className="w-full resize-none"
            />
          </Label>
          <Button disabled={form.isLoading} type="submit" className="w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
