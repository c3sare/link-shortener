import { notFound } from "next/navigation";

import { db } from "@/drizzle";

import { PasscodeForm } from "./passcode-form";

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
    where: {
      id: str,
      passcode: {
        isNotNull: true,
      },
    },
  });

  if (!link) return notFound();

  return (
    <div className="h-full flex-1 w-full flex items-center justify-center">
      <PasscodeForm id={link?.id ?? "112"} />
    </div>
  );
}
