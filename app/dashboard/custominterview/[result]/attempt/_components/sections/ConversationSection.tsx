import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Bot } from "lucide-react"

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ConversationSectionProps {
  messages: ConversationMessage[]
  formatDate: (date: Date) => string
}

export function ConversationSection({ messages, formatDate }: ConversationSectionProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Conversation Transcript
        </CardTitle>
        <CardDescription>
          Complete record of your interview conversation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Conversation Data</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              Conversation transcript is not available for this attempt.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isSilentMessage = message.content === 'Please ask me your next question.'
              return (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-all hover:shadow-sm relative ${
                    isSilentMessage
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-400 border-2 ml-8'
                      : message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-50 to-blue-25 border-blue-200 ml-8'
                      : 'bg-gradient-to-r from-gray-50 to-gray-25 border-gray-200 mr-8'
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                    isSilentMessage
                      ? 'bg-amber-500 text-white'
                      : message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-600 text-white'
                  }`}>
                    {isSilentMessage ? (
                      <MessageSquare className="w-5 h-5" />
                    ) : message.role === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge
                        variant={isSilentMessage ? 'outline' : message.role === 'user' ? 'default' : 'secondary'}
                        className={`text-xs font-medium ${isSilentMessage ? 'border-amber-500 text-amber-700 bg-amber-50' : ''}`}
                      >
                        {isSilentMessage ? 'System' : message.role === 'user' ? 'You' : 'Interviewer'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {message.timestamp ? formatDate(new Date(message.timestamp)) : ''}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {isSilentMessage ? 'user is silent' : message.content}
                      </p>
                    </div>
                  </div>
                  {isSilentMessage && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium border-2 border-white shadow-sm">
                      Auto-advance
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
