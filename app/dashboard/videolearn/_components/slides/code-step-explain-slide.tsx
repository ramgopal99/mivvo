"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { SlideWrapper } from "./slide-wrapper"
import type { CodeStepExplainSlideContent } from "./types"

interface CodeStepExplainSlideProps {
  title?: string
  content: CodeStepExplainSlideContent
}

export function CodeStepExplainSlide({ title, content }: CodeStepExplainSlideProps) {
  const { code, language = "javascript", steps } = content
  const stepList = steps ?? []

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg overflow-hidden border bg-[#282c34]">
          <SyntaxHighlighter
            PreTag="div"
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem 1.25rem",
              fontSize: "0.85rem",
              maxHeight: "320px",
            }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <div className="space-y-3">
          {stepList.map((s, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border bg-card/50 p-3"
            >
              {s.lineRef && (
                <span className="shrink-0 font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {s.lineRef}
                </span>
              )}
              <p className="text-sm text-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}
