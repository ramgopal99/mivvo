"use client"

import { cn } from "@/lib/utils"
import type { FallbackSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Split fallback: title left, content right. */
export function SplitFallback({ title, content, isPlaying, className }: FallbackSlideProps) {
  const animate = !!isPlaying
  const contentDelay = title ? DELAY_CLASSES[1] : DELAY_CLASSES[0]
  if (!title) {
    return (
      <div
        className={cn(
          "flex flex-col justify-center w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto",
          className
        )}
      >
        <p
          className={cn(
            "text-base md:text-lg text-foreground/90 leading-relaxed",
            animate && "animate-slide-up-fade-in",
            animate && contentDelay
          )}
        >
          {content || "Content not available."}
        </p>
      </div>
    )
  }
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 gap-6 md:gap-8 items-stretch min-h-0",
        className
      )}
    >
      <div className="flex flex-col justify-center min-w-0 flex-1 shrink-0">
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-foreground leading-tight",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "mt-3 h-1 w-12 bg-primary rounded-full",
            animate && "animate-slide-up-fade-in animation-delay-350"
          )}
          aria-hidden
        />
      </div>
      <div
        className="w-px shrink-0 bg-border self-stretch"
        aria-hidden
      />
      <div className="flex-1 min-w-0 flex items-center overflow-y-auto">
        <p
          className={cn(
            "text-base text-foreground/90 leading-relaxed py-2",
            animate && "animate-slide-up-fade-in",
            animate && contentDelay
          )}
        >
          {content || "Content not available."}
        </p>
      </div>
    </div>
  )
}
