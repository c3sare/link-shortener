"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import ThemeSwitchButton from "./theme-switch-button";
import { useTranslations } from "next-intl";

export function ThemeSwitch() {
  const t = useTranslations();
  const { setTheme, theme } = useTheme();

  return (
    <div className="rounded-3xl border flex items-center overflow-hidden">
      <ThemeSwitchButton
        currentMode={theme}
        mode="light"
        setMode={setTheme}
        name={t("light_theme")}
      >
        <SunIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton
        currentMode={theme}
        mode="system"
        setMode={setTheme}
        name={t("system_theme")}
      >
        <MonitorIcon />
      </ThemeSwitchButton>
      <ThemeSwitchButton
        currentMode={theme}
        mode="dark"
        setMode={setTheme}
        name={t("dark_theme")}
      >
        <MoonIcon />
      </ThemeSwitchButton>
    </div>
  );
}
