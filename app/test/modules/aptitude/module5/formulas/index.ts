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
    id: 'module5-ratio-basic',
    category: 'basic-ratio',
    name: 'Basic Ratio Formula',
    formula: 'a:b or a/b',
    description: 'Ratio of two quantities a and b',
    variables: [
      { symbol: 'a', description: 'first quantity' },
      { symbol: 'b', description: 'second quantity' }
    ]
  },
  {
    id: 'module5-ratio-simplification',
    category: 'ratio-operations',
    name: 'Ratio Simplification',
    formula: 'a:b = (a÷d):(b÷d)',
    description: 'Simplify ratio by dividing by HCF',
    variables: [
      { symbol: 'd', description: 'HCF of a and b' }
    ]
  },
  {
    id: 'module5-ratio-equality',
    category: 'ratio-comparison',
    name: 'Ratio Equality',
    formula: 'a/b = c/d',
    description: 'Two ratios are equal when cross products are equal',
    variables: [
      { symbol: 'a/b', description: 'first ratio' },
      { symbol: 'c/d', description: 'second ratio' }
    ]
  },
  {
    id: 'module5-proportion-direct',
    category: 'proportion',
    name: 'Direct Proportion',
    formula: 'a/b = c/d or a/b = k',
    description: 'Quantities vary in same direction',
    variables: [
      { symbol: 'k', description: 'constant of proportionality' }
    ]
  },
  {
    id: 'module5-proportion-inverse',
    category: 'proportion',
    name: 'Inverse Proportion',
    formula: 'a × b = k or a/b = 1/k',
    description: 'Product of quantities is constant',
    variables: [
      { symbol: 'k', description: 'constant of proportionality' }
    ]
  },
  {
    id: 'module5-continued-proportion',
    category: 'proportion',
    name: 'Continued Proportion',
    formula: 'a:b = b:c or a/b = b/c',
    description: 'Three quantities in proportion',
    variables: [
      { symbol: 'a, b, c', description: 'three quantities in continued proportion' }
    ]
  },
  {
    id: 'module5-mean-proportional',
    category: 'proportion',
    name: 'Mean Proportional',
    formula: 'b² = a × c',
    description: 'Middle term is geometric mean',
    variables: [
      { symbol: 'b', description: 'mean proportional between a and c' }
    ]
  },
  {
    id: 'module5-third-proportional',
    category: 'proportion',
    name: 'Third Proportional',
    formula: 'a:b = b:c ⇒ c = (b²)/a',
    description: 'Third term when first two are given',
    variables: [
      { symbol: 'c', description: 'third proportional to a and b' }
    ]
  },
  {
    id: 'module5-fourth-proportional',
    category: 'proportion',
    name: 'Fourth Proportional',
    formula: 'a:b = c:d ⇒ d = (b × c)/a',
    description: 'Fourth term when first three are given',
    variables: [
      { symbol: 'd', description: 'fourth proportional to a, b, c' }
    ]
  },
  {
    id: 'module5-compound-ratio',
    category: 'ratio-operations',
    name: 'Compound Ratio',
    formula: '(a×c):(b×d)',
    description: 'Ratio of two ratios',
    variables: [
      { symbol: 'a/b, c/d', description: 'two ratios' }
    ]
  },
  {
    id: 'module5-ratio-duplicate',
    category: 'ratio-operations',
    name: 'Duplicate Ratio',
    formula: '(a:b)² or a²:b²',
    description: 'Square of the ratio',
    variables: [
      { symbol: 'a²:b²', description: 'duplicate ratio of a:b' }
    ]
  },
  {
    id: 'module5-ratio-subduplicate',
    category: 'ratio-operations',
    name: 'Sub-duplicate Ratio',
    formula: '√a:√b',
    description: 'Square root of the ratio',
    variables: [
      { symbol: '√a:√b', description: 'sub-duplicate ratio of a:b' }
    ]
  },
  {
    id: 'module5-ratio-triplicate',
    category: 'ratio-operations',
    name: 'Triplicate Ratio',
    formula: 'a³:b³',
    description: 'Cube of the ratio',
    variables: [
      { symbol: 'a³:b³', description: 'triplicate ratio of a:b' }
    ]
  },
  {
    id: 'module5-ratio-subtriplicate',
    category: 'ratio-operations',
    name: 'Sub-triplicate Ratio',
    formula: '∛a:∛b',
    description: 'Cube root of the ratio',
    variables: [
      { symbol: '∛a:∛b', description: 'sub-triplicate ratio of a:b' }
    ]
  },
  {
    id: 'module5-ratio-division',
    category: 'ratio-division',
    name: 'Division in Ratio',
    formula: 'Part = Total × (ratio part)/(sum of ratios)',
    description: 'Divide quantity in given ratio',
    variables: [
      { symbol: 'Total', description: 'total quantity to divide' },
      { symbol: 'ratio part', description: 'share of each part' },
      { symbol: 'sum of ratios', description: 'total ratio parts' }
    ]
  },
  {
    id: 'module5-commensurable-quantities',
    category: 'ratio-properties',
    name: 'Commensurable Quantities',
    formula: 'Same unit quantities',
    description: 'Quantities that can be compared directly',
    variables: [
      { symbol: 'same unit', description: 'quantities in same measurement unit' }
    ]
  },
  {
    id: 'module5-incommensurable-quantities',
    category: 'ratio-properties',
    name: 'Incommensurable Quantities',
    formula: 'Different unit quantities',
    description: 'Quantities in different units need conversion',
    variables: [
      { symbol: 'different units', description: 'quantities in different measurement units' }
    ]
  },
  {
    id: 'module5-ratio-inversion',
    category: 'ratio-operations',
    name: 'Invertendo',
    formula: 'a:b = c:d ⇒ b:a = d:c',
    description: 'Inverting ratios gives inverse ratio',
    variables: [
      { symbol: 'a:b, c:d', description: 'original ratios' },
      { symbol: 'b:a, d:c', description: 'inverted ratios' }
    ]
  },
  {
    id: 'module5-ratio-alternendo',
    category: 'ratio-operations',
    name: 'Alternendo',
    formula: 'a:b = c:d ⇒ a:c = b:d',
    description: 'Alternating terms gives new ratio',
    variables: [
      { symbol: 'a:b = c:d', description: 'original proportion' },
      { symbol: 'a:c = b:d', description: 'alternendo result' }
    ]
  },
  {
    id: 'module5-ratio-componendo',
    category: 'ratio-operations',
    name: 'Componendo',
    formula: 'a:b = c:d ⇒ (a+b):b = (c+d):d',
    description: 'Adding numerator to denominator',
    variables: [
      { symbol: 'a:b = c:d', description: 'original proportion' },
      { symbol: 'a+b:b = c+d:d', description: 'componendo result' }
    ]
  },
  {
    id: 'module5-ratio-dividendo',
    category: 'ratio-operations',
    name: 'Dividendo',
    formula: 'a:b = c:d ⇒ (a-b):b = (c-d):d',
    description: 'Subtracting numerator from denominator',
    variables: [
      { symbol: 'a:b = c:d', description: 'original proportion' },
      { symbol: 'a-b:b = c-d:d', description: 'dividendo result' }
    ]
  },
  {
    id: 'module5-ratio-componendo-dividendo',
    category: 'ratio-operations',
    name: 'Componendo-Dividendo',
    formula: '(a+b)/(a-b) = (c+d)/(c-d)',
    description: 'Combined componendo and dividendo',
    variables: [
      { symbol: 'a:b = c:d', description: 'original proportion' },
      { symbol: '(a+b)/(a-b)', description: 'componendo-dividendo result' }
    ]
  },
  {
    id: 'module5-age-ratio',
    category: 'applications',
    name: 'Age Ratio Problems',
    formula: 'Current ages ratio = (Current age differences)',
    description: 'Solving age-related ratio problems',
    variables: [
      { symbol: 'age differences', description: 'differences in current ages' }
    ]
  },
  {
    id: 'module5-mixture-ratio',
    category: 'applications',
    name: 'Mixture Ratio',
    formula: 'Final ratio = (Quantity1 × Ratio1 + Quantity2 × Ratio2)/(Total quantity)',
    description: 'Ratio in mixture problems',
    variables: [
      { symbol: 'Quantity1, Quantity2', description: 'quantities of components' },
      { symbol: 'Ratio1, Ratio2', description: 'ratios of components' }
    ]
  },
  {
    id: 'module5-work-ratio',
    category: 'applications',
    name: 'Work Ratio',
    formula: 'Efficiency ratio = 1/(Time ratio)',
    description: 'Ratio of work efficiencies',
    variables: [
      { symbol: 'Time ratio', description: 'ratio of time taken' }
    ]
  },
  {
    id: 'module5-speed-ratio',
    category: 'applications',
    name: 'Speed Ratio',
    formula: 'Speed ratio = Distance ratio/Time ratio',
    description: 'Ratio of speeds in motion problems',
    variables: [
      { symbol: 'Distance ratio', description: 'ratio of distances covered' },
      { symbol: 'Time ratio', description: 'ratio of time taken' }
    ]
  }
];

export default formulas;