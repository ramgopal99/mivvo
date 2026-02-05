"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

/** Stacked: code top, steps below. */
export function StackedCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-3xl mx-auto px-6",
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
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-3 items-start text-sm",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(i + 2, DELAY_CLASSES.length - 1)])
            )}
          >
            <span className="shrink-0 font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
              {s.lineRef}
            </span>
            <span className="text-foreground">{s.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
