"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useMode } from "nextjs-darkmode/hooks";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

const ThemeSwitchButton = dynamic(() => import("./theme-switch-button"), {
  ssr: false,
  loading: () => <Skeleton className="size-10 rounded-none" />,
});

export function ThemeSwitch() {
  const { mode, setMode } = useMode();

  return (
    <div className="rounded-3xl border flex items-center overflow-hidden">
      <ThemeSwitchButton
        currentMode={mode}
        mode=""
        setMode={setMode}
        name="Light theme"
      >
        <SunIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton
        currentMode={mode}
        mode="system"
        setMode={setMode}
        name="System theme"
      >
        <MonitorIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton
        currentMode={mode}
        mode="dark"
        setMode={setMode}
        name="Dark theme"
      >
        <MoonIcon />
      </ThemeSwitchButton>
    </div>
  );
}
