import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const DropdownMenuItem = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem)
);

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
