"use client"

import type { FlowTreeSlideProps, FlowTreeVariant } from "../types"
import { ClassicFlowTree } from "./classic-flow-tree"
import { MinimalFlowTree } from "./minimal-flow-tree"
import { VerticalFlowTree } from "./vertical-flow-tree"
import { HorizontalFlowTree } from "./horizontal-flow-tree"
import { CardsFlowTree } from "./cards-flow-tree"
import { TimelineFlowTree } from "./timeline-flow-tree"
import { DarkFlowTree } from "./dark-flow-tree"
import { BracketFlowTree } from "./bracket-flow-tree"

const VARIANTS: Record<FlowTreeVariant, React.ComponentType<FlowTreeSlideProps>> = {
  classic: ClassicFlowTree,
  minimal: MinimalFlowTree,
  vertical: VerticalFlowTree,
  horizontal: HorizontalFlowTree,
  cards: CardsFlowTree,
  timeline: TimelineFlowTree,
  dark: DarkFlowTree,
  bracket: BracketFlowTree,
}

/** Picks and renders the requested flow tree variant. Defaults to classic. */
export function FlowTreeSlide({ variant = "classic", ...props }: FlowTreeSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
