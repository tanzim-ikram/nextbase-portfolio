"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 z-10">
        <li><button onClick={() => setTheme("dracula")}>Dracula</button></li>
        <li><button onClick={() => setTheme("synthwave")}>Synthwave</button></li>
        <li><button onClick={() => setTheme("cyberpunk")}>Cyberpunk</button></li>
        <li><button onClick={() => setTheme("retro")}>Retro</button></li>
        <li><button onClick={() => setTheme("cupcake")}>Cupcake</button></li>
        <li><button onClick={() => setTheme("light")}>Light</button></li>
        <li><button onClick={() => setTheme("dark")}>Dark</button></li>
      </ul>
    </div>
  )
}
