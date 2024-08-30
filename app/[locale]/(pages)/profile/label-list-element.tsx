import type { getUserLabels } from "@/actions/links/getUserLabels";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  label: Awaited<ReturnType<typeof getUserLabels>>[number];
};

export const LabelListElement = ({ label }: Props) => {
  return (
    <div
      key={label.id}
      className="flex gap-2 w-full justify-between items-center py-1"
    >
      <span>{label.label}</span>
      <div>
        <Button variant="destructive" size="sm">
          <TrashIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
