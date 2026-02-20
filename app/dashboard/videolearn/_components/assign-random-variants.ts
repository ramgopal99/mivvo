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

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

/** Assigns a random variant to each slide's content for visual variety. */
export function assignRandomVariants(slides: TypedSlide[]): TypedSlide[] {
  return slides.map((slide) => {
    const content = { ...slide.content }
    switch (slide.type) {
      case "title_slide":
        content.variant = pick(TITLE_VARIANTS)
        break
      case "summary_slide":
        content.variant = pick(SUMMARY_VARIANTS)
        break
      case "bullet_points":
        content.variant = pick(BULLET_VARIANTS)
        break
      case "code_block":
        content.variant = pick(CODE_BLOCK_VARIANTS)
        break
      case "code_step_explain":
        content.variant = pick(CODE_STEP_EXPLAIN_VARIANTS)
        break
      case "comparison_table":
        content.variant = pick(COMPARISON_TABLE_VARIANTS)
        break
      case "flow_tree":
        content.variant = pick(FLOW_TREE_VARIANTS)
        break
      case "highlight_box":
        content.variant = pick(HIGHLIGHT_BOX_VARIANTS)
        break
      case "question_prompt":
        content.variant = pick(QUESTION_PROMPT_VARIANTS)
        break
      case "fallback_slide":
      case "step_blocks":
      default:
        content.variant = pick(FALLBACK_VARIANTS)
        break
    }
    return { ...slide, content }
  })
}
