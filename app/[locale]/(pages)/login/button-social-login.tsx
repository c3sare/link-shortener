"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

type Provider = "github" | "google";

type Props = {
  children?: React.ReactNode;
  provider: Provider;
};

export const ButtonSocialLogin = ({ children, provider }: Props) => {
  const onClick = async () => {
    await signIn.social({
      provider,
    });
  };

  return (
    <Button className="w-full max-w-full" onClick={onClick}>
      {children}
    </Button>
  );
};
