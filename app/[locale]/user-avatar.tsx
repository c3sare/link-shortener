"use client";

/* eslint-disable jsx-a11y/alt-text */

import { UserIcon } from "lucide-react";
import Image from "next/image";
import type { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import defaultAvatar from "@/public/images/avatars/default.webp";

type Props = {
  session: Awaited<ReturnType<typeof auth>>;
};

export const UserAvatar = ({ session, ...props }: Props) => {
  const avatarUrl = session?.user?.image ?? defaultAvatar.src;

  const name = session?.user?.name ?? "User";

  const imgProps = {
    src: avatarUrl,
    alt: name,
    height: 40,
    width: 40,
  };

  return (
    <button className="rounded-full select-none" {...props}>
      <Avatar>
        <AvatarImage {...imgProps} asChild>
          <Image {...imgProps} />
        </AvatarImage>
        <AvatarFallback>
          <Skeleton>
            <UserIcon />
          </Skeleton>
        </AvatarFallback>
      </Avatar>
    </button>
  );
};
