import type { TypedSlide } from "./types"

/**
 * Per-line animation delay (ms). When content.lineDelays is provided, each entry
 * is the delay for that line index (0 = first element). When absent, defaults are used.
 */

/** Default ms between each line's animation (line 0 = 0, line 1 = 350, line 2 = 700, ...). */
export const DEFAULT_LINE_DELAY_MS = 350

/** Line label for timing UI (e.g. "Title", "Option 1"). */
export interface SlideLineInfo {
  count: number
  labels: string[]
}

/**
 * Returns the number of animated lines and labels for the given slide (for timing controls).
 */
export function getSlideLineInfo(slide: TypedSlide): SlideLineInfo {
  const content = slide.content ?? {}
  switch (slide.type) {
    case "title_slide":
      return { count: slide.content?.subtitle ? 2 : 1, labels: ["Title", "Subtitle"] }
    case "summary_slide": {
      const points = (content.points as string[] | undefined) ?? []
      const withTitle = !!slide.title
      const count = withTitle ? 1 + points.length : points.length
      const labels = withTitle ? ["Title", ...points.map((_, i) => `Point ${i + 1}`)] : points.map((_, i) => `Point ${i + 1}`)
      return { count, labels }
    }
    case "bullet_points": {
      const bullets = (content.bullets as string[] | undefined) ?? []
      const withTitle = !!slide.title
      const count = withTitle ? 1 + bullets.length : bullets.length
      const labels = withTitle ? ["Title", ...bullets.map((_, i) => `Bullet ${i + 1}`)] : bullets.map((_, i) => `Bullet ${i + 1}`)
      return { count, labels }
    }
    case "question_prompt": {
      const options = (content.options as string[] | undefined) ?? []
      const withTitle = !!slide.title
      const count = withTitle ? 2 + options.length : 1 + options.length // title?, question, options
      const labels = withTitle
        ? ["Title", "Question", ...options.map((_, i) => `Option ${i + 1}`)]
        : ["Question", ...options.map((_, i) => `Option ${i + 1}`)]
      return { count, labels }
    }
    case "highlight_box": {
      const withTitle = !!slide.title
      const withSupporting = !!(content.supporting as string)
      let count = withTitle ? 1 : 0
      count += 1 // highlight
      if (withSupporting) count += 1
      const labels = (withTitle ? ["Title", "Highlight", "Supporting"] : ["Highlight", "Supporting"]).slice(0, count)
      return { count, labels }
    }
    case "fallback_slide": {
      const withTitle = !!slide.title
      return { count: withTitle ? 2 : 1, labels: withTitle ? ["Title", "Content"] : ["Content"] }
    }
    case "code_block":
      return { count: slide.title ? 2 : 1, labels: slide.title ? ["Title", "Code"] : ["Code"] }
    case "code_step_explain": {
      const steps = (content.steps as Array<unknown> | undefined) ?? []
      const withTitle = !!slide.title
      const count = (withTitle ? 1 : 0) + 1 + steps.length // title?, code block, steps
      const labels = withTitle ? ["Title", "Code", ...steps.map((_, i) => `Step ${i + 1}`)] : ["Code", ...steps.map((_, i) => `Step ${i + 1}`)]
      return { count, labels: labels.slice(0, count) }
    }
    case "comparison_table": {
      const headers = (content.headers as string[] | undefined) ?? []
      const rows = (content.rows as string[][] | undefined) ?? []
      const withTitle = !!slide.title
      let count = withTitle ? 1 : 0
      count += 1 // header row
      count += rows.length
      const labels = withTitle ? ["Title", "Headers", ...rows.map((_, i) => `Row ${i + 1}`)] : ["Headers", ...rows.map((_, i) => `Row ${i + 1}`)]
      return { count, labels: labels.slice(0, count) }
    }
    case "flow_tree": {
      const nodes = (content.nodes as Array<{ label?: string; children?: unknown[] }> | undefined) ?? []
      const withTitle = !!slide.title
      const flatCount = withTitle ? 1 : 0
      function countNodes(ns: Array<{ children?: unknown[] }>, acc: number): number {
        let c = acc + ns.length
        for (const n of ns) {
          if (Array.isArray(n.children) && n.children.length) c = countNodes(n.children as Array<{ children?: unknown[] }>, c)
        }
        return c
      }
      const nodeCount = countNodes(nodes, 0)
      const count = flatCount + nodeCount
      const labels = withTitle ? ["Title", ...Array.from({ length: nodeCount }, (_, i) => `Node ${i + 1}`)] : Array.from({ length: nodeCount }, (_, i) => `Node ${i + 1}`)
      return { count, labels: labels.slice(0, count) }
    }
    default:
      return { count: 1, labels: ["Content"] }
  }
}

/**
 * Returns animation delay in ms for the given line index.
 * Uses lineDelays[lineIndex] when provided, otherwise defaultStepMs * lineIndex.
 */
export function getLineDelayMs(
  lineIndex: number,
  lineDelays?: number[],
  defaultStepMs: number = DEFAULT_LINE_DELAY_MS
): number {
  if (lineDelays != null && lineDelays.length > lineIndex && typeof lineDelays[lineIndex] === "number") {
    return Math.max(0, lineDelays[lineIndex])
  }
  return lineIndex * defaultStepMs
}

/**
 * Returns a style object for animation delay when animating, or undefined.
 */
export function getLineDelayStyle(
  lineIndex: number,
  isAnimating: boolean,
  lineDelays?: number[]
): { animationDelay: string } | undefined {
  if (!isAnimating) return undefined
  const ms = getLineDelayMs(lineIndex, lineDelays)
  return { animationDelay: `${ms}ms` }
}
