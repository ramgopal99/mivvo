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
    id: 'quadratic',
    category: 'algebra',
    name: 'Quadratic Formula',
    formula: 'x = [-b ± √(b² - 4ac)] / 2a',
    description: 'Solutions for ax² + bx + c = 0',
    variables: [
      { symbol: 'a', description: 'coefficient of x²' },
      { symbol: 'b', description: 'coefficient of x' },
      { symbol: 'c', description: 'constant term' }
    ]
  },
  {
    id: 'pythagoras',
    category: 'geometry',
    name: 'Pythagoras Theorem',
    formula: 'a² + b² = c²',
    description: 'Right-angled triangle relationship',
    variables: [
      { symbol: 'a', description: 'length of first leg' },
      { symbol: 'b', description: 'length of second leg' },
      { symbol: 'c', description: 'length of hypotenuse' }
    ]
  },
  {
    id: 'percentage',
    category: 'percentage',
    name: 'Percentage Change',
    formula: 'Change = [(New - Old)/Old] × 100%',
    description: 'Calculate percentage increase/decrease',
    variables: [
      { symbol: 'New', description: 'new value' },
      { symbol: 'Old', description: 'old value' }
    ]
  },
  {
    id: 'compound-interest',
    category: 'interest',
    name: 'Compound Interest',
    formula: 'A = P(1 + r/n)^(nt)',
    description: 'Future value with compound interest',
    variables: [
      { symbol: 'A', description: 'future value' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'r', description: 'annual interest rate' },
      { symbol: 'n', description: 'compounding frequency' },
      { symbol: 't', description: 'time in years' }
    ]
  },
  {
    id: 'mean',
    category: 'statistics',
    name: 'Arithmetic Mean',
    formula: 'Mean = Σx / n',
    description: 'Average of n numbers',
    variables: [
      { symbol: 'Σx', description: 'sum of all values' },
      { symbol: 'n', description: 'number of values' }
    ]
  },
  {
    id: 'simple-interest',
    category: 'interest',
    name: 'Simple Interest',
    formula: 'SI = (P × R × T) / 100',
    description: 'Simple interest calculation',
    variables: [
      { symbol: 'SI', description: 'simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'area-circle',
    category: 'geometry',
    name: 'Area of Circle',
    formula: 'A = πr²',
    description: 'Area of a circle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'r', description: 'radius' },
      { symbol: 'π', description: 'pi (≈ 3.14159)' }
    ]
  },
  {
    id: 'area-rectangle',
    category: 'geometry',
    name: 'Area of Rectangle',
    formula: 'A = l × w',
    description: 'Area of a rectangle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'l', description: 'length' },
      { symbol: 'w', description: 'width' }
    ]
  },
  {
    id: 'area-triangle',
    category: 'geometry',
    name: 'Area of Triangle',
    formula: 'A = (1/2) × b × h',
    description: 'Area of a triangle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'b', description: 'base' },
      { symbol: 'h', description: 'height' }
    ]
  },
  {
    id: 'volume-cylinder',
    category: 'geometry',
    name: 'Volume of Cylinder',
    formula: 'V = πr²h',
    description: 'Volume of a cylinder',
    variables: [
      { symbol: 'V', description: 'volume' },
      { symbol: 'r', description: 'radius' },
      { symbol: 'h', description: 'height' },
      { symbol: 'π', description: 'pi (≈ 3.14159)' }
    ]
  },
  {
    id: 'arithmetic-progression',
    category: 'algebra',
    name: 'Arithmetic Progression',
    formula: 'nth term = a + (n-1)d',
    description: 'nth term of an arithmetic sequence',
    variables: [
      { symbol: 'a', description: 'first term' },
      { symbol: 'n', description: 'term number' },
      { symbol: 'd', description: 'common difference' }
    ]
  },
  {
    id: 'geometric-progression',
    category: 'algebra',
    name: 'Geometric Progression',
    formula: 'nth term = a × r^(n-1)',
    description: 'nth term of a geometric sequence',
    variables: [
      { symbol: 'a', description: 'first term' },
      { symbol: 'r', description: 'common ratio' },
      { symbol: 'n', description: 'term number' }
    ]
  },
  {
    id: 'probability',
    category: 'statistics',
    name: 'Probability',
    formula: 'P(A) = n(A) / n(S)',
    description: 'Probability of event A',
    variables: [
      { symbol: 'P(A)', description: 'probability of event A' },
      { symbol: 'n(A)', description: 'number of favorable outcomes' },
      { symbol: 'n(S)', description: 'total number of possible outcomes' }
    ]
  },
  {
    id: 'standard-deviation',
    category: 'statistics',
    name: 'Standard Deviation',
    formula: 'σ = √[Σ(x - μ)² / N]',
    description: 'Measure of data dispersion',
    variables: [
      { symbol: 'σ', description: 'standard deviation' },
      { symbol: 'x', description: 'individual values' },
      { symbol: 'μ', description: 'mean' },
      { symbol: 'N', description: 'total number of values' }
    ]
  },
  {
    id: 'lcm-hcf',
    category: 'algebra',
    name: 'LCM × HCF',
    formula: 'LCM × HCF = a × b',
    description: 'Relationship between LCM and HCF of two numbers',
    variables: [
      { symbol: 'LCM', description: 'least common multiple' },
      { symbol: 'HCF', description: 'highest common factor' },
      { symbol: 'a, b', description: 'the two numbers' }
    ]
  }
];

export default formulas;