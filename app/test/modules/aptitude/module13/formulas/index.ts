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
  // Basic Linear Equations
  {
    id: 'module13-linear-equation-definition',
    category: 'basic-concepts',
    name: 'Linear Equation Definition',
    formula: 'ax + by + c = 0',
    description: 'General form of linear equation in two variables',
    variables: [
      { symbol: 'a, b, c', description: 'real numbers, a and b not both zero' },
      { symbol: 'x, y', description: 'variables' }
    ]
  },
  {
    id: 'module13-one-variable-form',
    category: 'basic-concepts',
    name: 'Linear Equation in One Variable',
    formula: 'ax + b = c',
    description: 'Standard form for one variable linear equation',
    variables: [
      { symbol: 'a', description: 'coefficient (a ≠ 0)' },
      { symbol: 'b, c', description: 'constants' },
      { symbol: 'x', description: 'variable' }
    ]
  },
  {
    id: 'module13-slope-intercept-form',
    category: 'forms',
    name: 'Slope-Intercept Form',
    formula: 'y = mx + c',
    description: 'Linear equation showing slope and y-intercept',
    variables: [
      { symbol: 'm', description: 'slope of the line' },
      { symbol: 'c', description: 'y-intercept' }
    ]
  },
  {
    id: 'module13-intercept-form',
    category: 'forms',
    name: 'Intercept Form',
    formula: 'x/a + y/b = 1',
    description: 'Linear equation showing x and y intercepts',
    variables: [
      { symbol: 'a', description: 'x-intercept' },
      { symbol: 'b', description: 'y-intercept' }
    ]
  },

  // Solving Methods
  {
    id: 'module13-substitution-method',
    category: 'solving-methods',
    name: 'Substitution Method',
    formula: 'Express one variable and substitute',
    description: 'Solve system by expressing one variable in terms of other',
    variables: [
      { symbol: 'x', description: 'variable to express' },
      { symbol: 'y', description: 'variable to substitute' }
    ]
  },
  {
    id: 'module13-elimination-method',
    category: 'solving-methods',
    name: 'Elimination Method',
    formula: 'Add/Subtract equations to eliminate variable',
    description: 'Make coefficients equal and opposite, then add/subtract',
    variables: [
      { symbol: 'a₁, a₂', description: 'coefficients to make equal' }
    ]
  },
  {
    id: 'module13-cross-multiplication',
    category: 'solving-methods',
    name: 'Cross-Multiplication Method',
    formula: 'x/(b₁c₂ - b₂c₁) = y/(c₁a₂ - c₂a₁) = 1/(a₁b₂ - a₂b₁)',
    description: 'Solve system using determinant method',
    variables: [
      { symbol: 'a₁, b₁, c₁', description: 'coefficients of first equation' },
      { symbol: 'a₂, b₂, c₂', description: 'coefficients of second equation' }
    ]
  },

  // Special Cases and Consistency
  {
    id: 'module13-consistent-unique',
    category: 'consistency',
    name: 'Consistent System (Unique Solution)',
    formula: 'D = a₁b₂ - a₂b₁ ≠ 0',
    description: 'System has exactly one solution',
    variables: [
      { symbol: 'D', description: 'determinant of coefficients' }
    ]
  },
  {
    id: 'module13-consistent-infinite',
    category: 'consistency',
    name: 'Consistent System (Infinite Solutions)',
    formula: 'D = 0 and a₁c₂ - a₂c₁ = 0',
    description: 'System has infinitely many solutions',
    variables: [
      { symbol: 'D', description: 'determinant of coefficients' },
      { symbol: 'c₁, c₂', description: 'constant terms' }
    ]
  },
  {
    id: 'module13-inconsistent',
    category: 'consistency',
    name: 'Inconsistent System',
    formula: 'D = 0 and a₁c₂ - a₂c₁ ≠ 0',
    description: 'System has no solution',
    variables: [
      { symbol: 'D', description: 'determinant of coefficients' },
      { symbol: 'c₁, c₂', description: 'constant terms' }
    ]
  },

  // Word Problem Formulas
  {
    id: 'module13-age-difference',
    category: 'word-problems',
    name: 'Age Difference Relationship',
    formula: 'Current ages: x and x + d',
    description: 'Express ages when difference is known',
    variables: [
      { symbol: 'x', description: 'younger person\'s age' },
      { symbol: 'd', description: 'age difference' }
    ]
  },
  {
    id: 'module13-age-ratio',
    category: 'word-problems',
    name: 'Age Ratio Relationship',
    formula: 'Ages: x and kx',
    description: 'Express ages when ratio is known',
    variables: [
      { symbol: 'x', description: 'one person\'s age' },
      { symbol: 'k', description: 'ratio multiplier' }
    ]
  },
  {
    id: 'module13-cost-analysis',
    category: 'word-problems',
    name: 'Cost Analysis Equation',
    formula: 'Total Cost = (Quantity₁ × Price₁) + (Quantity₂ × Price₂)',
    description: 'Express total cost for multiple items',
    variables: [
      { symbol: 'Quantity₁, Quantity₂', description: 'quantities purchased' },
      { symbol: 'Price₁, Price₂', description: 'unit prices' }
    ]
  },
  {
    id: 'module13-distance-speed-time',
    category: 'word-problems',
    name: 'Distance-Speed-Time Relationship',
    formula: 'Distance = Speed × Time',
    description: 'Basic DST relationship',
    variables: [
      { symbol: 'Speed', description: 'rate of movement' },
      { symbol: 'Time', description: 'duration' }
    ]
  },
  {
    id: 'module13-work-rate',
    category: 'word-problems',
    name: 'Work Rate Formula',
    formula: 'Work Rate = 1/Time Taken',
    description: 'Rate at which work is completed',
    variables: [
      { symbol: 'Time Taken', description: 'time to complete work' }
    ]
  },
  {
    id: 'module13-combined-work',
    category: 'word-problems',
    name: 'Combined Work Rate',
    formula: 'Total Rate = Rate₁ + Rate₂',
    description: 'Combined rate when working together',
    variables: [
      { symbol: 'Rate₁, Rate₂', description: 'individual work rates' }
    ]
  },
  {
    id: 'module13-mixture-concentration',
    category: 'word-problems',
    name: 'Mixture Concentration',
    formula: 'Final% = (A×P + B×Q)/(A + B)',
    description: 'Final concentration in mixture problems',
    variables: [
      { symbol: 'A, B', description: 'quantities of components' },
      { symbol: 'P, Q', description: 'concentrations of components' }
    ]
  },

  // Profit and Loss
  {
    id: 'module13-profit-percentage',
    category: 'business-applications',
    name: 'Profit Percentage',
    formula: 'Profit% = (Profit/CP) × 100%',
    description: 'Calculate profit as percentage of cost price',
    variables: [
      { symbol: 'Profit', description: 'profit amount' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module13-loss-percentage',
    category: 'business-applications',
    name: 'Loss Percentage',
    formula: 'Loss% = (Loss/CP) × 100%',
    description: 'Calculate loss as percentage of cost price',
    variables: [
      { symbol: 'Loss', description: 'loss amount' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module13-selling-price-profit',
    category: 'business-applications',
    name: 'Selling Price with Profit',
    formula: 'SP = CP × (1 + Profit%/100)',
    description: 'Selling price when profit percentage is given',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'Profit%', description: 'profit percentage' }
    ]
  },
  {
    id: 'module13-selling-price-loss',
    category: 'business-applications',
    name: 'Selling Price with Loss',
    formula: 'SP = CP × (1 - Loss%/100)',
    description: 'Selling price when loss percentage is given',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'Loss%', description: 'loss percentage' }
    ]
  },

  // Investment and Interest
  {
    id: 'module13-simple-interest',
    category: 'interest-calculations',
    name: 'Simple Interest',
    formula: 'SI = (P × R × T)/100',
    description: 'Simple interest calculation',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module13-compound-interest',
    category: 'interest-calculations',
    name: 'Compound Interest Amount',
    formula: 'A = P × (1 + R/100)^T',
    description: 'Amount with compound interest',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },

  // Graphical Concepts
  {
    id: 'module13-distance-formula',
    category: 'coordinate-geometry',
    name: 'Distance Between Points',
    formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    description: 'Distance between two points on coordinate plane',
    variables: [
      { symbol: '(x₁, y₁)', description: 'coordinates of first point' },
      { symbol: '(x₂, y₂)', description: 'coordinates of second point' }
    ]
  },
  {
    id: 'module13-midpoint-formula',
    category: 'coordinate-geometry',
    name: 'Midpoint Formula',
    formula: 'Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
    description: 'Find midpoint between two points',
    variables: [
      { symbol: '(x₁, y₁), (x₂, y₂)', description: 'endpoints' }
    ]
  },
  {
    id: 'module13-triangle-area',
    category: 'coordinate-geometry',
    name: 'Area of Triangle',
    formula: 'Area = ½| (x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)) |',
    description: 'Area using coordinates of three points',
    variables: [
      { symbol: '(x₁,y₁), (x₂,y₂), (x₃,y₃)', description: 'triangle vertices' }
    ]
  },

  // Special Relationships
  {
    id: 'module13-successive-percentage',
    category: 'percentage-changes',
    name: 'Successive Percentage Changes',
    formula: 'Net% = A + B + (A×B)/100',
    description: 'Net change for successive percentage changes',
    variables: [
      { symbol: 'A, B', description: 'successive percentage changes' }
    ]
  },
  {
    id: 'module13-percentage-error',
    category: 'error-calculation',
    name: 'Percentage Error',
    formula: 'Error% = |(Measured - Actual)/Actual| × 100%',
    description: 'Calculate percentage error in measurements',
    variables: [
      { symbol: 'Measured', description: 'measured value' },
      { symbol: 'Actual', description: 'actual/true value' }
    ]
  }
];

export default formulas;