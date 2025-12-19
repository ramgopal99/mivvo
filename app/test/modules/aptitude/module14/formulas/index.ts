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
  // Basic Quadratic Equations
  {
    id: 'module14-quadratic-definition',
    category: 'basic-concepts',
    name: 'Quadratic Equation Definition',
    formula: 'ax² + bx + c = 0',
    description: 'General form of quadratic equation where a ≠ 0',
    variables: [
      { symbol: 'a', description: 'coefficient of x² (a ≠ 0)' },
      { symbol: 'b', description: 'coefficient of x' },
      { symbol: 'c', description: 'constant term' }
    ]
  },
  {
    id: 'module14-discriminant',
    category: 'discriminant',
    name: 'Discriminant',
    formula: 'D = b² - 4ac',
    description: 'Determines nature of quadratic equation roots',
    variables: [
      { symbol: 'D', description: 'discriminant value' },
      { symbol: 'a, b, c', description: 'coefficients from ax² + bx + c = 0' }
    ]
  },
  {
    id: 'module14-quadratic-formula',
    category: 'solving-methods',
    name: 'Quadratic Formula',
    formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
    description: 'Universal formula for solving quadratic equations',
    variables: [
      { symbol: 'x', description: 'roots of the equation' },
      { symbol: 'a, b, c', description: 'coefficients' }
    ]
  },

  // Root Properties
  {
    id: 'module14-sum-roots',
    category: 'root-properties',
    name: 'Sum of Roots',
    formula: 'α + β = -b/a',
    description: 'Sum of roots for equation ax² + bx + c = 0',
    variables: [
      { symbol: 'α, β', description: 'roots of quadratic equation' },
      { symbol: 'a, b', description: 'coefficients' }
    ]
  },
  {
    id: 'module14-product-roots',
    category: 'root-properties',
    name: 'Product of Roots',
    formula: 'α × β = c/a',
    description: 'Product of roots for equation ax² + bx + c = 0',
    variables: [
      { symbol: 'α, β', description: 'roots of quadratic equation' },
      { symbol: 'a, c', description: 'coefficients' }
    ]
  },
  {
    id: 'module14-quadratic-from-roots',
    category: 'root-properties',
    name: 'Equation from Roots',
    formula: 'x² - (α + β)x + (αβ) = 0',
    description: 'Form quadratic equation given sum and product of roots',
    variables: [
      { symbol: 'α + β', description: 'sum of roots' },
      { symbol: 'αβ', description: 'product of roots' }
    ]
  },

  // Nature of Roots
  {
    id: 'module14-real-roots-condition',
    category: 'nature-roots',
    name: 'Real Roots Condition',
    formula: 'D ≥ 0',
    description: 'Condition for real roots (D = b² - 4ac)',
    variables: [
      { symbol: 'D', description: 'discriminant' }
    ]
  },
  {
    id: 'module14-equal-roots-condition',
    category: 'nature-roots',
    name: 'Equal Roots Condition',
    formula: 'D = 0',
    description: 'Condition for equal real roots',
    variables: [
      { symbol: 'D', description: 'discriminant' }
    ]
  },
  {
    id: 'module14-complex-roots-form',
    category: 'nature-roots',
    name: 'Complex Roots Form',
    formula: 'α, β = [-b ± √(-D)i]/(2a)',
    description: 'Complex roots when D < 0',
    variables: [
      { symbol: 'i', description: 'imaginary unit (i² = -1)' },
      { symbol: 'D', description: 'negative discriminant' }
    ]
  },

  // Solving Methods
  {
    id: 'module14-factorization-method',
    category: 'solving-methods',
    name: 'Factorization Method',
    formula: '(x - α)(x - β) = 0',
    description: 'Solve by factoring into linear factors',
    variables: [
      { symbol: 'α, β', description: 'roots of the equation' }
    ]
  },
  {
    id: 'module14-completing-square',
    category: 'solving-methods',
    name: 'Completing the Square',
    formula: 'x² + (b/a)x = -c/a',
    description: 'Transform to perfect square plus constant',
    variables: [
      { symbol: 'a, b, c', description: 'coefficients' }
    ]
  },
  {
    id: 'module14-perfect-square-form',
    category: 'solving-methods',
    name: 'Perfect Square Identity',
    formula: '(x + b/(2a))² = -c/a + (b/(2a))²',
    description: 'Completed square form',
    variables: [
      { symbol: 'a, b, c', description: 'coefficients' }
    ]
  },

  // Graphical Properties
  {
    id: 'module14-vertex-formula',
    category: 'graphical-properties',
    name: 'Vertex Coordinates',
    formula: 'h = -b/(2a), k = -D/(4a)',
    description: 'Coordinates of parabola vertex',
    variables: [
      { symbol: 'h, k', description: 'vertex coordinates (h,k)' },
      { symbol: 'D', description: 'discriminant' }
    ]
  },
  {
    id: 'module14-axis-symmetry',
    category: 'graphical-properties',
    name: 'Axis of Symmetry',
    formula: 'x = -b/(2a)',
    description: 'Vertical line through vertex',
    variables: [
      { symbol: 'a, b', description: 'coefficients' }
    ]
  },
  {
    id: 'module14-focus-directrix',
    category: 'graphical-properties',
    name: 'Focus and Directrix',
    formula: 'Focus: (-b/(2a), -D/(4a) + 1/(4a))',
    description: 'Conic section properties of parabola',
    variables: [
      { symbol: 'D', description: 'discriminant' }
    ]
  },

  // Word Problem Formulas
  {
    id: 'module14-area-rectangle',
    category: 'word-problems',
    name: 'Rectangle Area',
    formula: 'Area = Length × Width',
    description: 'Area relationship for rectangles',
    variables: [
      { symbol: 'Length, Width', description: 'rectangle dimensions' }
    ]
  },
  {
    id: 'module14-pythagorean-theorem',
    category: 'word-problems',
    name: 'Pythagorean Theorem',
    formula: 'Hypotenuse² = Side₁² + Side₂²',
    description: 'Right triangle side relationships',
    variables: [
      { symbol: 'Hypotenuse', description: 'longest side' },
      { symbol: 'Side₁, Side₂', description: 'other two sides' }
    ]
  },
  {
    id: 'module14-work-rate-formula',
    category: 'word-problems',
    name: 'Work Rate',
    formula: 'Rate = 1/Time',
    description: 'Individual work completion rate',
    variables: [
      { symbol: 'Time', description: 'time to complete work' }
    ]
  },
  {
    id: 'module14-combined-work-rate',
    category: 'word-problems',
    name: 'Combined Work Rate',
    formula: 'Total Rate = Rate₁ + Rate₂ + ...',
    description: 'Combined work rate when working together',
    variables: [
      { symbol: 'Rate₁, Rate₂', description: 'individual rates' }
    ]
  },
  {
    id: 'module14-speed-distance-time',
    category: 'word-problems',
    name: 'Speed-Distance-Time',
    formula: 'Distance = Speed × Time',
    description: 'Basic motion relationship',
    variables: [
      { symbol: 'Speed', description: 'rate of motion' },
      { symbol: 'Time', description: 'duration' }
    ]
  },
  {
    id: 'module14-relative-speed',
    category: 'word-problems',
    name: 'Relative Speed',
    formula: 'Relative Speed = |Speed₁ - Speed₂|',
    description: 'Speed when objects move towards/away from each other',
    variables: [
      { symbol: 'Speed₁, Speed₂', description: 'speeds of two objects' }
    ]
  },
  {
    id: 'module14-simple-interest',
    category: 'word-problems',
    name: 'Simple Interest',
    formula: 'SI = (Principal × Rate × Time)/100',
    description: 'Simple interest calculation',
    variables: [
      { symbol: 'Principal', description: 'initial amount' },
      { symbol: 'Rate', description: 'interest rate (%)' },
      { symbol: 'Time', description: 'time period' }
    ]
  },
  {
    id: 'module14-mixture-concentration',
    category: 'word-problems',
    name: 'Mixture Concentration',
    formula: 'Final% = (Amount₁ × Conc₁ + Amount₂ × Conc₂)/(Amount₁ + Amount₂)',
    description: 'Final concentration in mixture problems',
    variables: [
      { symbol: 'Amount₁, Amount₂', description: 'quantities mixed' },
      { symbol: 'Conc₁, Conc₂', description: 'concentrations' }
    ]
  },

  // Special Cases and Identities
  {
    id: 'module14-difference-squares',
    category: 'special-identities',
    name: 'Difference of Squares',
    formula: 'a² - b² = (a - b)(a + b)',
    description: 'Factor difference of perfect squares',
    variables: [
      { symbol: 'a, b', description: 'terms being squared' }
    ]
  },
  {
    id: 'module14-perfect-square-trinomial',
    category: 'special-identities',
    name: 'Perfect Square Trinomial',
    formula: 'a² + 2ab + b² = (a + b)²',
    description: 'Perfect square expansion',
    variables: [
      { symbol: 'a, b', description: 'terms in expansion' }
    ]
  },
  {
    id: 'module14-quadratic-identity',
    category: 'special-identities',
    name: 'Sum of Squares Identity',
    formula: '(a + b)² = a² + 2ab + b²',
    description: 'Expansion of squared binomial',
    variables: [
      { symbol: 'a, b', description: 'terms being added' }
    ]
  },

  // Advanced Root Transformations
  {
    id: 'module14-square-roots-equation',
    category: 'root-transformations',
    name: 'Equation with Square Roots',
    formula: 'x² - (α² + β²)x + (αβ)² = 0',
    description: 'Quadratic equation with squares of roots',
    variables: [
      { symbol: 'α, β', description: 'original roots' }
    ]
  },
  {
    id: 'module14-reciprocal-roots-equation',
    category: 'root-transformations',
    name: 'Equation with Reciprocal Roots',
    formula: 'c x² - b x + a = 0',
    description: 'Equation with reciprocals of original roots',
    variables: [
      { symbol: 'a, b, c', description: 'original coefficients' }
    ]
  },
  {
    id: 'module14-root-sum-squares',
    category: 'root-properties',
    name: 'Sum of Squares of Roots',
    formula: 'α² + β² = (α + β)² - 2αβ',
    description: 'Relationship between roots and their squares',
    variables: [
      { symbol: 'α, β', description: 'roots of equation' }
    ]
  },

  // Maximum/Minimum Values
  {
    id: 'module14-maximum-minimum-value',
    category: 'optimization',
    name: 'Maximum/Minimum Value',
    formula: 'Value = -D/(4a)',
    description: 'Maximum/minimum value of quadratic function',
    variables: [
      { symbol: 'D', description: 'discriminant' },
      { symbol: 'a', description: 'leading coefficient' }
    ]
  },
  {
    id: 'module14-maximum-condition',
    category: 'optimization',
    name: 'Maximum Condition',
    formula: 'a < 0',
    description: 'Function has maximum when leading coefficient negative',
    variables: [
      { symbol: 'a', description: 'leading coefficient' }
    ]
  },
  {
    id: 'module14-minimum-condition',
    category: 'optimization',
    name: 'Minimum Condition',
    formula: 'a > 0',
    description: 'Function has minimum when leading coefficient positive',
    variables: [
      { symbol: 'a', description: 'leading coefficient' }
    ]
  }
];

export default formulas;