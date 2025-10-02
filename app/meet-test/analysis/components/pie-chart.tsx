interface PieChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  title: string
  size?: number
}

export function PieChart({ data, title, size = 300 }: PieChartProps) {
  // Validate and filter data
  const validData = data.filter(d =>
    typeof d.value === 'number' && !isNaN(d.value) && d.value >= 0
  )

  if (validData.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <p>No valid data to display</p>
        </div>
      </div>
    )
  }

  const centerX = size / 2
  const centerY = size / 2
  const radius = (size - 80) / 2

  // Calculate total for percentages
  const total = validData.reduce((sum, item) => sum + item.value, 0) || 1 // Prevent division by zero

  // Generate pie slices
  let currentAngle = -Math.PI / 2 // Start from top
  const slices = validData.map((item) => {
    const percentage = item.value / total
    const angle = percentage * 2 * Math.PI
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    // Calculate path for the slice
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = angle > Math.PI ? 1 : 0

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ')

    // Calculate label position (middle of the slice)
    const labelAngle = startAngle + angle / 2
    const labelRadius = radius * 0.7
    const labelX = centerX + labelRadius * Math.cos(labelAngle)
    const labelY = centerY + labelRadius * Math.sin(labelAngle)

    currentAngle = endAngle

    return {
      ...item,
      pathData,
      percentage,
      labelX,
      labelY
    }
  })

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative mb-16">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Pie slices */}
          {slices.map((slice) => (
            <path
              key={slice.label}
              d={slice.pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}

          {/* Labels */}
          {slices.map((slice) => (
            <text
              key={slice.label}
              x={slice.labelX}
              y={slice.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fontWeight="bold"
              fill="white"
              className="drop-shadow-sm"
            >
              {Math.round(slice.percentage * 100)}%
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {validData.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2 min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  index === 0 ? 'bg-purple-500' :
                  index === 1 ? 'bg-blue-500' :
                  index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-xs text-gray-600 truncate text-left">
                  {item.label}: {item.value} ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
