"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Classic: centered quote with optional supporting text. */
export function ClassicHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 text-center min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-xl font-bold text-foreground mb-4", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <blockquote
        className={cn(
          "text-xl md:text-2xl font-medium text-foreground leading-relaxed italic",
          animate && "animate-slide-up-fade-in",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        {highlight}
      </blockquote>
      {supporting && (
        <p
          className={cn(
            "mt-4 text-base text-muted-foreground",
            animate && "animate-slide-up-fade-in",
            animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
          )}
        >
          {supporting}
        </p>
      )}
    </div>
  )
}
