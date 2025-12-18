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
    id: 'module8-si-basic',
    category: 'basic-si',
    name: 'Simple Interest Formula',
    formula: 'SI = (P × R × T)/100',
    description: 'Basic simple interest calculation',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module8-amount-basic',
    category: 'basic-si',
    name: 'Amount Formula',
    formula: 'A = P + SI = P(1 + RT/100)',
    description: 'Total amount after simple interest',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module8-find-principal',
    category: 'finding-variables',
    name: 'Finding Principal',
    formula: 'P = (SI × 100)/(R × T)',
    description: 'Find principal when SI, R, T are known',
    variables: [
      { symbol: 'SI', description: 'simple interest' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module8-find-rate',
    category: 'finding-variables',
    name: 'Finding Rate of Interest',
    formula: 'R = (SI × 100)/(P × T)',
    description: 'Find rate when SI, P, T are known',
    variables: [
      { symbol: 'SI', description: 'simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module8-find-time',
    category: 'finding-variables',
    name: 'Finding Time Period',
    formula: 'T = (SI × 100)/(P × R)',
    description: 'Find time when SI, P, R are known',
    variables: [
      { symbol: 'SI', description: 'simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' }
    ]
  },
  {
    id: 'module8-si-monthly',
    category: 'time-conversions',
    name: 'SI for Monthly Rate',
    formula: 'SI = (P × R × T)/1200',
    description: 'When rate is monthly, time in months',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'monthly rate (%)' },
      { symbol: 'T', description: 'time in months' }
    ]
  },
  {
    id: 'module8-si-yearly-conversion',
    category: 'time-conversions',
    name: 'SI for Yearly Rate with Monthly Time',
    formula: 'SI = (P × R × T)/(100 × 12)',
    description: 'When rate is yearly, time in months',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'yearly rate (%)' },
      { symbol: 'T', description: 'time in months' }
    ]
  },
  {
    id: 'module8-si-daily',
    category: 'time-conversions',
    name: 'SI for Daily Rate',
    formula: 'SI = (P × R × T)/36500',
    description: 'When rate is daily, time in days',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'daily rate (%)' },
      { symbol: 'T', description: 'time in days' }
    ]
  },
  {
    id: 'module8-si-yearly-daily',
    category: 'time-conversions',
    name: 'SI for Yearly Rate with Daily Time',
    formula: 'SI = (P × R × T)/(100 × 365)',
    description: 'When rate is yearly, time in days',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'yearly rate (%)' },
      { symbol: 'T', description: 'time in days' }
    ]
  },
  {
    id: 'module8-si-different-rates',
    category: 'different-rates',
    name: 'SI with Different Rates',
    formula: 'Total SI = SI₁ + SI₂ + SI₃ + ...',
    description: 'Sum of simple interests at different rates',
    variables: [
      { symbol: 'SI₁, SI₂', description: 'simple interests at different rates' }
    ]
  },
  {
    id: 'module8-si-different-periods',
    category: 'different-periods',
    name: 'SI with Different Time Periods',
    formula: 'Total SI = SI₁ + SI₂ + SI₃ + ...',
    description: 'Sum of simple interests for different time periods',
    variables: [
      { symbol: 'SI₁, SI₂', description: 'simple interests for different periods' }
    ]
  },
  {
    id: 'module8-average-rate',
    category: 'different-rates',
    name: 'Average Rate of Interest',
    formula: 'Average R = (Total SI × 100)/(P × T)',
    description: 'When total SI and total time are known',
    variables: [
      { symbol: 'Total SI', description: 'total simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'T', description: 'total time' }
    ]
  },
  {
    id: 'module8-weighted-average-rate',
    category: 'different-rates',
    name: 'Weighted Average Rate',
    formula: 'Weighted R = (R₁T₁ + R₂T₂ + ...)/(T₁ + T₂ + ...)',
    description: 'When different rates for different time periods',
    variables: [
      { symbol: 'R₁, R₂', description: 'different rates' },
      { symbol: 'T₁, T₂', description: 'corresponding time periods' }
    ]
  },
  {
    id: 'module8-si-equivalent-rate',
    category: 'different-rates',
    name: 'Equivalent Rate for Different Periods',
    formula: 'Equivalent R = (Total SI × 100 × 12)/(P × Total Months)',
    description: 'Convert to monthly equivalent rate',
    variables: [
      { symbol: 'Total SI', description: 'total simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'Total Months', description: 'total time in months' }
    ]
  },
  {
    id: 'module8-si-comparison',
    category: 'comparison',
    name: 'SI Comparison Formula',
    formula: 'SI Ratio = (P₁R₁T₁)/(P₂R₂T₂)',
    description: 'Compare simple interests between different scenarios',
    variables: [
      { symbol: 'P₁, P₂', description: 'different principals' },
      { symbol: 'R₁, R₂', description: 'different rates' },
      { symbol: 'T₁, T₂', description: 'different times' }
    ]
  },
  {
    id: 'module8-si-difference',
    category: 'comparison',
    name: 'SI Difference Formula',
    formula: 'SI Difference = [(P₁R₁T₁ - P₂R₂T₂)/100]',
    description: 'Difference in simple interests',
    variables: [
      { symbol: 'P₁, P₂', description: 'different principals' },
      { symbol: 'R₁, R₂', description: 'different rates' },
      { symbol: 'T₁, T₂', description: 'different times' }
    ]
  },
  {
    id: 'module8-si-equality',
    category: 'comparison',
    name: 'SI Equality Condition',
    formula: 'P₁R₁T₁ = P₂R₂T₂',
    description: 'When two simple interests are equal',
    variables: [
      { symbol: 'P₁, P₂', description: 'different principals' },
      { symbol: 'R₁, R₂', description: 'different rates' },
      { symbol: 'T₁, T₂', description: 'different times' }
    ]
  },
  {
    id: 'module8-si-partial-payment',
    category: 'applications',
    name: 'SI on Partial Payments',
    formula: 'Total SI = SI₁ + SI₂ + ... (for each payment period)',
    description: 'When principal is paid in installments',
    variables: [
      { symbol: 'SI₁, SI₂', description: 'SI for each payment period' }
    ]
  },
  {
    id: 'module8-si-successive-payments',
    category: 'applications',
    name: 'SI with Successive Payments',
    formula: 'SI = (P₁R₁T₁ + P₂R₂T₂ + ...)/100',
    description: 'When payments are made at different times',
    variables: [
      { symbol: 'P₁, P₂', description: 'different payment amounts' },
      { symbol: 'R₁, R₂', description: 'different rates' },
      { symbol: 'T₁, T₂', description: 'different time periods' }
    ]
  },
  {
    id: 'module8-si-borrowing-cost',
    category: 'applications',
    name: 'Borrowing Cost',
    formula: 'Total Cost = P + SI',
    description: 'Total amount to be paid back',
    variables: [
      { symbol: 'P', description: 'principal borrowed' },
      { symbol: 'SI', description: 'simple interest' }
    ]
  },
  {
    id: 'module8-si-investment-return',
    category: 'applications',
    name: 'Investment Return',
    formula: 'Total Return = P + SI',
    description: 'Total amount received on investment',
    variables: [
      { symbol: 'P', description: 'principal invested' },
      { symbol: 'SI', description: 'simple interest earned' }
    ]
  },
  {
    id: 'module8-si-present-value',
    category: 'applications',
    name: 'Present Value',
    formula: 'PV = A / (1 + RT/100)',
    description: 'Current value of future amount',
    variables: [
      { symbol: 'A', description: 'future amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module8-si-future-value',
    category: 'applications',
    name: 'Future Value',
    formula: 'FV = P × (1 + RT/100)',
    description: 'Future value of current investment',
    variables: [
      { symbol: 'P', description: 'present value' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  }
];

export default formulas;