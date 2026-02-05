"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Stripe bullets: title with stripe highlight, bullets below. */
export function StripeBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6",
        className
      )}
    >
      <div className="relative w-full mb-6">
        <div
          className="absolute inset-0 h-14 md:h-16 -top-2 left-1/2 -translate-x-1/2 w-[calc(100%+2rem)] bg-primary/15 rounded-lg -z-10"
          aria-hidden
        />
        {title && (
          <h2
            className={cn(
              "text-xl md:text-2xl font-bold text-foreground text-center px-4",
              animate && `${anim} opacity-0`
            )}
          >
            {title}
          </h2>
        )}
      </div>
      <ul className="space-y-3 w-full">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-3 items-start",
              animate && `${anim} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/80" aria-hidden />
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
