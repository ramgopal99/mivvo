interface RadarChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  title: string
  size?: number
}

export function RadarChart({ data, title, size = 300 }: RadarChartProps) {
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

  // Calculate angles for each data point
  const angles = validData.map((_, index) => (index * 2 * Math.PI) / validData.length - Math.PI / 2)

  // Convert polar to cartesian coordinates
  const getCoordinates = (value: number, angle: number) => {
    const normalizedValue = Math.max(0, Math.min(1, value / 100)) // Clamp to 0-1
    const x = centerX + normalizedValue * radius * Math.cos(angle)
    const y = centerY + normalizedValue * radius * Math.sin(angle)
    return { x, y }
  }

  // Generate polygon points for the radar shape
  const points = validData.map((item, index) =>
    getCoordinates(item.value, angles[index])
  )

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative mb-16">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map((percentage) => {
            const r = (percentage / 100) * radius
            return (
              <circle
                key={percentage}
                cx={centerX}
                cy={centerY}
                r={r}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            )
          })}

          {/* Axis lines */}
          {angles.map((angle, index) => {
            const endX = centerX + radius * Math.cos(angle)
            const endY = centerY + radius * Math.sin(angle)
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Labels */}
          {data.map((item, index) => {
            const angle = angles[index]
            const labelRadius = radius + 25
            const labelX = centerX + labelRadius * Math.cos(angle)
            const labelY = centerY + labelRadius * Math.sin(angle)

            return (
              <text
                key={item.label}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#6b7280"
                className="font-medium"
              >
                {item.label}
              </text>
            )
          })}

          {/* Center labels */}
          {[20, 40, 60, 80, 100].map((percentage) => (
            <text
              key={percentage}
              x={centerX}
              y={centerY - (percentage / 100) * radius + 4}
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
            >
              {percentage}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {validData.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2 min-w-0">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-purple-500' :
                  index === 2 ? 'bg-green-500' :
                  index === 3 ? 'bg-yellow-500' :
                  index === 4 ? 'bg-red-500' : 'bg-indigo-500'
                }`} />
                <span className="text-xs text-gray-600 truncate text-left">
                  {item.label}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
