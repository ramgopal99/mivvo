"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, AlertTriangle } from "lucide-react"
import { MockInterview } from "../types"

interface DeleteInterviewDialogProps {
  interview: MockInterview | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (interview: MockInterview) => void
}

export function DeleteInterviewDialog({
  interview,
  isOpen,
  onClose,
  onConfirm,
}: DeleteInterviewDialogProps) {
  if (!interview) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="[&>button]:cursor-pointer">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>Delete Mock Interview</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the mock interview for{" "}
            <span className="font-medium">
              {interview.position} at {interview.companyName || "Company not specified"}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="space-y-2 text-sm">
                             <div>
                 <span className="font-medium">Position:</span> {interview.position || "Position not specified"}
               </div>
              <div>
                <span className="font-medium">Company:</span> {interview.companyName || "Company not specified"}
              </div>
              <div>
                <span className="font-medium">Type:</span> {interview.interviewType}
              </div>
              <div>
                <span className="font-medium">Conversations:</span> {interview.conversations}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(interview)}
            className="cursor-pointer"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Delete Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
