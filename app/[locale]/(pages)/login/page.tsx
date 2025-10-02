import { ArrowLeft, GithubIcon } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { routing } from "@/i18n/routing";
import { Link, redirect } from "@/navigation";
import { ButtonSocialLogin } from "./button-social-login";

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

export default async function LoginPage({ params }: Props) {
  const t = await getTranslations();
  const { locale } = await params;
  const session = await auth();

  if (session?.user?.id) return redirect({ locale, href: "/" });

  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-2 w-full">
      <Card className="max-w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("welcome_back")}</CardTitle>
          <CardDescription>{t("login_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col gap-4">
              <ButtonSocialLogin provider="github">
                <GithubIcon className="size-4 mr-2" />
                {t("login_with")} GitHub
              </ButtonSocialLogin>
              <ButtonSocialLogin provider="google">
                <GoogleIcon className="size-4 mr-2" />
                {t("login_with")} Google
              </ButtonSocialLogin>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                {t("or")}
              </span>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                {t("go_to_home_page")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
