"use client"

import type { FallbackSlideProps, FallbackVariant } from "../types"
import { ClassicFallback } from "./classic-fallback"
import { MinimalFallback } from "./minimal-fallback"
import { SplitFallback } from "./split-fallback"
import { GradientFallback } from "./gradient-fallback"
import { StripeFallback } from "./stripe-fallback"
import { DarkFallback } from "./dark-fallback"

const VARIANTS: Record<FallbackVariant, React.ComponentType<FallbackSlideProps>> = {
  classic: ClassicFallback,
  minimal: MinimalFallback,
  split: SplitFallback,
  gradient: GradientFallback,
  stripe: StripeFallback,
  dark: DarkFallback,
}

/** Picks and renders the requested fallback variant. Defaults to classic. */
export function FallbackSlide({
  variant = "classic",
  ...props
}: FallbackSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
