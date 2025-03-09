"use client";

import { GlobeIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "./ui/button";

const LangSwitch = dynamic(
  () => import("./lang-switch").then((module_) => module_.LangSwitch),
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
