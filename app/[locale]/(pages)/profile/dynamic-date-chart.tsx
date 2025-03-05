"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export const DateChart = dynamic(
  () => import("./date-chart").then((mod) => mod.DateChart),
  {
    ssr: false,
    loading: () => <Skeleton style={{ height: "200px" }} className="w-full" />,
  }
);
