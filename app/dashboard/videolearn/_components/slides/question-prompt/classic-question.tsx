"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Classic: centered question + option list. */
export function ClassicQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const lineIndex = (i: number) => (title ? i + 1 : i) // 0 = title (if present), then question, then options
  return (
    <div className={cn("flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 text-center min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          {title}
        </h2>
      )}
      <p className={cn("text-xl md:text-2xl font-bold text-foreground mb-6", animate && anim)} style={getLineDelayStyle(lineIndex(0), animate, lineDelays)}>
        {question}
      </p>
      <ul className="space-y-3 w-full max-w-md text-left">
        {options.map((opt, i) => (
          <li
            key={i}
            className={cn("flex gap-3 items-center rounded-lg border border-border bg-card px-4 py-3 text-foreground", animate && anim)}
            style={getLineDelayStyle(lineIndex(1 + i), animate, lineDelays)}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
