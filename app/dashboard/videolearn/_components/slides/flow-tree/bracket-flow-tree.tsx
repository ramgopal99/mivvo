"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function BracketNode({
  node,
  index,
  animate,
}: {
  node: FlowTreeNode
  index: number
  animate: boolean
}) {
  const children = Array.isArray(node.children) ? node.children : []
  const delayClass = DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]
  if (children.length === 0) {
    return (
      <div
        className={cn(
          "rounded border-2 border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground text-center",
          animate && "animate-slide-up-fade-in",
          animate && delayClass
        )}
      >
        {node.label}
      </div>
    )
  }
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2",
        animate && "animate-slide-up-fade-in",
        animate && delayClass
      )}
    >
      <div className="rounded border-2 border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground text-center">
        {node.label}
      </div>
      <div className="h-4 w-px bg-border" aria-hidden />
      <div className="flex gap-6">
        {children.map((child, i) => (
          <BracketNode
            key={child.id}
            node={child}
            index={index + 1 + i}
            animate={animate}
          />
        ))}
      </div>
    </div>
  )
}

/** Bracket flow tree: tournament/bracket style. */
export function BracketFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-3xl mx-auto px-6 min-h-0 overflow-x-auto overflow-y-auto",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-xl font-bold text-foreground mb-4 text-center",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
      )}
      <div className="flex justify-center">
        {normalized.map((node, i) => (
          <BracketNode key={node.id} node={node} index={i} animate={animate} />
        ))}
      </div>
    </div>
  )
}
