"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { CodeDisplay } from "./code-display"
import type { CodeBlockSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Line numbers code block: code with line numbers. */
export function LineNumbersCode({ title, code, language, isPlaying, animationClass, className }: CodeBlockSlideProps) {
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
        <h2
          className={cn(
            "text-xl font-bold text-foreground mb-4",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          animate && `${anim} opacity-0`,
          animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" showLineNumbers />
      </div>
    </div>
  )
}
