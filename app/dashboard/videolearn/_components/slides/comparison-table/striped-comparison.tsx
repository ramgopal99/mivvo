"use client"

import { cn } from "@/lib/utils"
import type { ComparisonTableSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

function padRow(row: string[], colCount: number): string[] {
  const copy = [...row]
  while (copy.length < colCount) copy.push("")
  return copy.slice(0, colCount)
}

/** Striped: alternating row colors. */
export function StripedComparison({ title, headers, rows, isPlaying, className }: ComparisonTableSlideProps) {
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
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr
              className={cn(
                "bg-primary/10 text-foreground",
                animate && "animate-slide-up-fade-in opacity-0",
                animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
              )}
            >
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold">
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
                  "border-t border-border",
                  ri % 2 === 1 && "bg-muted/40",
                  animate && "animate-slide-up-fade-in opacity-0",
                  animate && (DELAY_CLASSES[Math.min(ri + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
                )}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-foreground/90">
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
