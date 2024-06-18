import { Button } from "@/components/ui/button";
import { CopyInput } from "@/components/ui/copy-input";
import { RefreshCw } from "lucide-react";

type Props = {
  url: string;
  clearUrl: () => void;
};

export const ReadyLinkInput = ({ url, clearUrl }: Props) => {
  return (
    <div className="flex gap-2 items-end flex-wrap md:flex-nowrap">
      <CopyInput value={url} />
      <Button
        variant="secondary"
        className="w-1/2 md:w-auto"
        onClick={clearUrl}
      >
        <RefreshCw className="w-4 h-4 mr-2" /> New
      </Button>
    </div>
  );
};
