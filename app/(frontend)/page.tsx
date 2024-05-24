"use client";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRef, useState, useTransition } from "react";
import { addLink } from "@/actions/links/addLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";

const schema = z.object({ url: z.string().url() });

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const response = await addLink(data as z.infer<typeof schema>);

      const url = response.data?.shorterUrl;
      if (url) setUrl(url);
    });
  });

  return url ? (
    <div className="flex gap-2 items-end">
      <Label className="flex flex-col gap-2">
        Your link:
        <Input ref={inputRef} value={url} />
      </Label>
      <Button
        onClick={() => {
          inputRef.current!.select();
          inputRef.current!.setSelectionRange(0, url.length);
          navigator.clipboard.writeText(url);
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  ) : (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input {...register("url")} disabled={isPending} />
      <Button disabled={isPending} type="submit">
        Create shorter link
      </Button>
    </form>
  );
}
