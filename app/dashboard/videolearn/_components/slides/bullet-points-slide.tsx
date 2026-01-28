"use client"

import { SlideWrapper } from "./slide-wrapper"
import type { BulletPointsSlideContent } from "./types"

interface BulletPointsSlideProps {
  title?: string
  content: BulletPointsSlideContent
}

export function BulletPointsSlide({ title, content }: BulletPointsSlideProps) {
  const bullets = content.bullets ?? []

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-3 items-start text-lg leading-relaxed"
          >
            <span className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
            <span className="text-foreground">{bullet}</span>
          </li>
        ))}
      </ul>
    </SlideWrapper>
  )
}
