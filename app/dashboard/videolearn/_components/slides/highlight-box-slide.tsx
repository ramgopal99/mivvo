"use client"

import { SlideWrapper } from "./slide-wrapper"
import type { HighlightBoxSlideContent } from "./types"

interface HighlightBoxSlideProps {
  title?: string
  content: HighlightBoxSlideContent
}

export function HighlightBoxSlide({ title, content }: HighlightBoxSlideProps) {
  const { highlight, supporting } = content

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
        <p className="text-xl font-medium text-foreground leading-relaxed">
          {highlight}
        </p>
        {supporting && (
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {supporting}
          </p>
        )}
      </div>
    </SlideWrapper>
  )
}
