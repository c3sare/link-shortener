import { useTranslations } from "next-intl";
import { z } from "zod/mini";
import { addUserLabel } from "@/actions/links/add-user-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/useZodForm";

export const AddLabelForm = () => {
  const t = useTranslations();
  const form = useZodForm({
    schema: z.object({
      label: z.string().check(z.minLength(1)),
    }),
    defaultValues: {
      label: "",
    },
  });

  const { isLoading, isSubmitting } = form.formState;

  const disabled = isLoading || isSubmitting;

  const onSubmit = form.handleSubmit(async (data) => {
    await addUserLabel(data);
    form.reset();
  });

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input
        {...form.register("label")}
        disabled={disabled}
        placeholder={`${t("new_label")}...`}
        className="flex-1"
      />
      <Button disabled={form.disabledSubmit} type="submit">
        {t("add")}
      </Button>
    </form>
  );
};
