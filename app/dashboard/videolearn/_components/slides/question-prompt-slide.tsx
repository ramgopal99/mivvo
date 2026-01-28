"use client"

import { SlideWrapper } from "./slide-wrapper"
import type { QuestionPromptSlideContent } from "./types"

interface QuestionPromptSlideProps {
  title?: string
  content: QuestionPromptSlideContent
}

export function QuestionPromptSlide({ title, content }: QuestionPromptSlideProps) {
  const { question, options } = content

  return (
    <SlideWrapper className="flex flex-col justify-center">
      {title && (
        <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      )}
      <p className="text-2xl font-medium text-foreground mb-6">{question}</p>
      {options && options.length > 0 && (
        <ul className="space-y-2">
          {options.map((opt, i) => (
            <li
              key={i}
              className="rounded-lg border bg-card/50 px-4 py-3 text-foreground"
            >
              <span className="font-medium text-muted-foreground mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </SlideWrapper>
  )
}
