import { signInWithGoogle } from "@/actions/auth/signInWithGoogle";
import { signOut } from "@/actions/auth/signOut";
import { auth } from "@/auth";
import { DropdownMenuServerActionItem } from "@/components/dropdown-menu-server-action-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { GoogleIcon } from "@/components/icons/google-icon";
import { signInWithGithub } from "@/actions/auth/signInWithGithub";
import { getI18n } from "@/locales/server";

export const LoginButton = async () => {
  const session = await auth();
  const t = await getI18n();

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
                  <DropdownMenuItem asChild>
                    <Link href={`/profile`}>{t("your_links")}</Link>
                  </DropdownMenuItem>
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
                  <GitHubLogoIcon width={24} height={24} />
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