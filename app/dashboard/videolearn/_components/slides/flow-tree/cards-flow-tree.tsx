"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

function CardsNode({
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
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 shadow-sm",
        animate && "animate-slide-up-fade-in",
        animate && delayClass
      )}
    >
      <div className="font-semibold text-foreground">{node.label}</div>
      {children.length > 0 && (
        <div className="mt-3 space-y-2 pl-3 border-l-2 border-primary/30">
          {children.map((child, i) => (
            <CardsNode
              key={child.id}
              node={child}
              index={index + 1 + i}
              animate={animate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** Cards flow tree: each node in a card. */
export function CardsFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
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
            "text-xl font-bold text-foreground mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
      )}
      <div className="space-y-3">
        {normalized.map((node, i) => (
          <CardsNode key={node.id} node={node} index={i} animate={animate} />
        ))}
      </div>
    </div>
  )
}
