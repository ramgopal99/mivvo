"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Minimal: compact stacked layout. */
export function MinimalCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
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
            "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3",
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
        <CodeDisplay code={code} language={language} theme="dark" customStyle={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem" }} />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-2 text-xs",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
            )}
          >
            <span className="font-mono text-muted-foreground">{s.lineRef}</span>
            <span className="text-foreground">{s.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
