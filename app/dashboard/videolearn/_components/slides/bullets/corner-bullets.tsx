"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Corner bullets: title bottom-left, bullets below, editorial feel. */
export function CornerBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex w-full h-full min-h-[180px] flex-col justify-end px-6 md:px-10 pb-6 md:pb-10",
        className
      )}
    >
      <div className="flex flex-col gap-4 max-w-2xl">
        {title && (
          <>
            <div
              className={cn(
                "h-0.5 w-12 md:w-16 bg-primary rounded-full",
                animate && `${anim} opacity-0`
              )}
              aria-hidden
            />
            <h2
              className={cn(
                "text-2xl md:text-3xl font-bold text-foreground leading-tight",
                animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
              )}
            >
              {title}
            </h2>
          </>
        )}
        <ul className="space-y-3">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 items-start text-muted-foreground",
                animate && `${anim} opacity-0`,
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="text-sm md:text-base leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
