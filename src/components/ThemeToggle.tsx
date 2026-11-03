import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Both icons stay mounted and cross-fade with a spin; plain CSS keeps this out of the JS bundle
const ICON = "absolute inset-0 size-5 transition-all duration-200 ease-in-out motion-reduce:transition-none"

export function ThemeToggle() {
  // resolvedTheme is "light"/"dark" even when theme is "system"
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-md border border-slate-200/50 dark:border-slate-800/50 hover:bg-accent hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="relative block size-5">
        <Sun
          className={cn(ICON, "text-yellow-400", isDark ? "opacity-100 rotate-0 translate-y-0" : "opacity-0 rotate-90 translate-y-5")}
        />
        <Moon
          className={cn(ICON, "text-slate-700", isDark ? "opacity-0 -rotate-90 -translate-y-5" : "opacity-100 rotate-0 translate-y-0")}
        />
      </span>
    </button>
  )
}
