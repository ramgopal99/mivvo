"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750", "animation-delay-950", "animation-delay-1150"] as const

function getDelayClass(index: number): string {
  return DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)] ?? DELAY_CLASSES[DELAY_CLASSES.length - 1]
}

function ClassicNode({
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
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center gap-3",
          animate && "animate-slide-up-fade-in",
          animate && getDelayClass(index)
        )}
      >
        <div className="flex shrink-0 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 px-3 py-2 text-sm font-semibold text-foreground">
          {node.label}
        </div>
      </div>
      {children.length > 0 && (
        <div className={cn("ml-6 mt-1 border-l-2 border-border pl-4", !isLast && "pb-2")}>
          {children.map((child, i) => (
            <ClassicNode
              key={child.id}
              node={child}
              depth={depth + 1}
              index={index + 1 + i}
              animate={animate}
              isLast={i === children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** Classic flow tree: vertical hierarchy with connecting lines. */
export function ClassicFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
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
      <div className="space-y-1">
        {normalized.map((node, i) => (
          <ClassicNode
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
