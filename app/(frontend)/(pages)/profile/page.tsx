import { getUserLinks } from "@/actions/links/getUserLinks";
import { Button } from "@/components/ui/button";
import { decompressUrl, encodeNumber, getBaseUrl } from "@/lib/utils";
import { CopyIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const items = await getUserLinks();

  const baseUrl = getBaseUrl();

  return (
    <section className="w-full mx-auto py-8 px-4 md:px-6 mb-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shortened Links</h2>
        <Button size="sm" variant="outline" asChild>
          <Link href="/">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Link
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-[200px]">
                <p className="text-sm text-gray-500 dark:text-gray-400">Short URL</p>
                <p className="font-medium">{`${baseUrl}/l/${encodeNumber(item.id)}`}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Original URL</p>
                <p className="font-medium">{decompressUrl(item.compressedUrl)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
