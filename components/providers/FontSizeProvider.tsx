"use client"

import { createContext, useContext, useEffect, useState } from "react"

type FontSize = "small" | "medium" | "large"

interface FontSizeContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined)

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium")

  useEffect(() => {
    // Load saved font size from localStorage
    const savedFontSize = localStorage.getItem("fontSize") as FontSize || "medium"
    setFontSizeState(savedFontSize)
    applyFontSize(savedFontSize)
  }, [])

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement
    const fontSizeMap = {
      small: "14px",
      medium: "16px", 
      large: "18px"
    }
    root.style.fontSize = fontSizeMap[size]
  }

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size)
    localStorage.setItem("fontSize", size)
    applyFontSize(size)
  }

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const context = useContext(FontSizeContext)
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider")
  }
  return context
}