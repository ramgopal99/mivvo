"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

function VerticalNode({
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
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm",
          animate && "animate-slide-up-fade-in",
          animate && delayClass
        )}
      >
        {node.label}
      </div>
      {children.length > 0 && (
        <>
          <div className="h-4 w-px bg-border" aria-hidden />
          <div className="flex gap-4 flex-wrap justify-center">
            {children.map((child, i) => (
              <VerticalNode key={child.id} node={child} depth={depth + 1} index={index + 1 + i} animate={animate} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/** Vertical flow tree: top-down with boxes and connectors. */
export function VerticalFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-xl font-bold text-foreground mb-4 text-center", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <div className="flex flex-col items-center gap-2">
        {normalized.map((node, i) => (
          <VerticalNode key={node.id} node={node} depth={0} index={i} animate={animate} />
        ))}
      </div>
    </div>
  )
}
