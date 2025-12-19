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
    id: 'module9-ci-annual-basic',
    category: 'annual-compounding',
    name: 'Annual Compound Interest Formula',
    formula: 'CI = P(1 + R/100)^T - P',
    description: 'Compound interest with annual compounding',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-amount-annual',
    category: 'annual-compounding',
    name: 'Amount with Annual CI',
    formula: 'A = P(1 + R/100)^T',
    description: 'Total amount after compound interest',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-ci-half-yearly',
    category: 'half-yearly-compounding',
    name: 'Half-Yearly Compound Interest',
    formula: 'CI = P(1 + R/200)^(2T) - P',
    description: 'Compound interest compounded half-yearly',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-amount-half-yearly',
    category: 'half-yearly-compounding',
    name: 'Amount with Half-Yearly CI',
    formula: 'A = P(1 + R/200)^(2T)',
    description: 'Total amount with half-yearly compounding',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-ci-quarterly',
    category: 'quarterly-compounding',
    name: 'Quarterly Compound Interest',
    formula: 'CI = P(1 + R/400)^(4T) - P',
    description: 'Compound interest compounded quarterly',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-amount-quarterly',
    category: 'quarterly-compounding',
    name: 'Amount with Quarterly CI',
    formula: 'A = P(1 + R/400)^(4T)',
    description: 'Total amount with quarterly compounding',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-ci-general',
    category: 'general-compounding',
    name: 'General Compound Interest Formula',
    formula: 'CI = P[(1 + R/(100×n))^(n×T) - 1]',
    description: 'Compound interest compounded n times per year',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'n', description: 'compounding frequency per year' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-amount-general',
    category: 'general-compounding',
    name: 'General Amount Formula',
    formula: 'A = P(1 + R/(100×n))^(n×T)',
    description: 'Total amount with general compounding frequency',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'n', description: 'compounding frequency per year' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-ci-si-difference',
    category: 'comparisons',
    name: 'Difference between CI and SI',
    formula: 'CI - SI = P(R/100)²T(T-1)/2',
    description: 'Difference for same P, R, T (annual compounding)',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'module9-successive-ci',
    category: 'successive-years',
    name: 'CI for Successive Years',
    formula: 'Amount after n years = P(1 + R/100)^n',
    description: 'Year-wise compound interest calculation',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate (%)' },
      { symbol: 'n', description: 'number of years' }
    ]
  },
  {
    id: 'module9-growth-compound',
    category: 'growth-depreciation',
    name: 'Compound Growth Formula',
    formula: 'Future Value = Present Value × (1 + R/100)^T',
    description: 'Compound growth over time',
    variables: [
      { symbol: 'Present Value', description: 'initial value' },
      { symbol: 'R', description: 'growth rate (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module9-depreciation-compound',
    category: 'growth-depreciation',
    name: 'Compound Depreciation Formula',
    formula: 'Future Value = Present Value × (1 - R/100)^T',
    description: 'Compound depreciation over time',
    variables: [
      { symbol: 'Present Value', description: 'initial value' },
      { symbol: 'R', description: 'depreciation rate (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module9-present-value',
    category: 'present-value',
    name: 'Present Value Formula',
    formula: 'PV = FV / (1 + R/100)^T',
    description: 'Current value of future amount',
    variables: [
      { symbol: 'FV', description: 'future value' },
      { symbol: 'R', description: 'discount rate (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module9-effective-rate',
    category: 'effective-rates',
    name: 'Effective Annual Rate',
    formula: 'EAR = (1 + R/(100×n))^(n) - 1',
    description: 'True annual rate for frequent compounding',
    variables: [
      { symbol: 'R', description: 'nominal annual rate (%)' },
      { symbol: 'n', description: 'compounding frequency per year' }
    ]
  },
  {
    id: 'module9-ci-population',
    category: 'applications',
    name: 'Population Growth (CI)',
    formula: 'Population = P(1 + R/100)^T',
    description: 'Population after compound growth',
    variables: [
      { symbol: 'P', description: 'initial population' },
      { symbol: 'R', description: 'growth rate (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module9-ci-inflation',
    category: 'applications',
    name: 'Inflation Impact',
    formula: 'Real Value = Nominal Value / (1 + I/100)^T',
    description: 'Purchasing power after inflation',
    variables: [
      { symbol: 'Nominal Value', description: 'current value' },
      { symbol: 'I', description: 'inflation rate (%)' },
      { symbol: 'T', description: 'time period' }
    ]
  },
  {
    id: 'module9-ci-investment',
    category: 'applications',
    name: 'Investment Growth',
    formula: 'Future Value = P(1 + R/100)^T',
    description: 'Investment value after compound interest',
    variables: [
      { symbol: 'P', description: 'principal investment' },
      { symbol: 'R', description: 'interest rate (%)' },
      { symbol: 'T', description: 'investment period' }
    ]
  },
  {
    id: 'module9-ci-loan',
    category: 'applications',
    name: 'Loan Amount',
    formula: 'Loan Amount = EMI × [(1 + R/100)^T - 1] / (R/100)',
    description: 'Loan principal from EMI payments',
    variables: [
      { symbol: 'EMI', description: 'monthly payment' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'loan tenure in years' }
    ]
  },
  {
    id: 'module9-ci-continuous',
    category: 'advanced-compounding',
    name: 'Continuous Compounding',
    formula: 'A = P × e^(RT/100)',
    description: 'Compounding infinitely many times per year',
    variables: [
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'annual rate (%)' },
      { symbol: 'T', description: 'time in years' },
      { symbol: 'e', description: 'Euler\'s number (2.71828)' }
    ]
  },
  {
    id: 'module9-ci-find-principal',
    category: 'finding-variables',
    name: 'Finding Principal from CI',
    formula: 'P = A / (1 + R/100)^T',
    description: 'Find principal when amount, rate, time are known',
    variables: [
      { symbol: 'A', description: 'amount' },
      { symbol: 'R', description: 'rate (%)' },
      { symbol: 'T', description: 'time' }
    ]
  },
  {
    id: 'module9-ci-find-rate',
    category: 'finding-variables',
    name: 'Finding Rate from CI',
    formula: 'R = 100 × [(A/P)^(1/T) - 1]',
    description: 'Find rate when principal, amount, time are known',
    variables: [
      { symbol: 'A', description: 'amount' },
      { symbol: 'P', description: 'principal' },
      { symbol: 'T', description: 'time' }
    ]
  },
  {
    id: 'module9-ci-find-time',
    category: 'finding-variables',
    name: 'Finding Time from CI',
    formula: 'T = log(A/P) / log(1 + R/100)',
    description: 'Find time when principal, amount, rate are known',
    variables: [
      { symbol: 'A', description: 'amount' },
      { symbol: 'P', description: 'principal' },
      { symbol: 'R', description: 'rate (%)' }
    ]
  }
];

export default formulas;
