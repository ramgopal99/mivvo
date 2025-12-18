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
    id: 'module10-work-rate',
    category: 'basic-concepts',
    name: 'Work Rate',
    formula: 'Rate = Work / Time',
    description: 'Rate at which work is completed',
    variables: [
      { symbol: 'Work', description: 'fraction of work completed' },
      { symbol: 'Time', description: 'time taken' }
    ]
  },
  {
    id: 'module10-efficiency',
    category: 'basic-concepts',
    name: 'Efficiency',
    formula: 'Efficiency = 1 / Time taken',
    description: 'Efficiency of a worker (work per unit time)',
    variables: [
      { symbol: 'Time taken', description: 'days to complete full work' }
    ]
  },
  {
    id: 'module10-combined-work',
    category: 'combined-work',
    name: 'Combined Work Time',
    formula: 'Time = (a × b) / (a + b)',
    description: 'Time taken by two workers together',
    variables: [
      { symbol: 'a', description: 'time taken by worker A alone' },
      { symbol: 'b', description: 'time taken by worker B alone' }
    ]
  },
  {
    id: 'module10-combined-efficiency',
    category: 'combined-work',
    name: 'Combined Efficiency',
    formula: 'Efficiency_total = E_A + E_B + E_C + ...',
    description: 'Total efficiency when multiple workers work together',
    variables: [
      { symbol: 'E_A, E_B, E_C', description: 'individual efficiencies' }
    ]
  },
  {
    id: 'module10-work-share',
    category: 'combined-work',
    name: 'Work Share',
    formula: 'Work_A = (E_A × Time) / E_total',
    description: 'Work done by individual in combined work',
    variables: [
      { symbol: 'E_A', description: 'efficiency of worker A' },
      { symbol: 'Time', description: 'total time worked together' },
      { symbol: 'E_total', description: 'total combined efficiency' }
    ]
  },
  {
    id: 'module10-efficiency-ratio',
    category: 'different-efficiencies',
    name: 'Efficiency Ratio',
    formula: 'E_A : E_B = 1/Time_A : 1/Time_B',
    description: 'Efficiency ratio from time taken ratio',
    variables: [
      { symbol: 'Time_A', description: 'time taken by worker A' },
      { symbol: 'Time_B', description: 'time taken by worker B' }
    ]
  },
  {
    id: 'module10-men-days',
    category: 'men-days-work',
    name: 'Men-Days Required',
    formula: 'Men-Days = Men × Days × Efficiency',
    description: 'Total person-days required for work',
    variables: [
      { symbol: 'Men', description: 'number of workers' },
      { symbol: 'Days', description: 'number of days' },
      { symbol: 'Efficiency', description: 'efficiency factor (0-1)' }
    ]
  },
  {
    id: 'module10-pipe-rate',
    category: 'pipes-cisterns',
    name: 'Pipe Flow Rate',
    formula: 'Rate = ±1/Time',
    description: 'Rate of filling (+) or emptying (-) pipe',
    variables: [
      { symbol: 'Time', description: 'time to fill/empty tank alone' },
      { symbol: '+', description: 'for filling pipes' },
      { symbol: '-', description: 'for emptying pipes' }
    ]
  },
  {
    id: 'module10-net-pipe-rate',
    category: 'pipes-cisterns',
    name: 'Net Pipe Rate',
    formula: 'Rate_net = Σ (Individual rates)',
    description: 'Combined rate when multiple pipes work together',
    variables: [
      { symbol: 'Σ', description: 'sum of all pipe rates' }
    ]
  },
  {
    id: 'module10-fraction-work',
    category: 'fraction-work',
    name: 'Fraction Work Time',
    formula: 'Time_fraction = Fraction × Time_full',
    description: 'Time for fractional work completion',
    variables: [
      { symbol: 'Fraction', description: 'fraction of work (0-1)' },
      { symbol: 'Time_full', description: 'time for complete work' }
    ]
  },
  {
    id: 'module10-wage-share',
    category: 'work-wages',
    name: 'Wage Share',
    formula: 'Wage_A = (Work_A / Work_total) × Wage_total',
    description: 'Wage distribution based on work done',
    variables: [
      { symbol: 'Work_A', description: 'work done by person A' },
      { symbol: 'Work_total', description: 'total work completed' },
      { symbol: 'Wage_total', description: 'total wages to distribute' }
    ]
  },
  {
    id: 'module10-efficiency-percentage',
    category: 'different-efficiencies',
    name: 'Percentage Efficiency',
    formula: 'E_new = E_old × (100 ± x)/100',
    description: 'Efficiency after percentage change',
    variables: [
      { symbol: 'x', description: 'percentage change' },
      { symbol: '+', description: 'for increase' },
      { symbol: '-', description: 'for decrease' }
    ]
  },
  {
    id: 'module10-work-equivalence',
    category: 'basic-concepts',
    name: 'Work Equivalence',
    formula: 'M₁ × D₁ × E₁ = M₂ × D₂ × E₂',
    description: 'Work equivalence across different scenarios',
    variables: [
      { symbol: 'M', description: 'number of workers' },
      { symbol: 'D', description: 'number of days' },
      { symbol: 'E', description: 'efficiency' }
    ]
  },
  {
    id: 'module10-alternate-work',
    category: 'alternate-work',
    name: 'Alternate Work Cycle',
    formula: 'Work_cycle = Work in complete cycle',
    description: 'Work completed in one full work cycle',
    variables: [
      { symbol: 'Work_cycle', description: 'work in one repeating cycle' }
    ]
  },
  {
    id: 'module10-time-saving',
    category: 'advanced-concepts',
    name: 'Time Saving',
    formula: 'Time_saved = Normal_time - Actual_time',
    description: 'Time saved by working faster',
    variables: [
      { symbol: 'Normal_time', description: 'expected completion time' },
      { symbol: 'Actual_time', description: 'actual completion time' }
    ]
  }
];

export default formulas;