import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/drizzle";
import { PasscodeForm } from "./passcode-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("secure_link"),
  };
}

type Props = {
  params: Promise<{
    str: string;
  }>;
};

export default async function PasscodeLinkPage({ params }: Props) {
  const { str } = await params;
  const link = await db.query.links.findFirst({
    columns: {
      id: true,
    },
    where: (link, { eq, and, isNotNull }) =>
      and(eq(link.id, str), isNotNull(link.passcode)),
  });

  if (!link) return notFound();

  return (
    <div className="h-full flex-1 w-full flex items-center justify-center">
      <PasscodeForm id={link?.id ?? "112"} />
    </div>
  );
}
