import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check, Eye } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  status: string
  avatar: string | null
  firstName?: string
  lastName?: string
  phone?: string
  careerGoals?: string
  linkedIn?: string
  github?: string
  totalTimeAllowance?: number
  usedTimeMinutes?: number
  createdAt?: string
  updatedAt?: string
}

interface StudentDetailsDialogProps {
  student: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface DialogHeaderProps {
  student: Student
}

interface DialogContentProps {
  student: Student
}

function DialogHeaderComponent({ student }: DialogHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle>Student Details</DialogTitle>
      <DialogDescription>
        Complete information for {student.name}
      </DialogDescription>
    </DialogHeader>
  )
}

function DialogContentComponent({ student }: DialogContentProps) {
  const [copiedLinks, setCopiedLinks] = useState<{[key: string]: boolean}>({})
  const [showLinks, setShowLinks] = useState<{[key: string]: boolean}>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLinks(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const toggleShowLink = (key: string) => {
    setShowLinks(prev => ({ ...prev, [key]: !prev[key] }))
  }
  return (
    <div className="grid gap-4 py-4">
      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
          <p className="text-sm font-medium">{student.name}</p>
        </div>
            <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="text-sm">{student.email}</p>
              </div>
            </div>

      {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">First Name</label>
          <p className="text-sm">{student.firstName || 'N/A'}</p>
                  </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Last Name</label>
          <p className="text-sm">{student.lastName || 'N/A'}</p>
                  </div>
                </div>

      {/* Academic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
          <p className="text-sm">{student.rollNumber || 'N/A'}</p>
                  </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">College</label>
          <p className="text-sm">{student.collegeName || 'N/A'}</p>
                  </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone</label>
          <p className="text-sm">{student.phone || 'N/A'}</p>
                </div>
              </div>

      {/* Status */}
                  <div>
        <label className="text-sm font-medium text-muted-foreground">Status</label>
        <div className="mt-1">
          <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${
            student.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {student.status}
          </span>
        </div>
                    </div>

      {/* Career Information */}
      <div>
        <label className="text-sm font-medium text-muted-foreground">Career Goals</label>
        <p className="text-sm">{student.careerGoals || 'N/A'}</p>
                  </div>

      {/* Social Links */}
      <div className="grid grid-cols-1 gap-4">
                    <div>
          <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
          <div className="mt-2 space-y-2">
            {student.linkedIn ? (
              <>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleShowLink('linkedin')}
                    className="h-8 px-3"
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    {showLinks['linkedin'] ? 'Hide Link' : 'Show Link'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(student.linkedIn!, 'linkedin')}
                    className="h-8 px-3"
                  >
                    {copiedLinks['linkedin'] ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span className="ml-2">Copy</span>
                  </Button>
                      </div>
                {showLinks['linkedin'] && (
                  <div className="p-2 bg-muted rounded text-sm break-all">
                    {student.linkedIn}
                    </div>
                )}
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Not provided</span>
            )}
                      </div>
                    </div>
                    <div>
          <label className="text-sm font-medium text-muted-foreground">GitHub</label>
          <div className="mt-2 space-y-2">
            {student.github ? (
              <>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleShowLink('github')}
                    className="h-8 px-3"
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    {showLinks['github'] ? 'Hide Link' : 'Show Link'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(student.github!, 'github')}
                    className="h-8 px-3"
                  >
                    {copiedLinks['github'] ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span className="ml-2">Copy</span>
                  </Button>
                </div>
                {showLinks['github'] && (
                  <div className="p-2 bg-muted rounded text-sm break-all">
                    {student.github}
                      </div>
                )}
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Not provided</span>
            )}
                    </div>
                  </div>
                </div>

      {/* Time Information */}
                  <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Total Time Allowance</label>
          <p className="text-sm">{student.totalTimeAllowance || 0} minutes</p>
                    </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Used Time</label>
          <p className="text-sm">{student.usedTimeMinutes || 0} minutes</p>
                    </div>
                  </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Created At</label>
          <p className="text-sm">
            {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
          </p>
                    </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Updated At</label>
          <p className="text-sm">
            {student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : 'N/A'}
          </p>
                  </div>
                </div>
              </div>
  )
}

function StudentDetailsDialog({ student, open, onOpenChange }: StudentDetailsDialogProps) {
  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <StudentDetailsDialog.Header student={student} />
        <StudentDetailsDialog.Content student={student} />
      </DialogContent>
    </Dialog>
  )
}

StudentDetailsDialog.Header = DialogHeaderComponent
StudentDetailsDialog.Content = DialogContentComponent

export { StudentDetailsDialog }
