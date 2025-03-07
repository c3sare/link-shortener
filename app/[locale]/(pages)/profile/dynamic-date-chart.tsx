"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

export const DateChart = dynamic(
	() => import("./date-chart").then((module_) => module_.DateChart),
	{
		ssr: false,
		loading: () => <Skeleton style={{ height: "200px" }} className="w-full" />,
	},
);
