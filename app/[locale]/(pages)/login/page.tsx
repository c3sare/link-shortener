import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleIcon } from "@/components/icons/google-icon";
import { ArrowLeft, GithubIcon } from "lucide-react";
import { auth, signIn } from "@/auth";
import { redirect, Link } from "@/navigation";
import type { routing } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("home"),
  };
}

type Props = {
  params: Promise<{
    locale: (typeof routing.locales)[number];
  }>;
  searchParams: Promise<{
    backUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams, params }: Props) {
  const { locale } = await params;
  const session = await auth();

  if (session?.user?.id) return redirect({ locale, href: "/" });

  const { backUrl: redirectTo } = await searchParams;

  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-2">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  formAction={async () => {
                    "use server";

                    await signIn("github", { redirectTo });
                  }}
                >
                  <GithubIcon className="size-4 mr-2" />
                  Login with GitHub
                </Button>
                <Button
                  className="w-full"
                  formAction={async () => {
                    "use server";

                    await signIn("google", { redirectTo });
                  }}
                >
                  <GoogleIcon className="size-4 mr-2" />
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 size-4" />
                  Go to home page
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
