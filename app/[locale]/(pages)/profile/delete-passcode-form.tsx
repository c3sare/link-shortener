"use client";

import { deleteLinkPasscode } from "@/actions/links/delete-link-passcode";
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

export const DeletePasscodeForm = ({ linkId }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const action = useAction(deleteLinkPasscode, {
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
				<Button className="w-full">{t("delete_passcode")}</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("sure_delete")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("sure_delete_description")}
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
