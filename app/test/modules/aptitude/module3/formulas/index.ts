export interface Formula {
  id: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables?: Array<{
    symbol: string;
    description: string;
  }>;
}

export const formulas: Formula[] = [
  {
    id: 'module3-mixed-to-improper',
    category: 'mixed-fractions',
    name: 'Mixed to Improper Fraction',
    formula: 'a b/c = (a×c + b)/c',
    description: 'Convert mixed number to improper fraction',
    variables: [
      { symbol: 'a', description: 'whole number part' },
      { symbol: 'b/c', description: 'fractional part' }
    ]
  },
  {
    id: 'module3-improper-to-mixed',
    category: 'mixed-fractions',
    name: 'Improper to Mixed Fraction',
    formula: 'a/b = q r/b where a = q×b + r',
    description: 'Convert improper fraction to mixed number',
    variables: [
      { symbol: 'q', description: 'quotient (whole number)' },
      { symbol: 'r', description: 'remainder' },
      { symbol: 'b', description: 'denominator' }
    ]
  },
  {
    id: 'module3-sign-addition',
    category: 'sign-rules',
    name: 'Sign Rules for Addition',
    formula: '(+) + (+) = +    (+) + (-) = ±    (-) + (-) = -',
    description: 'Addition rules for positive and negative numbers',
    variables: [
      { symbol: '(+) + (+)', description: 'positive plus positive' },
      { symbol: '(+) + (-)', description: 'positive plus negative' },
      { symbol: '(-) + (-)', description: 'negative plus negative' }
    ]
  },
  {
    id: 'module3-sign-multiplication',
    category: 'sign-rules',
    name: 'Sign Rules for Multiplication',
    formula: '(+) × (+) = +    (+) × (-) = -    (-) × (-) = +',
    description: 'Multiplication rules for positive and negative numbers',
    variables: [
      { symbol: '(+) × (+)', description: 'positive times positive' },
      { symbol: '(+) × (-)', description: 'positive times negative' },
      { symbol: '(-) × (-)', description: 'negative times negative' }
    ]
  },
  {
    id: 'module3-sign-division',
    category: 'sign-rules',
    name: 'Sign Rules for Division',
    formula: '(+) ÷ (+) = +    (+) ÷ (-) = -    (-) ÷ (+) = -    (-) ÷ (-) = +',
    description: 'Division rules for positive and negative numbers',
    variables: [
      { symbol: '(+) ÷ (+)', description: 'positive divided by positive' },
      { symbol: '(+) ÷ (-)', description: 'positive divided by negative' },
      { symbol: '(-) ÷ (+)', description: 'negative divided by positive' },
      { symbol: '(-) ÷ (-)', description: 'negative divided by negative' }
    ]
  },
  {
    id: 'module3-rounding-rules',
    category: 'approximation',
    name: 'Rounding Rules',
    formula: 'If last digit ≥ 5, round up; if < 5, round down',
    description: 'Standard rounding to specified decimal places',
    variables: [
      { symbol: 'last digit', description: 'digit being rounded' }
    ]
  },
  {
    id: 'module3-significant-figures',
    category: 'approximation',
    name: 'Significant Figures',
    formula: 'Round to n significant figures',
    description: 'Keep first n non-zero digits, round appropriately',
    variables: [
      { symbol: 'n', description: 'number of significant figures' }
    ]
  }
];

export default formulas;
