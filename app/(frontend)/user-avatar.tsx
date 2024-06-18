"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";
import { Session } from "next-auth";

type Props = {
    session: Session | null;
}

export const UserAvatar = ({ session, ...props }: Props) => {
    const avatarUrl = session?.user?.image ?? "/images/avatars/default.jpg";

    const name = session?.user?.name ?? "User";

    return (
        <button className="rounded-full" {...props}>
            <Avatar>
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback><Skeleton><UserIcon /></Skeleton></AvatarFallback>
            </Avatar>
        </button>
    )
}