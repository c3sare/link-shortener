import { registerRedirect } from "@/actions/links/register-redirect";
import { db } from "@/drizzle";
import { redirect, notFound } from "next/navigation";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params: { str } }: { params: { str: string } }
) {
  const item = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, str),
  });

  if (!item) return notFound();

  if (item.passcode) return redirect(`/lp/${item.id}`);

  await registerRedirect(item.id);

  return redirect(item.url);
}
