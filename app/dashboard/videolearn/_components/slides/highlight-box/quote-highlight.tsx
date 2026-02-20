"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Quote: quotation marks style. */
export function QuoteHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 text-center min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <div className={cn("relative", animate && "animate-slide-up-fade-in", animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]))}>
        <span className="absolute -top-2 -left-1 text-6xl text-primary/30 font-serif leading-none" aria-hidden>
          &quot;
        </span>
        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed pl-8 pr-8 italic">
          {highlight}
        </p>
        <span className="absolute -bottom-4 -right-1 text-6xl text-primary/30 font-serif leading-none" aria-hidden>
          &quot;
        </span>
      </div>
      {supporting && (
        <p
          className={cn(
            "mt-8 text-base text-muted-foreground",
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
