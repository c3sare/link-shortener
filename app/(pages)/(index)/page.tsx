import { getTranslations } from "next-intl/server";
import CreateLinkForm from "./create-link-form";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="flex-1 mt-auto h-min flex items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
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
              <CreateLinkForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
