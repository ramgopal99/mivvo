interface BarChartProps {
  data: Array<{
    label: string
    value: number
    color: string
    maxValue?: number
  }>
  title: string
  height?: number
}

export function BarChart({ data, title, height = 300 }: BarChartProps) {
  // Validate and filter data
  const validData = data.filter(d =>
    typeof d.value === 'number' && !isNaN(d.value) && d.value >= 0
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

  const maxValue = Math.max(...validData.map(d => d.maxValue || d.value)) || 1 // Prevent NaN
  const chartWidth = 400
  const chartHeight = height - 80 // Increased bottom margin for labels
  const barWidth = Math.max(25, Math.min(60, (chartWidth - 40) / validData.length)) // Adaptive bar width
  const padding = 20
  const labelFontSize = validData.length > 6 ? 9 : validData.length > 4 ? 10 : 11
  const maxLabelLength = barWidth < 30 ? 4 : barWidth < 40 ? 5 : 6

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth + 40} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percentage) => {
          const y = chartHeight - (percentage / 100) * chartHeight + padding
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
                x={padding - 5}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#6b7280"
              >
                {percentage}
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {validData.map((item, index) => {
          const barHeight = Math.max(0, (item.value / maxValue) * chartHeight) // Ensure non-negative
          const x = padding + index * barWidth + barWidth * 0.1
          const y = chartHeight - barHeight + padding
          const width = barWidth * 0.8

          return (
            <g key={item.label}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={width}
                height={barHeight || 1} // Minimum height of 1 to avoid invisible bars
                fill={item.color}
                rx="4"
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              />

              {/* Value label on bar */}
              <text
                x={x + width / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#374151"
              >
                {item.value}
              </text>

              {/* X-axis label */}
              <text
                x={x + width / 2}
                y={chartHeight + padding + 15}
                textAnchor="middle"
                fontSize={labelFontSize}
                fill="#6b7280"
                className="max-w-[80px]"
              >
                {item.label.length > maxLabelLength ? item.label.substring(0, maxLabelLength - 1) + '...' : item.label}
              </text>
            </g>
          )
        })}

        {/* Y-axis label */}
        <text
          x="-8"
          y={chartHeight / 2 + padding}
          textAnchor="middle"
          fontSize="10"
          fill="#6b7280"
          transform={`rotate(-90, -8, ${chartHeight / 2 + padding})`}
        >
          Score (%)
        </text>
      </svg>
    </div>
  )
}
