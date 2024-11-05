"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  {
    loading: () => null,
    ssr: false,
  }
);

export const DynamicToaster = () => <Toaster />;
