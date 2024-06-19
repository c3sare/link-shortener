"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { addLink } from "@/actions/links/addLink";
import { Input } from "@/components/ui/input";
import { ReadyLinkInput } from "./ready-link-input";

const schema = z.object({ url: z.string().url() });

const CreateLinkForm = () => {
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const response = await addLink(data as z.infer<typeof schema>);

      const url = response?.data?.shorterUrl;

      if (url) {
        setValue("url", "");
        setUrl(url);
      }
    });
  });

  return url ? (
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
  );
};

export default CreateLinkForm;
