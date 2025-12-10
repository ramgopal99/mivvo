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
import { MessageSquare, Mail, User, Clock, CheckCircle } from "lucide-react"
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

interface MessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: ContactMessage | null
  ticket?: SupportTicket | null
  onMarkComplete?: (messageId: string) => void
  isMarkingComplete?: boolean
}

export function MessageDialog({
  open,
  onOpenChange,
  message,
  ticket,
  onMarkComplete,
  isMarkingComplete = false
}: MessageDialogProps) {
  const isContactMessage = !!message
  const item = message || ticket

  if (!item) return null

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[70vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {isContactMessage ? 'Contact Message' : 'Support Ticket'}
          </DialogTitle>
          <DialogDescription>
            {isContactMessage ? 'View contact form submission details' : 'View support ticket details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {/* Header Info */}
          <div className="bg-gray-50 rounded-lg p-4 -m-2 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {isContactMessage
                      ? `${(message as ContactMessage).firstName[0]}${(message as ContactMessage).lastName[0]}`
                      : (ticket as SupportTicket).user?.name?.split(' ').map(n => n[0]).join('') ||
                        (ticket as SupportTicket).user?.email?.[0]?.toUpperCase() || 'U'
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{item.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {!isContactMessage && (ticket as SupportTicket).status && (
                      <Badge className={getStatusColor((ticket as SupportTicket).status)}>
                        {(ticket as SupportTicket).status}
                      </Badge>
                    )}
                    {isContactMessage && (message as ContactMessage).status && (
                      <Badge className={getStatusColor((message as ContactMessage).status)}>
                        {(message as ContactMessage).status}
                      </Badge>
                    )}
                    {isContactMessage && (
                      <Badge variant="secondary">Contact Form</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* First row: User and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {isContactMessage
                        ? `${(message as ContactMessage).firstName} ${(message as ContactMessage).lastName}`
                        : (ticket as SupportTicket).user?.name || (ticket as SupportTicket).user?.email || 'Unknown User'
                      }
                    </div>
                    <div className="text-gray-500 text-xs">User</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{format(new Date(item.createdAt), 'MMM dd, yyyy')}</div>
                    <div className="text-gray-500 text-xs">{format(new Date(item.createdAt), 'HH:mm')}</div>
                  </div>
                </div>
              </div>

              {/* Second row: Email (full width) */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 break-all">
                    {isContactMessage
                      ? (message as ContactMessage).email
                      : (ticket as SupportTicket).user?.email || 'No email'
                    }
                  </div>
                  <div className="text-gray-500 text-xs">Email Address</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket-specific info */}
          {!isContactMessage && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Ticket ID</div>
                <div className="text-lg font-mono font-bold text-blue-900 mt-1">{(ticket as SupportTicket).ticketId}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Category</div>
                <div className="text-lg font-semibold text-blue-900 mt-1">{(ticket as SupportTicket).category}</div>
              </div>
            </div>
          )}

          {/* Content in separate rows */}
          <div className="space-y-4">
            {/* Message Content */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col min-h-0">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg flex-shrink-0">
                {isContactMessage ? '📝 Message' : '📋 Description'}
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300 overflow-y-auto max-h-[300px]">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base break-words">
                  {isContactMessage ? (message as ContactMessage).message : (ticket as SupportTicket).description}
                </p>
              </div>
            </div>

            {/* Resolution (for support tickets) */}
            {!isContactMessage && (ticket as SupportTicket).resolution && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col min-h-0">
                <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2 text-lg flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                  Resolution
                </h4>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-400 overflow-y-auto max-h-[300px]">
                  <p className="text-green-800 whitespace-pre-wrap leading-relaxed text-base break-words">
                    {(ticket as SupportTicket).resolution}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4 flex-shrink-0">
          {isContactMessage && onMarkComplete && (message as ContactMessage).status !== 'COMPLETED' && (
            <Button
              onClick={() => {
                if (message) {
                  onMarkComplete(message.id)
                }
              }}
              disabled={isMarkingComplete}
              className="px-6 bg-green-600 hover:bg-green-700 text-white"
            >
              {isMarkingComplete ? 'Marking...' : 'Mark Complete'}
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-6">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
