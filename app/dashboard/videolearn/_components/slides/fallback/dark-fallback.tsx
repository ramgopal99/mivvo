"use client"

import { cn } from "@/lib/utils"
import type { FallbackSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Dark fallback: full dark theme. */
export function DarkFallback({ title, content, isPlaying, className }: FallbackSlideProps) {
  const animate = !!isPlaying
  const contentDelay = title ? DELAY_CLASSES[1] : DELAY_CLASSES[0]
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto rounded-xl overflow-hidden min-h-0 overflow-y-auto bg-zinc-900/95 p-6 md:p-8",
        className
      )}
    >
      {title ? (
        <h2
          className={cn(
            "text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
      ) : null}
      <p
        className={cn(
          "text-base md:text-lg text-zinc-200 leading-relaxed",
          animate && "animate-slide-up-fade-in",
          animate && contentDelay
        )}
      >
        {content || "Content not available."}
      </p>
    </div>
  )
}
