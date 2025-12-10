import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send } from "lucide-react"

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

interface ReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: SupportTicket | null
  onSubmit: (subject: string, message: string, resolution?: string) => void
  loading?: boolean
}

export function ReplyDialog({
  open,
  onOpenChange,
  ticket,
  onSubmit,
  loading = false
}: ReplyDialogProps) {
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [resolution, setResolution] = React.useState("")

  // Reset form when dialog opens with a new ticket
  React.useEffect(() => {
    if (open && ticket) {
      setSubject(`Re: ${ticket.subject}`)
      setMessage("")
      setResolution("")
    }
  }, [open, ticket])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return

    onSubmit(subject, message, resolution.trim() || undefined)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset form when closing
    setSubject("")
    setMessage("")
    setResolution("")
  }

  if (!ticket) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Reply to Support Ticket
          </DialogTitle>
          <DialogDescription>
            Send a reply to the user and mark this ticket as completed.
          </DialogDescription>
        </DialogHeader>

        {/* Ticket Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
              <p className="text-sm text-gray-600">Ticket #{ticket.ticketId}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>From: {ticket.user?.name || ticket.user?.email || 'Unknown User'}</p>
              <p>Category: {ticket.category}</p>
            </div>
          </div>
          <div className="bg-white rounded p-3 border text-sm">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Reply Subject *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter reply subject"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Reply Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your reply message..."
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution Summary</Label>
            <Textarea
              id="resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Brief summary of how the issue was resolved..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !subject.trim() || !message.trim()}
              className="bg-black hover:bg-gray-800"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply & Complete
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
