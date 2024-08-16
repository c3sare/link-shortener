"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
  className?: string;
};

export const CopyInput = ({ value, className }: Props) => {
  const t = useTranslations();
  const [isVisibleTooltip, setIsVisibleTooltip] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    setIsVisibleTooltip(true);
    setTimeout(() => setIsVisibleTooltip(false), 1000);
    inputRef.current!.select();
    inputRef.current!.setSelectionRange(0, value.length);
    navigator.clipboard.writeText(value);
  };

  return (
    <div
      className={cn(
        "relative flex-1 border border-primary rounded-lg",
        className
      )}
    >
      <Input
        value={value}
        className="flex-1 pr-11"
        onFocus={() => {
          inputRef.current!.select();
          inputRef.current!.setSelectionRange(0, value.length);
        }}
        ref={inputRef}
        readOnly
      />
      <TooltipProvider>
        <Tooltip open={isVisibleTooltip}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopy}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none w-11"
            >
              <CopyIcon className="size-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("coppied")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
