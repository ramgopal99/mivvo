"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartComponentProps {
  score: number
  communication: number
  knowledge: number
}

export function BarChartComponent({ score, communication, knowledge }: BarChartComponentProps) {
  const chartData = [
    { metric: "Overall", score: score },
    { metric: "Communication", score: communication },
    { metric: "Knowledge", score: knowledge },
  ]

  const chartConfig = {
    score: {
      label: "Score",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
        <CardDescription>Your detailed performance breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="metric"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" fill="var(--color-score)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Best Performance: {Math.max(score, communication, knowledge)}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Detailed breakdown of your interview performance metrics
        </div>
      </CardFooter>
    </Card>
  )
}
