import { getUserLinks } from "@/actions/links/getUserLinks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyInput } from "@/components/ui/copy-input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { DateChart } from "./date-chart";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { AddChangePasscodeForm } from "./add-change-passcode-form";
import { DeletePasscodeForm } from "./delete-passcode-form";
import { DeleteLinkForm } from "./delete-link-form";
import { TitleDescriptionForm } from "./title-description-form";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const t = await getTranslations();
  const items = await getUserLinks();

  const baseUrl = getBaseUrl();

  return (
    <section className="w-full py-8 px-4 md:px-6 flex flex-col gap-4">
      <div className="flex items-center w-full justify-between mb-6 gap-2 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold">{t("shortened_links")}</h2>
        <Button size="sm" variant="outline" asChild>
          <Link href="/">
            <PlusIcon className="w-4 h-4 mr-2" />
            {t("create_link_button")}
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto w-full">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden w-full">
            <TitleDescriptionForm
              linkId={item.id}
              title={item.title}
              description={item.description}
            >
              <CardHeader className="relative hover:bg-gray-100/10 cursor-pointer">
                <CardTitle>{item.title ?? t("no_title")}</CardTitle>
                <CardDescription>
                  {item.description ?? t("no_description")}
                </CardDescription>
              </CardHeader>
            </TitleDescriptionForm>
            <CardContent>
              <div className="hover:bg-gray-100/10 cursor-pointer rounded-sm p-1 text-xs">
                {item.labelLinks.length > 0
                  ? item.labelLinks.map(({ label }) => (
                      <Badge key={label.id} color={label.color}>
                        {label.label}
                      </Badge>
                    ))
                  : "No labels..."}
              </div>
              <div className="flex p-4 w-full flex-col gap-4">
                <div className="flex-1">
                  <Label className="flex-1">
                    {t("short_url")}
                    <CopyInput
                      value={`${baseUrl}/l/${item.id}`}
                      className="w-full"
                    />
                  </Label>
                </div>
                <div className="flex-1">
                  <Label className="flex-1">
                    {t("orginal_url")}
                    <CopyInput value={item.url} className="w-full" />
                  </Label>
                </div>
                <div>
                  <Label>
                    {t("total_redirects")}:
                    <div className="border rounded-xl text-2xl py-1 px-2">
                      {item.redirects.length}
                    </div>
                  </Label>
                </div>
              </div>
              <DateChart redirects={item.redirects} />
            </CardContent>
            <CardFooter className="gap-2 justify-between">
              {!!item.passcode && <DeletePasscodeForm linkId={item.id} />}
              <AddChangePasscodeForm
                linkId={item.id}
                havePasscode={!!item.passcode}
              />
              <DeleteLinkForm linkId={item.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
