"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import {
  generateJDFromPredefined,
  getAvailableRoles,
  getAvailableLevels,
  getAvailableInterviewTypes
} from "./interview-utils"



interface CreateInterviewDialogProps {
  onInterviewCreated?: (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string }) => void
}

export function CreateInterviewDialog({ onInterviewCreated }: CreateInterviewDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Predefined Role state
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [company, setCompany] = useState("")


  const handleSubmit = async () => {
    // Validation
    if (!selectedRole || !selectedLevel || !interviewType) {
      import('sonner').then(({ toast }) => {
        toast.error('Please select role, experience level, and interview type')
      })
      return
    }

    const finalJdDetails = generateJDFromPredefined(selectedRole, selectedLevel)
    const finalInterviewType = interviewType

    // Prepare interview data
    const interviewData = {
      jdDetails: finalJdDetails,
      interviewType: finalInterviewType,
      screenShare: false, // Screen sharing disabled for now since Coding and UI/UX are coming soon
      company: company || undefined
    }

    // Show success message
    import('sonner').then(({ toast }) => {
      toast.success('Interview created successfully!')
    })

    onInterviewCreated?.(interviewData)

    // Reset form
    setIsDialogOpen(false)
    setSelectedRole("")
    setSelectedLevel("")
    setInterviewType("")
    setCompany("")
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Interview</DialogTitle>
          <DialogDescription>
            Select a role and experience level to create a tailored interview. CV upload is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role *
            </Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableRoles().map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Selection */}
          <div className="space-y-2">
            <Label htmlFor="level" className="text-sm font-medium">
              Years of Experience *
            </Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableLevels().map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Interview Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="interview-type" className="text-sm font-medium">
              Interview Type *
            </Label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableInterviewTypes().map(type => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    disabled={type.disabled}
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company Name (Optional)
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Leave blank if you don&apos;t want to specify a company
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedRole || !selectedLevel || !interviewType}
            className="bg-primary hover:bg-primary/90"
          >
            Create Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
