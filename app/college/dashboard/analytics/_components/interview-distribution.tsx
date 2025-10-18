"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InterviewType {
  type: string
  count: number
  label: string
}

interface InterviewDistributionProps {
  data: InterviewType[]
}

export function InterviewDistribution({ data }: InterviewDistributionProps) {
  const total = data.reduce((acc, item) => acc + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Types Distribution</CardTitle>
        <CardDescription>
          Breakdown of interview categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {data.map((item, index) => {
                  const percentage = (item.count / total) * 100
                  const startAngle = data.slice(0, index).reduce((acc, d) => acc + (d.count / total) * 360, 0)
                  const endAngle = startAngle + (percentage / 100) * 360

                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                  const largeArcFlag = percentage > 50 ? 1 : 0

                  return (
                    <path
                      key={item.type}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={`hsl(${index * 90}, 70%, 50%)`}
                      className="stroke-white stroke-1"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.map((item, index) => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `hsl(${index * 90}, 70%, 50%)` }}
                />
                <span className="text-sm">{item.label}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
