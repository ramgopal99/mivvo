"use client"

import { cn } from "@/lib/utils"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Minimal bullets: left-border accents, lots of whitespace. */
export function MinimalBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-xl mx-auto px-8",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-xl font-semibold text-foreground mb-8 tracking-tight",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <ul className="space-y-5">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className={cn(
              "pl-4 border-l-2 border-primary/40 text-muted-foreground leading-relaxed",
              animate && `${anim} opacity-0`,
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}
