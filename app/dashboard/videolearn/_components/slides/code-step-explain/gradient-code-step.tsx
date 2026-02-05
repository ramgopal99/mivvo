"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Gradient: gradient accent with code and steps. */
export function GradientCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-3xl mx-auto rounded-xl overflow-hidden",
        "bg-gradient-to-b from-primary/10 via-primary/5 to-transparent",
        className
      )}
    >
      {title && (
        <div
          className={cn(
            "px-6 py-4 border-b border-primary/20",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
      )}
      <div className="p-4 space-y-4">
        <div
          className={cn(
            "[&_pre]:!bg-zinc-900/80",
            animate && "animate-slide-up-fade-in opacity-0",
            animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
          )}
        >
          <CodeDisplay code={code} language={language} theme="dark" customStyle={{ background: "rgba(24,24,27,0.8)" }} />
        </div>
        <ul className="space-y-2">
          {steps.map((s, i) => (
            <li
              key={i}
              className={cn(
                "flex gap-3 text-sm",
                animate && "animate-slide-up-fade-in opacity-0",
                animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
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
    </div>
  )
}
