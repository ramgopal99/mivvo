"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

/** Classic: code left, step explanations right. */
export function ClassicCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-4xl mx-auto px-6",
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
      <div className="flex gap-6 items-stretch min-h-0">
        <div
          className={cn(
            "flex-1 min-w-0 shrink-0",
            animate && "animate-slide-up-fade-in opacity-0",
            animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
          )}
        >
          <CodeDisplay code={code} language={language} theme="dark" customStyle={{ padding: "0.75rem 1rem", fontSize: "0.8125rem" }} />
        </div>
        <div className="w-px shrink-0 bg-border" aria-hidden />
        <ul className="flex-1 min-w-0 space-y-3 overflow-y-auto py-1">
          {steps.map((s, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 text-sm",
                animate && "animate-slide-up-fade-in opacity-0",
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
              )}
            >
              <span className="shrink-0 font-mono text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                {s.lineRef}
              </span>
              <span className="text-foreground">{s.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
