"use client";

/* eslint-disable jsx-a11y/alt-text */

import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import defaultAvatar from "@/public/images/avatars/default.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
	session: Session | null;
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
