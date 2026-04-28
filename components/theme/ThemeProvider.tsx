"use client";

import { useEffect, type ReactNode } from "react";
import { useThemeStore, THEME } from "@/lib/theme-store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEME.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}
