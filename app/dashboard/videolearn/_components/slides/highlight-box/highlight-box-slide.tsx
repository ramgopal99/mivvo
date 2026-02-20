"use client"

import type { HighlightBoxSlideProps, HighlightBoxVariant } from "../types"
import { ClassicHighlight } from "./classic-highlight"
import { MinimalHighlight } from "./minimal-highlight"
import { SplitHighlight } from "./split-highlight"
import { GradientHighlight } from "./gradient-highlight"
import { StripeHighlight } from "./stripe-highlight"
import { DarkHighlight } from "./dark-highlight"
import { BorderedHighlight } from "./bordered-highlight"
import { QuoteHighlight } from "./quote-highlight"

const VARIANTS: Record<HighlightBoxVariant, React.ComponentType<HighlightBoxSlideProps>> = {
  classic: ClassicHighlight,
  minimal: MinimalHighlight,
  split: SplitHighlight,
  gradient: GradientHighlight,
  stripe: StripeHighlight,
  dark: DarkHighlight,
  bordered: BorderedHighlight,
  quote: QuoteHighlight,
}

/** Picks and renders the requested highlight box variant. Defaults to classic. */
export function HighlightBoxSlide({ variant = "classic", ...props }: HighlightBoxSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
