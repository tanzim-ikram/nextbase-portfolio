"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

const DARK_THEME = "dracula";
const LIGHT_THEME = "light";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== LIGHT_THEME;

  const toggle = () => setTheme(isDark ? LIGHT_THEME : DARK_THEME);

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </button>
  )
}
