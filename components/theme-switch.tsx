"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "nextjs-darkmode/hooks";

export function ThemeSwitch() {
    const { mode, setMode } = useMode();

    return (
        <div className="rounded-3xl border flex gap-2 items-center">
            <button onClick={() => setMode("")} className={cn("size-10 rounded-full flex items-center justify-center", mode === "" ? "bg-muted" : "")}><SunIcon /></button>
            <button onClick={() => setMode("system")} className={cn("size-10 rounded-full flex items-center justify-center", mode === "system" ? "bg-muted" : "")}><MonitorIcon /></button>
            <button onClick={() => setMode("dark")} className={cn("size-10 rounded-full flex items-center justify-center", mode === "dark" ? "bg-muted" : "")}><MoonIcon /></button>
        </div>
    )
}