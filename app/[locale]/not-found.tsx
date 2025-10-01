import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404",
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-2">
      <p className="text-lg font-semibold">404</p>
      <p className="text-sm">Page not found</p>
      <Button asChild>
        <Link href="/">Go to homepage</Link>
      </Button>
    </div>
  );
}
