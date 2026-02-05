"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { SummarySlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Split summary: title left, points right with accent bar and refined typography. */
export function SplitSummary({ title, points, isPlaying, animationClass, className }: SummarySlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 md:px-10 gap-8 md:gap-12 items-stretch",
        className
      )}
    >
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {title && (
          <>
            <h2
              className={cn(
                "text-2xl md:text-3xl font-bold text-foreground leading-tight",
                animate && "animate-slide-up-fade-in opacity-0"
              )}
            >
              {title}
            </h2>
            <div
              className={cn(
                "mt-3 h-1 w-12 bg-primary rounded-full",
                animate && `${anim} opacity-0 animation-delay-350`
              )}
              aria-hidden
            />
          </>
        )}
      </div>
      <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-primary/60 to-primary" aria-hidden />
      <ul className="flex flex-col justify-center gap-4 flex-1 min-w-0 py-2">
        {points.map((point, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-3 items-start text-foreground/90",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="text-base md:text-lg leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
