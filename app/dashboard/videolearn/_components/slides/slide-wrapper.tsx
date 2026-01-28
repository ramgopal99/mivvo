"use client"

import { cn } from "@/lib/utils"

interface SlideWrapperProps {
  children: React.ReactNode
  className?: string
  /** When true, skip wrapper enter animation (e.g. title slide does its own staggered animation) */
  noEnterAnimation?: boolean
  /** When true, use min-h-0 so slide fits inside video-style frame without forcing height */
  noMinHeight?: boolean
}

export function SlideWrapper({ children, className, noEnterAnimation, noMinHeight }: SlideWrapperProps) {
  return (
    <div
      className={cn(
        "w-full p-8 bg-gradient-to-br from-muted/80 to-muted/40 rounded-lg flex flex-col",
        noMinHeight ? "min-h-0" : "min-h-[400px]",
        !noEnterAnimation && "animate-in fade-in duration-500",
        className
      )}
    >
      {children}
    </div>
  )
}
