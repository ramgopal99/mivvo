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
    id: 'module11-basic-speed',
    category: 'basic-formulas',
    name: 'Speed Formula',
    formula: 'Speed = Distance / Time',
    description: 'Basic relationship between speed, distance, and time',
    variables: [
      { symbol: 'Speed', description: 'rate of motion' },
      { symbol: 'Distance', description: 'total distance traveled' },
      { symbol: 'Time', description: 'time taken' }
    ]
  },
  {
    id: 'module11-distance',
    category: 'basic-formulas',
    name: 'Distance Formula',
    formula: 'Distance = Speed × Time',
    description: 'Distance covered at constant speed',
    variables: [
      { symbol: 'Speed', description: 'constant speed' },
      { symbol: 'Time', description: 'time duration' }
    ]
  },
  {
    id: 'module11-time',
    category: 'basic-formulas',
    name: 'Time Formula',
    formula: 'Time = Distance / Speed',
    description: 'Time required to cover distance at given speed',
    variables: [
      { symbol: 'Distance', description: 'distance to cover' },
      { symbol: 'Speed', description: 'travel speed' }
    ]
  },
  {
    id: 'module11-unit-conversion-kmh-ms',
    category: 'unit-conversion',
    name: 'km/h to m/s',
    formula: 'Speed (m/s) = Speed (km/h) × (5/18)',
    description: 'Convert kilometers per hour to meters per second',
    variables: [
      { symbol: 'Speed (km/h)', description: 'speed in km/h' },
      { symbol: '5/18', description: 'conversion factor' }
    ]
  },
  {
    id: 'module11-unit-conversion-ms-kmh',
    category: 'unit-conversion',
    name: 'm/s to km/h',
    formula: 'Speed (km/h) = Speed (m/s) × (18/5)',
    description: 'Convert meters per second to kilometers per hour',
    variables: [
      { symbol: 'Speed (m/s)', description: 'speed in m/s' },
      { symbol: '18/5', description: 'conversion factor' }
    ]
  },
  {
    id: 'module11-average-speed',
    category: 'average-speed',
    name: 'Average Speed',
    formula: 'Average Speed = Total Distance / Total Time',
    description: 'Average speed for entire journey',
    variables: [
      { symbol: 'Total Distance', description: 'sum of all distances' },
      { symbol: 'Total Time', description: 'sum of all times' }
    ]
  },
  {
    id: 'module11-return-journey-average',
    category: 'average-speed',
    name: 'Return Journey Average Speed',
    formula: 'Average Speed = 2S₁S₂ / (S₁ + S₂)',
    description: 'Harmonic mean for different outward and return speeds',
    variables: [
      { symbol: 'S₁', description: 'speed for one way' },
      { symbol: 'S₂', description: 'speed for return way' }
    ]
  },
  {
    id: 'module11-relative-speed-towards',
    category: 'relative-speed',
    name: 'Relative Speed (Towards)',
    formula: 'Relative Speed = Speed₁ + Speed₂',
    description: 'When objects move towards each other',
    variables: [
      { symbol: 'Speed₁', description: 'speed of first object' },
      { symbol: 'Speed₂', description: 'speed of second object' }
    ]
  },
  {
    id: 'module11-relative-speed-away',
    category: 'relative-speed',
    name: 'Relative Speed (Away)',
    formula: 'Relative Speed = Speed₁ + Speed₂',
    description: 'When objects move away from each other',
    variables: [
      { symbol: 'Speed₁', description: 'speed of first object' },
      { symbol: 'Speed₂', description: 'speed of second object' }
    ]
  },
  {
    id: 'module11-relative-speed-same-direction',
    category: 'relative-speed',
    name: 'Relative Speed (Same Direction)',
    formula: 'Relative Speed = |Speed₁ - Speed₂|',
    description: 'When objects move in same direction',
    variables: [
      { symbol: 'Speed₁', description: 'speed of faster object' },
      { symbol: 'Speed₂', description: 'speed of slower object' }
    ]
  },
  {
    id: 'module11-meeting-time',
    category: 'meeting-crossing',
    name: 'Meeting Time',
    formula: 'Time = Distance / Relative Speed',
    description: 'Time for two objects to meet',
    variables: [
      { symbol: 'Distance', description: 'initial distance between objects' },
      { symbol: 'Relative Speed', description: 'speed at which they approach' }
    ]
  },
  {
    id: 'module11-train-crossing',
    category: 'meeting-crossing',
    name: 'Train Crossing Time',
    formula: 'Time = (L₁ + L₂) / Relative Speed',
    description: 'Time for two trains to completely cross each other',
    variables: [
      { symbol: 'L₁', description: 'length of first train' },
      { symbol: 'L₂', description: 'length of second train' },
      { symbol: 'Relative Speed', description: 'relative speed of trains' }
    ]
  },
  {
    id: 'module11-pole-crossing',
    category: 'meeting-crossing',
    name: 'Pole Crossing Time',
    formula: 'Time = Train Length / Speed',
    description: 'Time for train to cross a pole/platform',
    variables: [
      { symbol: 'Train Length', description: 'length of train' },
      { symbol: 'Speed', description: 'speed of train' }
    ]
  },
  {
    id: 'module11-platform-crossing',
    category: 'meeting-crossing',
    name: 'Platform Crossing Time',
    formula: 'Time = (Train Length + Platform Length) / Speed',
    description: 'Time for train to cross a platform',
    variables: [
      { symbol: 'Train Length', description: 'length of train' },
      { symbol: 'Platform Length', description: 'length of platform' },
      { symbol: 'Speed', description: 'speed of train' }
    ]
  },
  {
    id: 'module11-boat-downstream',
    category: 'boats-streams',
    name: 'Downstream Speed',
    formula: 'Speed = Boat Speed + Stream Speed',
    description: 'Boat speed when moving with the current',
    variables: [
      { symbol: 'Boat Speed', description: 'speed in still water' },
      { symbol: 'Stream Speed', description: 'speed of water current' }
    ]
  },
  {
    id: 'module11-boat-upstream',
    category: 'boats-streams',
    name: 'Upstream Speed',
    formula: 'Speed = Boat Speed - Stream Speed',
    description: 'Boat speed when moving against the current',
    variables: [
      { symbol: 'Boat Speed', description: 'speed in still water' },
      { symbol: 'Stream Speed', description: 'speed of water current' }
    ]
  },
  {
    id: 'module11-boat-speed-average',
    category: 'boats-streams',
    name: 'Boat Speed from Upstream/Downstream',
    formula: 'Boat Speed = (Downstream + Upstream) / 2',
    description: 'Average of downstream and upstream speeds',
    variables: [
      { symbol: 'Downstream', description: 'speed with current' },
      { symbol: 'Upstream', description: 'speed against current' }
    ]
  },
  {
    id: 'module11-stream-speed',
    category: 'boats-streams',
    name: 'Stream Speed',
    formula: 'Stream Speed = (Downstream - Upstream) / 2',
    description: 'Speed of water current',
    variables: [
      { symbol: 'Downstream', description: 'speed with current' },
      { symbol: 'Upstream', description: 'speed against current' }
    ]
  },
  {
    id: 'module11-circular-track-meeting',
    category: 'circular-track',
    name: 'Circular Track Meeting Time',
    formula: 'Time = Circumference / Relative Speed',
    description: 'Time between meetings on circular track',
    variables: [
      { symbol: 'Circumference', description: 'distance around track' },
      { symbol: 'Relative Speed', description: 'relative speed of runners' }
    ]
  },
  {
    id: 'module11-race-head-start',
    category: 'races-competitions',
    name: 'Head Start Time Saved',
    formula: 'Time Saved = Head Start Distance / Relative Speed',
    description: 'Time advantage from head start',
    variables: [
      { symbol: 'Head Start Distance', description: 'initial distance advantage' },
      { symbol: 'Relative Speed', description: 'speed difference' }
    ]
  },
  {
    id: 'module11-race-winning-margin',
    category: 'races-competitions',
    name: 'Winning Margin',
    formula: 'Distance Won = Speed Difference × Time',
    description: 'Distance by which winner beats others',
    variables: [
      { symbol: 'Speed Difference', description: 'difference in speeds' },
      { symbol: 'Time', description: 'race time of winner' }
    ]
  },
  {
    id: 'module11-work-equivalence',
    category: 'advanced-concepts',
    name: 'Work Equivalence',
    formula: 'Speed₁ × Time₁ = Speed₂ × Time₂',
    description: 'Equal work done at different rates',
    variables: [
      { symbol: 'Speed₁, Time₁', description: 'speed and time for first part' },
      { symbol: 'Speed₂, Time₂', description: 'speed and time for second part' }
    ]
  },
  {
    id: 'module11-efficiency-ratio',
    category: 'advanced-concepts',
    name: 'Efficiency Ratio',
    formula: 'Efficiency ∝ 1/Time for same work',
    description: 'Efficiency comparison for same task',
    variables: [
      { symbol: 'Time', description: 'time taken for same work' }
    ]
  },
  {
    id: 'module11-time-speed-relationship',
    category: 'advanced-concepts',
    name: 'Time-Speed Relationship',
    formula: 'Time ∝ 1/Speed (for same distance)',
    description: 'Inverse relationship between time and speed',
    variables: [
      { symbol: 'Time', description: 'time taken' },
      { symbol: 'Speed', description: 'travel speed' }
    ]
  }
];

export default formulas;