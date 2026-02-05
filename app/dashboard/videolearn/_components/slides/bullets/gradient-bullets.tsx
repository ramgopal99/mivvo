"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Gradient bullets: full-bleed gradient bg. */
export function GradientBullets({ title, bullets, isPlaying, className }: BulletSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "relative w-full rounded-xl overflow-hidden flex flex-col justify-center min-h-[220px] md:min-h-[260px] px-8 py-8",
        "bg-gradient-to-br from-primary via-primary/90 to-primary/80",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" aria-hidden />
      <div className="relative z-10 max-w-2xl">
        {title && (
          <h2
            className={cn(
              "text-xl md:text-2xl font-bold text-primary-foreground mb-5 drop-shadow-sm",
              animate && `${anim} opacity-0`
            )}
          >
            {title}
          </h2>
        )}
        <ul className="space-y-3">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 items-start text-primary-foreground/95",
                animate && `${anim} opacity-0`,
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden />
              <span className="text-base md:text-lg leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
