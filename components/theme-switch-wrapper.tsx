"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "./ui/skeleton";

const ThemeSwitch = dynamic(
	() => import("./theme-switch").then((module_) => module_.ThemeSwitch),
	{
		ssr: false,
		loading: () => (
			<Skeleton
				className="rounded-3xl border flex items-center overflow-hidden h-10"
				style={{ width: "120px" }}
			/>
		),
	},
);

export const ThemeSwitchWrapper = () => <ThemeSwitch />;
