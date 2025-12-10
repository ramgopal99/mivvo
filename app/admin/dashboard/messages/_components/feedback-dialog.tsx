import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, User, Clock } from "lucide-react"
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

interface FeedbackDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feedback?: Feedback | null
}

export function FeedbackDialog({
  open,
  onOpenChange,
  feedback
}: FeedbackDialogProps) {
  if (!feedback) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {feedback.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-1">
                  Feedback from {feedback.user?.name || feedback.user?.email || 'Unknown User'}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 pr-2">
          {/* User Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  {feedback.user?.name?.split(' ').map(n => n[0]).join('') ||
                   feedback.user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 truncate">
                    {feedback.user?.name || 'Unknown User'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="break-all">{feedback.user?.email || 'No email'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="outline" className="text-xs border-gray-300 whitespace-nowrap">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(feedback.createdAt), 'MMM dd, yyyy \'at\' HH:mm')}
                </Badge>
              </div>
            </div>
          </div>

          {/* Feedback Message */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col min-h-0 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg flex-shrink-0">
              📝 Feedback Message
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base break-words">
                {feedback.message}
              </p>
            </div>
          </div>
        </div>

        {/* Actions footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-lg mt-6 flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

