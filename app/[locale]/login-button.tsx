import { signInWithGoogle } from "@/actions/auth/signInWithGoogle";
import { signOut } from "@/actions/auth/signOut";
import { auth } from "@/auth";
import { DropdownMenuServerActionItem } from "@/components/dropdown-menu-server-action-item";
import dynamic from "next/dynamic";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { signInWithGithub } from "@/actions/auth/signInWithGithub";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { UserAvatar } from "./user-avatar";

const DropdownMenu = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu)
);

const DropdownMenuContent = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuContent)
);

const DropdownMenuItem = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem)
);

const DropdownMenuLabel = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuLabel)
);

const DropdownMenuSeparator = dynamic(() =>
  import("@/components/ui/dropdown-menu").then(
    (mod) => mod.DropdownMenuSeparator
  )
);

const DropdownMenuTrigger = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuTrigger)
);

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
