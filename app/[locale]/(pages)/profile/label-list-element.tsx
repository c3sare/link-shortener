import { TrashIcon } from "lucide-react";

import type { getUserLabels } from "@/actions/links/getUserLabels";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { deleteUserLabel } from "@/actions/links/delete-user-label";
import { useTranslations } from "next-intl";

type Props = {
  label: Awaited<ReturnType<typeof getUserLabels>>[number];
};

export const LabelListElement = ({ label }: Props) => {
  const t = useTranslations();
  const handleDeleteItem = useCallback(
    async () => await deleteUserLabel(label.id),
    [label.id],
  );

  return (
    <div
      key={label.id}
      className="flex gap-2 w-full justify-between items-center py-1"
    >
      <span>{label.label}</span>
      <div>
        <Button variant="destructive" size="sm" onClick={handleDeleteItem}>
          <TrashIcon className="size-4" />
          <span className="sr-only">{t("delete_label")}</span>
        </Button>
      </div>
    </div>
  );
};
