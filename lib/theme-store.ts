import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEME = {
  DARK: "dark",
  WHITE: "white",
} as const;

type Theme = (typeof THEME)[keyof typeof THEME];

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: THEME.DARK,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === THEME.DARK ? THEME.WHITE : THEME.DARK,
        })),
    }),
    { name: "theme-preference" },
  ),
);

export { THEME, useThemeStore, type Theme };
