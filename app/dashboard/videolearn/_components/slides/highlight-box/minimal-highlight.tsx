"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Minimal: compact callout. */
export function MinimalHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <p className={cn("text-lg font-medium text-foreground", animate && "animate-slide-up-fade-in", animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]))}>
        {highlight}
      </p>
      {supporting && (
        <p className={cn("mt-2 text-sm text-muted-foreground", animate && "animate-slide-up-fade-in", animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]))}>
          {supporting}
        </p>
      )}
    </div>
  )
}
