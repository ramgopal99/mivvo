export type SlideType =
  | "title_slide"
  | "bullet_points"
  | "step_blocks"
  | "highlight_box"
  | "flow_tree"
  | "comparison_table"
  | "code_block"
  | "code_step_explain"
  | "question_prompt"
  | "summary_slide"
  | "fallback_slide"

/** Optional per-line animation delays (ms). Index 0 = first line/element, 1 = second, etc. */
export type LineDelays = number[]

export interface TypedSlide {
  slideNumber: number
  type: SlideType
  title?: string
  content: { tts: string; lineDelays?: LineDelays; [key: string]: unknown }
  timing: { displayDelay: number; ttsDuration: number }
}

export type TitleVariant =
  | "classic"
  | "minimal"
  | "split"
  | "gradient"
  | "corner"
  | "stripe"
  | "underline"

export const TITLE_VARIANTS: TitleVariant[] = [
  "classic", "minimal", "split", "gradient", "corner", "stripe", "underline",
]

export function parseTitleVariant(value: unknown): TitleVariant {
  return typeof value === "string" && (TITLE_VARIANTS as string[]).includes(value)
    ? (value as TitleVariant)
    : "classic"
}

export interface TitleSlideProps {
  title: string
  subtitle?: string
  variant?: TitleVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type SummaryVariant =
  | "classic"
  | "minimal"
  | "numbered"
  | "cards"
  | "checklist"
  | "split"
  | "gradient"

export const SUMMARY_VARIANTS: SummaryVariant[] = [
  "classic", "minimal", "numbered", "cards", "checklist", "split", "gradient",
]

export function parseSummaryVariant(value: unknown): SummaryVariant {
  return typeof value === "string" && (SUMMARY_VARIANTS as string[]).includes(value)
    ? (value as SummaryVariant)
    : "classic"
}

export interface SummarySlideProps {
  title?: string
  points: string[]
  variant?: SummaryVariant
  isPlaying?: boolean
  className?: string
  animationClass?: string
}

export type BulletVariant =
  | "classic"
  | "minimal"
  | "numbered"
  | "cards"
  | "checklist"
  | "split"
  | "gradient"
  | "two-column"
  | "timeline"
  | "dashed"
  | "corner"
  | "stripe"

export const BULLET_VARIANTS: BulletVariant[] = [
  "classic", "minimal", "numbered", "cards", "checklist", "split", "gradient",
  "two-column", "timeline", "dashed", "corner", "stripe",
]

export function parseBulletVariant(value: unknown): BulletVariant {
  return typeof value === "string" && (BULLET_VARIANTS as string[]).includes(value)
    ? (value as BulletVariant)
    : "classic"
}

export interface BulletSlideProps {
  title?: string
  bullets: string[]
  variant?: BulletVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type CodeBlockVariant =
  | "classic"
  | "minimal"
  | "line-numbers"
  | "dark"
  | "light"
  | "split"
  | "terminal"
  | "gradient"

export const CODE_BLOCK_VARIANTS: CodeBlockVariant[] = [
  "classic", "minimal", "line-numbers", "dark", "light", "split", "terminal", "gradient",
]

export function parseCodeBlockVariant(value: unknown): CodeBlockVariant {
  return typeof value === "string" && (CODE_BLOCK_VARIANTS as string[]).includes(value)
    ? (value as CodeBlockVariant)
    : "classic"
}

export interface CodeBlockSlideProps {
  title?: string
  code: string
  language?: string
  variant?: CodeBlockVariant
  isPlaying?: boolean
  className?: string
  animationClass?: string
}

export interface CodeStepExplainStep {
  lineRef: string
  text: string
}

export type CodeStepExplainVariant =
  | "classic"
  | "minimal"
  | "stacked"
  | "split"
  | "cards"
  | "timeline"
  | "dark"
  | "gradient"

export const CODE_STEP_EXPLAIN_VARIANTS: CodeStepExplainVariant[] = [
  "classic", "minimal", "stacked", "split", "cards", "timeline", "dark", "gradient",
]

export function parseCodeStepExplainVariant(value: unknown): CodeStepExplainVariant {
  return typeof value === "string" && (CODE_STEP_EXPLAIN_VARIANTS as string[]).includes(value)
    ? (value as CodeStepExplainVariant)
    : "classic"
}

export interface CodeStepExplainSlideProps {
  title?: string
  code: string
  language?: string
  steps: CodeStepExplainStep[]
  variant?: CodeStepExplainVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type ComparisonTableVariant =
  | "classic"
  | "minimal"
  | "striped"
  | "cards"
  | "split"
  | "dark"
  | "gradient"
  | "bordered"

export const COMPARISON_TABLE_VARIANTS: ComparisonTableVariant[] = [
  "classic", "minimal", "striped", "cards", "split", "dark", "gradient", "bordered",
]

export function parseComparisonTableVariant(value: unknown): ComparisonTableVariant {
  return typeof value === "string" && (COMPARISON_TABLE_VARIANTS as string[]).includes(value)
    ? (value as ComparisonTableVariant)
    : "classic"
}

export interface ComparisonTableSlideProps {
  title?: string
  headers: string[]
  rows: string[][]
  variant?: ComparisonTableVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type FallbackVariant =
  | "classic"
  | "minimal"
  | "split"
  | "gradient"
  | "stripe"
  | "dark"

export const FALLBACK_VARIANTS: FallbackVariant[] = [
  "classic", "minimal", "split", "gradient", "stripe", "dark",
]

export function parseFallbackVariant(value: unknown): FallbackVariant {
  return typeof value === "string" && (FALLBACK_VARIANTS as string[]).includes(value)
    ? (value as FallbackVariant)
    : "classic"
}

export interface FallbackSlideProps {
  title?: string
  content: string
  variant?: FallbackVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export interface FlowTreeNode {
  id: string
  label: string
  children?: FlowTreeNode[]
}

export type FlowTreeVariant =
  | "classic"
  | "minimal"
  | "vertical"
  | "horizontal"
  | "cards"
  | "timeline"
  | "dark"
  | "bracket"

export const FLOW_TREE_VARIANTS: FlowTreeVariant[] = [
  "classic", "minimal", "vertical", "horizontal", "cards", "timeline", "dark", "bracket",
]

export function parseFlowTreeVariant(value: unknown): FlowTreeVariant {
  return typeof value === "string" && (FLOW_TREE_VARIANTS as string[]).includes(value)
    ? (value as FlowTreeVariant)
    : "classic"
}

export interface FlowTreeSlideProps {
  title?: string
  nodes: FlowTreeNode[]
  variant?: FlowTreeVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type HighlightBoxVariant =
  | "classic"
  | "minimal"
  | "split"
  | "gradient"
  | "stripe"
  | "dark"
  | "bordered"
  | "quote"

export const HIGHLIGHT_BOX_VARIANTS: HighlightBoxVariant[] = [
  "classic", "minimal", "split", "gradient", "stripe", "dark", "bordered", "quote",
]

export function parseHighlightBoxVariant(value: unknown): HighlightBoxVariant {
  return typeof value === "string" && (HIGHLIGHT_BOX_VARIANTS as string[]).includes(value)
    ? (value as HighlightBoxVariant)
    : "classic"
}

export interface HighlightBoxSlideProps {
  title?: string
  highlight: string
  supporting?: string
  variant?: HighlightBoxVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}

export type QuestionPromptVariant =
  | "classic"
  | "minimal"
  | "cards"
  | "numbered"
  | "list"
  | "dark"
  | "gradient"
  | "split"

export const QUESTION_PROMPT_VARIANTS: QuestionPromptVariant[] = [
  "classic", "minimal", "cards", "numbered", "list", "dark", "gradient", "split",
]

export function parseQuestionPromptVariant(value: unknown): QuestionPromptVariant {
  return typeof value === "string" && (QUESTION_PROMPT_VARIANTS as string[]).includes(value)
    ? (value as QuestionPromptVariant)
    : "classic"
}

export interface QuestionPromptSlideProps {
  title?: string
  question: string
  options: string[]
  variant?: QuestionPromptVariant
  isPlaying?: boolean
  lineDelays?: LineDelays
  className?: string
  animationClass?: string
}
