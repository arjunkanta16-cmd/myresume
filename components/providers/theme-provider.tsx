"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  hydrated: boolean;
};

const storageKey = "arjun-portfolio-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(nextTheme: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(nextTheme);
  root.setAttribute("data-theme", nextTheme);
  root.style.colorScheme = nextTheme;
  document.body.style.colorScheme = nextTheme;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let nextTheme: ThemeMode = "light";

    try {
      const savedTheme = window.localStorage.getItem(storageKey);
      if (savedTheme === "dark" || savedTheme === "light") {
        nextTheme = savedTheme;
      }
    } catch (error) {
      console.error("Unable to read theme preference", error);
    }

    setThemeState(nextTheme);
    applyTheme(nextTheme);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    applyTheme(theme);

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error("Unable to persist theme preference", error);
    }
  }, [hydrated, theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      hydrated
    }),
    [hydrated, setTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }

  return context;
}
