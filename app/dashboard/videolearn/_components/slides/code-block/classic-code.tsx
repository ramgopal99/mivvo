"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { CodeBlockSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Classic code block: title + code. */
export function ClassicCode({ title, code, language, isPlaying, animationClass, className }: CodeBlockSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-3xl mx-auto px-6",
        className
      )}
    >
      {title && (
        <div className="mb-4">
          <h2
            className={cn(
              "text-xl md:text-2xl font-bold text-foreground",
              animate && `${anim} opacity-0`
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              "mt-1 h-0.5 w-12 bg-primary rounded-full",
              animate && `${anim} opacity-0 animation-delay-350`
            )}
            aria-hidden
          />
        </div>
      )}
      <div
        className={cn(
          animate && `${anim} opacity-0`,
          animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" />
      </div>
    </div>
  )
}
