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
    id: 'module12-mixture-cost',
    category: 'basic-mixture',
    name: 'Mixture Cost',
    formula: 'Total Cost = Σ (Quantity × Price)',
    description: 'Total cost of mixture ingredients',
    variables: [
      { symbol: 'Quantity', description: 'amount of each ingredient' },
      { symbol: 'Price', description: 'price per unit of ingredient' }
    ]
  },
  {
    id: 'module12-average-price',
    category: 'basic-mixture',
    name: 'Average Price',
    formula: 'Average Price = Total Cost / Total Quantity',
    description: 'Mean price of mixture',
    variables: [
      { symbol: 'Total Cost', description: 'sum of all costs' },
      { symbol: 'Total Quantity', description: 'total mixture quantity' }
    ]
  },
  {
    id: 'module12-ratio-quantity',
    category: 'ratios',
    name: 'Quantity from Ratio',
    formula: 'Quantity A = (Ratio A / Total Ratio) × Total Quantity',
    description: 'Find quantity of ingredient from ratio',
    variables: [
      { symbol: 'Ratio A', description: 'ratio part of ingredient A' },
      { symbol: 'Total Ratio', description: 'sum of all ratio parts' },
      { symbol: 'Total Quantity', description: 'total mixture amount' }
    ]
  },
  {
    id: 'module12-alligation-rule',
    category: 'alligation',
    name: 'Alligation Rule',
    formula: 'Ratio = (Mean - Lower) : (Higher - Mean)',
    description: 'Ratio for mixing two ingredients',
    variables: [
      { symbol: 'Mean', description: 'target price/concentration' },
      { symbol: 'Higher', description: 'higher price/concentration ingredient' },
      { symbol: 'Lower', description: 'lower price/concentration ingredient' }
    ]
  },
  {
    id: 'module12-alligation-cross',
    category: 'alligation',
    name: 'Alligation Cross Method',
    formula: 'Higher - Mean    Mean - Lower',
    description: 'Visual alligation representation',
    variables: [
      { symbol: 'Higher', description: 'higher value' },
      { symbol: 'Mean', description: 'target value' },
      { symbol: 'Lower', description: 'lower value' }
    ]
  },
  {
    id: 'module12-concentration-percentage',
    category: 'concentration',
    name: 'Concentration Percentage',
    formula: 'Concentration % = (Solute Quantity / Total Quantity) × 100',
    description: 'Percentage concentration of solute',
    variables: [
      { symbol: 'Solute Quantity', description: 'amount of solute' },
      { symbol: 'Total Quantity', description: 'total mixture volume' }
    ]
  },
  {
    id: 'module12-replacement-concentration',
    category: 'replacement',
    name: 'Replacement Concentration',
    formula: 'New % = (Old % × (V - R) + C × R) / V',
    description: 'New concentration after replacement',
    variables: [
      { symbol: 'Old %', description: 'original concentration' },
      { symbol: 'V', description: 'total volume' },
      { symbol: 'R', description: 'replacement volume' },
      { symbol: 'C', description: 'concentration of replacement (0-100%)' }
    ]
  },
  {
    id: 'module12-repeated-replacement',
    category: 'repeated-replacement',
    name: 'Repeated Replacement',
    formula: 'C_k = C_0 × (1 - r)^k + C × [1 - (1 - r)^k]',
    description: 'Concentration after k replacements',
    variables: [
      { symbol: 'C_k', description: 'concentration after k replacements' },
      { symbol: 'C_0', description: 'initial concentration' },
      { symbol: 'r', description: 'replacement ratio' },
      { symbol: 'C', description: 'replacement concentration' },
      { symbol: 'k', description: 'number of replacements' }
    ]
  },
  {
    id: 'module12-downstream-speed',
    category: 'boats-streams',
    name: 'Downstream Speed',
    formula: 'Speed = Boat Speed + Stream Speed',
    description: 'Speed when boat moves with current',
    variables: [
      { symbol: 'Boat Speed', description: 'speed in still water' },
      { symbol: 'Stream Speed', description: 'current speed' }
    ]
  },
  {
    id: 'module12-upstream-speed',
    category: 'boats-streams',
    name: 'Upstream Speed',
    formula: 'Speed = Boat Speed - Stream Speed',
    description: 'Speed when boat moves against current',
    variables: [
      { symbol: 'Boat Speed', description: 'speed in still water' },
      { symbol: 'Stream Speed', description: 'current speed' }
    ]
  },
  {
    id: 'module12-boat-speed-formula',
    category: 'boats-streams',
    name: 'Boat Speed from Downstream/Upstream',
    formula: 'Boat Speed = (Downstream + Upstream) / 2',
    description: 'Boat speed in still water',
    variables: [
      { symbol: 'Downstream', description: 'speed with current' },
      { symbol: 'Upstream', description: 'speed against current' }
    ]
  },
  {
    id: 'module12-stream-speed-formula',
    category: 'boats-streams',
    name: 'Stream Speed from Downstream/Upstream',
    formula: 'Stream Speed = (Downstream - Upstream) / 2',
    description: 'Speed of water current',
    variables: [
      { symbol: 'Downstream', description: 'speed with current' },
      { symbol: 'Upstream', description: 'speed against current' }
    ]
  },
  {
    id: 'module12-circular-meeting',
    category: 'circular-track',
    name: 'Circular Track Meeting Time',
    formula: 'Time = Circumference / Relative Speed',
    description: 'Time between meetings on circular track',
    variables: [
      { symbol: 'Circumference', description: 'track length' },
      { symbol: 'Relative Speed', description: 'speed difference' }
    ]
  },
  {
    id: 'module12-race-head-start',
    category: 'races-competitions',
    name: 'Head Start Distance',
    formula: 'Head Start = Relative Speed × Time Advantage',
    description: 'Distance advantage needed',
    variables: [
      { symbol: 'Relative Speed', description: 'speed difference' },
      { symbol: 'Time Advantage', description: 'time head start' }
    ]
  },
  {
    id: 'module12-winning-margin',
    category: 'races-competitions',
    name: 'Winning Margin',
    formula: 'Distance Won = Speed Difference × Race Time',
    description: 'Distance by which winner leads',
    variables: [
      { symbol: 'Speed Difference', description: 'difference in speeds' },
      { symbol: 'Race Time', description: 'total race time' }
    ]
  },
  {
    id: 'module12-weighted-average',
    category: 'advanced-concepts',
    name: 'Weighted Average',
    formula: 'Average = Σ (Weight × Value) / Σ Weight',
    description: 'Weighted average of multiple values',
    variables: [
      { symbol: 'Weight', description: 'importance/quantity factor' },
      { symbol: 'Value', description: 'individual values' }
    ]
  },
  {
    id: 'module12-mixture-percentage',
    category: 'advanced-concepts',
    name: 'Mixture Percentage',
    formula: 'Final % = (Initial % × Initial Qty + Added % × Added Qty) / Total Qty',
    description: 'Final concentration after addition',
    variables: [
      { symbol: 'Initial %', description: 'original concentration' },
      { symbol: 'Initial Qty', description: 'original quantity' },
      { symbol: 'Added %', description: 'added ingredient concentration' },
      { symbol: 'Added Qty', description: 'quantity added' },
      { symbol: 'Total Qty', description: 'final total quantity' }
    ]
  },
  {
    id: 'module12-alloy-percentage',
    category: 'advanced-concepts',
    name: 'Alloy Composition',
    formula: 'Metal % = (Metal Qty / Total Alloy) × 100',
    description: 'Percentage of metal in alloy',
    variables: [
      { symbol: 'Metal Qty', description: 'quantity of specific metal' },
      { symbol: 'Total Alloy', description: 'total alloy weight' }
    ]
  },
  {
    id: 'module12-profit-mixture',
    category: 'business-applications',
    name: 'Profit on Mixture',
    formula: 'Profit % = [(SP - CP) / CP] × 100',
    description: 'Profit percentage on mixture',
    variables: [
      { symbol: 'SP', description: 'selling price' },
      { symbol: 'CP', description: 'cost price' }
    ]
  },
  {
    id: 'module12-loss-mixture',
    category: 'business-applications',
    name: 'Loss on Mixture',
    formula: 'Loss % = [(CP - SP) / CP] × 100',
    description: 'Loss percentage on mixture',
    variables: [
      { symbol: 'CP', description: 'cost price' },
      { symbol: 'SP', description: 'selling price' }
    ]
  }
];

export default formulas;
