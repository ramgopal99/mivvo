"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Split: title/quote left, supporting right. */
export function SplitHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div className={cn("flex w-full max-w-4xl mx-auto px-6 gap-6 md:gap-8 items-stretch min-h-0", className)}>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {title && (
          <h2 className={cn("text-lg font-bold text-foreground mb-2", animate && "animate-slide-up-fade-in")}>
            {title}
          </h2>
        )}
        <p
          className={cn(
            "text-xl font-semibold text-foreground leading-snug",
            animate && "animate-slide-up-fade-in",
            animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
          )}
        >
          {highlight}
        </p>
      </div>
      <div className="w-px shrink-0 bg-border self-stretch" aria-hidden />
      {supporting && (
        <p
          className={cn(
            "flex-1 min-w-0 flex items-center text-base text-muted-foreground leading-relaxed py-2",
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
