"use client"

import { cn } from "@/lib/utils"
import type { HighlightBoxSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Dark: full dark theme callout. */
export function DarkHighlight({ title, highlight, supporting, isPlaying, className }: HighlightBoxSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto rounded-xl overflow-hidden min-h-0 overflow-y-auto bg-zinc-900/95 p-6 md:p-8",
        className
      )}
    >
      {title && (
        <h2 className={cn("text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <p
        className={cn(
          "text-xl md:text-2xl font-bold text-zinc-100 leading-snug",
          animate && "animate-slide-up-fade-in",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        {highlight}
      </p>
      {supporting && (
        <p
          className={cn(
            "mt-4 text-base text-zinc-400",
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
