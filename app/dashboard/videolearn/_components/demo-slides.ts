import type { TypedSlide } from "./slides"

/** Demo slides: question prompt variants only. */
export const DEMO_SLIDES: TypedSlide[] = [
  {
    slideNumber: 1,
    type: "question_prompt",
    title: "Quiz",
    content: {
      tts: "Which option best describes the main idea?",
      question: "Which option best describes the main idea?",
      options: ["Option A: First choice", "Option B: Second choice", "Option C: Third choice"],
      variant: "classic",
    },
    timing: { displayDelay: 0, ttsDuration: 8 },
  },
  {
    slideNumber: 2,
    type: "question_prompt",
    title: "Reflection",
    content: {
      tts: "Consider these options.",
      question: "What is the best approach?",
      options: ["Start small", "Plan fully first", "Iterate quickly"],
      variant: "minimal",
    },
    timing: { displayDelay: 0, ttsDuration: 6 },
  },
  {
    slideNumber: 3,
    type: "question_prompt",
    title: "Choose One",
    content: {
      tts: "Each option is shown in a card.",
      question: "Which framework would you use?",
      options: ["React", "Vue", "Svelte", "Angular"],
      variant: "cards",
    },
    timing: { displayDelay: 0, ttsDuration: 8 },
  },
  {
    slideNumber: 4,
    type: "question_prompt",
    title: "Numbered Options",
    content: {
      tts: "Options are numbered for clarity.",
      question: "What is the correct order?",
      options: ["Design", "Build", "Test", "Deploy"],
      variant: "numbered",
    },
    timing: { displayDelay: 0, ttsDuration: 8 },
  },
  {
    slideNumber: 5,
    type: "question_prompt",
    title: "List",
    content: {
      tts: "Simple list style options.",
      question: "Which tools do you need?",
      options: ["Editor", "Terminal", "Browser", "API client"],
      variant: "list",
    },
    timing: { displayDelay: 0, ttsDuration: 6 },
  },
  {
    slideNumber: 6,
    type: "question_prompt",
    title: "Dark Quiz",
    content: {
      tts: "Dark theme question prompt.",
      question: "What is the key takeaway?",
      options: ["Learn by doing", "Read first", "Watch tutorials"],
      variant: "dark",
    },
    timing: { displayDelay: 0, ttsDuration: 6 },
  },
  {
    slideNumber: 7,
    type: "question_prompt",
    title: "Gradient",
    content: {
      tts: "Gradient accent for the prompt.",
      question: "How would you improve this?",
      options: ["Add tests", "Refactor", "Document", "Optimize"],
      variant: "gradient",
    },
    timing: { displayDelay: 0, ttsDuration: 8 },
  },
  {
    slideNumber: 8,
    type: "question_prompt",
    title: "Split",
    content: {
      tts: "Question on left, options on right.",
      question: "Which principle applies here?",
      options: ["DRY", "KISS", "YAGNI"],
      variant: "split",
    },
    timing: { displayDelay: 0, ttsDuration: 6 },
  },
]
