"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SlideWrapper } from "./slide-wrapper"
import type { ComparisonTableSlideContent } from "./types"

interface ComparisonTableSlideProps {
  title?: string
  content: ComparisonTableSlideContent
}

export function ComparisonTableSlide({ title, content }: ComparisonTableSlideProps) {
  const { headers, rows } = content
  const cols = headers ?? []

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((h, i) => (
                <TableHead key={i} className="font-semibold">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(rows ?? []).map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SlideWrapper>
  )
}
