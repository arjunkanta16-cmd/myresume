"use client";

import { MoonStar, SunMedium } from "lucide-react";

import { useThemeMode } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  compact?: boolean;
};

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeMode();
  const isDark = theme === "dark";
  const currentLabel = isDark ? "Dark" : "Light";
  const nextLabel = isDark ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "theme-toggle-shell inline-flex h-11 items-center justify-between rounded-full px-2 py-1.5 text-sm font-medium text-text transition duration-300 hover:border-accent/40",
        compact ? "min-w-[9.5rem]" : "min-w-[13.5rem]",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <span className="inline-flex items-center gap-2 px-2.5">
        {isDark ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
        <span>{currentLabel}</span>
      </span>
      <span className="theme-toggle-thumb">
        {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
        <span className="sr-only">{nextLabel}</span>
      </span>
    </button>
  );
}
