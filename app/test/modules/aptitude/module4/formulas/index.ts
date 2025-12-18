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
    id: 'module4-percentage-basic',
    category: 'basic-percentage',
    name: 'Basic Percentage Formula',
    formula: 'Percentage = (Part/Whole) × 100%',
    description: 'Convert fraction to percentage by multiplying by 100',
    variables: [
      { symbol: 'Part', description: 'portion of the whole' },
      { symbol: 'Whole', description: 'total amount' }
    ]
  },
  {
    id: 'module4-fraction-to-percentage',
    category: 'conversions',
    name: 'Fraction to Percentage',
    formula: 'a/b = (a/b × 100)%',
    description: 'Convert fraction to percentage',
    variables: [
      { symbol: 'a/b', description: 'fraction' }
    ]
  },
  {
    id: 'module4-percentage-to-fraction',
    category: 'conversions',
    name: 'Percentage to Fraction',
    formula: 'x% = x/100',
    description: 'Convert percentage to fraction',
    variables: [
      { symbol: 'x%', description: 'percentage value' }
    ]
  },
  {
    id: 'module4-percentage-increase',
    category: 'percentage-change',
    name: 'Percentage Increase',
    formula: 'Increase% = [(New - Old)/Old] × 100%',
    description: 'Calculate percentage increase',
    variables: [
      { symbol: 'New', description: 'new value' },
      { symbol: 'Old', description: 'original value' }
    ]
  },
  {
    id: 'module4-percentage-decrease',
    category: 'percentage-change',
    name: 'Percentage Decrease',
    formula: 'Decrease% = [(Old - New)/Old] × 100%',
    description: 'Calculate percentage decrease',
    variables: [
      { symbol: 'Old', description: 'original value' },
      { symbol: 'New', description: 'new value' }
    ]
  },
  {
    id: 'module4-successive-percentage',
    category: 'successive-change',
    name: 'Successive Percentage Change',
    formula: 'Net% = a% + b% + (a% × b%)/100%',
    description: 'Net change for successive percentage changes',
    variables: [
      { symbol: 'a%', description: 'first percentage change' },
      { symbol: 'b%', description: 'second percentage change' }
    ]
  },
  {
    id: 'module4-percentage-of-number',
    category: 'finding-parts',
    name: 'Percentage of a Number',
    formula: 'Value = (Percentage/100) × Total',
    description: 'Find what percentage of a number is',
    variables: [
      { symbol: 'Percentage', description: 'percentage to find' },
      { symbol: 'Total', description: 'total amount' }
    ]
  },
  {
    id: 'module4-number-from-percentage',
    category: 'finding-whole',
    name: 'Number When Percentage Is Given',
    formula: 'Whole = (Part × 100)/Percentage',
    description: 'Find whole number when part and percentage are given',
    variables: [
      { symbol: 'Part', description: 'known part' },
      { symbol: 'Percentage', description: 'percentage of the part' }
    ]
  },
  {
    id: 'module4-population-growth',
    category: 'population',
    name: 'Population Growth',
    formula: 'Population = P × (1 + r/100)^t',
    description: 'Population after t years with growth rate r%',
    variables: [
      { symbol: 'P', description: 'initial population' },
      { symbol: 'r', description: 'annual growth rate (%)' },
      { symbol: 't', description: 'time period in years' }
    ]
  },
  {
    id: 'module4-depreciation',
    category: 'depreciation',
    name: 'Depreciation Formula',
    formula: 'Value = P × (1 - r/100)^t',
    description: 'Value after depreciation at rate r% for t years',
    variables: [
      { symbol: 'P', description: 'original value' },
      { symbol: 'r', description: 'depreciation rate (%)' },
      { symbol: 't', description: 'time period' }
    ]
  },
  {
    id: 'module4-appreciation',
    category: 'appreciation',
    name: 'Appreciation Formula',
    formula: 'Value = P × (1 + r/100)^t',
    description: 'Value after appreciation at rate r% for t years',
    variables: [
      { symbol: 'P', description: 'original value' },
      { symbol: 'r', description: 'appreciation rate (%)' },
      { symbol: 't', description: 'time period' }
    ]
  },
  {
    id: 'module4-percentage-error',
    category: 'error-calculation',
    name: 'Percentage Error',
    formula: 'Error% = |(Measured - Actual)/Actual| × 100%',
    description: 'Calculate percentage error in measurements',
    variables: [
      { symbol: 'Measured', description: 'measured value' },
      { symbol: 'Actual', description: 'actual/true value' }
    ]
  },
  {
    id: 'module4-relative-error',
    category: 'error-calculation',
    name: 'Relative Error',
    formula: 'Relative Error = |Error/Actual| = |Error%|100%',
    description: 'Relative error as a decimal',
    variables: [
      { symbol: 'Error', description: 'absolute error' },
      { symbol: 'Actual', description: 'actual value' }
    ]
  },
  {
    id: 'module4-percentage-comparison',
    category: 'comparison',
    name: 'Percentage Comparison',
    formula: 'Difference% = |(A - B)/B| × 100%',
    description: 'Compare two values as percentage difference',
    variables: [
      { symbol: 'A', description: 'first value' },
      { symbol: 'B', description: 'second value (base)' }
    ]
  },
  {
    id: 'module4-profit-percentage',
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
    id: 'module4-loss-percentage',
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
    id: 'module4-selling-price-profit',
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
    id: 'module4-selling-price-loss',
    category: 'business-applications',
    name: 'Selling Price with Loss',
    formula: 'SP = CP × (1 - Loss%/100)',
    description: 'Selling price when loss percentage is given',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'Loss%', description: 'loss percentage' }
    ]
  },
  {
    id: 'module4-markup-percentage',
    category: 'business-applications',
    name: 'Markup Percentage',
    formula: 'Markup% = (SP - CP)/CP × 100%',
    description: 'Calculate markup percentage on cost price',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module4-discount-percentage',
    category: 'business-applications',
    name: 'Discount Percentage',
    formula: 'Discount% = (Discount/MP) × 100%',
    description: 'Calculate discount percentage on marked price',
    variables: [
      { symbol: 'Discount', description: 'discount amount' },
      { symbol: 'MP', description: 'marked price' }
    ]
  },
  {
    id: 'module4-simple-interest',
    category: 'interest-calculations',
    name: 'Simple Interest Percentage',
    formula: 'SI = (P × R × T)/100',
    description: 'Simple interest calculation',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module4-compound-interest',
    category: 'interest-calculations',
    name: 'Compound Interest Formula',
    formula: 'A = P × (1 + R/100)^T',
    description: 'Amount with compound interest',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module4-mixture-percentage',
    category: 'mixture-problems',
    name: 'Mixture Concentration',
    formula: 'Final% = (A×P + B×Q)/(A + B)',
    description: 'Final percentage in mixture problems',
    variables: [
      { symbol: 'A', description: 'quantity of first component' },
      { symbol: 'P', description: 'percentage/concentration of first' },
      { symbol: 'B', description: 'quantity of second component' },
      { symbol: 'Q', description: 'percentage/concentration of second' }
    ]
  }
];

export default formulas;