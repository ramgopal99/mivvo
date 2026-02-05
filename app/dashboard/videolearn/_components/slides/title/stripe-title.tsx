"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Bold stripe: colored horizontal bar behind title, high-impact. */
export function StripeTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6",
        className
      )}
    >
      <div className="relative w-full">
        <div
          className="absolute inset-0 h-14 md:h-16 -top-2 left-1/2 -translate-x-1/2 w-[calc(100%+2rem)] bg-primary/20 rounded-lg -z-10"
          aria-hidden
        />
        <h1
          className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-center px-4",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-muted-foreground text-center",
            animate && `${anim} animation-delay-350 opacity-0`
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
