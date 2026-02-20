import type { CodingQuestion } from '../config'
import { DSA_CODING_QUESTIONS } from './dsa-questions'
import { SQL_CODING_QUESTIONS } from './sql-questions'

/** Coding round type: DSA (Data Structures & Algorithms) or SQL */
export type CodingRoundType = 'dsa' | 'sql'

/** @deprecated Use DSA_CODING_QUESTIONS from ./dsa-questions */
export const SCREEN_SHARE_CODING_QUESTIONS = DSA_CODING_QUESTIONS

export { DSA_CODING_QUESTIONS, getScreenShareQuestion, getDsaQuestionOptions } from './dsa-questions'
export { SQL_CODING_QUESTIONS, getSqlQuestionOptions } from './sql-questions'

/** Get coding question by round type (DSA or SQL) and index */
export function getCodingQuestion(roundType: CodingRoundType, index: number): CodingQuestion {
  const list = roundType === 'sql' ? SQL_CODING_QUESTIONS : DSA_CODING_QUESTIONS
  const idx = Math.max(0, index) % list.length
  return list[idx]
}

/** Get a random question index for the round type. If excludeIndex is set and list has >1 item, returns a different index. */
export function getRandomCodingQuestionIndex(roundType: CodingRoundType, excludeIndex?: number): number {
  const list = roundType === 'sql' ? SQL_CODING_QUESTIONS : DSA_CODING_QUESTIONS
  const len = list.length
  if (len === 0) return 0
  if (len === 1) return 0
  if (excludeIndex !== undefined && excludeIndex >= 0) {
    const safeExclude = excludeIndex % len
    let idx = Math.floor(Math.random() * len)
    if (idx === safeExclude) idx = (idx + 1) % len
    return idx
  }
  return Math.floor(Math.random() * len)
}
