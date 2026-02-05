"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import type { CodeBlockSlideProps } from "../types"

/** Terminal-style code block: terminal window look. */
export function TerminalCode({ title, code, language, isPlaying, className }: CodeBlockSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-3xl mx-auto px-6",
        className
      )}
    >
      <div
        className={cn(
          "rounded-t-lg bg-zinc-800 px-4 py-2.5 flex items-center gap-2 border border-b-0 border-zinc-700",
          animate && "animate-slide-up-fade-in opacity-0"
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden />
        {title && (
          <span className="ml-2 text-xs text-zinc-400 font-medium">{title}</span>
        )}
      </div>
      <div
        className={cn(
          "rounded-b-lg overflow-hidden border border-zinc-700 border-t-0",
          animate && "animate-slide-up-fade-in opacity-0 animation-delay-350"
        )}
      >
        <CodeDisplay
          code={code}
          language={language}
          theme="dark"
          customStyle={{ margin: 0, border: "none" }}
        />
      </div>
    </div>
  )
}
