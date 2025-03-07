"use client";

import { CreateLinkFormSkeleton } from "./create-link-form-skeleton";
import dynamic from "next/dynamic";
const CreateLinkForm = dynamic(() => import("./create-link-form"), {
	ssr: false,
	loading: () => <CreateLinkFormSkeleton />,
});

export const CreateLinkFormWrapper = () => <CreateLinkForm />;
