"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Gradient intro: full-bleed gradient background, title overlay. */
export function GradientTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "relative w-full rounded-xl overflow-hidden flex flex-col items-center justify-center text-center min-h-[200px] md:min-h-[240px] px-6",
        "bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50",
        className
      )}
    >
      <div className="relative z-10 max-w-3xl">
        <h1
          className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-3 md:mt-4 text-sm md:text-lg text-primary-foreground/90",
              animate && `${anim} animation-delay-350 opacity-0`
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
