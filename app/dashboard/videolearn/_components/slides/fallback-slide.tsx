"use client"

import { SlideWrapper } from "./slide-wrapper"

interface FallbackSlideProps {
  title?: string
  /** Raw text when type-specific content isn't available */
  text: string
}

export function FallbackSlide({ title, text }: FallbackSlideProps) {
  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-line text-lg leading-relaxed text-foreground">
          {text || "No content"}
        </div>
      </div>
    </SlideWrapper>
  )
}
