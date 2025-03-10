import * as v from "valibot";

import { addUserLabel } from "@/actions/links/add-user-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValibotForm } from "@/hooks/useValibotForm";
import { useTranslations } from "next-intl";

export const AddLabelForm = () => {
  const t = useTranslations();
  const form = useValibotForm({
    schema: v.object({
      label: v.pipe(v.string(), v.minLength(1)),
    }),
    defaultValues: {
      label: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await addUserLabel(data);
    form.reset();
  });

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input
        {...form.register("label")}
        disabled={form.isLoading}
        placeholder={t("new_label") + "..."}
        className="flex-1"
      />
      <Button disabled={form.isLoading} type="submit">
        {t("add")}
      </Button>
    </form>
  );
};
