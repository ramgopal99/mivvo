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

  const getHighlightClasses = () => {
    const baseClasses = "transition-all duration-300 rounded"
    
    switch (action) {
      case "highlight":
        return `${baseClasses} px-1 py-0.5`
      case "underline":
        return `${baseClasses} border-b-2 pb-0.5`
      case "box":
        return `${baseClasses} border-2 px-1 py-0.5`
      case "circle":
        return `${baseClasses} border-2 rounded-full px-2 py-1`
      case "strike-through":
        return `${baseClasses} line-through`
      case "crossed-off":
        return `${baseClasses} relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-0.5 before:-translate-y-1/2`
      case "bracket":
        return `${baseClasses} relative before:content-['[\\20'] before:font-bold after:content-[']'] after:font-bold`
      default:
        return baseClasses
    }
  }

  return (
    <span
      ref={elementRef}
      className={`relative inline-block ${isVisible ? getHighlightClasses() : ''}`}
      style={isVisible ? { 
        backgroundColor: action === 'highlight' ? color : undefined,
        borderColor: ['underline', 'box', 'circle'].includes(action) ? color : undefined,
        textDecorationColor: action === 'strike-through' ? color : undefined,
        '--highlight-color': color
      } as React.CSSProperties : {}}
    >
      {children}
    </span>
  )
}
