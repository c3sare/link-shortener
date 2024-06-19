import { Button } from "@/components/ui/button";
import { CopyInput } from "@/components/ui/copy-input";
import { RefreshCw } from "lucide-react";

type Props = {
  url: string;
  clearUrl: () => void;
};

export const ReadyLinkInput = ({ url, clearUrl }: Props) => {
  return (
    <div className="flex gap-2 items-end flex-wrap flex-col md:flex-row md:flex-nowrap">
      <CopyInput value={url} className="w-full" />
      <Button
        variant="secondary"
        className="w-full mx-auto md:w-auto text-xs"
        onClick={clearUrl}
      >
        <RefreshCw className="w-4 h-4 mr-1" /> Create new short link
      </Button>
    </div>
  );
};
