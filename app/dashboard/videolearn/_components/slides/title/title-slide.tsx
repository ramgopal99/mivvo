"use client"

import type { TitleSlideProps, TitleVariant } from "../types"
import { ClassicTitle } from "./classic-title"
import { MinimalTitle } from "./minimal-title"
import { SplitTitle } from "./split-title"
import { GradientTitle } from "./gradient-title"
import { CornerTitle } from "./corner-title"
import { StripeTitle } from "./stripe-title"
import { UnderlineTitle } from "./underline-title"

const VARIANTS: Record<TitleVariant, React.ComponentType<TitleSlideProps>> = {
  classic: ClassicTitle,
  minimal: MinimalTitle,
  split: SplitTitle,
  gradient: GradientTitle,
  corner: CornerTitle,
  stripe: StripeTitle,
  underline: UnderlineTitle,
}

/** Picks and renders the requested title variant. Defaults to classic. */
export function TitleSlide({
  variant = "classic",
  ...props
}: TitleSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
