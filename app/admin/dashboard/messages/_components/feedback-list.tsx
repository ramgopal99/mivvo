import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, User, Clock } from "lucide-react"
import { format } from "date-fns"

interface Feedback {
  id: string
  title: string
  message: string
  userId: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name?: string
    email: string
  }
}

interface FeedbackListProps {
  feedbacks: Feedback[]
  onFeedbackClick?: (feedback: Feedback) => void
}

export function FeedbackList({
  feedbacks,
  onFeedbackClick
}: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
          <p className="text-gray-500 text-center">
            User feedback will appear here when submitted.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <Card
          key={feedback.id}
          className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() => onFeedbackClick?.(feedback)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                      {feedback.user?.name?.split(' ').map(n => n[0]).join('') ||
                       feedback.user?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
                      {feedback.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{feedback.user?.name || feedback.user?.email || 'Unknown User'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs border-gray-300">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(feedback.createdAt), 'MMM dd, HH:mm')}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {feedback.message.length > 200
                  ? `${feedback.message.substring(0, 200)}...`
                  : feedback.message
                }
              </p>
              {feedback.message.length > 200 && (
                <button className="mt-2 text-sm text-gray-600 hover:text-gray-900">
                  Read more
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Received {format(new Date(feedback.createdAt), 'MMM dd, yyyy \'at\' HH:mm')}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFeedbackClick?.(feedback)
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

