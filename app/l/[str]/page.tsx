import { db } from "@/drizzle";
import { decodeString } from "@/lib/utils";
import lz from "lzutf8";
import { notFound, redirect } from "next/navigation";
type Props = {
  params: {
    str: string;
  };
};
export default async function RedirectPage({ params: { str } }: Props) {
  const id = decodeString(str);

  if (isNaN(id)) return notFound();

  const item = await db.query.links.findFirst({
    where: (link, { eq }) => eq(link.id, id),
  });

  if (!item) return notFound();

  const url = lz.decompress(lz.decodeBase64(item.compressedUrl));

  return redirect(url);
}
