import { addUserLabel } from "@/actions/links/add-user-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";

export const AddLabelForm = () => {
  const form = useZodForm({
    schema: z.object({
      label: z.string().min(1),
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
        placeholder="New label"
        className="flex-1"
      />
      <Button disabled={form.isLoading} type="submit">
        Add
      </Button>
    </form>
  );
};
