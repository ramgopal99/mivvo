"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { TitleSlideProps } from "../types"

/** Corner intro: title in bottom-left with accent line, editorial feel. */
export function CornerTitle({ title, subtitle, isPlaying, animationClass, className }: TitleSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex w-full h-full min-h-[180px] items-end justify-start px-6 md:px-10 pb-6 md:pb-10",
        className
      )}
    >
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="h-0.5 w-12 md:w-16 bg-primary rounded-full" />
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
              "text-sm md:text-base text-muted-foreground",
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
