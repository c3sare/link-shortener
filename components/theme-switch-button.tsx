import { cn } from "@/lib/utils";
import { ColorSchemePreference } from "nextjs-darkmode";

type Props = {
  currentMode: ColorSchemePreference;
  mode: ColorSchemePreference;
  setMode: (mode: ColorSchemePreference) => void;
  children: React.ReactNode;
  name: string;
};

export default function ThemeSwitchButton({
  setMode,
  mode,
  children,
  name,
  currentMode,
}: Props) {
  return (
    <button
      onClick={() => setMode(mode)}
      className={cn(
        "size-10 rounded-full flex items-center justify-center",
        currentMode === mode ? "bg-muted" : ""
      )}
    >
      {children}
      <span className="sr-only">{name}</span>
    </button>
  );
}
