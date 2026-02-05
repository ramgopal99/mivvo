"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import type { CodeBlockSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550"] as const

/** Light code block: light theme, bordered. */
export function LightCode({ title, code, language, isPlaying, className }: CodeBlockSlideProps) {
  const animate = !!isPlaying
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
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "rounded-lg border border-border overflow-hidden",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="light" />
      </div>
    </div>
  )
}
