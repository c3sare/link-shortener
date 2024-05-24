import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const DropdownMenuServerActionItem = ({ children, action, className, ...rest }: Props) => (
    <form action={action} {...rest}>
        <DropdownMenuItem className={className} asChild>
            <button>
                {children}
            </button>
        </DropdownMenuItem>
    </form>
)