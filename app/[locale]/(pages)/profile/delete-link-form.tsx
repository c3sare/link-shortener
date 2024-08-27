"use client";

import { deleteLink } from "@/actions/links/delete-link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

type Props = {
  linkId: string;
};

export const DeleteLinkForm = ({ linkId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const action = useAction(deleteLink, {
    onSettled: () => setOpen(false),
  });
  const t = useTranslations();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    action.execute({ linkId });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{t("delete_link")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("sure_delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("sure_delete_link_description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={action.isExecuting}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction disabled={action.isExecuting} onClick={onClick}>
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
