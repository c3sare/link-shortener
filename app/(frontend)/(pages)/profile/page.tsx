import { getLinksByUserId } from "@/actions/links/getUserLinks";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { CopyIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return notFound();

  const items = await getLinksByUserId(userId);

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
        <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Short URL</p>
              <p className="font-medium">acme.co/abc123</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Original URL</p>
              <p className="font-medium">https://www.example.com/very-long-url-that-needs-to-be-shortened</p>
            </div>
          </div>
          <Button className="ml-4" size="sm" variant="outline">
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>
    </section>
  )
}
