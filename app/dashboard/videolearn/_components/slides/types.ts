/** Slide types for rich visual layouts */
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

export interface Timing {
  displayDelay: number
  ttsDuration: number
}

/** Base slide – all slides have slideNumber, type, content.tts, timing */
export interface BaseSlide {
  slideNumber: number
  type: SlideType
  title?: string
  content: { tts: string; [key: string]: unknown }
  timing: Timing
}

export interface TitleSlideContent {
  tts: string
  subtitle?: string
}

export interface BulletPointsSlideContent {
  tts: string
  bullets: string[]
}

export interface StepBlock {
  step: number
  title: string
  description: string
}

export interface StepBlocksSlideContent {
  tts: string
  steps: StepBlock[]
}

export interface HighlightBoxSlideContent {
  tts: string
  highlight: string
  supporting?: string
}

export interface FlowTreeNode {
  id: string
  label: string
  children?: FlowTreeNode[]
}

export interface FlowTreeSlideContent {
  tts: string
  nodes: FlowTreeNode[]
}

export interface ComparisonTableSlideContent {
  tts: string
  headers: string[]
  rows: string[][]
}

export interface CodeBlockSlideContent {
  tts: string
  code: string
  language?: string
}

export interface CodeStep {
  lineRef?: string
  text: string
}

export interface CodeStepExplainSlideContent {
  tts: string
  code: string
  language?: string
  steps: CodeStep[]
}

export interface QuestionPromptSlideContent {
  tts: string
  question: string
  options?: string[]
}

export interface SummarySlideContent {
  tts: string
  points: string[]
}

/** Union of all slide content shapes (for type narrowing) */
export type SlideContent =
  | TitleSlideContent
  | BulletPointsSlideContent
  | StepBlocksSlideContent
  | HighlightBoxSlideContent
  | FlowTreeSlideContent
  | ComparisonTableSlideContent
  | CodeBlockSlideContent
  | CodeStepExplainSlideContent
  | QuestionPromptSlideContent
  | SummarySlideContent

export interface TypedSlide extends Omit<BaseSlide, "content"> {
  type: SlideType
  content: SlideContent
}
