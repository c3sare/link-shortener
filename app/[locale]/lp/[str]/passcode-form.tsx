"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { confirmLinkPasscode } from "@/actions/links/confirmLinkPasscode";

type Props = {
  id: string;
};

export const PasscodeForm = ({ id }: Props) => {
  const { toast } = useToast();
  const t = useTranslations();
  const form = useZodForm({
    schema: z.object({
      passcode: z.string().length(6),
    }),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await confirmLinkPasscode({
      passcode: data.passcode,
      id,
    });

    if (response?.data?.isValid === false)
      return toast({
        title: t("invalid_passcode"),
        variant: "destructive",
      });
  });

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={onSubmit}
    >
      <h1>{t("enter_passcode")}</h1>
      <Controller
        name="passcode"
        control={form.control}
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
      <Button type="submit">{t("confirm")}</Button>
    </form>
  );
};
