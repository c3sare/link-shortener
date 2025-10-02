"use client";

import { signIn, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "./ui/dropdown-menu";

type Props = {
  className?: string;
  children?: React.ReactNode;
  social: "google" | "github" | "signOut";
};

export const DropdownMenuServerActionItem = ({
  children,
  social,
  className,
  ...rest
}: Props) => (
  <DropdownMenuItem
    onClick={async () => {
      if (social === "signOut") await signOut();
      else
        await signIn.social({
          provider: social,
        });
    }}
    className={cn("cursor-pointer", className)}
    asChild
  >
    <button {...rest}>{children}</button>
  </DropdownMenuItem>
);
