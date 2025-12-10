import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Mail, User, Clock, Eye, Reply, Star, Flag } from "lucide-react"
import { format } from "date-fns"

interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ContactMessagesListProps {
  messages: ContactMessage[]
  onMessageClick?: (message: ContactMessage) => void
}

export function ContactMessagesList({
  messages,
  onMessageClick
}: ContactMessagesListProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages found</h3>
          <p className="text-gray-500 text-center">
            Contact messages will appear here when users submit the contact form.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card
          key={message.id}
          className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() => onMessageClick?.(message)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {message.firstName[0]}{message.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
                      {message.subject}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{message.firstName} {message.lastName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{message.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-gray-300">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(message.createdAt), 'MMM dd, HH:mm')}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getStatusColor(message.status)}`}>
                  {message.status}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {message.message.length > 200
                  ? `${message.message.substring(0, 200)}...`
                  : message.message
                }
              </p>
              {message.message.length > 200 && (
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-gray-600 hover:text-gray-900">
                  Read more
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Received {format(new Date(message.createdAt), 'MMM dd, yyyy \'at\' HH:mm')}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMessageClick?.(message)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
