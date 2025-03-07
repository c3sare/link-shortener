"use client";

import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { GlobeIcon } from "lucide-react";

const LangSwitch = dynamic(
	() => import("./lang-switch").then((mod) => mod.LangSwitch),
	{
		ssr: false,
		loading: () => (
			<Button variant="ghost" disabled size="sm" className="p-1">
				<GlobeIcon />
			</Button>
		),
	},
);

export const LangSwitchWrapper = () => <LangSwitch />;
