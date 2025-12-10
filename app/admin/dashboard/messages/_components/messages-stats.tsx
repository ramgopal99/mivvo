import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, HelpCircle, CheckCircle, MessageCircle } from "lucide-react"

interface MessagesStatsProps {
  totalCount: number
  contactMessageCount: number
  supportTicketCount: number
  completedTickets: number
  feedbackCount: number
}

export function MessagesStats({
  totalCount,
  contactMessageCount,
  supportTicketCount,
  completedTickets,
  feedbackCount
}: MessagesStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
      {/* Total Number */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Number
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {totalCount}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            All messages & tickets
          </p>
        </CardContent>
      </Card>

      {/* Contact Number */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Contact Number
          </CardTitle>
          <Users className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {contactMessageCount}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Contact messages
          </p>
        </CardContent>
      </Card>

      {/* Support Number */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Support Number
          </CardTitle>
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {supportTicketCount}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Support tickets
          </p>
        </CardContent>
      </Card>

      {/* Feedback Number */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Feedback Number
          </CardTitle>
          <MessageCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {feedbackCount}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            User feedback
          </p>
        </CardContent>
      </Card>

      {/* Solved Number */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Solved Number
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {completedTickets}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Items resolved
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
