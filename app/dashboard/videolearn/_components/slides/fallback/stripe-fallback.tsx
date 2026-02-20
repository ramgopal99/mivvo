"use client"

import { cn } from "@/lib/utils"
import type { FallbackSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Stripe fallback: title with stripe highlight. */
export function StripeFallback({ title, content, isPlaying, className }: FallbackSlideProps) {
  const animate = !!isPlaying
  const contentDelay = title ? DELAY_CLASSES[1] : DELAY_CLASSES[0]
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto",
        className
      )}
    >
      {title ? (
        <div
          className={cn(
            "relative pl-4 border-l-4 border-primary mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{title}</h2>
        </div>
      ) : null}
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
