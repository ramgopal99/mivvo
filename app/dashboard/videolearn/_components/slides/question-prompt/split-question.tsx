"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Split: question left, options right. */
export function SplitQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div className={cn("flex w-full max-w-4xl mx-auto px-6 gap-6 md:gap-8 items-stretch min-h-0", className)}>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        {title && (
          <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
            {title}
          </h2>
        )}
        <p className={cn("text-xl font-bold text-foreground leading-snug", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
          {question}
        </p>
      </div>
      <div className="w-px shrink-0 bg-border self-stretch" aria-hidden />
      <ul className="flex-1 min-w-0 space-y-2 overflow-y-auto py-2">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-3 items-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="font-semibold text-primary">{String.fromCharCode(65 + i)}.</span>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
