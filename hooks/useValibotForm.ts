import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as v from "valibot";

type PropsType<Z extends Parameters<typeof valibotResolver>[0]> = Omit<
  NonNullable<Parameters<typeof useForm<v.InferInput<Z>>>[0]>,
  "resolver"
> & {
  schema: Z;
};

export const useZodForm = <Z extends Parameters<typeof valibotResolver>[0]>({
  schema,
  ...props
}: PropsType<Z>) => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<v.InferInput<typeof schema>>({
    resolver: valibotResolver(schema),
    ...props,
  });

  return {
    ...form,
    isLoading,
    handleSubmit: (
      onValid: SubmitHandler<v.InferInput<Z>>,
      onInvalid?: SubmitErrorHandler<v.InferInput<Z>> | undefined
    ) =>
      form.handleSubmit(
        (data) =>
          startTransition(async () => {
            onValid(data);
          }),
        onInvalid
          ? (data) =>
              startTransition(async () => {
                onInvalid(data);
              })
          : undefined
      ),
  };
};
