"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useMode } from "nextjs-darkmode/hooks";
import ThemeSwitchButton from "./theme-switch-button";

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
