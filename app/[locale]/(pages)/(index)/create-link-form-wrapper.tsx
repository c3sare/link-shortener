"use client";

import { lazy, Suspense } from "react";
import { CreateLinkFormSkeleton } from "./create-link-form-skeleton";
const CreateLinkForm = lazy(() => import("./create-link-form"));

export const CreateLinkFormWrapper = () => {
  return (
    <Suspense fallback={<CreateLinkFormSkeleton />}>
      <CreateLinkForm />
    </Suspense>
  );
};
