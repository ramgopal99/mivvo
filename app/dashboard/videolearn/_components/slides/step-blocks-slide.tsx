"use client"

import { Badge } from "@/components/ui/badge"
import { SlideWrapper } from "./slide-wrapper"
import type { StepBlocksSlideContent } from "./types"

interface StepBlocksSlideProps {
  title?: string
  content: StepBlocksSlideContent
}

export function StepBlocksSlide({ title, content }: StepBlocksSlideProps) {
  const steps = content.steps ?? []

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="space-y-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-lg border bg-card/50 p-4"
          >
            <Badge variant="secondary" className="h-8 w-8 shrink-0 rounded-full p-0 justify-center text-sm font-semibold">
              {s.step}
            </Badge>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  )
}
