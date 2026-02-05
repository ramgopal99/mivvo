"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Gradient: gradient background callout. */
export function GradientHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto rounded-xl overflow-hidden min-h-0 overflow-y-auto",
        "bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 p-6 md:p-8 border border-primary/20",
        className
      )}
    >
      {title && (
        <div className={cn("mb-3", animate && "animate-slide-up-fade-in")}>
          <h2 className="text-sm font-medium text-primary uppercase tracking-wider">{title}</h2>
        </div>
      )}
      <p
        className={cn(
          "text-xl md:text-2xl font-bold text-foreground leading-snug",
          animate && "animate-slide-up-fade-in",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        {highlight}
      </p>
      {supporting && (
        <p
          className={cn(
            "mt-4 text-base text-foreground/80",
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
