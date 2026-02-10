"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { BulletSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

/** Checklist bullets: checkmark-style list. */
export function ChecklistBullets({ title, bullets, isPlaying, animationClass, className }: BulletSlideProps) {
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
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-2 ring-primary/30">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed pt-0.5">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
