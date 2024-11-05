"use client";

import dynamic from "next/dynamic";

const Core = dynamic(() => import("nextjs-darkmode").then((mod) => mod.Core), {
  ssr: false,
  loading: () => null,
});

export const DynamicCore = () => <Core />;
