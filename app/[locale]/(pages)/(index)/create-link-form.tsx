import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addLink } from "@/actions/links/addLink";
import { Input } from "@/components/ui/input";
import { ReadyLinkInput } from "./ready-link-input";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useZodForm } from "@/hooks/useZodForm";
import { Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const schema = z
  .object({
    url: z.string().url(),
    addPasscode: z.boolean().optional(),
    passcode: z.string().length(6).optional(),
  })
  .refine(
    (data) =>
      (data.addPasscode === true && data.passcode?.length === 6) ||
      !data.addPasscode
  );

const CreateLinkForm = () => {
  const t = useTranslations();
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue, watch, control, isLoading } =
    useZodForm({
      schema,
    });

  const isVisiblePasscode = watch("addPasscode");

  const onSubmit = handleSubmit(async (data) => {
    const response = await addLink({
      url: data.url,
      passcode: data.addPasscode ? data.passcode : null,
    });

    const url = response?.data?.shorterUrl;

    if (url) {
      setValue("url", "");
      setValue("addPasscode", false);
      setValue("passcode", undefined);
      setUrl(url);
    }
  });

  return url ? (
    <ReadyLinkInput clearUrl={() => setUrl(null)} url={url} />
  ) : (
    <form onSubmit={onSubmit} className="flex max-w-full flex-col gap-4">
      <div className="flex gap-2 flex-col sm:flex-row">
        <Input
          {...register("url")}
          placeholder={t("shortener_input_placeholder")}
          disabled={isLoading}
        />
        <Button disabled={isLoading} type="submit">
          {t("shortener_form_submit")}
        </Button>
      </div>
      <Label className="w-full flex items-center gap-2 justify-center">
        <Switch
          checked={isVisiblePasscode ?? false}
          disabled={isLoading}
          onCheckedChange={(val) => setValue("addPasscode", val)}
        />
        {t("link_passcode")}
      </Label>
      {isVisiblePasscode && (
        <div className="flex items-center justify-center">
          <Controller
            name="passcode"
            control={control}
            disabled={isLoading}
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
