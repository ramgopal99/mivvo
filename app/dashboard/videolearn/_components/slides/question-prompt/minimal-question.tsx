"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Minimal: compact question and options. */
export function MinimalQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          {title}
        </h2>
      )}
      <p className={cn("text-lg font-semibold text-foreground mb-4", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <ul className="space-y-2">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-2 text-sm text-foreground/90", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
