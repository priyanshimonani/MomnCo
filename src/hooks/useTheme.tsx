import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readTheme(): Theme {
  try {
    return localStorage.getItem("mom-co-theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("mom-co-theme", theme);
    } catch {
      // Theme remains available for the current session if storage is unavailable.
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((current) => current === "light" ? "dark" : "light") }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
