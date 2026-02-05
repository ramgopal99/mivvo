"use client"

import { cn } from "@/lib/utils"
import { CodeDisplay } from "./code-display"
import { DEFAULT_SLIDE_ANIMATION_CLASS } from "../animations"
import type { CodeBlockSlideProps } from "../types"

/** Dark code block: full dark theme. */
export function DarkCode({ title, code, language, isPlaying, className }: CodeBlockSlideProps) {
  const animate = !!isPlaying
  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full max-w-3xl mx-auto rounded-xl overflow-hidden bg-zinc-900/95 p-4",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-sm font-medium text-zinc-400 mb-3 px-1",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "[&_pre]:!bg-transparent [&_pre]:!p-0",
          animate && `${anim} opacity-0 animation-delay-350`
        )}
      >
        <CodeDisplay
          code={code}
          language={language}
          theme="dark"
          customStyle={{ background: "transparent", padding: 0 }}
        />
      </div>
    </div>
  )
}
