"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { CodeBlockSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Split code block: title left, code right. */
export function SplitCode({ title, code, language, isPlaying, className }: CodeBlockSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 md:px-10 gap-6 md:gap-8 items-stretch",
        className
      )}
    >
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {title && (
          <>
            <h2
              className={cn(
                "text-xl md:text-2xl font-bold text-foreground leading-tight",
                animate && "animate-slide-up-fade-in opacity-0"
              )}
            >
              {title}
            </h2>
            <div
              className={cn(
                "mt-3 h-1 w-12 bg-primary rounded-full",
                animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
              )}
              aria-hidden
            />
          </>
        )}
      </div>
      <div
        className={cn(
          "w-px shrink-0 bg-border",
          animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "flex-1 min-w-0 flex items-center",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" className="w-full" />
      </div>
    </div>
  )
}
