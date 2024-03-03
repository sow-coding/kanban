"use client"
import { UseContextHook } from "@/app/page";
import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({ children }: UseContextHook) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? (storedTheme as Theme) : "light";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider !");
  }
  return context;
}