import { getLinksByUserId } from "@/actions/links/getUserLinks";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return notFound();

  const items = await getLinksByUserId(userId);

  return <div>{JSON.stringify(items)}</div>;
}
