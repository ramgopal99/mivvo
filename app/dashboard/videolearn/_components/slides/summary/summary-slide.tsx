"use client"

import type { SummarySlideProps, SummaryVariant } from "../types"
import { ClassicSummary } from "./classic-summary"
import { MinimalSummary } from "./minimal-summary"
import { NumberedSummary } from "./numbered-summary"
import { CardsSummary } from "./cards-summary"
import { ChecklistSummary } from "./checklist-summary"
import { SplitSummary } from "./split-summary"
import { GradientSummary } from "./gradient-summary"

const VARIANTS: Record<SummaryVariant, React.ComponentType<SummarySlideProps>> = {
  classic: ClassicSummary,
  minimal: MinimalSummary,
  numbered: NumberedSummary,
  cards: CardsSummary,
  checklist: ChecklistSummary,
  split: SplitSummary,
  gradient: GradientSummary,
}

/** Picks and renders the requested summary variant. Defaults to classic. */
export function SummarySlide({
  variant = "classic",
  ...props
}: SummarySlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
