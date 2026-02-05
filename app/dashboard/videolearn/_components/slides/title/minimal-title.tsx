"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Minimal intro: large title only, lots of whitespace, modern. */
export function MinimalTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-8",
        className
      )}
    >
      <h1
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight",
          animate && `${anim} opacity-0`
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "mt-8 text-base md:text-lg text-muted-foreground max-w-xl",
            animate && `${anim} animation-delay-350 opacity-0`
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
