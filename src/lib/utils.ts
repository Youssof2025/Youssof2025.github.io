import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// "Power Architecture (12V)" -> "power-architecture-12v"
export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

// "/images/projects/ADC_Analog/ADC_Power.webp" -> "ADC Power"
export function altFromPath(path: string) {
  const file = path.split("/").pop() ?? ""
  return file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
}
