"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "nextjs-darkmode/hooks";

export function ThemeSwitch() {
  const { mode, setMode } = useMode();

  return (
    <div className="rounded-3xl border flex gap-2 items-center">
      <button
        onClick={() => setMode("")}
        className={cn(
          "size-10 rounded-full flex items-center justify-center",
          mode === "" ? "bg-muted" : ""
        )}
      >
        <SunIcon />
        <span className="sr-only">Light theme</span>
      </button>
      <button
        onClick={() => setMode("system")}
        className={cn(
          "size-10 rounded-full flex items-center justify-center",
          mode === "system" ? "bg-muted" : ""
        )}
      >
        <MonitorIcon />
        <span className="sr-only">System theme</span>
      </button>
      <button
        onClick={() => setMode("dark")}
        className={cn(
          "size-10 rounded-full flex items-center justify-center",
          mode === "dark" ? "bg-muted" : ""
        )}
      >
        <MoonIcon />
        <span className="sr-only">Dark theme</span>
      </button>
    </div>
  );
}
