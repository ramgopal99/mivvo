import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ScreenShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
}

export function ScreenShareDialog({ open, onOpenChange, title, description }: ScreenShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
