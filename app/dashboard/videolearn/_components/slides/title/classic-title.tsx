"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Classic PPT intro: centered title + subtitle, clean and professional. */
export function ClassicTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto px-6",
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
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl text-muted-foreground font-medium",
            animate && `${anim} animation-delay-350 opacity-0`
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
