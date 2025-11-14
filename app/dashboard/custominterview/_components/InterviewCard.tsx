import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Info, Calendar, Building, Trash2 } from "lucide-react"
import { useState } from "react"

type InterviewStatus = "completed" | "in_progress"

export interface InterviewAttempt {
  id: string
  completedAt: string
  score: number
  duration: number // in minutes
  feedback: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

export interface InterviewData {
  id: string
  title: string
  company: string
  jd: string
  createdAt: string
  status: InterviewStatus
  screenShareEnabled: boolean
  prompts: Array<{
    id: string
    promptText: string
    isActive: boolean
  }>
  attempts?: InterviewAttempt[]
}

interface InterviewCardProps {
  interview: InterviewData
  onViewDetails?: (interview: InterviewData) => void
  onStartInterview?: (interview: InterviewData) => void
  onDeleteInterview?: (interview: InterviewData) => void
  isDeleting?: boolean
}

export function InterviewCard({ interview, onStartInterview, onDeleteInterview, isDeleting = false }: InterviewCardProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleViewResults = () => {
    router.push(`/dashboard/custominterview/${interview.id}`)
  }

  const handleDelete = () => {
    onDeleteInterview?.(interview)
    // Dialog will be closed by the parent after successful deletion
  }

  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{interview.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {interview.company}
            </CardDescription>
          </div>

          <div className="flex items-center gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer">
                  <Info className="h-4 w-4 text-gray-500" />
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                  <DialogTitle className="flex items-center gap-2">
                    <span>{interview.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {interview.status === "in_progress" ? "IN PROGRESS" : "COMPLETED"}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Interview details and information
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 overflow-y-auto flex-1 pr-2">
                  {/* Company & Date Info */}
                  <div className={`grid gap-4 ${interview.company ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {interview.company && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Company</p>
                          <p className="text-sm text-gray-600">{interview.company}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Created</p>
                        <p className="text-sm text-gray-600">
                          {new Date(interview.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Job Description</h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {interview.jd}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Status</h4>
                    <Badge
                      variant={interview.status === "completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {interview.status === "in_progress" ? "IN PROGRESS" : "COMPLETED"}
                    </Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showDeleteDialog} onOpenChange={(open) => !isDeleting && setShowDeleteDialog(open)}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 cursor-pointer">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-red-600">Delete Interview</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this interview? This action cannot be undone.
                    All associated data including attempts and results will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Interview'
                  )}
                </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">

        {/* JD Preview */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700 line-clamp-2">
            {interview.jd}
          </p>
        </div>

        {/* Meta Info */}
        <div className="text-xs text-gray-500">
          Created: {new Date(interview.createdAt).toLocaleDateString()}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {interview.attempts && interview.attempts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewResults}
              className="cursor-pointer"
            >
              Analysis
            </Button>
          )}
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => onStartInterview?.(interview)}
          >
            Start Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
