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
  DialogTrigger,
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
import { Brain, Plus, Loader2, Sparkles, Wand2, Building, Briefcase } from "lucide-react"
import {
  createMockInterview,
  generateInterviewContent,
  generateCompanyDescription,
  optimizeDescription,
  optimizeSpecialties,
  generateName
} from "../actions"
import {
  CreateMockInterviewData,
  GenerateInterviewContentResponse,
  OptimizeDescriptionData,
  OptimizeSpecialtiesData,
  GenerateNameData,
  OptimizeDescriptionResponse,
  OptimizeSpecialtiesResponse,
  GenerateNameResponse
} from "../types"
import { toast } from "sonner"

interface CreateMockInterviewDialogProps {
  onInterviewCreated?: () => void
}

export function CreateMockInterviewDialog({ onInterviewCreated }: CreateMockInterviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)
  const [isGeneratingCompany, setIsGeneratingCompany] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isOptimizingSpecialties, setIsOptimizingSpecialties] = useState(false)
  const [isGeneratingName, setIsGeneratingName] = useState(false)

  // Form state
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [companyDescription, setCompanyDescription] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [interviewType, setInterviewType] = useState<string>("technical")
  const [experienceLevel, setExperienceLevel] = useState<string>("mid")
  const [industry, setIndustry] = useState<string>("technology")
  const [difficulty, setDifficulty] = useState<string>("medium")

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

  const handleGenerateInterviewContent = async () => {
    if (isGeneratingContent || !companyName.trim() || !position.trim()) return

    try {
      setIsGeneratingContent(true)

      const result = await generateInterviewContent({
        companyName,
        position,
        companyDescription: companyDescription || undefined,
        jobDescription: jobDescription || undefined,
        interviewType,
        experienceLevel,
        industry,
        difficulty
      })

      if (result.success) {
        if (result.companyDescription && !companyDescription) {
          setCompanyDescription(result.companyDescription)
        }
        if (result.jobDescription && !jobDescription) {
          setJobDescription(result.jobDescription)
        }
        toast.success("Interview content generated successfully!")
      } else {
        if (result.error?.includes('OpenAI API')) {
          toast.error("OpenAI service unavailable. Please check your API key or try again later.")
        } else {
          toast.error(result.error || "Failed to generate interview content")
        }
      }

    } catch (error) {
      console.error("Error generating interview content:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const handleOptimizeDescription = async () => {
    if (isOptimizing || !companyDescription.trim()) return

    try {
      setIsOptimizing(true)

      const result = await optimizeDescription({
        existingText: companyDescription,
        category: interviewType,
        name: position || "Interview",
        specialties: `${interviewType} ${experienceLevel} ${difficulty}`,
        personality: "Professional"
      })

      if (result.success && result.optimizedText) {
        setCompanyDescription(result.optimizedText)
        toast.success("Company description optimized successfully!")
      } else {
        toast.error(result.error || "Failed to optimize description")
      }

    } catch (error) {
      console.error("Error optimizing description:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleOptimizeJobDescription = async () => {
    if (isOptimizingSpecialties || !jobDescription.trim()) return

    try {
      setIsOptimizingSpecialties(true)

      const result = await optimizeSpecialties({
        category: interviewType,
        existingText: jobDescription
      })

      if (result.success && result.specialties) {
        setJobDescription(result.specialties)
        toast.success("Job description optimized successfully!")
      } else {
        toast.error(result.error || "Failed to optimize job description")
      }

    } catch (error) {
      console.error("Error optimizing job description:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsOptimizingSpecialties(false)
    }
  }

  const handleGenerateInterviewName = async () => {
    if (isGeneratingName || !companyName.trim() || !position.trim()) return

    try {
      setIsGeneratingName(true)

      const result = await generateName({
        companyName,
        position,
        interviewType,
        industry
      })

      if (result.success && result.name) {
        // For now, we'll just show it in a toast since we don't have a name field
        toast.success(`Suggested name: "${result.name}"`)
      } else {
        toast.error(result.error || "Failed to generate name")
      }

    } catch (error) {
      console.error("Error generating name:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsGeneratingName(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation: Check all required fields
    const errors: string[] = []

    if (!companyName.trim()) {
      errors.push("Company name is required")
    }

    if (!position.trim()) {
      errors.push("Position is required")
    }

    if (!companyDescription.trim()) {
      errors.push("Company description is required")
    }

    if (!jobDescription.trim()) {
      errors.push("Job description is required")
    }

    if (!interviewType) {
      errors.push("Interview type is required")
    }

    if (!experienceLevel) {
      errors.push("Experience level is required")
    }

    if (!industry) {
      errors.push("Industry is required")
    }

    if (!difficulty) {
      errors.push("Difficulty level is required")
    }

    // If there are validation errors, show them and stop
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(error, {
          description: "Please fill in all required fields before submitting."
        })
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await createMockInterview({
        companyName: companyName.trim(),
        position: position.trim(),
        companyDescription: companyDescription.trim(),
        jobDescription: jobDescription.trim(),
        interviewType,
        experienceLevel,
        industry,
        difficulty
      })

      if (result.success) {
        toast.success("Mock interview created successfully!")
        setIsOpen(false)
        resetForm()
        onInterviewCreated?.()
      } else {
        toast.error(result.error || "Failed to create mock interview")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Error creating mock interview:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setCompanyName("")
    setPosition("")
    setCompanyDescription("")
    setJobDescription("")
    setInterviewType("technical")
    setExperienceLevel("mid")
    setIndustry("technology")
    setDifficulty("medium")
  }

  const handleClose = () => {
    setIsOpen(false)
    resetForm()
  }

  const canGenerateContent = companyName.trim() && position.trim()
  const canGenerateCompany = companyName.trim() && industry

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) handleClose()
    }}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Create Mock Interview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] [&>button]:cursor-pointer">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Mock Interview</DialogTitle>
            <DialogDescription>
              Set up a mock interview for any position at any company. AI will help generate company and job descriptions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Company and Position */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                <Input
                  id="companyName"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={isLoading}
                  className={!companyName.trim() ? "border-red-300 focus:border-red-500" : ""}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                  {companyName.trim() && position.trim() && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateInterviewName}
                      disabled={isGeneratingName || isLoading}
                      className="h-6 px-2 cursor-pointer"
                    >
                      {isGeneratingName ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">Name</span>
                    </Button>
                  )}
                </div>
                <Input
                  id="position"
                  placeholder="e.g., Software Engineer, Product Manager"
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
                <Label>Interview Type <span className="text-red-500">*</span></Label>
                <Select value={interviewType} onValueChange={setInterviewType} disabled={isLoading}>
                  <SelectTrigger className={!interviewType ? "border-red-300 focus:border-red-500" : ""}>
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
                <Label>Experience Level <span className="text-red-500">*</span></Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel} disabled={isLoading}>
                  <SelectTrigger className={!experienceLevel ? "border-red-300 focus:border-red-500" : ""}>
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
                <Label>Industry <span className="text-red-500">*</span></Label>
                <Select value={industry} onValueChange={setIndustry} disabled={isLoading}>
                  <SelectTrigger className={!industry ? "border-red-300 focus:border-red-500" : ""}>
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
                <Label>Difficulty <span className="text-red-500">*</span></Label>
                <Select value={difficulty} onValueChange={setDifficulty} disabled={isLoading}>
                  <SelectTrigger className={!difficulty ? "border-red-300 focus:border-red-500" : ""}>
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
                <Label htmlFor="companyDescription">Company Description <span className="text-red-500">*</span></Label>
                <div className="flex items-center space-x-1">
                  {companyDescription.trim() && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleOptimizeDescription}
                      disabled={isOptimizing || isLoading}
                      className="h-8 px-2 cursor-pointer"
                    >
                      {isOptimizing ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Wand2 className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">Optimize</span>
                    </Button>
                  )}
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
              </div>
              <Textarea
                id="companyDescription"
                placeholder="Describe the company, its culture, values, and what makes it unique..."
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className={`h-20 ${!companyDescription.trim() ? "border-red-300 focus:border-red-500" : ""}`}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                {!canGenerateCompany
                  ? "Enter company name and select industry to enable AI generation"
                  : "AI can generate a detailed company description based on the company name and industry"
                }
              </p>
            </div>

            {/* Job Description */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="jobDescription">Job Description <span className="text-red-500">*</span></Label>
                <div className="flex items-center space-x-1">
                  {jobDescription.trim() && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleOptimizeJobDescription}
                      disabled={isOptimizingSpecialties || isLoading}
                      className="h-8 px-2 cursor-pointer"
                    >
                      {isOptimizingSpecialties ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Wand2 className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">Optimize</span>
                    </Button>
                  )}
                  {canGenerateContent && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateInterviewContent}
                      disabled={isGeneratingContent || isLoading}
                      className="h-8 px-2 cursor-pointer"
                    >
                      {isGeneratingContent ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      <span className="ml-1 text-xs">AI Generate</span>
                    </Button>
                  )}
                </div>
              </div>
              <Textarea
                id="jobDescription"
                placeholder="Describe the role, responsibilities, requirements, and what success looks like..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className={`h-20 ${!jobDescription.trim() ? "border-red-300 focus:border-red-500" : ""}`}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                {!canGenerateContent
                  ? "Fill in company name, position, and interview details above to enable AI generation"
                  : "AI will generate a comprehensive job description and can also enhance the company description"
                }
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Brain className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Creating..." : "Create Mock Interview"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
