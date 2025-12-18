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
    id: 'module6-average-basic',
    category: 'basic-average',
    name: 'Basic Average Formula',
    formula: 'Average = Sum of observations/Number of observations',
    description: 'Standard arithmetic mean calculation',
    variables: [
      { symbol: 'Sum', description: 'total of all values' },
      { symbol: 'n', description: 'number of observations' }
    ]
  },
  {
    id: 'module6-average-sum',
    category: 'sum-calculation',
    name: 'Sum from Average',
    formula: 'Sum = Average × Number of observations',
    description: 'Find total sum when average and count are known',
    variables: [
      { symbol: 'Average', description: 'mean value' },
      { symbol: 'n', description: 'number of items' }
    ]
  },
  {
    id: 'module6-average-missing-value',
    category: 'missing-value',
    name: 'Missing Value Formula',
    formula: 'Missing value = (Average × n) - Sum of known values',
    description: 'Find unknown value when average and other values are known',
    variables: [
      { symbol: 'Average', description: 'target average' },
      { symbol: 'n', description: 'total number of values' },
      { symbol: 'Sum of known', description: 'sum of all known values' }
    ]
  },
  {
    id: 'module6-average-change-add',
    category: 'average-change',
    name: 'Average Change When Adding Item',
    formula: 'New Average = (Old Average × n + New value)/(n + 1)',
    description: 'Average after adding a new value',
    variables: [
      { symbol: 'Old Average', description: 'previous mean' },
      { symbol: 'n', description: 'previous count' },
      { symbol: 'New value', description: 'value being added' }
    ]
  },
  {
    id: 'module6-average-change-replace',
    category: 'average-change',
    name: 'Average Change When Replacing Item',
    formula: 'New Average = Old Average + (New - Old)/n',
    description: 'Average after replacing one value with another',
    variables: [
      { symbol: 'New', description: 'replacement value' },
      { symbol: 'Old', description: 'replaced value' },
      { symbol: 'n', description: 'total number of items' }
    ]
  },
  {
    id: 'module6-weighted-average',
    category: 'weighted-average',
    name: 'Weighted Average Formula',
    formula: 'Weighted Average = (w₁x₁ + w₂x₂ + ... + wₙxₙ)/(w₁ + w₂ + ... + wₙ)',
    description: 'Average weighted by importance or frequency',
    variables: [
      { symbol: 'w₁, w₂, ...', description: 'weights or frequencies' },
      { symbol: 'x₁, x₂, ...', description: 'values' }
    ]
  },
  {
    id: 'module6-consecutive-average',
    category: 'consecutive-numbers',
    name: 'Average of Consecutive Numbers',
    formula: 'Average = (First + Last)/2',
    description: 'For n consecutive numbers, average is midpoint',
    variables: [
      { symbol: 'First', description: 'smallest number' },
      { symbol: 'Last', description: 'largest number' }
    ]
  },
  {
    id: 'module6-consecutive-even',
    category: 'consecutive-numbers',
    name: 'Average of Consecutive Even Numbers',
    formula: 'Average = (First + Last)/2',
    description: 'Same as consecutive numbers - midpoint formula',
    variables: [
      { symbol: 'First', description: 'smallest even number' },
      { symbol: 'Last', description: 'largest even number' }
    ]
  },
  {
    id: 'module6-consecutive-odd',
    category: 'consecutive-numbers',
    name: 'Average of Consecutive Odd Numbers',
    formula: 'Average = (First + Last)/2',
    description: 'Same as consecutive numbers - midpoint formula',
    variables: [
      { symbol: 'First', description: 'smallest odd number' },
      { symbol: 'Last', description: 'largest odd number' }
    ]
  },
  {
    id: 'module6-combined-average',
    category: 'combined-average',
    name: 'Combined Average Formula',
    formula: 'Combined Average = (n₁A₁ + n₂A₂)/(n₁ + n₂)',
    description: 'Average of two groups combined',
    variables: [
      { symbol: 'n₁, n₂', description: 'sizes of groups' },
      { symbol: 'A₁, A₂', description: 'averages of groups' }
    ]
  },
  {
    id: 'module6-average-speed',
    category: 'applications',
    name: 'Average Speed Formula',
    formula: 'Average Speed = Total Distance/Total Time',
    description: 'For different speeds over different distances',
    variables: [
      { symbol: 'Total Distance', description: 'sum of all distances' },
      { symbol: 'Total Time', description: 'sum of all times' }
    ]
  },
  {
    id: 'module6-average-percentage',
    category: 'applications',
    name: 'Average Percentage',
    formula: 'Average % = (Sum of individual percentages × Weights)/Total Weight',
    description: 'Weighted average of percentages',
    variables: [
      { symbol: 'Weights', description: 'importance factors' }
    ]
  },
  {
    id: 'module6-average-temperature',
    category: 'applications',
    name: 'Average Temperature',
    formula: 'Average Temp = Sum of temperatures/Number of readings',
    description: 'Arithmetic mean of temperature readings',
    variables: [
      { symbol: 'Readings', description: 'temperature measurements' }
    ]
  },
  {
    id: 'module6-average-marks',
    category: 'applications',
    name: 'Average Marks/CGPA',
    formula: 'Average Marks = Total marks obtained/Number of subjects',
    description: 'Academic performance average',
    variables: [
      { symbol: 'Total marks', description: 'sum of all marks' },
      { symbol: 'Subjects', description: 'number of subjects' }
    ]
  },
  {
    id: 'module6-average-age',
    category: 'applications',
    name: 'Average Age',
    formula: 'Average Age = Sum of ages/Number of people',
    description: 'Mean age of a group',
    variables: [
      { symbol: 'Ages', description: 'individual ages' }
    ]
  },
  {
    id: 'module6-average-production',
    category: 'applications',
    name: 'Average Production/Consumption',
    formula: 'Average Rate = Total production/Total time',
    description: 'Mean rate of production or consumption',
    variables: [
      { symbol: 'Production', description: 'total output' },
      { symbol: 'Time', description: 'time period' }
    ]
  },
  {
    id: 'module6-average-run-rate',
    category: 'applications',
    name: 'Average Run Rate (Cricket)',
    formula: 'Run Rate = (Runs scored/Overs faced) × 6',
    description: 'Runs per over in cricket',
    variables: [
      { symbol: 'Runs scored', description: 'total runs' },
      { symbol: 'Overs faced', description: 'overs batted' }
    ]
  },
  {
    id: 'module6-average-batting',
    category: 'applications',
    name: 'Batting Average (Cricket)',
    formula: 'Batting Average = Total runs/Number of dismissals',
    description: 'Average runs per innings',
    variables: [
      { symbol: 'Total runs', description: 'career runs' },
      { symbol: 'Dismissals', description: 'times out' }
    ]
  },
  {
    id: 'module6-average-bowling',
    category: 'applications',
    name: 'Bowling Average (Cricket)',
    formula: 'Bowling Average = Runs conceded/Wickets taken',
    description: 'Average runs per wicket',
    variables: [
      { symbol: 'Runs conceded', description: 'runs given' },
      { symbol: 'Wickets taken', description: 'wickets' }
    ]
  },
  {
    id: 'module6-average-stock-price',
    category: 'applications',
    name: 'Average Stock Price',
    formula: 'Average Price = Total value/Total shares',
    description: 'Volume weighted average price',
    variables: [
      { symbol: 'Value', description: 'price × quantity' },
      { symbol: 'Shares', description: 'total quantity' }
    ]
  },
  {
    id: 'module6-average-salary',
    category: 'applications',
    name: 'Average Salary',
    formula: 'Average Salary = Total payroll/Number of employees',
    description: 'Mean compensation',
    variables: [
      { symbol: 'Payroll', description: 'total salaries paid' },
      { symbol: 'Employees', description: 'staff count' }
    ]
  },
  {
    id: 'module6-average-fuel-efficiency',
    category: 'applications',
    name: 'Average Fuel Efficiency',
    formula: 'Average MPG = Total distance/Total fuel used',
    description: 'Miles per gallon average',
    variables: [
      { symbol: 'Distance', description: 'total miles traveled' },
      { symbol: 'Fuel', description: 'total fuel consumed' }
    ]
  },
  {
    id: 'module6-average-class-performance',
    category: 'applications',
    name: 'Class Average',
    formula: 'Class Average = Sum of all student marks/Number of students',
    description: 'Overall class performance',
    variables: [
      { symbol: 'Student marks', description: 'individual scores' }
    ]
  }
];

export default formulas;