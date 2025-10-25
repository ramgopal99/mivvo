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
  getAvailableInterviewTypes,
  getGeneralInterviewSubTypes
} from "./interview-utils"



interface CreateInterviewDialogProps {
  onInterviewCreated?: (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string }) => void
}

export function CreateInterviewDialog({ onInterviewCreated }: CreateInterviewDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Predefined Role state with autocomplete
  const [roleInput, setRoleInput] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [generalSubType, setGeneralSubType] = useState("")


  const handleSubmit = async () => {
    // Validation based on interview type
    if (!interviewType) {
      import('sonner').then(({ toast }) => {
        toast.error('Please select an interview type')
      })
      return
    }

    if (interviewType === 'General') {
      // For General interviews, only need sub-type
      if (!generalSubType) {
        import('sonner').then(({ toast }) => {
          toast.error('Please select a General interview sub-type')
        })
        return
      }
    } else {
      // For other interview types, need role and level
      if (!selectedRole || !selectedLevel) {
        import('sonner').then(({ toast }) => {
          toast.error('Please select role and experience level')
        })
        return
      }
    }

    // Generate JD details based on interview type
    let finalJdDetails = ""
    if (interviewType === 'General') {
      // For General interviews, use the updated JD generation with interview type and sub-type
      finalJdDetails = generateJDFromPredefined("", "", interviewType, generalSubType)
    } else {
      // For other interview types, use the existing JD generation
      finalJdDetails = generateJDFromPredefined(selectedRole, selectedLevel, interviewType)
    }


    // Prepare interview data
    const interviewData = {
      jdDetails: finalJdDetails,
      interviewType: interviewType, // Pass the original interview type
      screenShare: false, // Screen sharing disabled for now since Coding and UI/UX are coming soon
      generalSubType: interviewType === 'General' ? generalSubType : undefined
    }

    // Show success message
    import('sonner').then(({ toast }) => {
      toast.success('Interview created successfully!')
    })

    onInterviewCreated?.(interviewData)

    // Reset form
    setIsDialogOpen(false)
    setRoleInput("")
    setSelectedRole("")
    setShowSuggestions(false)
    setSelectedLevel("")
    setInterviewType("")
    setGeneralSubType("")
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
            Select an interview type to create a tailored interview. For Technical and HR interviews, you&apos;ll also need to select a role and experience level.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Interview Type Selection - First Field */}
          <div className="space-y-2">
            <Label htmlFor="interview-type" className="text-sm font-medium">
              Interview Type *
            </Label>
            <Select value={interviewType} onValueChange={(value) => {
              setInterviewType(value)
              if (value !== 'General') {
                setGeneralSubType("")
              }
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableInterviewTypes().map(type => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* General Interview Sub-Type Selection */}
          {interviewType === 'General' && (
            <div className="space-y-2">
              <Label htmlFor="general-subtype" className="text-sm font-medium">
                General Interview Type *
              </Label>
              <Select value={generalSubType} onValueChange={setGeneralSubType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select General interview type" />
                </SelectTrigger>
                <SelectContent>
                  {getGeneralInterviewSubTypes().map(type => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Role Selection with Autocomplete - Only show for non-General types */}
          {interviewType !== 'General' && (
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role *
            </Label>
            <div className="relative">
              <Input
                id="role"
                type="text"
                placeholder="Type to search roles..."
                value={roleInput}
                onChange={(e) => {
                  setRoleInput(e.target.value)
                  setShowSuggestions(true)
                  // If user types exactly a role name, select it
                  const exactMatch = getAvailableRoles().find(role =>
                    role.label.toLowerCase() === e.target.value.toLowerCase()
                  )
                  if (exactMatch) {
                    setSelectedRole(exactMatch.value)
                  } else {
                    setSelectedRole("")
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding suggestions to allow click
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
                className="w-full"
              />

              {/* Autocomplete Suggestions */}
              {showSuggestions && roleInput && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {getAvailableRoles()
                    .filter(role =>
                      role.label.toLowerCase().includes(roleInput.toLowerCase())
                    )
                    .map(role => (
                      <div
                        key={role.value}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {
                          setRoleInput(role.label)
                          setSelectedRole(role.value)
                          setShowSuggestions(false)
                        }}
                      >
                        {role.label}
                      </div>
                    ))}
                  {getAvailableRoles().filter(role =>
                    role.label.toLowerCase().includes(roleInput.toLowerCase())
                  ).length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No roles found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          )}

          {/* Level Selection - Only show for non-General types */}
          {interviewType !== 'General' && (
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
          )}

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
            disabled={
              !interviewType || 
              (interviewType === 'General' ? !generalSubType : (!selectedRole || !selectedLevel))
            }
            className="bg-primary hover:bg-primary/90"
          >
            Create Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
