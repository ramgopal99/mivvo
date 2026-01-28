"use client"

import type { TypedSlide, SlideType } from "./types"
import { TitleSlide } from "./title-slide"
import { BulletPointsSlide } from "./bullet-points-slide"
import { StepBlocksSlide } from "./step-blocks-slide"
import { HighlightBoxSlide } from "./highlight-box-slide"
import { FlowTreeSlide } from "./flow-tree-slide"
import { ComparisonTableSlide } from "./comparison-table-slide"
import { CodeBlockSlide } from "./code-block-slide"
import { CodeStepExplainSlide } from "./code-step-explain-slide"
import { QuestionPromptSlide } from "./question-prompt-slide"
import { SummarySlide } from "./summary-slide"
import { FallbackSlide } from "./fallback-slide"

interface SlideRendererProps {
  slide: TypedSlide
  /** When true, slide animations run (e.g. title → subtitle stagger). Only on Start. */
  isPlaying?: boolean
}

export function SlideRenderer({ slide, isPlaying }: SlideRendererProps) {
  const { type, title, content } = slide
  const tts = content.tts ?? ""

  const render = () => {
    switch (type as SlideType) {
      case "title_slide":
        return (
          <TitleSlide
            title={title}
            content={content as import("./types").TitleSlideContent}
            isPlaying={isPlaying}
          />
        )
      case "bullet_points":
        return (
          <BulletPointsSlide
            title={title}
            content={content as import("./types").BulletPointsSlideContent}
          />
        )
      case "step_blocks":
        return (
          <StepBlocksSlide
            title={title}
            content={content as import("./types").StepBlocksSlideContent}
          />
        )
      case "highlight_box":
        return (
          <HighlightBoxSlide
            title={title}
            content={content as import("./types").HighlightBoxSlideContent}
          />
        )
      case "flow_tree":
        return (
          <FlowTreeSlide
            title={title}
            content={content as import("./types").FlowTreeSlideContent}
          />
        )
      case "comparison_table":
        return (
          <ComparisonTableSlide
            title={title}
            content={content as import("./types").ComparisonTableSlideContent}
          />
        )
      case "code_block":
        return (
          <CodeBlockSlide
            title={title}
            content={content as import("./types").CodeBlockSlideContent}
          />
        )
      case "code_step_explain":
        return (
          <CodeStepExplainSlide
            title={title}
            content={content as import("./types").CodeStepExplainSlideContent}
          />
        )
      case "question_prompt":
        return (
          <QuestionPromptSlide
            title={title}
            content={content as import("./types").QuestionPromptSlideContent}
          />
        )
      case "summary_slide":
        return (
          <SummarySlide
            title={title}
            content={content as import("./types").SummarySlideContent}
          />
        )
      default:
        return (
          <FallbackSlide
            title={title}
            text={(content as { text?: string }).text ?? tts}
          />
        )
    }
  }

  return render()
}
