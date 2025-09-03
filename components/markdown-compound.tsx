"use client"

import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import { cn } from "@/lib/utils"
import type { Components } from "react-markdown"
import type { Pluggable } from "unified"

// Import syntax highlighting CSS
import "highlight.js/styles/github-dark.css"

interface MarkdownCompoundProps {
  children: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "compact" | "rich"
  customComponents?: Components
  remarkPlugins?: Pluggable[]
  rehypePlugins?: Pluggable[]
  skipHtml?: boolean
  allowHtml?: boolean
}

const sizeClasses = {
  sm: "prose-sm",
  md: "prose-base",
  lg: "prose-lg"
}

const variantClasses = {
  default: "",
  compact: "prose-compact",
  rich: "prose-stone dark:prose-invert"
}

// Default custom components for enhanced styling
const defaultComponents: Components = {
  // Enhanced pre block for code blocks
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 border border-border rounded-lg p-4 overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
  // Enhanced code block with syntax highlighting
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    const isInline = !match
    return !isInline ? (
      <code className={cn(className, "block text-gray-100 font-mono text-sm leading-relaxed")} {...props}>
        {children}
      </code>
    ) : (
      <code
        className={cn(
          className,
          "bg-gray-900 px-2 py-1 rounded font-mono text-white text-sm"
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  // Enhanced blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-muted-foreground/20 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Enhanced links
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline underline-offset-4"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  // Enhanced headings with consistent sizing
  h1: ({ children, ...props }) => (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl text-foreground mb-4 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground mb-3 mt-6 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground mb-2 mt-5 first:mt-0" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="scroll-m-20 text-lg font-semibold tracking-tight text-foreground mb-2 mt-4 first:mt-0" {...props}>
      {children}
    </h4>
  ),
  // Enhanced lists with consistent sizing
  ul: ({ children, ...props }) => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-1 text-foreground text-base" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-1 text-foreground text-base" {...props}>
      {children}
    </ol>
  ),
  // Enhanced table (GFM)
  table: ({ children, ...props }) => (
    <div className="my-6 max-w-2xl overflow-x-auto">
      <table className="min-w-full border-collapse border border-border rounded-md" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/50 border-b border-border" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="[&_tr:last-child]:border-0" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/30" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="h-10 px-3 py-2 text-left align-middle font-semibold text-foreground border-r border-border/50 last:border-r-0 [&:has([role=checkbox])]:pr-0 text-sm" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-3 py-2 align-middle text-foreground border-r border-border/50 last:border-r-0 [&:has([role=checkbox])]:pr-0 text-sm" {...props}>
      {children}
    </td>
  ),
  // Enhanced paragraph with consistent sizing
  p: ({ children, ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4 text-foreground text-base" {...props}>
      {children}
    </p>
  ),
  // Enhanced strong
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  // Enhanced emphasis
  em: ({ children, ...props }) => (
    <em className="italic text-foreground" {...props}>
      {children}
    </em>
  ),
  // Strikethrough support (GFM)
  del: ({ children, ...props }) => (
    <del className="line-through text-muted-foreground" {...props}>
      {children}
    </del>
  ),
  // Task list support (GFM)
  li: ({ children, ...props }) => {
    // Helper function to extract text content from React nodes
    const extractTextContent = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node
      }
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<{ children?: React.ReactNode }>
        return React.Children.toArray(element.props.children)
          .map(extractTextContent)
          .join('')
      }
      if (Array.isArray(node)) {
        return node.map(extractTextContent).join('')
      }
      return ''
    }

    // Helper function to remove checkbox syntax from React nodes
    const removeCheckboxSyntax = (node: React.ReactNode): React.ReactNode => {
      if (typeof node === 'string') {
        return node.replace(/^\s*\[([ x])\]\s*/, '')
      }
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<{ children?: React.ReactNode }>
        return React.cloneElement(element, {
          ...element.props,
          children: React.Children.map(element.props.children, removeCheckboxSyntax)
        })
      }
      if (Array.isArray(node)) {
        return node.map(removeCheckboxSyntax)
      }
      return node
    }

    // Get the full text content to check for task list syntax
    const fullText = extractTextContent(children)
    const taskMatch = fullText.match(/^\s*\[([ x])\]/)

    if (taskMatch) {
      const isChecked = taskMatch[1] === 'x'
      const processedChildren = removeCheckboxSyntax(children)

      return (
        <li className="flex items-start gap-3 my-1 pl-0" {...props}>
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            aria-label={isChecked ? "Completed task" : "Incomplete task"}
            className="mt-0.5 h-4 w-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="flex-1 text-foreground leading-relaxed text-base">{processedChildren}</span>
        </li>
      )
    }

    return (
      <li className="my-1 text-foreground leading-relaxed text-base" {...props}>
        {children}
      </li>
    )
  }
}

export function MarkdownCompound({
  children,
  className,
  size = "md",
  variant = "default",
  customComponents = {},
  remarkPlugins = [],
  rehypePlugins = [],
  skipHtml,
  allowHtml = true
}: MarkdownCompoundProps) {
  // Merge default components with custom ones
  const components: Components = {
    ...defaultComponents,
    ...customComponents
  }

  // Determine final skipHtml value
  const finalSkipHtml = skipHtml !== undefined ? skipHtml : !allowHtml

  // Default plugins with GFM configuration
  const defaultRemarkPlugins: Pluggable[] = [
    [remarkGfm, {
      singleTilde: false, // ~~strikethrough~~ instead of ~strikethrough~
      tableCellPadding: false, // GitHub-style tables without padding
      tablePipeAlign: false, // Disable pipe alignment in tables
      stringLength: (s: string) => s.length, // Custom string length function
      tasklists: false // Disable default task list processing
    }]
  ]

  // Build default rehype plugins conditionally based on HTML allowance
  const defaultRehypePlugins: Pluggable[] = []

  // Always include syntax highlighting
  defaultRehypePlugins.push(rehypeHighlight)

  // Add HTML processing plugins when HTML is allowed
  if (allowHtml) {
    defaultRehypePlugins.push(
      // Parse raw HTML (must come before rehype-sanitize)
      rehypeRaw,
      // Sanitize HTML for security
      rehypeSanitize
    )
  }

  // Combine plugins
  const allRemarkPlugins = [...defaultRemarkPlugins, ...remarkPlugins]
  const allRehypePlugins = [...defaultRehypePlugins, ...rehypePlugins]

  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Markdown
        remarkPlugins={allRemarkPlugins}
        rehypePlugins={allRehypePlugins}
        components={components}
        skipHtml={finalSkipHtml}
        urlTransform={(url) => {
          // Safe URL transformation
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
          }
          if (url.startsWith('//')) {
            return `https:${url}`
          }
          return url
        }}
      >
        {children}
      </Markdown>
    </div>
  )
}

// Convenience variants
export function MarkdownCompact(props: Omit<MarkdownCompoundProps, 'variant'>) {
  return <MarkdownCompound {...props} variant="compact" allowHtml={props.allowHtml ?? true} />
}

export function MarkdownRich(props: Omit<MarkdownCompoundProps, 'variant'>) {
  return <MarkdownCompound {...props} variant="rich" allowHtml={props.allowHtml ?? true} />
}

export function MarkdownSmall(props: Omit<MarkdownCompoundProps, 'size'>) {
  return <MarkdownCompound {...props} size="sm" allowHtml={props.allowHtml ?? true} />
}

export function MarkdownLarge(props: Omit<MarkdownCompoundProps, 'size'>) {
  return <MarkdownCompound {...props} size="lg" allowHtml={props.allowHtml ?? true} />
}

// Utility function to create custom markdown components
export function createMarkdownComponents(overrides: Components): Components {
  return {
    ...defaultComponents,
    ...overrides
  }
}
