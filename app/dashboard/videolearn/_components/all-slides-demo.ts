import type { TypedSlide } from "./slides"
import {
  TITLE_VARIANTS,
  SUMMARY_VARIANTS,
  BULLET_VARIANTS,
  CODE_BLOCK_VARIANTS,
  CODE_STEP_EXPLAIN_VARIANTS,
  COMPARISON_TABLE_VARIANTS,
  FALLBACK_VARIANTS,
  FLOW_TREE_VARIANTS,
  HIGHLIGHT_BOX_VARIANTS,
  QUESTION_PROMPT_VARIANTS,
} from "./slides/types"

const timing = { displayDelay: 0, ttsDuration: 5 }

function buildTitleSlides(): TypedSlide[] {
  return TITLE_VARIANTS.map((variant, i) => ({
    slideNumber: i + 1,
    type: "title_slide" as const,
    title: "Slide Title",
    content: {
      tts: "Slide title and subtitle.",
      subtitle: "Subtitle or tagline",
      variant,
    },
    timing,
  }))
}

function buildSummarySlides(): TypedSlide[] {
  const base = 100
  return SUMMARY_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "summary_slide" as const,
      title: "Summary",
      content: {
        tts: "Key points summary.",
        points: ["First takeaway", "Second takeaway", "Third takeaway"],
        variant,
      },
      timing,
    },
  ])
}

function buildBulletSlides(): TypedSlide[] {
  const base = 200
  return BULLET_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "bullet_points" as const,
      title: "Bullet Points",
      content: {
        tts: "Bullet points list.",
        bullets: ["First point", "Second point", "Third point"],
        variant,
      },
      timing,
    },
  ])
}

function buildCodeBlockSlides(): TypedSlide[] {
  const base = 300
  const code = `function hello() {\n  return "world";\n}`
  return CODE_BLOCK_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "code_block" as const,
      title: "Code Block",
      content: { tts: "Code block.", code, language: "javascript", variant },
      timing,
    },
  ])
}

function buildCodeStepExplainSlides(): TypedSlide[] {
  const base = 400
  const code = `const x = 1;\nconst y = 2;`
  const steps = [
    { lineRef: "L1", text: "Declare x" },
    { lineRef: "L2", text: "Declare y" },
  ]
  return CODE_STEP_EXPLAIN_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "code_step_explain" as const,
      title: "Code Step Explain",
      content: { tts: "Code with steps.", code, language: "javascript", steps, variant },
      timing,
    },
  ])
}

function buildComparisonTableSlides(): TypedSlide[] {
  const base = 500
  const headers = ["Option", "Pros", "Cons"]
  const rows = [
    ["A", "Fast", "Complex"],
    ["B", "Simple", "Limited"],
  ]
  return COMPARISON_TABLE_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "comparison_table" as const,
      title: "Comparison",
      content: { tts: "Comparison table.", headers, rows, variant },
      timing,
    },
  ])
}

function buildFlowTreeSlides(): TypedSlide[] {
  const base = 600
  const nodes = [
    { id: "1", label: "Start", children: [{ id: "2", label: "Step A", children: [{ id: "3", label: "End" }] }] },
  ]
  return FLOW_TREE_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "flow_tree" as const,
      title: "Flow Tree",
      content: { tts: "Flow tree.", nodes, variant },
      timing,
    },
  ])
}

function buildHighlightBoxSlides(): TypedSlide[] {
  const base = 700
  return HIGHLIGHT_BOX_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "highlight_box" as const,
      title: "Highlight",
      content: {
        tts: "Highlight box.",
        highlight: "Key message or quote here.",
        supporting: "Supporting text.",
        variant,
      },
      timing,
    },
  ])
}

function buildQuestionPromptSlides(): TypedSlide[] {
  const base = 800
  return QUESTION_PROMPT_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "question_prompt" as const,
      title: "Question",
      content: {
        tts: "Question prompt.",
        question: "Which option is correct?",
        options: ["Option A", "Option B", "Option C"],
        variant,
      },
      timing,
    },
  ])
}

function buildFallbackSlides(): TypedSlide[] {
  const base = 900
  return FALLBACK_VARIANTS.flatMap((variant, i) => [
    {
      slideNumber: base + i + 1,
      type: "fallback_slide" as const,
      title: "Fallback",
      content: {
        tts: "Generic fallback slide content.",
        variant,
      },
      timing,
    },
  ])
}

export function getAllSlidesForGallery(): TypedSlide[] {
  return [
    ...buildTitleSlides(),
    ...buildSummarySlides(),
    ...buildBulletSlides(),
    ...buildCodeBlockSlides(),
    ...buildCodeStepExplainSlides(),
    ...buildComparisonTableSlides(),
    ...buildFlowTreeSlides(),
    ...buildHighlightBoxSlides(),
    ...buildQuestionPromptSlides(),
    ...buildFallbackSlides(),
  ]
}

/** Human-readable label for a slide (type + variant) for the gallery. */
export function getSlideLabel(slide: TypedSlide): string {
  const variant = (slide.content?.variant as string) ?? "default"
  const typeLabel = slide.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  return `${typeLabel} — ${variant}`
}
