"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod/mini";

import { addChangePasscode } from "@/actions/links/add-change-passcode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useZodForm } from "@/hooks/useZodForm";

type Props = {
  havePasscode: boolean;
  linkId: string;
};

export const AddChangePasscodeForm = ({ havePasscode, linkId }: Props) => {
  const [open, setIsOpen] = useState(false);
  const t = useTranslations();
  const form = useZodForm({
    schema: z.object({
      passcode: z.string().check(z.length(6)),
    }),
  });

  const { isLoading, isSubmitting } = form.formState;

  const disabled = isLoading || isSubmitting;

  const onSubmit = form.handleSubmit(async (data) => {
    await addChangePasscode({
      linkId,
      passcode: data.passcode,
    });

    setIsOpen(false);
    form.setValue("passcode", "");
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isSubmitting) return;
        setIsOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          {havePasscode ? t("change_passcode") : t("add_passcode")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {havePasscode ? t("change_passcode") : t("add_passcode")}
          </DialogTitle>
          <DialogDescription>{havePasscode ? "" : ""}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex items-center justify-center">
            <Controller
              name="passcode"
              control={form.control}
              disabled={disabled}
              render={({ field }) => (
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>
          <Button disabled={form.disabledSubmit} type="submit">
            {isSubmitting ? t("loading") + "..." : t("confirm")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
