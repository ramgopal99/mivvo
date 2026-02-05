"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Gradient: gradient accent. */
export function GradientQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-2xl mx-auto rounded-xl overflow-hidden min-h-0 overflow-y-auto",
        "bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20",
        className
      )}
    >
      {title && (
        <div className={cn("mb-2", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          <h2 className="text-sm font-medium text-primary uppercase tracking-wider">{title}</h2>
        </div>
      )}
      <p className={cn("text-xl font-bold text-foreground mb-5", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <ul className="space-y-2">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-3 items-center rounded-lg bg-background/80 px-4 py-3 text-foreground border border-primary/20", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="text-sm font-semibold text-primary">{String.fromCharCode(65 + i)}</span>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
