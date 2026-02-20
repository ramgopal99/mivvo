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
  isCodingMode?: boolean
}

export function InterviewStartDialog({ open, onStart, isCodingMode = false }: InterviewStartDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            {isCodingMode ? 'Start Coding Interview' : 'Start Your Interview'}
          </DialogTitle>
          <DialogDescription>
            {isCodingMode
              ? "Write your solution in the code editor. When you're done, click below to start. The AI will view your code and ask follow-up questions about your approach, time complexity, and more. It will only give hints—never direct answers."
              : "Welcome to your AI-powered interview! Click the button below to begin your conversation with the interviewer. The AI will ask you relevant questions based on your experience and the job requirements."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onStart}
            className={
              isCodingMode
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {isCodingMode ? 'Start Coding Interview' : 'Start Interview'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
