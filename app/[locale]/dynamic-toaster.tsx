"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((module_) => module_.Toaster),
  {
    loading: () => null,
    ssr: false,
  },
);

export const DynamicToaster = () => <Toaster />;
