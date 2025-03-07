"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import ThemeSwitchButton from "./theme-switch-button";

export function ThemeSwitch() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="rounded-3xl border flex items-center overflow-hidden">
			<ThemeSwitchButton
				currentMode={theme}
				mode="light"
				setMode={setTheme}
				name="Light theme"
			>
				<SunIcon />
			</ThemeSwitchButton>
			<ThemeSwitchButton
				currentMode={theme}
				mode="system"
				setMode={setTheme}
				name="System theme"
			>
				<MonitorIcon />
			</ThemeSwitchButton>
			<ThemeSwitchButton
				currentMode={theme}
				mode="dark"
				setMode={setTheme}
				name="Dark theme"
			>
				<MoonIcon />
			</ThemeSwitchButton>
		</div>
	);
}
