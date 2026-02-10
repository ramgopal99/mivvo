import { CodingQuestion } from '../config'

/**
 * SQL coding interview questions for screen-share mode.
 */
export const SQL_CODING_QUESTIONS: CodingQuestion[] = [
  {
    title: 'Second Highest Salary',
    description:
      'Write a SQL query to get the second highest salary from the Employee table. If there is no second highest salary, then the query should return null.',
    examples: [
      {
        input: 'Employee table: id=1 salary=100, id=2 salary=200, id=3 salary=300',
        output: '200',
        explanation: 'Second highest salary is 200.',
      },
    ],
    constraints: ['Table may have 0 or more rows.', 'Handle null when there is no second highest.'],
    difficulty: 'Easy',
    topic: 'SQL',
  },
  {
    title: 'Nth Highest Salary',
    description:
      'Write a SQL query to get the nth highest salary from the Employee table. Create a function getNthHighestSalary(N INT) which returns the nth highest salary. If there is no nth highest salary, return null.',
    examples: [
      { input: 'N = 2', output: '200', explanation: 'Second highest salary.' },
    ],
    constraints: ['N is always a positive integer.', 'Handle null when there are fewer than N distinct salaries.'],
    difficulty: 'Medium',
    topic: 'SQL',
  },
  {
    title: 'Duplicate Emails',
    description:
      'Write a SQL query to find all duplicate emails in a table named Person (columns: id, email). Return duplicate email addresses.',
    examples: [
      { input: 'Person: (1,a@b.com), (2,c@d.com), (3,a@b.com)', output: 'a@b.com', explanation: 'a@b.com appears twice.' },
    ],
    constraints: ['Table has id and email columns.', 'Return each duplicate email once.'],
    difficulty: 'Easy',
    topic: 'SQL',
  },
]

/** Options for SQL dropdown */
export function getSqlQuestionOptions(): { value: string; label: string }[] {
  return SQL_CODING_QUESTIONS.map((q, i) => ({ value: String(i), label: `${q.title} (${q.difficulty})` }))
}
