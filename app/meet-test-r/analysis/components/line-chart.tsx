interface LineChartProps {
  data: Array<{
    x: number
    y: number
    label: string
  }>
  title: string
  xLabel?: string
  yLabel?: string
  height?: number
}

export function LineChart({ data, title, xLabel = "Time", yLabel = "Value", height = 300 }: LineChartProps) {
  const chartWidth = 400
  const chartHeight = height - 80
  const padding = 60

  // Validate and clean data
  const validData = data.filter(d =>
    typeof d.x === 'number' && !isNaN(d.x) &&
    typeof d.y === 'number' && !isNaN(d.y)
  )

  if (validData.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-64">
        <div className="text-center text-muted-foreground">
          <p>No valid data to display</p>
        </div>
      </div>
    )
  }

  // Find min/max values
  const xValues = validData.map(d => d.x)
  const yValues = validData.map(d => d.y)
  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)
  const minY = Math.min(...yValues)
  const maxY = Math.max(...yValues)

  // Handle edge case where all x values are the same
  const xRange = maxX - minX || 1
  const yRange = maxY - minY || 1

  // Scale functions
  const scaleX = (x: number) => padding + ((x - minX) / xRange) * (chartWidth - 2 * padding)
  const scaleY = (y: number) => chartHeight - padding - ((y - minY) / yRange) * (chartHeight - 2 * padding)

  // Generate path for the line
  const linePath = validData
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${scaleX(point.x)} ${scaleY(point.y)}`)
    .join(' ')

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div className="relative mb-16">
        <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percentage) => {
          const y = chartHeight - padding - (percentage / 100) * (chartHeight - 2 * padding)
          return (
            <g key={percentage}>
              <line
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text
                x={padding - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#9ca3af"
              >
                {percentage}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {validData.filter((_, index) => index % Math.ceil(validData.length / 5) === 0).map((point, index) => {
          const x = scaleX(point.x)
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={chartHeight - padding + 20}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
            >
              {point.label}
            </text>
          )
        })}

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {validData.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r="4"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
            className="hover:r-6 transition-all duration-200"
          />
        ))}

        {/* Axis labels */}
        <text
          x={chartWidth / 2}
          y={chartHeight - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
        >
          {xLabel}
        </text>

        <text
          x={12}
          y={chartHeight / 2}
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
          transform={`rotate(-90, 12, ${chartHeight / 2})`}
        >
          {yLabel}
        </text>
        </svg>

        {/* Legend */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {validData.slice(0, 4).map((point, index) => (
              <div key={`point-${index}`} className="flex items-center gap-2 min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-purple-500' :
                  index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-xs text-gray-600 truncate text-left">
                  {point.label}: {point.y}
                </span>
              </div>
            ))}
          </div>
          {validData.length > 4 && (
            <div className="mt-2 text-center">
              <span className="text-xs text-gray-500">+{validData.length - 4} more points</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
