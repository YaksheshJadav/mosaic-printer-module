// components/ThemeProvider.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  mounted: false,
  _isProvider: false,
});

const STORAGE_KEY = "mosaic_theme_preference";

export function ThemeProvider({ children }) {
  const existing = useContext(ThemeContext);
  if (existing && existing._isProvider) {
    return children;
  }

  return <ThemeRootProvider>{children}</ThemeRootProvider>;
}

function ThemeRootProvider({ children }) {
  // Requirement: DEFAULT THEME = LIGHT for the whole project.
  const [theme, setThemeState] = useState("light");
  const [systemDark, setSystemDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Read stored preference; default is strictly 'light' if not set
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      } else {
        setThemeState("light");
      }
    } catch {
      setThemeState("light");
    }

    // 2. Query system preference for 'system' mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mediaQuery.matches);

    const handler = (e) => {
      setSystemDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }

    setMounted(true);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  const setTheme = (newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark" && newTheme !== "system") return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore storage errors
    }
  };

  const resolvedTheme = !mounted
    ? theme === "dark"
      ? "dark"
      : "light"
    : theme === "system"
    ? systemDark
      ? "dark"
      : "light"
    : theme;

  // Sync with document element and color-scheme
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [resolvedTheme, mounted]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        mounted,
        _isProvider: true,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
