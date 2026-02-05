"use client"

import { cn } from "@/lib/utils"
import type { FallbackSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Classic fallback: centered title + body. */
export function ClassicFallback({ title, content, isPlaying, className }: FallbackSlideProps) {
  const animate = !!isPlaying
  const contentDelay = title ? DELAY_CLASSES[1] : DELAY_CLASSES[0]
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 text-center min-h-0 overflow-y-auto",
        className
      )}
    >
      {title ? (
        <>
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
              animate && "animate-slide-up-fade-in"
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              "mt-2 h-0.5 w-16 bg-primary rounded-full",
              animate && "animate-slide-up-fade-in animation-delay-350"
            )}
            aria-hidden
          />
        </>
      ) : null}
      <p
        className={cn(
          title ? "mt-6" : "mt-0",
          "text-base md:text-lg text-foreground/90 leading-relaxed max-w-xl",
          animate && "animate-slide-up-fade-in",
          animate && contentDelay
        )}
      >
        {content || "Content not available."}
      </p>
    </div>
  )
}
