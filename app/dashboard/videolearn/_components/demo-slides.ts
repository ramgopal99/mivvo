import type { TypedSlide } from "./slides"

/** Demo slides: title only. */
export const DEMO_SLIDES: TypedSlide[] = [
  {
    slideNumber: 1,
    type: "title_slide",
    title: "Introduction to React Hooks",
    content: {
      tts: "Welcome! This demo shows the title slide in VideoLearn.",
      subtitle: "A quick tour of every slide layout",
    },
    timing: { displayDelay: 0, ttsDuration: 8 },
  },
]
