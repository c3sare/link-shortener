import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CopyIcon } from "@radix-ui/react-icons";
import { RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
    url: string;
    clearUrl: () => void;
}

export const ReadyLinkInput = ({ url, clearUrl }: Props) => {
    const [isVisibleTooltip, setIsVisibleTooltip] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex gap-2 items-end flex-wrap md:flex-nowrap">
            <Input
                onFocus={() => {
                    inputRef.current!.select();
                    inputRef.current!.setSelectionRange(0, url.length);
                }}
                ref={inputRef}
                value={url}
            />
            <div className="flex gap-2 w-full md:w-auto">
                <TooltipProvider>
                    <Tooltip open={isVisibleTooltip}>
                        <TooltipTrigger asChild>
                            <Button
                                className="w-1/2 md:w-auto"
                                onClick={() => {
                                    setIsVisibleTooltip(true);
                                    setTimeout(() => setIsVisibleTooltip(false), 1000);
                                    inputRef.current!.select();
                                    inputRef.current!.setSelectionRange(0, url.length);
                                    navigator.clipboard.writeText(url);
                                }}
                            >
                                <CopyIcon className="w-4 h-4 mr-2" />
                                Copy
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Coppied to clipboard!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button variant="secondary" className="w-1/2 md:w-auto" onClick={clearUrl}><RefreshCw className="w-4 h-4 mr-2" /> New</Button>
            </div>
        </div>
    )
}