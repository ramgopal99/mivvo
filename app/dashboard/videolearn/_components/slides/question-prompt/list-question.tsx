"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** List: simple bullet-style options. */
export function ListQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          {title}
        </h2>
      )}
      <p className={cn("text-lg font-semibold text-foreground mb-4", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <ul className="space-y-2">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-3 items-start", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="text-foreground/90">{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
