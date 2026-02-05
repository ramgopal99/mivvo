"use client"

import type { CodeBlockSlideProps, CodeBlockVariant } from "../types"
import { ClassicCode } from "./classic-code"
import { MinimalCode } from "./minimal-code"
import { LineNumbersCode } from "./line-numbers-code"
import { DarkCode } from "./dark-code"
import { LightCode } from "./light-code"
import { SplitCode } from "./split-code"
import { TerminalCode } from "./terminal-code"
import { GradientCode } from "./gradient-code"

const VARIANTS: Record<CodeBlockVariant, React.ComponentType<CodeBlockSlideProps>> = {
  classic: ClassicCode,
  minimal: MinimalCode,
  "line-numbers": LineNumbersCode,
  dark: DarkCode,
  light: LightCode,
  split: SplitCode,
  terminal: TerminalCode,
  gradient: GradientCode,
}

/** Picks and renders the requested code block variant. Defaults to classic. */
export function CodeBlockSlide({
  variant = "classic",
  ...props
}: CodeBlockSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
