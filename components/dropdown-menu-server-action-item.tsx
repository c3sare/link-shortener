import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const DropdownMenuServerActionItem = ({
  children,
  formAction,
  className,
  ...rest
}: Props) => (
  <DropdownMenuItem className={className} asChild>
    <button formAction={formAction} {...rest}>{children}</button>
  </DropdownMenuItem>
);
