"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Underline accent: title with decorative underline, subtitle below. */
export function UnderlineTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 text-center",
        className
      )}
    >
      <h1
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground",
          animate && `${anim} opacity-0`
        )}
      >
        {title}
      </h1>
      <div
        className={cn(
          "mt-2 h-1 w-24 md:w-32 bg-primary rounded-full",
          animate && `${anim} animation-delay-350 opacity-0`
        )}
        aria-hidden
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-muted-foreground",
            animate && `${anim} animation-delay-550 opacity-0`
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
