"use client";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addLink } from "@/actions/links/addLink";

const schema = z.object({ url: z.string().url() });

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await addLink(data as z.infer<typeof schema>);

    const url = response.data?.shorterUrl;
    if (url)
      setUrl(url)
  })

  return (
    url ?
      <Textarea value={url} />
      :
      <form onSubmit={onSubmit}>
        <Textarea {...register("url")} />
        <Button type="submit">Create shorter link</Button>
      </form>
  );
}
