import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Target, Award, FileText } from "lucide-react"
import { useState } from "react"

interface InterviewAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  interview: {
    id: string
    title: string | null
    companyName: string | null
    position: string | null
    jobDescription: string | null
    interviewType: string | null
    createdAt: Date
  }
  results: Array<{
    overallScore: number | null
  }>
  conversations: Array<{
    messages: string
  }>
}

interface OverviewSectionProps {
  attempt: InterviewAttempt
  totalMessages: number
  totalSessions: number
  overallScore: number
}

export function OverviewSection({ attempt, totalMessages, totalSessions, overallScore }: OverviewSectionProps) {
  const [showJDDialog, setShowJDDialog] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Interview Details */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Interview Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Interview Type</label>
            <p className="text-sm font-medium">{attempt.interview.interviewType || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Job Description</label>
            <p className="text-sm text-gray-700 mt-1 line-clamp-3 leading-relaxed">
              {attempt.interview.jobDescription || 'No description available'}
            </p>
            {attempt.interview.jobDescription && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowJDDialog(true)}
                className="mt-2 h-7 text-xs"
              >
                <FileText className="w-3 h-3 mr-1" />
                View Full JD
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-600" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-4xl font-bold text-blue-600 mb-1">{overallScore}</div>
            <div className="text-sm font-medium text-gray-600">Overall Score</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(overallScore, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{totalMessages}</div>
              <div className="text-xs text-gray-600 font-medium">Messages</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">{totalSessions}</div>
              <div className="text-xs text-gray-600 font-medium">Sessions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* JD Dialog */}
      <Dialog open={showJDDialog} onOpenChange={setShowJDDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Job Description
            </DialogTitle>
            <DialogDescription>
              Complete job description for this interview
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {attempt.interview.jobDescription}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
