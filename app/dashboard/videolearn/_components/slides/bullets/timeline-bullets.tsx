"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Timeline bullets: vertical line with connected items. */
export function TimelineBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
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
            "text-xl md:text-2xl font-bold text-foreground mb-6",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <div className="relative pl-6">
        <div
          className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/60 to-primary/30"
          aria-hidden
        />
        <ul className="space-y-6">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className={cn(
                "relative flex gap-4",
                animate && `${anim} opacity-0`,
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              <span
                className="absolute -left-6 top-2 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-sm"
                aria-hidden
              />
              <span className="text-base md:text-lg text-foreground/90 leading-relaxed pt-0.5">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
