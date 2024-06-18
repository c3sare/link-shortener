import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
