"use client"

import type { BulletSlideProps, BulletVariant } from "../types"
import { ClassicBullets } from "./classic-bullets"
import { MinimalBullets } from "./minimal-bullets"
import { NumberedBullets } from "./numbered-bullets"
import { CardsBullets } from "./cards-bullets"
import { ChecklistBullets } from "./checklist-bullets"
import { SplitBullets } from "./split-bullets"
import { GradientBullets } from "./gradient-bullets"
import { TwoColumnBullets } from "./two-column-bullets"
import { TimelineBullets } from "./timeline-bullets"
import { DashedBullets } from "./dashed-bullets"
import { CornerBullets } from "./corner-bullets"
import { StripeBullets } from "./stripe-bullets"

const VARIANTS: Record<BulletVariant, React.ComponentType<BulletSlideProps>> = {
  classic: ClassicBullets,
  minimal: MinimalBullets,
  numbered: NumberedBullets,
  cards: CardsBullets,
  checklist: ChecklistBullets,
  split: SplitBullets,
  gradient: GradientBullets,
  "two-column": TwoColumnBullets,
  timeline: TimelineBullets,
  dashed: DashedBullets,
  corner: CornerBullets,
  stripe: StripeBullets,
}

/** Picks and renders the requested bullet variant. Defaults to classic. */
export function BulletSlide({
  variant = "classic",
  ...props
}: BulletSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
