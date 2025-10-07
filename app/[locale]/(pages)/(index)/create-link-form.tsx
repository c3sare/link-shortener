import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";
import * as z from "zod/mini";

import { addLink } from "@/actions/links/addLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useZodForm } from "@/hooks/useZodForm";

import { ReadyLinkInput } from "./ready-link-input";

const schema = z.pipe(
  z.object({
    url: z.url(),
    addPasscode: z.optional(z.boolean()),
    passcode: z.optional(z.string().check(z.length(6))),
  }),
  z.transform((input) => {
    if (input.addPasscode && input?.passcode?.length !== 6) {
      throw new Error("Passcode must be 6 characters long");
    }
    return input;
  }),
);

const CreateLinkForm = () => {
  const t = useTranslations();
  const [url, setUrl] = useState<string | null>(null);
  const {
    disabledSubmit,
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isLoading, isSubmitting },
  } = useZodForm({
    defaultValues: {
      addPasscode: false,
      passcode: "",
      url: "",
    },
    schema,
  });

  const isVisiblePasscode = watch("addPasscode");

  const disabled = isLoading || isSubmitting;

  const onSubmit = handleSubmit(async (data) => {
    const response = await addLink({
      url: data.url,
      passcode: data.addPasscode ? data.passcode : null,
    });

    const url = response?.data?.shorterUrl;

    if (url) reset();
  });

  return url ? (
    <ReadyLinkInput clearUrl={() => setUrl(null)} url={url} />
  ) : (
    <form onSubmit={onSubmit} className="flex max-w-full flex-col gap-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <Input
          {...register("url")}
          placeholder={t("shortener_input_placeholder")}
          disabled={disabled}
        />
        <Button
          disabled={disabledSubmit}
          type="submit"
          className="w-full sm:w-20"
        >
          {t("shortener_form_submit")}
        </Button>
      </div>
      <Label className="w-full flex items-center gap-2 justify-center">
        <Switch
          checked={isVisiblePasscode ?? false}
          disabled={disabled}
          onCheckedChange={(value) => setValue("addPasscode", value)}
          aria-label="Add passcode"
        />
        {t("link_passcode")}
      </Label>
      {isVisiblePasscode && (
        <div className="flex items-center justify-center">
          <Controller
            name="passcode"
            control={control}
            disabled={disabled}
            render={({ field }) => (
              <InputOTP maxLength={6} {...field} className="max-w-sm mx-auto">
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
      )}
    </form>
  );
};

export default CreateLinkForm;
