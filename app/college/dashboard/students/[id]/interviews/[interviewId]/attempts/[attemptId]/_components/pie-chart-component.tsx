"use client"

import { MessageCircle } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface PieChartComponentProps {
  allMessages: ConversationMessage[]
}

export function PieChartComponent({ allMessages }: PieChartComponentProps) {
  const conversationChartData = [
    { role: "your-messages", messages: allMessages.filter(m => m.role === 'user').length, fill: "var(--color-your-messages)" },
    { role: "interviewer", messages: allMessages.filter(m => m.role === 'assistant').length, fill: "var(--color-interviewer)" },
  ]

  const conversationChartConfig = {
    "your-messages": {
      label: "Student Messages",
      color: "var(--chart-1)",
    },
    interviewer: {
      label: "AI Messages",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
          Conversation Stats
        </CardTitle>
        <CardDescription>Message distribution in this interview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={conversationChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={conversationChartData}
              dataKey="messages"
              nameKey="role"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">{allMessages.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Messages</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {allMessages.filter(m => m.role === 'user').length}
            </div>
            <div className="text-sm font-medium text-gray-600">Student Messages</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {allMessages.filter(m => m.role === 'assistant').length}
            </div>
            <div className="text-sm font-medium text-gray-600">AI Messages</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none text-center">
          Message distribution breakdown
        </div>
      </CardFooter>
    </Card>
  )
}
