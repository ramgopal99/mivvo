"use client"

import { cn } from "@/lib/utils"
import type { ComparisonTableSlideProps } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function padRow(row: string[], colCount: number): string[] {
  const copy = [...row]
  while (copy.length < colCount) copy.push("")
  return copy.slice(0, colCount)
}

/** Dark: full dark theme. */
export function DarkComparison({ title, headers, rows, isPlaying, className }: ComparisonTableSlideProps) {
  const animate = !!isPlaying
  const colCount = headers.length
  const paddedRows = rows.map((r) => padRow(r, colCount))
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
            "text-sm font-medium text-zinc-400 mb-4",
            animate && "animate-slide-up-fade-in opacity-0"
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "overflow-x-auto rounded-lg",
          animate && "animate-slide-up-fade-in opacity-0",
          animate && (DELAY_CLASSES[0] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
        )}
      >
        <table className="w-full text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-zinc-200 border-b border-zinc-700">
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
                  "border-b border-zinc-800 last:border-b-0",
                  animate && "animate-slide-up-fade-in opacity-0",
                  animate && (DELAY_CLASSES[Math.min(ri + 1, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1])
                )}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-zinc-300">
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
