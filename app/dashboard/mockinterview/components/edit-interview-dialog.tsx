"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Edit, Building } from "lucide-react"
import { updateMockInterview, generateCompanyDescription } from "../actions"
import { MockInterview } from "../types"
import { toast } from "sonner"

interface EditInterviewDialogProps {
  interview: MockInterview | null
  isOpen: boolean
  onClose: () => void
  onInterviewUpdated: () => void
}

export function EditInterviewDialog({
  interview,
  isOpen,
  onClose,
  onInterviewUpdated,
}: EditInterviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingCompany, setIsGeneratingCompany] = useState(false)

  // Form state
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [interviewType, setInterviewType] = useState<string>("technical")
  const [experienceLevel, setExperienceLevel] = useState<string>("mid")
  const [industry, setIndustry] = useState<string>("technology")
  const [difficulty, setDifficulty] = useState<string>("medium")

  // Populate form when interview changes
  useEffect(() => {
    if (interview) {
      setCompanyName(interview.companyName || "")
      setPosition(interview.position || "")
      setCompanyDescription(interview.companyDescription)
      setJobDescription(interview.jobDescription)
      setInterviewType(interview.interviewType)
      setExperienceLevel(interview.experienceLevel)
      setIndustry(interview.industry)
      setDifficulty(interview.difficulty)
    }
  }, [interview])

  const handleGenerateCompanyDescription = async () => {
    if (isGeneratingCompany || !companyName.trim() || !industry) return

    try {
      setIsGeneratingCompany(true)

      const result = await generateCompanyDescription(companyName, industry)

      if (result.success && result.description) {
        setCompanyDescription(result.description)
        toast.success("Company description generated successfully!")
      } else {
        toast.error(result.error || "Failed to generate company description")
      }

    } catch (error) {
      console.error("Error generating company description:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsGeneratingCompany(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!interview) return

    setIsLoading(true)

    try {
      const result = await updateMockInterview(interview.id, {
        companyName,
        position,
        companyDescription,
        jobDescription,
        interviewType,
        experienceLevel,
        industry,
        difficulty
      })

      if (result.success) {
        toast.success("Mock interview updated successfully!")
        onInterviewUpdated()
        onClose()
      } else {
        toast.error(result.error || "Failed to update mock interview")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Error updating mock interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const canGenerateCompany = companyName.trim() && industry

  if (!interview) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] [&>button]:cursor-pointer">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="h-5 w-5" />
              <span>Edit Mock Interview</span>
            </DialogTitle>
            <DialogDescription>
              Update the details for your mock interview at {interview.companyName || "Company not specified"}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Company and Position */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Interview Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Interview Type</Label>
                <Select value={interviewType} onValueChange={setInterviewType} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="system design">System Design</SelectItem>
                    <SelectItem value="case study">Case Study</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                    <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Industry and Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Company Description */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="companyDescription">Company Description</Label>
                {canGenerateCompany && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateCompanyDescription}
                    disabled={isGeneratingCompany || isLoading}
                    className="h-8 px-2 cursor-pointer"
                  >
                    {isGeneratingCompany ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Building className="h-3 w-3" />
                    )}
                    <span className="ml-1 text-xs">Generate</span>
                  </Button>
                )}
              </div>
              <Textarea
                id="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className="h-20"
                disabled={isLoading}
              />
            </div>

            {/* Job Description */}
            <div className="grid gap-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="h-20"
                disabled={isLoading}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Edit className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Updating..." : "Update Interview"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
