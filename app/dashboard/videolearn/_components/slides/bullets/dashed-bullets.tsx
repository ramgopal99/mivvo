"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Dashed bullets: dash instead of dot, editorial style. */
export function DashedBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
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
      <ul className="space-y-4">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-4 items-start",
              animate && `${anim} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            <span className="mt-2 h-px w-6 shrink-0 bg-primary/80" aria-hidden />
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
