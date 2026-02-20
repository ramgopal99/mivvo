"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

interface CodeDisplayProps {
  code: string
  language?: string
  theme?: "dark" | "light"
  showLineNumbers?: boolean
  className?: string
  customStyle?: React.CSSProperties
}

export function CodeDisplay({
  code,
  language = "javascript",
  theme = "dark",
  showLineNumbers = false,
  className,
  customStyle = {},
}: CodeDisplayProps) {
  const style = theme === "dark" ? oneDark : prism
  return (
    <div className={cn("overflow-x-auto rounded-lg", className)}>
      <SyntaxHighlighter
        language={language}
        style={style}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          borderRadius: "0.5rem",
          ...customStyle,
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
