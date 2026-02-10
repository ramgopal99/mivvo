"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { SummarySlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Cards summary: each point in a polished card with subtle shadow and accent. */
export function CardsSummary({ title, points, isPlaying, animationClass, className }: SummarySlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-3xl mx-auto px-6",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-xl font-bold text-foreground mb-6 text-center",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {points.map((point, i) => (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-xl border border-border/80 bg-card/80 px-5 py-4 pl-6 text-sm text-foreground shadow-sm",
              "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary before:content-['']",
              animate && `${anim} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  )
}
