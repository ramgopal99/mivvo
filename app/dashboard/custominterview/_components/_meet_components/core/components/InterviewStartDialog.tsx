import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface InterviewStartDialogProps {
  open: boolean
  onStart: () => void
}

export function InterviewStartDialog({ open, onStart }: InterviewStartDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Start Your Interview
          </DialogTitle>
          <DialogDescription>
            Welcome to your AI-powered interview! Click the button below to begin your conversation with the interviewer.
            The AI will ask you relevant questions based on your experience and the job requirements.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onStart}
            className="bg-green-600 hover:bg-green-700"
          >
            Start Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
