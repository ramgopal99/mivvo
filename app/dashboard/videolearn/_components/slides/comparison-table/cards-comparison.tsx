"use client"

import { cn } from "@/lib/utils"
import type { ComparisonTableSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function padRow(row: string[], colCount: number): string[] {
  const copy = [...row]
  while (copy.length < colCount) copy.push("")
  return copy.slice(0, colCount)
}

/** Cards: each row as a card. */
export function CardsComparison({ title, headers, rows, isPlaying, className }: ComparisonTableSlideProps) {
  const animate = !!isPlaying
  const colCount = headers.length
  const paddedRows = rows.map((r) => padRow(r, colCount))
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
            "text-xl font-bold text-foreground mb-4",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "mb-3 flex gap-2 flex-wrap",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        {headers.map((h, i) => (
          <span key={i} className="text-xs font-medium text-muted-foreground uppercase">
            {h}
            {i < headers.length - 1 && <span className="mx-1">•</span>}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        {paddedRows.map((row, ri) => (
          <div
            key={ri}
            className={cn(
              "rounded-lg border border-border bg-card p-4 grid gap-2",
              "grid-cols-[repeat(auto-fit,minmax(100px,1fr))]",
              animate && "animate-slide-up-fade-in opacity-0",
              animate && (DELAY_CLASSES[Math.min(ri + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
            )}
          >
            {row.map((cell, ci) => (
              <div key={ci}>
                <span className="text-xs text-muted-foreground">{headers[ci]}: </span>
                <span className="text-sm text-foreground">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
