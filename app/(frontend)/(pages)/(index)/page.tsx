"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { addLink } from "@/actions/links/addLink";
import { Input } from "@/components/ui/input";
import { ReadyLinkInput } from "./ready-link-input";

const schema = z.object({ url: z.string().url() });

export const dynamic = "force-static";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const response = await addLink(data as z.infer<typeof schema>);

      const url = response.data?.shorterUrl;

      if (url) {
        setValue("url", "");
        setUrl(url);
      }
    });
  });

  return (
    <div className="flex-1 mt-auto h-min flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Shorten Your Links
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Easily shorten your long links and share them with your friends
                and colleagues.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              {url ? (
                <ReadyLinkInput clearUrl={() => setUrl(null)} url={url} />
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex gap-2 max-w-full flex-col sm:flex-row"
                >
                  <Input
                    {...register("url")}
                    placeholder="Enter your long URL"
                    disabled={isPending}
                  />
                  <Button disabled={isPending} type="submit">
                    Shorten
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
