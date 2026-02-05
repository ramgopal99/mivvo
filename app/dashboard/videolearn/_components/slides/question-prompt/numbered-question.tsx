"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Numbered: question + numbered options. */
export function NumberedQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          {title}
        </h2>
      )}
      <p className={cn("text-xl font-bold text-foreground mb-6", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <ol className="space-y-3 list-none">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-4 items-start", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="text-foreground pt-1">{opt}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
