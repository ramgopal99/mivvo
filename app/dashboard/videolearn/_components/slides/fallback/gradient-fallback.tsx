"use client"

import { cn } from "@/lib/utils"
import type { FallbackSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Gradient fallback: gradient accent. */
export function GradientFallback({ title, content, isPlaying, className }: FallbackSlideProps) {
  const animate = !!isPlaying
  const contentDelay = title ? DELAY_CLASSES[1] : DELAY_CLASSES[0]
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto rounded-xl overflow-hidden min-h-0 overflow-y-auto",
        "bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 md:p-8",
        className
      )}
    >
      {title ? (
        <div
          className={cn(
            "border-b border-primary/20 pb-4 mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{title}</h2>
        </div>
      ) : null}
      <p
        className={cn(
          "text-base md:text-lg text-foreground leading-relaxed",
          animate && "animate-slide-up-fade-in",
          animate && contentDelay
        )}
      >
        {content || "Content not available."}
      </p>
    </div>
  )
}
