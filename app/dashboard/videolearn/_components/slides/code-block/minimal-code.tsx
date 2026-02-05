"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { CodeBlockSlideProps } from "../types"

/** Minimal code block: compact, code-focused. */
export function MinimalCode({ title, code, language, isPlaying, animationClass, className }: CodeBlockSlideProps) {
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
            "text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider",
            animate && `${anim} opacity-0`
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          animate && `${anim} opacity-0 animation-delay-350`
        )}
      >
        <CodeDisplay
          code={code}
          language={language}
          theme="dark"
          customStyle={{ padding: "0.75rem 1rem", fontSize: "0.8125rem" }}
        />
      </div>
    </div>
  )
}
