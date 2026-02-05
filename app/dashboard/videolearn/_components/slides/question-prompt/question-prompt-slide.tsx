"use client"

import type { QuestionPromptSlideProps, QuestionPromptVariant } from "../types"
import { ClassicQuestion } from "./classic-question"
import { MinimalQuestion } from "./minimal-question"
import { CardsQuestion } from "./cards-question"
import { NumberedQuestion } from "./numbered-question"
import { ListQuestion } from "./list-question"
import { DarkQuestion } from "./dark-question"
import { GradientQuestion } from "./gradient-question"
import { SplitQuestion } from "./split-question"

const VARIANTS: Record<QuestionPromptVariant, React.ComponentType<QuestionPromptSlideProps>> = {
  classic: ClassicQuestion,
  minimal: MinimalQuestion,
  cards: CardsQuestion,
  numbered: NumberedQuestion,
  list: ListQuestion,
  dark: DarkQuestion,
  gradient: GradientQuestion,
  split: SplitQuestion,
}

/** Picks and renders the requested question prompt variant. Defaults to classic. */
export function QuestionPromptSlide({ variant = "classic", ...props }: QuestionPromptSlideProps) {
  const Component = VARIANTS[variant]
  return <Component {...props} variant={variant} />
}
