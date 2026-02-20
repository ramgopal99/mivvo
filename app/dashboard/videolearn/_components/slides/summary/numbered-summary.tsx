"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { SummarySlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Numbered summary: prominent 1, 2, 3… with accent circles and clear hierarchy. */
export function NumberedSummary({ title, points, isPlaying, animationClass, className }: SummarySlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-2xl mx-auto px-6",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-foreground mb-8 text-center",
            animate && `${animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <ol className="space-y-5 w-full">
        {points.map((point, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-5 items-start",
              animate && `${animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
              {i + 1}
            </span>
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed pt-1.5">{point}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
