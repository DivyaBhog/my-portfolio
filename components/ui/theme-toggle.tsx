"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn, iconButtonClasses } from "@/lib/styles";

const subscribe = () => () => {};

/** false during SSR and hydration, true afterwards — without a setState-in-effect. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Moon in light mode, Sun in dark mode. Both icons are always rendered and
 * swapped with the `dark:` variant, so markup matches the server and there's
 * no hydration mismatch or icon flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";
  const label = mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(iconButtonClasses, "relative overflow-hidden", className)}
    >
      <Moon
        aria-hidden="true"
        className="absolute size-[18px] rotate-0 scale-100 transition-transform duration-300 ease-out group-hover:-rotate-12 dark:rotate-90 dark:scale-0"
      />
      <Sun
        aria-hidden="true"
        className="absolute size-[18px] -rotate-90 scale-0 transition-transform duration-300 ease-out dark:rotate-0 dark:scale-100 dark:group-hover:rotate-45"
      />
    </button>
  );
}
