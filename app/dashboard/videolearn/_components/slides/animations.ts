/** Default animation when none is passed (e.g. from rotation/random). */
export const DEFAULT_SLIDE_ANIMATION_CLASS = "animate-slide-up-fade-in"

/**
 * Animation class names for slide content (used in rotation or random order).
 * Each slide can use a different animation for variety.
 */
export const SLIDE_ANIMATION_CLASSES = [
  DEFAULT_SLIDE_ANIMATION_CLASS,
  "animate-slide-left-fade-in",
  "animate-slide-right-fade-in",
  "animate-scale-fade-in",
  "animate-fade-in-only",
  "animate-slide-down-fade-in",
] as const

export type SlideAnimationMode = "rotation" | "random"

/**
 * Returns the animation class for the given slide index.
 * - rotation: cycles through SLIDE_ANIMATION_CLASSES by index
 * - random: uses randomPerIndex (array of indices into SLIDE_ANIMATION_CLASSES, one per slide)
 */
export function getSlideAnimationClass(
  slideIndex: number,
  mode: SlideAnimationMode,
  randomPerIndex: number[]
): string {
  if (mode === "rotation") {
    const i = slideIndex % SLIDE_ANIMATION_CLASSES.length
    return SLIDE_ANIMATION_CLASSES[i]
  }
  const idx = randomPerIndex[slideIndex] ?? slideIndex % SLIDE_ANIMATION_CLASSES.length
  return SLIDE_ANIMATION_CLASSES[idx % SLIDE_ANIMATION_CLASSES.length]
}

/**
 * Builds a random index array for each slide (for random mode).
 * Call once when slides change and pass the result to getSlideAnimationClass.
 */
export function buildRandomAnimationIndices(slideCount: number): number[] {
  return Array.from({ length: slideCount }, () =>
    Math.floor(Math.random() * SLIDE_ANIMATION_CLASSES.length)
  )
}
