"use client"

import { cn } from "@/lib/utils"
import type { FlowTreeSlideProps, FlowTreeNode } from "../types"

const DELAY_CLASSES = ["animation-delay-350", "animation-delay-550", "animation-delay-750"] as const

function DarkNode({
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
    <div className="py-1">
      <div
        className={cn(
          "rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 border border-zinc-700",
          animate && "animate-slide-up-fade-in",
          animate && delayClass
        )}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        {node.label}
      </div>
      {children.length > 0 && (
        <div className="mt-1">
          {children.map((child, i) => (
            <DarkNode
              key={child.id}
              node={child}
              depth={depth + 1}
              index={index + 1 + i}
              animate={animate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** Dark flow tree: full dark theme. */
export function DarkFlowTree({ title, nodes, isPlaying, className }: FlowTreeSlideProps) {
  const animate = !!isPlaying
  const normalized = nodes.filter((n) => n && n.label)
  if (normalized.length === 0) return null
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-zinc-900/95 p-6 min-h-0 overflow-y-auto",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4",
            animate && "animate-slide-up-fade-in"
          )}
        >
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {normalized.map((node, i) => (
          <DarkNode key={node.id} node={node} depth={0} index={i} animate={animate} />
        ))}
      </div>
    </div>
  )
}
