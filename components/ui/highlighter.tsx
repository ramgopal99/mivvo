"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(!isView)

  useEffect(() => {
    if (!isView) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isView])

  const getHighlightStyle = () => {
    const baseStyle = {
      transition: `all ${animationDuration}ms ease-in-out`,
      padding: `${padding}px`,
      borderRadius: "4px",
    }

    switch (action) {
      case "highlight":
        return {
          ...baseStyle,
          backgroundColor: color,
          color: "inherit",
        }
      case "underline":
        return {
          ...baseStyle,
          borderBottom: `${strokeWidth}px solid ${color}`,
          paddingBottom: "2px",
        }
      case "box":
        return {
          ...baseStyle,
          border: `${strokeWidth}px solid ${color}`,
          borderRadius: "4px",
        }
      case "circle":
        return {
          ...baseStyle,
          border: `${strokeWidth}px solid ${color}`,
          borderRadius: "50%",
          padding: "4px 8px",
        }
      case "strike-through":
        return {
          ...baseStyle,
          textDecoration: "line-through",
          textDecorationColor: color,
          textDecorationThickness: `${strokeWidth}px`,
        }
      case "crossed-off":
        return {
          ...baseStyle,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: `${strokeWidth}px`,
            backgroundColor: color,
            transform: "translateY(-50%)",
          },
        }
      case "bracket":
        return {
          ...baseStyle,
          position: "relative",
          "&::before": {
            content: '"[ "',
            color: color,
            fontWeight: "bold",
          },
          "&::after": {
            content: '"]"',
            color: color,
            fontWeight: "bold",
          },
        }
      default:
        return baseStyle
    }
  }

  return (
    <span
      ref={elementRef}
      className="relative inline-block"
      style={isVisible ? getHighlightStyle() : {}}
    >
      {children}
    </span>
  )
}
