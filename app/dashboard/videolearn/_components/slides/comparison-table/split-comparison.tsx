"use client"

import { cn } from "@/lib/utils"
import type { ComparisonTableSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function padRow(row: string[], colCount: number): string[] {
  const copy = [...row]
  while (copy.length < colCount) copy.push("")
  return copy.slice(0, colCount)
}

/** Split: title left, table right. */
export function SplitComparison({ title, headers, rows, isPlaying, className }: ComparisonTableSlideProps) {
  const animate = !!isPlaying
  const colCount = headers.length
  const paddedRows = rows.map((r) => padRow(r, colCount))
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
      <div
        className={cn(
          "flex-1 min-w-0 overflow-x-auto",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[1] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <table className="w-full text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-semibold text-foreground border-b border-border">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paddedRows.map((row, ri) => (
              <tr key={ri} className="border-b border-border/60 last:border-b-0">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-foreground/90">
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
