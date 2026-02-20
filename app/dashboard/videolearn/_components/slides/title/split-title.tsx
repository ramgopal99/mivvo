"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Split layout: title on left, decorative accent bar on right. */
export function SplitTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 md:px-10 items-stretch gap-8 md:gap-12",
        className
      )}
    >
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1
          className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground",
              animate && `${anim} animation-delay-350 opacity-0`
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div
        className="w-1.5 md:w-2 shrink-0 rounded-full bg-primary"
        aria-hidden
      />
    </div>
  )
}
