"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { SummarySlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Classic summary: centered title + bullet list, polished and professional. */
export function ClassicSummary({ title, points, isPlaying, animationClass, className }: SummarySlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6",
        className
      )}
    >
      {title && (
        <div className="w-full text-center mb-6">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
              animate && `${anim} opacity-0`
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              "mt-2 h-0.5 w-16 bg-primary rounded-full mx-auto",
              animate && `${anim} opacity-0 animation-delay-350`
            )}
            aria-hidden
          />
        </div>
      )}
      <ul className="space-y-4 w-full">
        {points.map((point, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-4 items-start group",
              animate && `${anim} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/20" aria-hidden />
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
