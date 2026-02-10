import { CodingQuestion } from '../config'

/**
 * DSA coding interview questions for screen-share mode.
 */
export const DSA_CODING_QUESTIONS: CodingQuestion[] = [
  {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    difficulty: 'Easy',
    topic: 'Arrays',
  },
  {
    title: 'Valid Parentheses',
    description:
      'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'The string is valid.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'The string is valid.' },
      { input: 's = "(]"', output: 'false', explanation: "The closing bracket ']' does not match the opening bracket '('." },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    difficulty: 'Easy',
    topic: 'Stack',
  },
  {
    title: 'Reverse a String',
    description:
      'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: 'Reverse in place.' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: 'Reverse in place.' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ascii character.'],
    difficulty: 'Easy',
    topic: 'Strings',
  },
]

export const getScreenShareQuestion = (index = 0): CodingQuestion => {
  const idx = index % DSA_CODING_QUESTIONS.length
  return DSA_CODING_QUESTIONS[idx]
}

/** Options for DSA dropdown (label = title, value = index) */
export function getDsaQuestionOptions(): { value: string; label: string }[] {
  return DSA_CODING_QUESTIONS.map((q, i) => ({ value: String(i), label: `${q.title} (${q.difficulty})` }))
}
