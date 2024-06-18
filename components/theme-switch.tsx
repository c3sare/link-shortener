"use client"

import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();

    const value = resolvedTheme === "dark";

    return (
        <Switch checked={value} onCheckedChange={val => setTheme(val ? "dark" : "light")} />
    )
}