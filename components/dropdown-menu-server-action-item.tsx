import { cn } from "@/lib/utils";

import { DropdownMenuItem } from "./ui/dropdown-menu";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const DropdownMenuServerActionItem = ({
  children,
  formAction,
  className,
  ...rest
}: Props) => (
  <DropdownMenuItem className={cn("cursor-pointer", className)} asChild>
    <button formAction={formAction} {...rest}>
      {children}
    </button>
  </DropdownMenuItem>
);
