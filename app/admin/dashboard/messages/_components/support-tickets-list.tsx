import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { HelpCircle, Clock, User, AlertTriangle, CheckCircle, Star, MessageCircle } from "lucide-react"
import { format } from "date-fns"

interface SupportTicket {
  id: string
  ticketId: string
  subject: string
  category: string
  status: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  resolution?: string
  user?: {
    name?: string
    email: string
  }
}

interface SupportTicketsListProps {
  tickets: SupportTicket[]
  onTicketClick?: (ticket: SupportTicket) => void
  onReplyClick?: (ticket: SupportTicket) => void
}

export function SupportTicketsList({
  tickets,
  onTicketClick,
  onReplyClick
}: SupportTicketsListProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-950'
      case 'completed':
        return 'border-green-300 bg-green-50 dark:bg-green-950'
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-950'
    }
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <HelpCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
          <p className="text-gray-500 text-center">
            Support tickets will appear here when users submit support requests.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          className={`bg-white border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group ${ticket.status === 'PENDING' ? 'border-l-4 border-l-blue-500' : ticket.status === 'COMPLETED' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-500'}`}
          onClick={() => onTicketClick?.(ticket)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {ticket.user?.name?.split(' ').map(n => n[0]).join('') ||
                       ticket.user?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
                        {ticket.subject}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs font-mono border-gray-300">
                        {ticket.ticketId}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{ticket.user?.name || ticket.user?.email || 'Unknown User'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{ticket.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={ticket.status === 'COMPLETED' ? 'default' : 'outline'} className="text-xs">
                  {ticket.status === 'COMPLETED' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
                  {ticket.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {ticket.description.length > 250
                  ? `${ticket.description.substring(0, 250)}...`
                  : ticket.description
                }
              </p>
              {ticket.description.length > 250 && (
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-gray-600 hover:text-gray-900">
                  Read more
                </Button>
              )}
            </div>

            {ticket.resolution && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Resolution</span>
                </div>
                <p className="text-green-700 whitespace-pre-wrap">
                  {ticket.resolution}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Created {format(new Date(ticket.createdAt), 'MMM dd, yyyy \'at\' HH:mm')}</span>
                {ticket.status === 'COMPLETED' && (
                  <span>Resolved {format(new Date(ticket.updatedAt), 'MMM dd, yyyy')}</span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    onTicketClick?.(ticket)
                  }}
                >
                  View Details
                </Button>
                {ticket.status !== 'COMPLETED' && (
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      onReplyClick?.(ticket)
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Reply & Complete
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
