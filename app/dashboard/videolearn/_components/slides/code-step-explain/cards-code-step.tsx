"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

/** Cards: each step in a card. */
export function CardsCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
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
      <div
        className={cn(
          "mb-4",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" customStyle={{ padding: "0.75rem 1rem", fontSize: "0.8125rem" }} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {steps.map((s, i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg border border-border bg-card p-3 text-sm",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
            )}
          >
            <span className="font-mono text-xs text-primary">{s.lineRef}</span>
            <p className="mt-1 text-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
