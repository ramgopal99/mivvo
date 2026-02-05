"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "../code-block/code-display"
import type { CodeStepExplainSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

/** Dark: full dark theme. */
export function DarkCodeStep({ title, code, language, steps, isPlaying, className }: CodeStepExplainSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-3xl mx-auto rounded-xl overflow-hidden bg-zinc-900/95 p-4",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-sm font-medium text-zinc-400 mb-3",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "[&_pre]:!bg-transparent [&_pre]:!p-0",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <CodeDisplay code={code} language={language} theme="dark" customStyle={{ background: "transparent", padding: 0 }} />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-2 text-sm text-zinc-300",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(i + 1, DELAY_CLASSES.length - 1)])
            )}
          >
            <span className="font-mono text-xs text-zinc-500">{s.lineRef}</span>
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
