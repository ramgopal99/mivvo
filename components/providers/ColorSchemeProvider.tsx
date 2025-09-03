"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Define all available color schemes
export const COLOR_SCHEMES = {
  blue: {
    name: "Blue",
    class: "color-blue",
    light: {
      primary: "oklch(0.55 0.15 240)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.15 240)",
      accent: "oklch(0.95 0.05 240)",
      accentForeground: "oklch(0.15 0.15 240)"
    },
    dark: {
      primary: "oklch(0.65 0.15 240)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.65 0.15 240)",
      accent: "oklch(0.25 0.05 240)",
      accentForeground: "oklch(0.95 0.05 240)"
    }
  },
  green: {
    name: "Green",
    class: "color-green",
    light: {
      primary: "oklch(0.55 0.15 140)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.15 140)",
      accent: "oklch(0.95 0.05 140)",
      accentForeground: "oklch(0.15 0.15 140)"
    },
    dark: {
      primary: "oklch(0.65 0.15 140)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.65 0.15 140)",
      accent: "oklch(0.25 0.05 140)",
      accentForeground: "oklch(0.95 0.05 140)"
    }
  },
  purple: {
    name: "Purple",
    class: "color-purple",
    light: {
      primary: "oklch(0.55 0.15 280)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.15 280)",
      accent: "oklch(0.95 0.05 280)",
      accentForeground: "oklch(0.15 0.15 280)"
    },
    dark: {
      primary: "oklch(0.65 0.15 280)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.65 0.15 280)",
      accent: "oklch(0.25 0.05 280)",
      accentForeground: "oklch(0.95 0.05 280)"
    }
  },
  orange: {
    name: "Orange",
    class: "color-orange",
    light: {
      primary: "oklch(0.65 0.15 60)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.65 0.15 60)",
      accent: "oklch(0.95 0.05 60)",
      accentForeground: "oklch(0.15 0.15 60)"
    },
    dark: {
      primary: "oklch(0.75 0.15 60)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.75 0.15 60)",
      accent: "oklch(0.25 0.05 60)",
      accentForeground: "oklch(0.95 0.05 60)"
    }
  },
  red: {
    name: "Red",
    class: "color-red",
    light: {
      primary: "oklch(0.55 0.15 20)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.15 20)",
      accent: "oklch(0.95 0.05 20)",
      accentForeground: "oklch(0.15 0.15 20)"
    },
    dark: {
      primary: "oklch(0.65 0.15 20)",
      primaryForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.65 0.15 20)",
      accent: "oklch(0.25 0.05 20)",
      accentForeground: "oklch(0.95 0.05 20)"
    }
  }
} as const

export type ColorScheme = keyof typeof COLOR_SCHEMES

interface ColorSchemeContextType {
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
  availableSchemes: typeof COLOR_SCHEMES
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined)

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("blue")

  useEffect(() => {
    // Load saved color scheme from localStorage
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme || "blue"
    setColorSchemeState(savedColorScheme)
    applyColorScheme(savedColorScheme)
  }, [])

  const applyColorScheme = (scheme: ColorScheme) => {
    const root = document.documentElement
    
    // Remove all existing color scheme classes
    Object.values(COLOR_SCHEMES).forEach(color => {
      root.classList.remove(color.class)
    })
    
    // Add new color scheme class
    root.classList.add(COLOR_SCHEMES[scheme].class)
  }

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    localStorage.setItem("colorScheme", scheme)
    applyColorScheme(scheme)
  }

  return (
    <ColorSchemeContext.Provider value={{ 
      colorScheme, 
      setColorScheme, 
      availableSchemes: COLOR_SCHEMES 
    }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export function useColorScheme() {
  const context = useContext(ColorSchemeContext)
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider")
  }
  return context
}