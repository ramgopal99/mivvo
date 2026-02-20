"use client"

import { cn } from "@/lib/utils"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import { getLineDelayStyle } from "../line-timing"
import type { QuestionPromptSlideProps } from "../types"

/** Dark: full dark theme. */
export function DarkQuestion({ title, question, options, isPlaying, animationClass, lineDelays, className }: QuestionPromptSlideProps) {
  const animate = !!isPlaying
  const anim = animationClass ?? DEFAULT_SLIDE_ANIMATION_CLASS
  const li = (i: number) => (title ? i + 1 : i)
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-zinc-900/95 p-6 min-h-0 overflow-y-auto",
        className
      )}
    >
      {title && (
        <h2 className={cn("text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3", animate && anim)} style={getLineDelayStyle(0, animate, lineDelays)}>
          {title}
        </h2>
      )}
      <p className={cn("text-xl font-bold text-zinc-100 mb-5", animate && anim)} style={getLineDelayStyle(li(0), animate, lineDelays)}>
        {question}
      </p>
      <ul className="space-y-2">
        {options.map((opt, i) => (
          <li key={i} className={cn("flex gap-3 rounded-lg bg-zinc-800 px-4 py-3 text-zinc-200 border border-zinc-700", animate && anim)} style={getLineDelayStyle(li(1 + i), animate, lineDelays)}>
            <span className="text-zinc-500 font-medium">{String.fromCharCode(65 + i)}.</span>
            <span>{opt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
