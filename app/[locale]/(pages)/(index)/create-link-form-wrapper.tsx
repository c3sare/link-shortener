"use client";

import dynamic from "next/dynamic";

import { CreateLinkFormSkeleton } from "./create-link-form-skeleton";
const CreateLinkForm = dynamic(() => import("./create-link-form"), {
  ssr: false,
  loading: () => <CreateLinkFormSkeleton />,
});

export const CreateLinkFormWrapper = () => <CreateLinkForm />;
