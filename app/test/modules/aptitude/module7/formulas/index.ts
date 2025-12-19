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
    id: 'module7-profit-basic',
    category: 'basic-profit-loss',
    name: 'Profit Formula',
    formula: 'Profit = Selling Price - Cost Price',
    description: 'Basic profit calculation',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-loss-basic',
    category: 'basic-profit-loss',
    name: 'Loss Formula',
    formula: 'Loss = Cost Price - Selling Price',
    description: 'Basic loss calculation',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'SP', description: 'selling price' }
    ]
  },
  {
    id: 'module7-profit-percentage',
    category: 'percentage-calculations',
    name: 'Profit Percentage',
    formula: 'Profit% = (Profit/CP) × 100%',
    description: 'Profit as percentage of cost price',
    variables: [
      { symbol: 'Profit', description: 'profit amount' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-loss-percentage',
    category: 'percentage-calculations',
    name: 'Loss Percentage',
    formula: 'Loss% = (Loss/CP) × 100%',
    description: 'Loss as percentage of cost price',
    variables: [
      { symbol: 'Loss', description: 'loss amount' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-selling-price-profit',
    category: 'price-calculations',
    name: 'Selling Price with Profit',
    formula: 'SP = CP × (1 + Profit%/100)',
    description: 'SP when profit percentage is known',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'Profit%', description: 'profit percentage' }
    ]
  },
  {
    id: 'module7-selling-price-loss',
    category: 'price-calculations',
    name: 'Selling Price with Loss',
    formula: 'SP = CP × (1 - Loss%/100)',
    description: 'SP when loss percentage is known',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'Loss%', description: 'loss percentage' }
    ]
  },
  {
    id: 'module7-cost-price-profit',
    category: 'price-calculations',
    name: 'Cost Price with Profit',
    formula: 'CP = SP ÷ (1 + Profit%/100)',
    description: 'CP when SP and profit percentage are known',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'Profit%', description: 'profit percentage' }
    ]
  },
  {
    id: 'module7-cost-price-loss',
    category: 'price-calculations',
    name: 'Cost Price with Loss',
    formula: 'CP = SP ÷ (1 - Loss%/100)',
    description: 'CP when SP and loss percentage are known',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'Loss%', description: 'loss percentage' }
    ]
  },
  {
    id: 'module7-marked-price',
    category: 'discount-calculations',
    name: 'Marked Price',
    formula: 'MP = SP + Discount',
    description: 'Original marked price before discount',
    variables: [
      { symbol: 'SP', description: 'selling price after discount' },
      { symbol: 'Discount', description: 'discount amount' }
    ]
  },
  {
    id: 'module7-discount-basic',
    category: 'discount-calculations',
    name: 'Discount Amount',
    formula: 'Discount = MP - SP',
    description: 'Actual discount given',
    variables: [
      { symbol: 'MP', description: 'marked price' },
      { symbol: 'SP', description: 'selling price' }
    ]
  },
  {
    id: 'module7-discount-percentage',
    category: 'discount-calculations',
    name: 'Discount Percentage',
    formula: 'Discount% = (Discount/MP) × 100%',
    description: 'Discount as percentage of marked price',
    variables: [
      { symbol: 'Discount', description: 'discount amount' },
      { symbol: 'MP', description: 'marked price' }
    ]
  },
  {
    id: 'module7-selling-price-discount',
    category: 'discount-calculations',
    name: 'Selling Price after Discount',
    formula: 'SP = MP × (1 - Discount%/100)',
    description: 'SP when discount percentage on MP is known',
    variables: [
      { symbol: 'MP', description: 'marked price' },
      { symbol: 'Discount%', description: 'discount percentage' }
    ]
  },
  {
    id: 'module7-successive-discount',
    category: 'successive-discounts',
    name: 'Successive Discount Formula',
    formula: 'Net Discount% = A% + B% - (A%×B%)/100%',
    description: 'Combined effect of two successive discounts',
    variables: [
      { symbol: 'A%', description: 'first discount percentage' },
      { symbol: 'B%', description: 'second discount percentage' }
    ]
  },
  {
    id: 'module7-successive-discount-three',
    category: 'successive-discounts',
    name: 'Three Successive Discounts',
    formula: 'Net% = A + B + C - (AB + BC + CA)/100 + (A×B×C)/10000',
    description: 'Combined effect of three successive discounts',
    variables: [
      { symbol: 'A, B, C', description: 'discount percentages' }
    ]
  },
  {
    id: 'module7-equivalent-single-discount',
    category: 'successive-discounts',
    name: 'Equivalent Single Discount',
    formula: 'SP = MP × (1 - A/100) × (1 - B/100)',
    description: 'SP after successive discounts',
    variables: [
      { symbol: 'MP', description: 'marked price' },
      { symbol: 'A, B', description: 'discount percentages' }
    ]
  },
  {
    id: 'module7-false-weight-gain',
    category: 'dishonest-practices',
    name: 'Gain on False Weight',
    formula: 'Gain% = [(True Weight - False Weight)/False Weight] × 100%',
    description: 'Profit percentage when using lighter weight',
    variables: [
      { symbol: 'True Weight', description: 'actual weight' },
      { symbol: 'False Weight', description: 'weight shown/measured' }
    ]
  },
  {
    id: 'module7-false-weight-loss',
    category: 'dishonest-practices',
    name: 'Loss on False Weight',
    formula: 'Loss% = [(False Weight - True Weight)/False Weight] × 100%',
    description: 'Loss percentage when using heavier weight',
    variables: [
      { symbol: 'False Weight', description: 'weight shown/measured' },
      { symbol: 'True Weight', description: 'actual weight' }
    ]
  },
  {
    id: 'module7-gain-loss-percentage',
    category: 'gain-loss-percentage',
    name: 'Gain/Loss Percentage on SP/CP',
    formula: 'Gain/Loss% = [(SP - CP)/CP] × 100%',
    description: 'Profit/loss as percentage of cost price',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-gain-loss-percentage-sp',
    category: 'gain-loss-percentage',
    name: 'Gain/Loss Percentage on SP',
    formula: 'Gain/Loss% = [(SP - CP)/SP] × 100%',
    description: 'Profit/loss as percentage of selling price',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-break-even-point',
    category: 'break-even-analysis',
    name: 'Break-even Point',
    formula: 'Break-even Quantity = Fixed Cost ÷ (SP per unit - CP per unit)',
    description: 'Quantity where no profit no loss',
    variables: [
      { symbol: 'Fixed Cost', description: 'total fixed costs' },
      { symbol: 'SP per unit', description: 'selling price per unit' },
      { symbol: 'CP per unit', description: 'cost price per unit' }
    ]
  },
  {
    id: 'module7-break-even-revenue',
    category: 'break-even-analysis',
    name: 'Break-even Revenue',
    formula: 'Break-even Revenue = Break-even Quantity × SP per unit',
    description: 'Revenue at break-even point',
    variables: [
      { symbol: 'Break-even Quantity', description: 'quantity at break-even' },
      { symbol: 'SP per unit', description: 'selling price per unit' }
    ]
  },
  {
    id: 'module7-profit-volume-ratio',
    category: 'break-even-analysis',
    name: 'Profit Volume Ratio',
    formula: 'P/V Ratio = (Contribution/Sales) × 100%',
    description: 'Profitability measure',
    variables: [
      { symbol: 'Contribution', description: 'SP - Variable Cost' },
      { symbol: 'Sales', description: 'total sales revenue' }
    ]
  },
  {
    id: 'module7-markup-percentage',
    category: 'business-calculations',
    name: 'Markup Percentage',
    formula: 'Markup% = (Profit/CP) × 100%',
    description: 'Profit as percentage of cost price',
    variables: [
      { symbol: 'Profit', description: 'profit amount' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module7-margin-percentage',
    category: 'business-calculations',
    name: 'Margin Percentage',
    formula: 'Margin% = (Profit/SP) × 100%',
    description: 'Profit as percentage of selling price',
    variables: [
      { symbol: 'Profit', description: 'profit amount' },
      { symbol: 'SP', description: 'selling price' }
    ]
  },
  {
    id: 'module7-overall-profit-loss',
    category: 'multiple-transactions',
    name: 'Overall Profit/Loss',
    formula: 'Overall Profit/Loss = Σ(Profit) - Σ(Loss)',
    description: 'Net profit or loss from multiple transactions',
    variables: [
      { symbol: 'Σ(Profit)', description: 'sum of all profits' },
      { symbol: 'Σ(Loss)', description: 'sum of all losses' }
    ]
  },
  {
    id: 'module7-overall-percentage',
    category: 'multiple-transactions',
    name: 'Overall Profit/Loss Percentage',
    formula: 'Overall% = (Overall Profit/Loss ÷ Total CP) × 100%',
    description: 'Net percentage on total cost price',
    variables: [
      { symbol: 'Overall Profit/Loss', description: 'net profit or loss' },
      { symbol: 'Total CP', description: 'total cost price' }
    ]
  },
  {
    id: 'module7-profit-loss-ratio',
    category: 'ratio-calculations',
    name: 'Profit to Loss Ratio',
    formula: 'Profit:Loss = Total Profit:Total Loss',
    description: 'Ratio of profits to losses in business',
    variables: [
      { symbol: 'Total Profit', description: 'sum of all profits' },
      { symbol: 'Total Loss', description: 'sum of all losses' }
    ]
  }
];

export default formulas;
