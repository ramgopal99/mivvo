"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Stripe: left border accent. */
export function StripeHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div className={cn("flex flex-col justify-center w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      <div className="relative pl-4 border-l-4 border-primary">
        {title && (
          <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2", animate && "animate-slide-up-fade-in")}>
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
        {supporting && (
          <p
            className={cn(
              "mt-3 text-base text-muted-foreground",
              animate && "animate-slide-up-fade-in",
              animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            {supporting}
          </p>
        )}
      </div>
    </div>
  )
}
