"use client"

import type { CodeStepExplainSlideProps, CodeStepExplainVariant } from "../types"
import { ClassicCodeStep } from "./classic-code-step"
import { MinimalCodeStep } from "./minimal-code-step"
import { StackedCodeStep } from "./stacked-code-step"
import { SplitCodeStep } from "./split-code-step"
import { CardsCodeStep } from "./cards-code-step"
import { TimelineCodeStep } from "./timeline-code-step"
import { DarkCodeStep } from "./dark-code-step"
import { GradientCodeStep } from "./gradient-code-step"

const VARIANTS: Record<CodeStepExplainVariant, React.ComponentType<CodeStepExplainSlideProps>> = {
  classic: ClassicCodeStep,
  minimal: MinimalCodeStep,
  stacked: StackedCodeStep,
  split: SplitCodeStep,
  cards: CardsCodeStep,
  timeline: TimelineCodeStep,
  dark: DarkCodeStep,
  gradient: GradientCodeStep,
}

/** Picks and renders the requested code step explain variant. Defaults to classic. */
export function CodeStepExplainSlide({
  variant = "classic",
  ...props
}: CodeStepExplainSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
