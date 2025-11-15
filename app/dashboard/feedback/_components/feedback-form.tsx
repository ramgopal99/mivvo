"use client"

import { useState, createContext, useContext, ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, Send } from "lucide-react"
import { toast } from "sonner"

// Context for feedback form state
interface FeedbackFormContextType {
  title: string
  setTitle: (title: string) => void
  message: string
  setMessage: (message: string) => void
  isSubmitting: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

const FeedbackFormContext = createContext<FeedbackFormContextType | null>(null)

const useFeedbackForm = () => {
  const context = useContext(FeedbackFormContext)
  if (!context) {
    throw new Error('useFeedbackForm must be used within a FeedbackForm component')
  }
  return context
}

// Main compound component
interface FeedbackFormProps {
  children: ReactNode
  onSuccess?: () => void
}

export function FeedbackForm({ children, onSuccess }: FeedbackFormProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Thank you for your feedback!")
        setTitle("")
        setMessage("")
        onSuccess?.()
      } else {
        if (data.message?.includes('once per day')) {
          toast.error("You can only submit feedback once per day. Please try again tomorrow.")
        } else {
          toast.error("Failed to submit feedback. Please try again.")
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contextValue: FeedbackFormContextType = {
    title,
    setTitle,
    message,
    setMessage,
    isSubmitting,
    handleSubmit,
  }

  return (
    <FeedbackFormContext.Provider value={contextValue}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Share Your Feedback
          </CardTitle>
          <CardDescription>
            Your feedback helps us make Mivvo better for everyone. We appreciate your input!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {children}
          </form>
        </CardContent>
      </Card>
    </FeedbackFormContext.Provider>
  )
}

// Sub-components
export function FeedbackTitle() {
  const { title, setTitle } = useFeedbackForm()

  return (
    <div className="space-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        placeholder="Brief summary of your feedback"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
    </div>
  )
}

export function FeedbackMessage() {
  const { message, setMessage } = useFeedbackForm()

  return (
    <div className="space-y-2">
      <Label htmlFor="message">Your Feedback</Label>
      <Textarea
        id="message"
        placeholder="Please share your thoughts, suggestions, or any issues you've encountered..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="resize-none"
      />
      <p className="text-sm text-muted-foreground">
        Be as detailed as possible to help us understand your feedback better.
      </p>
    </div>
  )
}

export function FeedbackSubmit() {
  const { isSubmitting } = useFeedbackForm()

  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Submitting...
        </>
      ) : (
        <>
          <Send className="h-4 w-4 mr-2" />
          Submit Feedback
        </>
      )}
    </Button>
  )
}
