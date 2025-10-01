import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import { CreateLinkFormWrapper } from "./create-link-form-wrapper";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("home"),
  };
}

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex-1 mt-auto h-min flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t("index_title")}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {t("index_description")}
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <CreateLinkFormWrapper />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
