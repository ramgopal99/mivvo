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
    id: 'bodmas',
    category: 'order-of-operations',
    name: 'BODMAS Rule',
    formula: 'B → O → D → M → A → S',
    description: 'Order of mathematical operations: Brackets, Orders (powers), Division, Multiplication, Addition, Subtraction',
    variables: [
      { symbol: 'B', description: 'Brackets (parentheses)' },
      { symbol: 'O', description: 'Orders (powers, roots)' },
      { symbol: 'D', description: 'Division' },
      { symbol: 'M', description: 'Multiplication' },
      { symbol: 'A', description: 'Addition' },
      { symbol: 'S', description: 'Subtraction' }
    ]
  },
  {
    id: 'pemdas',
    category: 'order-of-operations',
    name: 'PEMDAS Rule',
    formula: 'P → E → M → D → A → S',
    description: 'American version: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction',
    variables: [
      { symbol: 'P', description: 'Parentheses' },
      { symbol: 'E', description: 'Exponents' },
      { symbol: 'M', description: 'Multiplication' },
      { symbol: 'D', description: 'Division' },
      { symbol: 'A', description: 'Addition' },
      { symbol: 'S', description: 'Subtraction' }
    ]
  },
  {
    id: 'fraction-addition',
    category: 'fractions',
    name: 'Addition of Fractions',
    formula: 'a/b + c/d = (a×d + c×b)/(b×d)',
    description: 'Adding fractions with different denominators',
    variables: [
      { symbol: 'a/b', description: 'first fraction' },
      { symbol: 'c/d', description: 'second fraction' }
    ]
  },
  {
    id: 'fraction-subtraction',
    category: 'fractions',
    name: 'Subtraction of Fractions',
    formula: 'a/b - c/d = (a×d - c×b)/(b×d)',
    description: 'Subtracting fractions with different denominators',
    variables: [
      { symbol: 'a/b', description: 'first fraction' },
      { symbol: 'c/d', description: 'second fraction' }
    ]
  },
  {
    id: 'fraction-multiplication',
    category: 'fractions',
    name: 'Multiplication of Fractions',
    formula: '(a/b) × (c/d) = (a×c)/(b×d)',
    description: 'Multiplying fractions',
    variables: [
      { symbol: 'a/b', description: 'first fraction' },
      { symbol: 'c/d', description: 'second fraction' }
    ]
  },
  {
    id: 'fraction-division',
    category: 'fractions',
    name: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c)',
    description: 'Dividing fractions (multiply by reciprocal)',
    variables: [
      { symbol: 'a/b', description: 'first fraction' },
      { symbol: 'c/d', description: 'second fraction' }
    ]
  },
  {
    id: 'decimal-to-fraction',
    category: 'decimals',
    name: 'Decimal to Fraction',
    formula: '0.abcd... = abcd... / 10^n',
    description: 'Convert terminating decimal to fraction',
    variables: [
      { symbol: 'n', description: 'number of decimal places' }
    ]
  },
  {
    id: 'fraction-to-decimal',
    category: 'decimals',
    name: 'Fraction to Decimal',
    formula: 'a/b = decimal (terminating or repeating)',
    description: 'Convert fraction to decimal by division',
    variables: [
      { symbol: 'a/b', description: 'fraction' }
    ]
  },
  {
    id: 'mixed-to-improper',
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
    id: 'improper-to-mixed',
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
    id: 'power-multiplication',
    category: 'powers-exponents',
    name: 'Multiplication of Powers',
    formula: 'a^m × a^n = a^(m+n)',
    description: 'When multiplying same base, add exponents',
    variables: [
      { symbol: 'a^m', description: 'first power' },
      { symbol: 'a^n', description: 'second power' }
    ]
  },
  {
    id: 'power-division',
    category: 'powers-exponents',
    name: 'Division of Powers',
    formula: 'a^m ÷ a^n = a^(m-n)',
    description: 'When dividing same base, subtract exponents',
    variables: [
      { symbol: 'a^m', description: 'numerator power' },
      { symbol: 'a^n', description: 'denominator power' }
    ]
  },
  {
    id: 'power-power',
    category: 'powers-exponents',
    name: 'Power of a Power',
    formula: '(a^m)^n = a^(m×n)',
    description: 'When raising a power to another power, multiply exponents',
    variables: [
      { symbol: 'a^m', description: 'base power' },
      { symbol: 'n', description: 'outer exponent' }
    ]
  },
  {
    id: 'square-root',
    category: 'roots',
    name: 'Square Root',
    formula: '√a = b where b² = a',
    description: 'Square root is the number that when squared gives a',
    variables: [
      { symbol: '√a', description: 'square root of a' },
      { symbol: 'b', description: 'result' }
    ]
  },
  {
    id: 'cube-root',
    category: 'roots',
    name: 'Cube Root',
    formula: '∛a = b where b³ = a',
    description: 'Cube root is the number that when cubed gives a',
    variables: [
      { symbol: '∛a', description: 'cube root of a' },
      { symbol: 'b', description: 'result' }
    ]
  },
  {
    id: 'surd-multiplication',
    category: 'surds',
    name: 'Multiplication of Surds',
    formula: '√a × √b = √(a×b)',
    description: 'Product of square roots equals square root of product',
    variables: [
      { symbol: '√a × √b', description: 'product of surds' },
      { symbol: '√(a×b)', description: 'square root of product' }
    ]
  },
  {
    id: 'surd-division',
    category: 'surds',
    name: 'Division of Surds',
    formula: '√a ÷ √b = √(a/b)',
    description: 'Division of square roots equals square root of quotient',
    variables: [
      { symbol: '√a ÷ √b', description: 'quotient of surds' },
      { symbol: '√(a/b)', description: 'square root of quotient' }
    ]
  },
  {
    id: 'surd-addition',
    category: 'surds',
    name: 'Addition of Surds',
    formula: '√a + √b = √a + √b (cannot simplify further)',
    description: 'Unlike surds cannot be added directly',
    variables: [
      { symbol: '√a + √b', description: 'sum of unlike surds' }
    ]
  },
  {
    id: 'rationalization',
    category: 'surds',
    name: 'Rationalization',
    formula: '1/(√a + √b) × (√a - √b)/(√a - √b) = √a - √b',
    description: 'Multiply numerator and denominator by conjugate',
    variables: [
      { symbol: '√a ± √b', description: 'conjugate pair' }
    ]
  },
  {
    id: 'indices-law1',
    category: 'indices',
    name: 'First Law of Indices',
    formula: 'a^m × a^n = a^(m+n)',
    description: 'Multiplying powers with same base',
    variables: [
      { symbol: 'a^m × a^n', description: 'product of powers' },
      { symbol: 'a^(m+n)', description: 'simplified power' }
    ]
  },
  {
    id: 'indices-law2',
    category: 'indices',
    name: 'Second Law of Indices',
    formula: 'a^m ÷ a^n = a^(m-n)',
    description: 'Dividing powers with same base',
    variables: [
      { symbol: 'a^m ÷ a^n', description: 'quotient of powers' },
      { symbol: 'a^(m-n)', description: 'simplified power' }
    ]
  },
  {
    id: 'indices-law3',
    category: 'indices',
    name: 'Third Law of Indices',
    formula: '(a^m)^n = a^(m×n)',
    description: 'Power raised to another power',
    variables: [
      { symbol: '(a^m)^n', description: 'power of a power' },
      { symbol: 'a^(m×n)', description: 'simplified power' }
    ]
  },
  {
    id: 'indices-law4',
    category: 'indices',
    name: 'Fourth Law of Indices',
    formula: '(a×b)^n = a^n × b^n',
    description: 'Power of a product',
    variables: [
      { symbol: '(a×b)^n', description: 'power of product' },
      { symbol: 'a^n × b^n', description: 'expanded form' }
    ]
  },
  {
    id: 'indices-law5',
    category: 'indices',
    name: 'Fifth Law of Indices',
    formula: '(a/b)^n = a^n / b^n',
    description: 'Power of a quotient',
    variables: [
      { symbol: '(a/b)^n', description: 'power of quotient' },
      { symbol: 'a^n / b^n', description: 'expanded form' }
    ]
  },
  {
    id: 'indices-zero',
    category: 'indices',
    name: 'Zero Index',
    formula: 'a^0 = 1 (a ≠ 0)',
    description: 'Any non-zero number raised to power zero equals 1',
    variables: [
      { symbol: 'a^0', description: 'any number to power zero' }
    ]
  },
  {
    id: 'indices-negative',
    category: 'indices',
    name: 'Negative Index',
    formula: 'a^(-n) = 1/a^n',
    description: 'Negative exponent means reciprocal',
    variables: [
      { symbol: 'a^(-n)', description: 'negative exponent' },
      { symbol: '1/a^n', description: 'equivalent fraction' }
    ]
  },
  {
    id: 'approximation-rounding',
    category: 'approximation',
    name: 'Rounding Rules',
    formula: 'If last digit ≥ 5, round up; if < 5, round down',
    description: 'Standard rounding to specified decimal places',
    variables: [
      { symbol: 'last digit', description: 'digit being rounded' }
    ]
  },
  {
    id: 'approximation-significant-figures',
    category: 'approximation',
    name: 'Significant Figures',
    formula: 'Round to n significant figures',
    description: 'Keep first n non-zero digits, round appropriately',
    variables: [
      { symbol: 'n', description: 'number of significant figures' }
    ]
  },
  {
    id: 'identity-a2-b2',
    category: 'identities',
    name: 'Difference of Squares',
    formula: 'a² - b² = (a - b)(a + b)',
    description: 'Factor difference of two squares',
    variables: [
      { symbol: 'a² - b²', description: 'difference of squares' },
      { symbol: '(a - b)(a + b)', description: 'factored form' }
    ]
  },
  {
    id: 'identity-a3-b3',
    category: 'identities',
    name: 'Difference of Cubes',
    formula: 'a³ - b³ = (a - b)(a² + ab + b²)',
    description: 'Factor difference of two cubes',
    variables: [
      { symbol: 'a³ - b³', description: 'difference of cubes' },
      { symbol: '(a - b)(a² + ab + b²)', description: 'factored form' }
    ]
  },
  {
    id: 'identity-a3+b3',
    category: 'identities',
    name: 'Sum of Cubes',
    formula: 'a³ + b³ = (a + b)(a² - ab + b²)',
    description: 'Factor sum of two cubes',
    variables: [
      { symbol: 'a³ + b³', description: 'sum of cubes' },
      { symbol: '(a + b)(a² - ab + b²)', description: 'factored form' }
    ]
  },
  {
    id: 'sign-change-addition',
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
    id: 'sign-change-multiplication',
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
    id: 'sign-change-division',
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
  }
];

export default formulas;