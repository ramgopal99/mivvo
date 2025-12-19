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
  // Basic DI Calculations
  {
    id: 'module15-percentage-basic',
    category: 'percentage-calculations',
    name: 'Basic Percentage',
    formula: 'Percentage = (Part/Whole) × 100%',
    description: 'Calculate percentage share of a part in whole',
    variables: [
      { symbol: 'Part', description: 'portion of the whole' },
      { symbol: 'Whole', description: 'total amount' }
    ]
  },
  {
    id: 'module15-percentage-change',
    category: 'percentage-calculations',
    name: 'Percentage Change',
    formula: 'Change% = [(New - Old)/Old] × 100%',
    description: 'Calculate percentage increase or decrease',
    variables: [
      { symbol: 'New', description: 'new value' },
      { symbol: 'Old', description: 'original value' }
    ]
  },
  {
    id: 'module15-ratio-basic',
    category: 'ratio-calculations',
    name: 'Basic Ratio',
    formula: 'Ratio = A:B or A/B',
    description: 'Express relationship between two quantities',
    variables: [
      { symbol: 'A, B', description: 'quantities being compared' }
    ]
  },
  {
    id: 'module15-average-basic',
    category: 'average-calculations',
    name: 'Simple Average',
    formula: 'Average = Sum of values/Number of values',
    description: 'Calculate arithmetic mean of values',
    variables: [
      { symbol: 'Sum of values', description: 'total of all values' },
      { symbol: 'Number of values', description: 'count of values' }
    ]
  },
  {
    id: 'module15-weighted-average',
    category: 'average-calculations',
    name: 'Weighted Average',
    formula: 'WA = Σ(weight × value)/Σ(weight)',
    description: 'Average when different values have different importance',
    variables: [
      { symbol: 'weight', description: 'importance factor' },
      { symbol: 'value', description: 'individual value' }
    ]
  },

  // Growth and Rate Calculations
  {
    id: 'module15-growth-rate',
    category: 'growth-calculations',
    name: 'Growth Rate',
    formula: 'Growth Rate = [(Final - Initial)/Initial] × 100%',
    description: 'Calculate percentage growth over period',
    variables: [
      { symbol: 'Final', description: 'ending value' },
      { symbol: 'Initial', description: 'starting value' }
    ]
  },
  {
    id: 'module15-compound-growth',
    category: 'growth-calculations',
    name: 'Compound Annual Growth Rate',
    formula: 'CAGR = [(Final/Initial)^(1/n) - 1] × 100%',
    description: 'Calculate compound growth rate over n years',
    variables: [
      { symbol: 'Final', description: 'final value' },
      { symbol: 'Initial', description: 'initial value' },
      { symbol: 'n', description: 'number of periods' }
    ]
  },
  {
    id: 'module15-successive-growth',
    category: 'growth-calculations',
    name: 'Successive Growth',
    formula: 'Net% = A + B + (A×B)/100%',
    description: 'Net change for successive percentage changes',
    variables: [
      { symbol: 'A, B', description: 'successive growth percentages' }
    ]
  },

  // Table Analysis Formulas
  {
    id: 'module15-table-total',
    category: 'table-analysis',
    name: 'Row/Column Total',
    formula: 'Total = Sum of individual values',
    description: 'Calculate sum of row or column values',
    variables: [
      { symbol: 'individual values', description: 'all values in row/column' }
    ]
  },
  {
    id: 'module15-table-percentage',
    category: 'table-analysis',
    name: 'Table Percentage',
    formula: 'Cell% = (Cell value/Total) × 100%',
    description: 'Calculate percentage of cell value to total',
    variables: [
      { symbol: 'Cell value', description: 'value in specific cell' },
      { symbol: 'Total', description: 'relevant total value' }
    ]
  },
  {
    id: 'module15-table-average',
    category: 'table-analysis',
    name: 'Table Average',
    formula: 'Average = Total value/Number of entries',
    description: 'Calculate average value in table',
    variables: [
      { symbol: 'Total value', description: 'sum of values' },
      { symbol: 'Number of entries', description: 'count of values' }
    ]
  },

  // Bar Chart Analysis
  {
    id: 'module15-bar-difference',
    category: 'bar-chart-analysis',
    name: 'Bar Difference',
    formula: 'Difference = Bar₁ - Bar₂',
    description: 'Calculate difference between two bars',
    variables: [
      { symbol: 'Bar₁, Bar₂', description: 'heights of two bars' }
    ]
  },
  {
    id: 'module15-bar-ratio',
    category: 'bar-chart-analysis',
    name: 'Bar Ratio',
    formula: 'Ratio = Bar₁:Bar₂',
    description: 'Calculate ratio between two bars',
    variables: [
      { symbol: 'Bar₁, Bar₂', description: 'heights of two bars' }
    ]
  },
  {
    id: 'module15-bar-total',
    category: 'bar-chart-analysis',
    name: 'Bar Chart Total',
    formula: 'Total = Sum of all bar heights',
    description: 'Calculate sum of all bars in chart',
    variables: [
      { symbol: 'bar heights', description: 'all bar values' }
    ]
  },

  // Line Chart Analysis
  {
    id: 'module15-line-slope',
    category: 'line-chart-analysis',
    name: 'Line Slope',
    formula: 'Slope = (Y₂ - Y₁)/(X₂ - X₁)',
    description: 'Calculate steepness of line between two points',
    variables: [
      { symbol: '(X₁,Y₁), (X₂,Y₂)', description: 'two points on line' }
    ]
  },
  {
    id: 'module15-line-change',
    category: 'line-chart-analysis',
    name: 'Line Percentage Change',
    formula: 'Change% = [(Y₂ - Y₁)/Y₁] × 100%',
    description: 'Calculate percentage change between points',
    variables: [
      { symbol: 'Y₁, Y₂', description: 'y-values at two points' }
    ]
  },
  {
    id: 'module15-line-average-growth',
    category: 'line-chart-analysis',
    name: 'Average Growth Rate',
    formula: 'Avg Growth = [(Final/Initial)^(1/n) - 1] × 100%',
    description: 'Calculate average growth rate over period',
    variables: [
      { symbol: 'Final, Initial', description: 'end and start values' },
      { symbol: 'n', description: 'number of periods' }
    ]
  },

  // Pie Chart Analysis
  {
    id: 'module15-pie-percentage',
    category: 'pie-chart-analysis',
    name: 'Pie Slice Percentage',
    formula: 'Slice% = (Slice value/Total) × 100%',
    description: 'Calculate percentage for pie slice',
    variables: [
      { symbol: 'Slice value', description: 'value of specific slice' },
      { symbol: 'Total', description: 'total of all slices' }
    ]
  },
  {
    id: 'module15-pie-angle',
    category: 'pie-chart-analysis',
    name: 'Pie Slice Angle',
    formula: 'Angle = (Slice value/Total) × 360°',
    description: 'Calculate central angle for pie slice',
    variables: [
      { symbol: 'Slice value', description: 'value of specific slice' },
      { symbol: 'Total', description: 'total of all slices' }
    ]
  },
  {
    id: 'module15-pie-ratio',
    category: 'pie-chart-analysis',
    name: 'Pie Slice Ratio',
    formula: 'Ratio = Slice₁:Slice₂',
    description: 'Calculate ratio between two slices',
    variables: [
      { symbol: 'Slice₁, Slice₂', description: 'values of two slices' }
    ]
  },

  // Mixed Chart Analysis
  {
    id: 'module15-mixed-correlation',
    category: 'mixed-chart-analysis',
    name: 'Correlation Coefficient',
    formula: 'r = Σ((X-X̄)(Y-Ȳ))/√[Σ(X-X̄)²Σ(Y-Ȳ)²]',
    description: 'Measure relationship between two variables',
    variables: [
      { symbol: 'X, Y', description: 'paired data values' },
      { symbol: 'X̄, Ȳ', description: 'means of X and Y' }
    ]
  },
  {
    id: 'module15-mixed-trend',
    category: 'mixed-chart-analysis',
    name: 'Trend Analysis',
    formula: 'Trend = (Latest - Earliest)/Number of periods',
    description: 'Calculate overall trend direction',
    variables: [
      { symbol: 'Latest, Earliest', description: 'end and start values' }
    ]
  },

  // Data Sufficiency
  {
    id: 'module15-ds-unique-solution',
    category: 'data-sufficiency',
    name: 'Unique Solution Condition',
    formula: 'Information provides exactly one answer',
    description: 'Condition for sufficient data in DS questions',
    variables: [
      { symbol: 'unique answer', description: 'single definite solution' }
    ]
  },
  {
    id: 'module15-ds-insufficient',
    category: 'data-sufficiency',
    name: 'Insufficient Data',
    formula: 'Multiple answers or no solution possible',
    description: 'When data cannot provide unique answer',
    variables: [
      { symbol: 'multiple possibilities', description: 'more than one valid answer' }
    ]
  },

  // Approximation Techniques
  {
    id: 'module15-approx-rounding',
    category: 'approximation',
    name: 'Number Rounding',
    formula: 'Round to nearest 10, 100, or significant digit',
    description: 'Round numbers for quick calculations',
    variables: [
      { symbol: 'significant digit', description: 'important digit position' }
    ]
  },
  {
    id: 'module15-approx-compatible',
    category: 'approximation',
    name: 'Compatible Numbers',
    formula: 'Use easy numbers close to actual values',
    description: 'Choose numbers ending in 0, 5, 25, 50, 75',
    variables: [
      { symbol: 'easy numbers', description: 'simple calculation numbers' }
    ]
  },
  {
    id: 'module15-approx-percentage',
    category: 'approximation',
    name: 'Percentage Approximation',
    formula: '10% = divide by 10, 1% = divide by 100',
    description: 'Quick percentage calculations',
    variables: [
      { symbol: 'base value', description: 'number to find percentage of' }
    ]
  },

  // Missing Data Analysis
  {
    id: 'module15-missing-total',
    category: 'missing-data',
    name: 'Missing Total Calculation',
    formula: 'Missing = Total - Sum of known values',
    description: 'Find missing value using total constraint',
    variables: [
      { symbol: 'Total', description: 'known total value' },
      { symbol: 'known values', description: 'sum of available values' }
    ]
  },
  {
    id: 'module15-missing-percentage',
    category: 'missing-data',
    name: 'Missing Percentage Value',
    formula: 'Value = (Percentage/100) × Total',
    description: 'Find missing value using percentage',
    variables: [
      { symbol: 'Percentage', description: 'known percentage' },
      { symbol: 'Total', description: 'total value' }
    ]
  },
  {
    id: 'module15-missing-ratio',
    category: 'missing-data',
    name: 'Missing Ratio Value',
    formula: 'Value = (Ratio part × Total)/Total parts',
    description: 'Find missing value using ratio relationship',
    variables: [
      { symbol: 'Ratio part', description: 'ratio portion for missing value' },
      { symbol: 'Total parts', description: 'sum of all ratio parts' }
    ]
  },

  // Advanced DI Formulas
  {
    id: 'module15-index-number',
    category: 'advanced-calculations',
    name: 'Index Number',
    formula: 'Index = (Current value/Base value) × 100',
    description: 'Calculate relative change from base period',
    variables: [
      { symbol: 'Current value', description: 'value in current period' },
      { symbol: 'Base value', description: 'value in base period' }
    ]
  },
  {
    id: 'module15-market-share',
    category: 'advanced-calculations',
    name: 'Market Share Percentage',
    formula: 'Share% = (Company sales/Total market sales) × 100%',
    description: 'Calculate company\'s portion of market',
    variables: [
      { symbol: 'Company sales', description: 'sales of specific company' },
      { symbol: 'Total market sales', description: 'total industry sales' }
    ]
  },
  {
    id: 'module15-efficiency-ratio',
    category: 'advanced-calculations',
    name: 'Efficiency Ratio',
    formula: 'Efficiency = Output/Input',
    description: 'Calculate output per unit input',
    variables: [
      { symbol: 'Output', description: 'result or production' },
      { symbol: 'Input', description: 'resources used' }
    ]
  },

  // Statistical Measures
  {
    id: 'module15-range',
    category: 'statistical-measures',
    name: 'Range',
    formula: 'Range = Maximum - Minimum',
    description: 'Calculate spread of data',
    variables: [
      { symbol: 'Maximum', description: 'highest value' },
      { symbol: 'Minimum', description: 'lowest value' }
    ]
  },
  {
    id: 'module15-median-position',
    category: 'statistical-measures',
    name: 'Median Position',
    formula: 'Position = (n + 1)/2',
    description: 'Find position of median in ordered data',
    variables: [
      { symbol: 'n', description: 'number of data points' }
    ]
  },
  {
    id: 'module15-quartile-position',
    category: 'statistical-measures',
    name: 'Quartile Position',
    formula: 'Q₁ position = (n + 1)/4, Q₃ position = 3(n + 1)/4',
    description: 'Find positions of first and third quartiles',
    variables: [
      { symbol: 'n', description: 'number of data points' }
    ]
  }
];

export default formulas;