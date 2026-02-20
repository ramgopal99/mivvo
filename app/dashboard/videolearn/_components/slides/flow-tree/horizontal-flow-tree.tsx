"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function HorizontalNode({ node, index, animate }: { node: FlowTreeNode; index: number; animate: boolean }) {
  const children = Array.isArray(node.children) ? node.children : []
  const delayClass = DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div
        className={cn(
          "rounded-lg border border-primary bg-primary/10 px-3 py-2 text-sm font-medium text-foreground shrink-0",
          animate && "animate-slide-up-fade-in",
          animate && delayClass
        )}
      >
        {node.label}
      </div>
      {children.length > 0 && (
        <>
          <span className="text-muted-foreground shrink-0">→</span>
          <div className="flex items-center gap-2 flex-wrap">
            {children.map((child, i) => (
              <HorizontalNode key={child.id} node={child} index={index + 1 + i} animate={animate} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/** Horizontal flow tree: left-to-right with arrows. */
export function HorizontalFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  return (
    <div className={cn("flex flex-col w-full max-w-3xl mx-auto px-6 min-h-0 overflow-x-auto overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-xl font-bold text-foreground mb-4", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        {normalized.map((node, i) => (
          <HorizontalNode key={node.id} node={node} index={i} animate={animate} />
        ))}
      </div>
    </div>
  )
}
