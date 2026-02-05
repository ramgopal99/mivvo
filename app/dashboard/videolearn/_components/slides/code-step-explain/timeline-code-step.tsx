"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

/** Timeline: vertical timeline with line refs. */
export function TimelineCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 gap-6",
        className
      )}
    >
      <div
        className={cn(
          "flex-1 min-w-0 shrink-0 max-h-[280px] overflow-auto",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" showLineNumbers customStyle={{ padding: "0.75rem 1rem", fontSize: "0.8125rem" }} />
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h2
            className={cn(
              "text-lg font-bold text-foreground mb-3",
              animate && "animate-slide-up-fade-in opacity-0"
            )}
          >
            {title}
          </h2>
        )}
        <ul className="relative space-y-0">
          {steps.map((s, i) => (
            <li
              key={i}
              className={cn(
                "relative flex gap-3 pl-6 pb-4 last:pb-0",
                animate && "animate-slide-up-fade-in opacity-0",
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
              )}
            >
              <span
                className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background"
                aria-hidden
              />
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[0.3125rem] top-5 bottom-0 w-px bg-border"
                  aria-hidden
                />
              )}
              <div>
                <span className="font-mono text-xs text-muted-foreground">{s.lineRef}</span>
                <p className="mt-0.5 text-sm text-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
