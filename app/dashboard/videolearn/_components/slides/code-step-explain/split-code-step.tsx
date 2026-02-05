"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Split: title left, code + steps right (or code left, steps right). */
export function SplitCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex w-full max-w-4xl mx-auto px-6 gap-6 items-stretch",
        className
      )}
    >
      {title && (
        <div className="flex flex-col justify-center min-w-[140px]">
          <h2
            className={cn(
              "text-lg font-bold text-foreground leading-tight",
              animate && "animate-slide-up-fade-in opacity-0"
            )}
          >
            {title}
          </h2>
          <div
            className={cn(
              "mt-2 h-0.5 w-10 bg-primary rounded-full",
              animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
            )}
            aria-hidden
          />
        </div>
      )}
      <div className="w-px shrink-0 bg-border" aria-hidden />
      <div className="flex-1 min-w-0 flex gap-4">
        <div
          className={cn(
            "flex-1 min-w-0 shrink-0",
            animate && "animate-slide-up-fade-in opacity-0",
            animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
          )}
        >
          <CodeDisplay code={code} language={language} theme="dark" customStyle={{ padding: "0.75rem 1rem", fontSize: "0.8125rem" }} />
        </div>
        <ul className="flex-1 min-w-0 space-y-2 overflow-y-auto py-1">
          {steps.map((s, i) => (
            <li
              key={i}
              className={cn(
                "text-sm",
                animate && "animate-slide-up-fade-in opacity-0",
                animate && (DELAY_CLASSES[Math.min(i + 2, DELAY_CLASSES.length - 1)])
              )}
            >
              <span className="font-mono text-xs text-muted-foreground">{s.lineRef}</span> {s.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
