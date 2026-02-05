"use client"

import type { TypedSlide, FlowTreeNode } from "./types"
import type { LineDelays } from "./types"
import { parseTitleVariant, parseSummaryVariant, parseBulletVariant, parseCodeBlockVariant, parseCodeStepExplainVariant, parseComparisonTableVariant, parseFallbackVariant, parseFlowTreeVariant, parseHighlightBoxVariant, parseQuestionPromptVariant } from "./types"
import { TitleSlide } from "./title"
import { SummarySlide } from "./summary"
import { BulletSlide } from "./bullets"
import { CodeBlockSlide } from "./code-block"
import { CodeStepExplainSlide } from "./code-step-explain"
import { ComparisonTableSlide } from "./comparison-table"
import { FallbackSlide } from "./fallback"
import { FlowTreeSlide } from "./flow-tree"
import { HighlightBoxSlide } from "./highlight-box"
import { QuestionPromptSlide } from "./question-prompt"

interface SlideRendererProps {
  slide: TypedSlide
  isPlaying?: boolean
  animationClass?: string
  /** Override per-line delays (ms). When set, used instead of slide.content.lineDelays. */
  lineDelays?: LineDelays
}

function parseLineDelays(content: TypedSlide["content"]): LineDelays | undefined {
  const raw = content?.lineDelays
  if (!Array.isArray(raw)) return undefined
  const arr = raw.filter((v): v is number => typeof v === "number")
  return arr.length ? arr : undefined
}

export function SlideRenderer({ slide, isPlaying, animationClass, lineDelays: lineDelaysOverride }: SlideRendererProps) {
  const lineDelays = lineDelaysOverride ?? parseLineDelays(slide.content)

  if (slide.type === "title_slide") {
    const subtitle = slide.content?.subtitle as string | undefined
    const variant = parseTitleVariant(slide.content?.variant)
    return (
      <TitleSlide
        title={slide.title ?? ""}
        subtitle={subtitle}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "summary_slide") {
    const points = (slide.content?.points as string[] | undefined) ?? []
    const variant = parseSummaryVariant(slide.content?.variant)
    return (
      <SummarySlide
        title={slide.title}
        points={points}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "bullet_points") {
    const bullets = (slide.content?.bullets as string[] | undefined) ?? []
    const variant = parseBulletVariant(slide.content?.variant)
    return (
      <BulletSlide
        title={slide.title}
        bullets={bullets}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "code_block") {
    const code = (slide.content?.code as string) ?? ""
    const language = (slide.content?.language as string) ?? "javascript"
    const variant = parseCodeBlockVariant(slide.content?.variant)
    return (
      <CodeBlockSlide
        title={slide.title}
        code={code}
        language={language}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "code_step_explain") {
    const code = (slide.content?.code as string) ?? ""
    const language = (slide.content?.language as string) ?? "javascript"
    const rawSteps = (slide.content?.steps as Array<{ lineRef?: string; text?: string }>) ?? []
    const steps = rawSteps.map((s) => ({
      lineRef: s.lineRef ?? "L?",
      text: s.text ?? "",
    }))
    const variant = parseCodeStepExplainVariant(slide.content?.variant)
    return (
      <CodeStepExplainSlide
        title={slide.title}
        code={code}
        language={language}
        steps={steps}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "comparison_table") {
    const headers = (slide.content?.headers as string[] | undefined) ?? []
    const rawRows = (slide.content?.rows as string[][] | undefined) ?? []
    const rows = rawRows.map((r) => (Array.isArray(r) ? r.map(String) : []))
    const variant = parseComparisonTableVariant(slide.content?.variant)
    return (
      <ComparisonTableSlide
        title={slide.title}
        headers={headers}
        rows={rows}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "flow_tree") {
    const rawNodes = (slide.content?.nodes as Array<{ id?: string; label?: string; children?: unknown[] }>) ?? []
    function normalizeNode(n: { id?: string; label?: string; children?: unknown[] }): FlowTreeNode {
      const label = typeof n.label === "string" ? n.label : ""
      const id = typeof n.id === "string" ? n.id : label || "node"
      const children = Array.isArray(n.children)
        ? n.children
            .filter((c): c is { id?: string; label?: string; children?: unknown[] } => c != null && typeof (c as { label?: string }).label === "string")
            .map(normalizeNode)
        : undefined
      return { id, label, children }
    }
    const nodes = rawNodes.filter((n) => n && typeof n.label === "string").map(normalizeNode)
    const variant = parseFlowTreeVariant(slide.content?.variant)
    return (
      <FlowTreeSlide
        title={slide.title}
        nodes={nodes}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "highlight_box") {
    const highlight = (slide.content?.highlight as string) ?? ""
    const supporting = slide.content?.supporting as string | undefined
    const variant = parseHighlightBoxVariant(slide.content?.variant)
    return (
      <HighlightBoxSlide
        title={slide.title}
        highlight={highlight}
        supporting={supporting}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "question_prompt") {
    const question = (slide.content?.question as string) ?? ""
    const options = (slide.content?.options as string[] | undefined) ?? []
    const variant = parseQuestionPromptVariant(slide.content?.variant)
    return (
      <QuestionPromptSlide
        title={slide.title}
        question={question}
        options={options}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  if (slide.type === "fallback_slide") {
    const content = (slide.content?.tts as string) ?? ""
    const variant = parseFallbackVariant(slide.content?.variant)
    return (
      <FallbackSlide
        title={slide.title}
        content={content}
        variant={variant}
        isPlaying={isPlaying}
        animationClass={animationClass}
        lineDelays={lineDelays}
      />
    )
  }

  return (
    <FallbackSlide
      title={slide.title ?? "Slide"}
      content={(slide.content?.tts as string) ?? "Content not available."}
      variant="classic"
      isPlaying={isPlaying}
      animationClass={animationClass}
      lineDelays={lineDelays}
    />
  )
}
