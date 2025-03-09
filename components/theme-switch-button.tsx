import { cn } from "@/lib/utils";

type Props = {
  currentMode?: string;
  mode: string;
  setMode: (mode: string) => void;
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
        currentMode === mode ? "bg-border border" : "",
      )}
    >
      {children}
      <span className="sr-only">{name}</span>
    </button>
  );
}
