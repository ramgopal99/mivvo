"use client"

import { SlideWrapper } from "./slide-wrapper"
import type { FlowTreeSlideContent, FlowTreeNode } from "./types"

interface FlowTreeSlideProps {
  title?: string
  content: FlowTreeSlideContent
}

function TreeNode({ node, depth = 0 }: { node: FlowTreeNode; depth?: number }) {
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex items-center gap-2 rounded-md border bg-card/60 px-3 py-2 text-foreground"
        style={{ marginLeft: depth * 20 }}
      >
        <span className="font-medium">{node.label}</span>
      </div>
      {hasChildren && (
        <div className="mt-1 flex flex-col gap-1">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function FlowTreeSlide({ title, content }: FlowTreeSlideProps) {
  const nodes = content.nodes ?? []

  return (
    <SlideWrapper>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6">{title}</h2>
      )}
      <div className="space-y-2">
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </SlideWrapper>
  )
}
