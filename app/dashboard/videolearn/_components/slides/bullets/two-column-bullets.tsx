"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Two-column bullets: list split into 2 columns. */
export function TwoColumnBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const mid = Math.ceil(bullets.length / 2)
  const left = bullets.slice(0, mid)
  const right = bullets.slice(mid)
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-4xl mx-auto px-6",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-xl md:text-2xl font-bold text-foreground mb-6 text-center",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
        <ul className="space-y-3">
          {left.map((bullet, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 items-start",
                animate && `${anim} opacity-0`,
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-2 ring-primary/30" aria-hidden />
              <span className="text-sm md:text-base text-foreground/90 leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {right.map((bullet, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 items-start",
                animate && `${anim} opacity-0`,
                animate && (DELAY_CLASSES[Math.min(mid + i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-2 ring-primary/30" aria-hidden />
              <span className="text-sm md:text-base text-foreground/90 leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
