"use client"

import { SlideWrapper } from "./slide-wrapper"
import type { SummarySlideContent } from "./types"

interface SummarySlideProps {
  title?: string
  content: SummarySlideContent
}

export function SummarySlide({ title, content }: SummarySlideProps) {
  const points = content.points ?? []

  return (
    <SlideWrapper>
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        {title ?? "Summary"}
      </h2>
      <ul className="space-y-4">
        {points.map((point, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-1.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <span className="text-lg text-foreground leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </SlideWrapper>
  )
}
