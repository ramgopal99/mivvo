"use client"

import type { ComparisonTableSlideProps, ComparisonTableVariant } from "../types"
import { ClassicComparison } from "./classic-comparison"
import { MinimalComparison } from "./minimal-comparison"
import { StripedComparison } from "./striped-comparison"
import { CardsComparison } from "./cards-comparison"
import { SplitComparison } from "./split-comparison"
import { DarkComparison } from "./dark-comparison"
import { GradientComparison } from "./gradient-comparison"
import { BorderedComparison } from "./bordered-comparison"

const VARIANTS: Record<ComparisonTableVariant, React.ComponentType<ComparisonTableSlideProps>> = {
  classic: ClassicComparison,
  minimal: MinimalComparison,
  striped: StripedComparison,
  cards: CardsComparison,
  split: SplitComparison,
  dark: DarkComparison,
  gradient: GradientComparison,
  bordered: BorderedComparison,
}

/** Picks and renders the requested comparison table variant. Defaults to classic. */
export function ComparisonTableSlide({
  variant = "classic",
  ...props
}: ComparisonTableSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
