import { GithubIcon, LogOutIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { signInWithGithub } from "@/actions/auth/signInWithGithub";
import { signInWithGoogle } from "@/actions/auth/signInWithGoogle";
import { signOut } from "@/actions/auth/signOut";
import { auth } from "@/auth";
import { DropdownMenuServerActionItem } from "@/components/dropdown-menu-server-action-item";
import { GoogleIcon } from "@/components/icons/google-icon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/navigation";

import { UserAvatar } from "./user-avatar";

export const LoginButton = async () => {
	const session = await auth();
	const t = await getTranslations();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<UserAvatar session={session} />
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="end" asChild>
				<form>
					{(() => {
						if (session?.user)
							return (
								<>
									<DropdownMenuLabel>
										{t("hello", { name: session.user.name ?? "user" })}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<Link href={`/profile`}>
										<DropdownMenuItem>{t("your_links")}</DropdownMenuItem>
									</Link>
									<DropdownMenuSeparator />
									<DropdownMenuServerActionItem
										className="flex items-center gap-4 w-full"
										formAction={signOut}
									>
										<LogOutIcon />
										<span>{t("logout")}</span>
									</DropdownMenuServerActionItem>
								</>
							);

						return (
							<>
								<DropdownMenuLabel className="text-center min-w-40">
									{t("sign_in_with")}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuServerActionItem
									className="flex items-center justify-between gap-4 w-full text-lg font-bold"
									formAction={signInWithGoogle}
								>
									<GoogleIcon width="24px" height="24px" />
									<span>Google</span>
								</DropdownMenuServerActionItem>
								<DropdownMenuServerActionItem
									className="flex items-center justify-between gap-4 w-full text-lg font-bold"
									formAction={signInWithGithub}
								>
									<GithubIcon width={24} height={24} />
									<span>Github</span>
								</DropdownMenuServerActionItem>
							</>
						);
					})()}
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
