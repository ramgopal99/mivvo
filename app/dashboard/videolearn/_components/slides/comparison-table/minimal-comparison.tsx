"use client"

import { cn } from "@/lib/utils"
import type { ComparisonTableSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function padRow(row: string[], colCount: number): string[] {
  const copy = [...row]
  while (copy.length < colCount) copy.push("")
  return copy.slice(0, colCount)
}

/** Minimal: clean, light styling. */
export function MinimalComparison({ title, headers, rows, isPlaying, className }: ComparisonTableSlideProps) {
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
            "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "overflow-x-auto",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <table className="w-full text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-medium text-foreground border-b border-border/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paddedRows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  animate && "animate-slide-up-fade-in opacity-0",
                  animate && (DELAY_CLASSES[Math.min(ri + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
                )}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-foreground/80 border-b border-border/40 last:border-b-0">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
