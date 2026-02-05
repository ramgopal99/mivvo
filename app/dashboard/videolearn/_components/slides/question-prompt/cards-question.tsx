"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Cards: each option in a card. */
export function CardsQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
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
      <p className={cn("text-lg font-bold text-foreground mb-4", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt, i) => (
          <div key={i} className={cn("rounded-lg border border-border bg-card p-4 text-foreground shadow-sm", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="text-xs font-semibold text-primary">{String.fromCharCode(65 + i)}</span>
            <p className="mt-1 text-sm">{opt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
