"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { SlideWrapper } from "./slide-wrapper"
import type { CodeBlockSlideContent } from "./types"

interface CodeBlockSlideProps {
  title?: string
  content: CodeBlockSlideContent
}

export function CodeBlockSlide({ title, content }: CodeBlockSlideProps) {
  const { code, language = "javascript" } = content

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="rounded-lg overflow-hidden border bg-[#282c34]">
        <SyntaxHighlighter
          PreTag="div"
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            fontSize: "0.9rem",
            maxHeight: "360px",
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </SlideWrapper>
  )
}
