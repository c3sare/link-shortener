import { getUserLinks } from "@/actions/links/getUserLinks";
import { Button } from "@/components/ui/button";
import { CopyInput } from "@/components/ui/copy-input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const items = await getUserLinks();

  const baseUrl = getBaseUrl();

  return (
    <section className="w-full py-8 px-4 md:px-6 flex flex-col gap-4">
      <div className="flex items-center w-full justify-between mb-6 gap-2 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold">Shortened Links</h2>
        <Button size="sm" variant="outline" asChild>
          <Link href="/">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Link
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap mx-auto gap-4 w-full">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col p-4 border w-full gap-4">
            <div className="flex-1">
              <Label className="flex-1">
                Short URL
                <CopyInput
                  value={`${baseUrl}/l/${item.id}`}
                  className="w-full"
                />
              </Label>
            </div>
            <div className="flex-1">
              <Label className="flex-1">
                Orginal URL
                <CopyInput value={item.url} className="w-full" />
              </Label>
            </div>
            <div>
              <Label>
                Redirects:
                <div className="border rounded-xl text-2xl py-1 px-2">
                  {item.redirects}
                </div>
              </Label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
