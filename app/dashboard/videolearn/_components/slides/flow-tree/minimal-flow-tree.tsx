"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function MinimalNode({
  node,
  depth,
  index,
  animate,
}: {
  node: FlowTreeNode
  depth: number
  index: number
  animate: boolean
}) {
  const children = Array.isArray(node.children) ? node.children : []
  const delayClass = DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]
  return (
    <div className="py-0.5">
      <div
        className={cn(
          "flex items-center gap-2 text-sm",
          animate && "animate-slide-up-fade-in",
          animate && delayClass
        )}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <span className="text-muted-foreground">•</span>
        <span className="text-foreground">{node.label}</span>
      </div>
      {children.map((child, i) => (
        <MinimalNode
          key={child.id}
          node={child}
          depth={depth + 1}
          index={index + 1 + i}
          animate={animate}
        />
      ))}
    </div>
  )
}

/** Minimal flow tree: simple indented list. */
export function MinimalFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  let idx = 0
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
      )}
      <div className="space-y-0.5">
        {normalized.map((node) => (
          <MinimalNode
            key={node.id}
            node={node}
            depth={0}
            index={idx++}
            animate={animate}
          />
        ))}
      </div>
    </div>
  )
}
