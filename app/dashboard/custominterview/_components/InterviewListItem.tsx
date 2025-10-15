
import { Button } from "@/components/ui/button"
import { Calendar, Building, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { InterviewData } from "./InterviewCard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"

interface InterviewListItemProps {
  interview: InterviewData
  onViewDetails?: (interview: InterviewData) => void
  onStartInterview?: (interview: InterviewData) => void
  onDeleteInterview?: (interview: InterviewData) => void
}

export function InterviewListItem({ interview, onStartInterview, onDeleteInterview }: InterviewListItemProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleViewResults = () => {
    router.push(`/dashboard/custominterview/${interview.id}`)
  }

  const handleDelete = () => {
    onDeleteInterview?.(interview)
    setShowDeleteDialog(false)
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      {/* Interview Info */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{interview.title}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {interview.company}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(interview.createdAt).toLocaleDateString()}
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2 line-clamp-1">{interview.jd}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 ml-4">
        {interview.status === "completed" && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewResults}
            className="cursor-pointer"
          >
            Result
          </Button>
        )}
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={() => onStartInterview?.(interview)}
        >
          Start
        </Button>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
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
              <Button variant="destructive" onClick={handleDelete}>
                Delete Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
