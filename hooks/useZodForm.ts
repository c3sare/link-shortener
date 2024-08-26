"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";

type PropsType<Z extends ZodSchema> = Omit<
  NonNullable<Parameters<typeof useForm<z.infer<Z>>>[0]>,
  "resolver"
> & {
  schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...props
}: PropsType<Z>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  return {
    ...useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema) as Resolver<z.TypeOf<Z>, any>,
      ...props,
    }),
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  };
};
