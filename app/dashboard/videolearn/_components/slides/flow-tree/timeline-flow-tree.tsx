"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950"] as const

function TimelineNode({
  node,
  depth,
  index,
  animate,
  isLast,
}: {
  node: FlowTreeNode
  depth: number
  index: number
  animate: boolean
  isLast: boolean
}) {
  const children = Array.isArray(node.children) ? node.children : []
  const delayClass = DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div
          className={cn(
            "h-3 w-3 rounded-full border-2 border-primary bg-background",
            animate && "animate-slide-up-fade-in",
            animate && delayClass
          )}
          aria-hidden
        />
        {!isLast && <div className="w-px flex-1 min-h-[8px] bg-border mt-1" aria-hidden />}
      </div>
      <div className={cn("pb-4", !isLast && "min-h-[32px]")}>
        <div
          className={cn(
            "rounded-md border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground",
            animate && "animate-slide-up-fade-in",
            animate && delayClass
          )}
        >
          {node.label}
        </div>
        {children.length > 0 && (
          <div className="mt-2 ml-4 space-y-2 border-l-2 border-border pl-4">
            {children.map((child, i) => (
              <TimelineNode
                key={child.id}
                node={child}
                depth={depth + 1}
                index={index + 1 + i}
                animate={animate}
                isLast={i === children.length - 1 && !child.children?.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** Timeline flow tree: vertical timeline with nodes. */
export function TimelineFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  return (
    <div className={cn("flex flex-col w-full max-w-2xl mx-auto px-6 min-h-0 overflow-y-auto", className)}>
      {title && (
        <h2 className={cn("text-xl font-bold text-foreground mb-4", animate && "animate-slide-up-fade-in")}>
          {title}
        </h2>
      )}
      <div className="space-y-0">
        {normalized.map((node, i) => (
          <TimelineNode
            key={node.id}
            node={node}
            depth={0}
            index={i}
            animate={animate}
            isLast={i === normalized.length - 1 && !node.children?.length}
          />
        ))}
      </div>
    </div>
  )
}
