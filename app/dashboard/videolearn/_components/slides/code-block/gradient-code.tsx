"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import type { CodeBlockSlideProps } from "../types"

/** Gradient code block: gradient header, code below. */
export function GradientCode({ title, code, language, isPlaying, className }: CodeBlockSlideProps) {
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
      <div
        className={cn(
          "p-4 [&_pre]:!bg-zinc-900/80",
          animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
        )}
      >
        <CodeDisplay
          code={code}
          language={language}
          theme="dark"
          customStyle={{ background: "rgba(24,24,27,0.8)" }}
        />
      </div>
    </div>
  )
}
