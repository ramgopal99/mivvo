"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Briefcase, CheckCircle, Play } from "lucide-react"
import { MockInterview } from "../types"

interface InterviewDetailsSidebarProps {
  isOpen: boolean
  onClose: () => void
  interview?: MockInterview | null
}

interface InterviewDetailsSidebarCompound {
  Sidebar: React.ComponentType<InterviewDetailsSidebarProps>
}

const InterviewDetailsSidebar: React.FC<InterviewDetailsSidebarProps> = ({
  isOpen,
  onClose,
  interview
}) => {
  const router = useRouter()
  const [showStartDialog, setShowStartDialog] = useState(false)

  const handleStartInterview = () => {
    setShowStartDialog(true)
  }

  const confirmStartInterview = () => {
    if (interview) {
      router.push(`/dashboard/mockinterview/${interview.id}`)
      onClose()
    }
    setShowStartDialog(false)
  }

  const cancelStartInterview = () => {
    setShowStartDialog(false)
  }

  // Helper function to clean markdown formatting
  const cleanMarkdown = (text: string) => {
    return text.replace(/\*\*/g, '').trim()
  }

  // Helper function to convert description text to structured format
  const formatDescription = (text: string) => {
    if (!text || text === "No company description provided.") {
      return [{ type: 'text', content: text }]
    }

    // Clean markdown formatting first
    text = cleanMarkdown(text)

    // First, check for existing bullet points or numbered lists
    const hasBullets = /[•\-*]\s*[A-Z]/.test(text)
    const hasNumbers = /\d+\.\s*[A-Z]/.test(text)

    if (hasBullets) {
      // Split by bullet points and preserve them
      const parts = text.split(/[•\-*]\s*/).filter(part => part.trim().length > 0)
      if (parts.length > 1) {
        return parts.map(part => ({
          type: 'bullet',
          content: part.trim()
        }))
      }
    }

    if (hasNumbers) {
      // Split by numbered points
      const parts = text.split(/\d+\.\s*/).filter(part => part.trim().length > 0)
      if (parts.length > 1) {
        return parts.map((part, index) => ({
          type: 'bullet',
          content: `${index + 1}. ${part.trim()}`
        }))
      }
    }

    // For regular paragraphs, only split if they're very long (more than 150 chars)
    // and contain clear sentence breaks, but preserve newlines
    if (text.length > 150) {
      // First, split by newlines to preserve paragraph structure
      const lines = text.split(/\n/).filter(line => line.trim().length > 0)

      // If there are multiple lines, treat each as a separate item
      if (lines.length > 1) {
        return lines.map(line => ({
          type: 'bullet',
          content: line.trim()
        }))
      }

      // Otherwise, try sentence splitting
      const sentences = text.split(/[.!?]+\s+/).filter(sentence => sentence.trim().length > 0)

      // Only split if we have 2-4 sentences and they're reasonably long
      if (sentences.length >= 2 && sentences.length <= 4 &&
          sentences.every(s => s.trim().length > 20)) {
        return sentences.map(sentence => ({
          type: 'bullet',
          content: sentence.trim().replace(/^[.!?]*\s*/, '') + '.'
        }))
      }
    }

    // For shorter text or when we don't want to split, return as paragraph
    return [{ type: 'paragraph', content: text }]
  }

  if (!interview) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6">
        <SheetHeader className="border-b pb-4 mb-6 px-0">
          <SheetTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Interview Details
          </SheetTitle>
          <SheetDescription>
            <span className="font-medium">
              {interview.position || "Position not specified"}
            </span>
            {" at "}
            <span className="font-medium">
              {interview.companyName || "Company not specified"}
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-0">
          {/* Interview Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Interview Type</label>
                <div className="mt-1">
                  <Badge variant="outline">
                    {interview.interviewType || "General"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Difficulty</label>
                <div className="mt-1">
                  <Badge variant="outline">
                    {(interview.difficulty || "Medium").charAt(0).toUpperCase() + (interview.difficulty || "Medium").slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Experience Level</label>
                <div className="mt-1">
                  <Badge variant="outline">
                    {interview.experienceLevel === 'entry' ? 'Entry Level' :
                     interview.experienceLevel === 'mid' ? 'Mid Level' :
                     interview.experienceLevel === 'senior' ? 'Senior Level' :
                     interview.experienceLevel === 'lead' ? 'Lead/Principal' :
                     'Mid Level'}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Industry</label>
                <div className="mt-1">
                  <Badge variant="outline">
                    {interview.industry || "General"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Voice Interview</label>
              <div className="mt-1">
                <Badge variant="outline" className={interview.hasVoiceEnabled ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                  {interview.hasVoiceEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Company Description</label>
            <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary/20">
              <div className="space-y-3">
                {formatDescription(interview.companyDescription || "No company description provided.").map((item, index) => (
                  <div key={index}>
                    {item.type === 'bullet' ? (
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                          {item.content}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">Job Description</label>
            <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary/20">
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {cleanMarkdown(interview.jobDescription || "No job description provided.")}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t">
            <Button
              onClick={handleStartInterview}
              className="w-full cursor-pointer"
              size="lg"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Interview
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full cursor-pointer"
              size="lg"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Start Interview Confirmation Dialog */}
        {showStartDialog && interview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary/10 rounded-full mr-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Start Interview</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Are you ready to start the interview for{" "}
                <span className="font-medium text-foreground">
                  {interview.position || "this position"}
                </span>
                {" "}at{" "}
                <span className="font-medium text-foreground">
                  {interview.companyName || "this company"}
                </span>
                ?
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={cancelStartInterview}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmStartInterview}
                  className="cursor-pointer bg-primary hover:bg-primary/90"
                >
                  Start Interview
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

// Compound component structure
const InterviewDetailsSidebarCompound: InterviewDetailsSidebarCompound = {
  Sidebar: InterviewDetailsSidebar,
}

export default InterviewDetailsSidebarCompound
export { InterviewDetailsSidebar }
export type { InterviewDetailsSidebarProps }
