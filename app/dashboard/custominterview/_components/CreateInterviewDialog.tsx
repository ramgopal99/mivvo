"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Plus, FileText, X } from "lucide-react"
import {
  generateJDFromPredefined,
  getAvailableRoles,
  getAvailableLevels,
  getAvailableInterviewTypes,
  getGeneralInterviewSubTypes,
  getHRInterviewSubTypes
} from "./interview-utils"



interface CreateInterviewDialogProps {
  onInterviewCreated?: (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string; customPrompt?: string; generalSubType?: string; hrSubType?: string; cvText?: string }) => void
  userTimeData?: { totalTimeAllowance: number; usedTimeMinutes: number } | null
  userCvData?: string | null
}

export function CreateInterviewDialog({ onInterviewCreated, userTimeData, userCvData }: CreateInterviewDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Predefined Role state with autocomplete
  const [roleInput, setRoleInput] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [generalSubType, setGeneralSubType] = useState("")
  const [hrSubType, setHrSubType] = useState("")

  // Custom JD state
  const [customJD, setCustomJD] = useState("")
  const [activeTab, setActiveTab] = useState("predefined")
  const [isAnalyzingJD, setIsAnalyzingJD] = useState(false)
  
  // CV upload state
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState("")
  const [isExtractingCV, setIsExtractingCV] = useState(false)
  const cvInputRef = useRef<HTMLInputElement>(null)

  // Check if user has time allowance remaining
  const checkTimeLimit = () => {
    if (!userTimeData) return true // Allow if no data (will be checked on API)
    return userTimeData.usedTimeMinutes < userTimeData.totalTimeAllowance
  }

  // Handle button click with time limit check
  const handleCreateClick = () => {
    if (!checkTimeLimit()) {
      import('sonner').then(({ toast }) => {
        toast.error(`You have used all ${userTimeData?.totalTimeAllowance} minutes of your free interview time. Please upgrade to continue practicing.`)
      })
      return
    }
    setIsDialogOpen(true)
  }

  // Handle CV file selection
  const handleCvFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      import('sonner').then(({ toast }) => {
        toast.error('Please select a PDF or DOCX file only.')
      })
      return
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      import('sonner').then(({ toast }) => {
        toast.error('File size must be less than 10MB.')
      })
      return
    }

    setCvFile(selectedFile)
    setIsExtractingCV(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setCvText(result.data.extractedText)
        import('sonner').then(({ toast }) => {
          toast.success('CV extracted successfully')
        })
      } else {
        throw new Error(result.message || 'Failed to extract text from CV')
      }
    } catch (error) {
      console.error('CV extraction error:', error)
      import('sonner').then(({ toast }) => {
        toast.error('Failed to extract text from CV. Please try again.')
      })
      setCvFile(null)
      setCvText("")
    } finally {
      setIsExtractingCV(false)
    }
  }

  // Clear CV file
  const clearCvFile = () => {
    setCvFile(null)
    setCvText("")
    if (cvInputRef.current) {
      cvInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleSubmit = async () => {
    // Handle custom JD tab
    if (activeTab === "custom") {
      if (!customJD.trim()) {
        import('sonner').then(({ toast }) => {
          toast.error('Please enter a job description')
        })
        return
      }

      setIsAnalyzingJD(true)

      try {
        // Analyze the custom JD using OpenAI
        const response = await fetch('/api/custom-interviews/analyze-jd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jdText: customJD,
            cvText: cvText || userCvData || undefined // Include CV if uploaded or from profile
          }),
        })

        const responseData = await response.json()

        // Check for validation errors (success: false with validationError)
        if (responseData.validationError) {
          import('sonner').then(({ toast }) => {
            toast.error(responseData.validationError)
          })
          return // Don't proceed with interview creation
        }

        if (!response.ok || responseData.error) {
          throw new Error(responseData.error || 'Failed to analyze job description')
        }

        const analysisResult = responseData

        // Prepare interview data with custom JD
        const interviewData = {
          jdDetails: customJD,
          interviewType: "Custom", // Custom interview type for API
          screenShare: false,
          customPrompt: analysisResult.prompt, // Include the generated prompt
          company: "Custom Company", // Default company name
          cvText: cvText || userCvData || undefined // Include CV text if available (uploaded or existing)
        }

        onInterviewCreated?.(interviewData)

        // Reset form
        setIsDialogOpen(false)
        setCustomJD("")
        setCvFile(null)
        setCvText("")
        setActiveTab("predefined")
        if (cvInputRef.current) {
          cvInputRef.current.value = ''
        }

      } catch (error) {
        console.error('Error analyzing JD:', error)
        import('sonner').then(({ toast }) => {
          toast.error('Failed to analyze job description. Please try again.')
        })
      } finally {
        setIsAnalyzingJD(false)
      }

      return
    }

    // Handle predefined tab
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
  } else if (interviewType === 'HR') {
    // For HR interviews, only need sub-type
    if (!hrSubType) {
      import('sonner').then(({ toast }) => {
        toast.error('Please select an HR interview sub-type')
      })
      return
    }
  } else if (interviewType === 'Technical') {
    // For Technical interviews, need role and level
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
  } else if (interviewType === 'HR') {
    // For HR interviews, use JD generation with interview type and HR sub-type
    finalJdDetails = generateJDFromPredefined("", "", interviewType, undefined, hrSubType)
    } else {
    // For Technical interviews, use the existing JD generation
      finalJdDetails = generateJDFromPredefined(selectedRole, selectedLevel, interviewType)
    }


    // Prepare interview data
    const interviewData = {
      jdDetails: finalJdDetails,
      interviewType: interviewType, // Pass the original interview type
      screenShare: false, // Screen sharing disabled for now since Coding and UI/UX are coming soon
      generalSubType: interviewType === 'General' ? generalSubType : (interviewType === 'Technical' ? selectedRole : undefined), // Pass role as generalSubType for technical interviews
      hrSubType: interviewType === 'HR' ? hrSubType : undefined, // Pass HR sub-type for HR interviews
      role: interviewType === 'Technical' ? selectedRole : undefined, // Keep role field for backward compatibility
      cvText: cvText || userCvData || undefined // Use uploaded CV, or existing CV if available
    }

    console.log('DEBUG Frontend sending:', { interviewType, generalSubType: interviewData.generalSubType, role: interviewData.role, selectedRole })

    onInterviewCreated?.(interviewData)

    // Reset form
    setIsDialogOpen(false)
    setRoleInput("")
    setSelectedRole("")
    setShowSuggestions(false)
    setSelectedLevel("")
    setInterviewType("")
    setGeneralSubType("")
    setHrSubType("")
  }

  return (
    <>
      <Button
        className="bg-primary hover:bg-primary/90"
        onClick={handleCreateClick}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Custom Interview
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Interview</DialogTitle>
          <DialogDescription>
            Choose how you want to create your interview: use predefined templates or paste your own job description.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Predefined Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Job Description</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-6 mt-6">
          {/* Interview Type Selection - First Field */}
          <div className="space-y-2">
            <Label htmlFor="interview-type" className="text-sm font-medium">
              Interview Type *
            </Label>
            <Select value={interviewType} onValueChange={(value) => {
              setInterviewType(value)
              // Clear selections when switching interview types
              if (value === 'General') {
                // Clear role-related fields when switching to General
                setSelectedRole("")
                setRoleInput("")
                setSelectedLevel("")
                setShowSuggestions(false)
                setHrSubType("")
              } else if (value === 'HR') {
                // Clear role-related fields when switching to HR
                setSelectedRole("")
                setRoleInput("")
                setSelectedLevel("")
                setShowSuggestions(false)
                setGeneralSubType("")
              } else {
                // Clear sub-types when switching to Technical
                setGeneralSubType("")
                setHrSubType("")
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

          {/* HR Interview Sub-Type Selection */}
          {interviewType === 'HR' && (
            <div className="space-y-2">
              <Label htmlFor="hr-subtype" className="text-sm font-medium">
                HR Interview Type *
              </Label>
              <Select value={hrSubType} onValueChange={setHrSubType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select HR interview type" />
                </SelectTrigger>
                <SelectContent>
                  {getHRInterviewSubTypes().map(type => (
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

          {/* Role Selection with Autocomplete - Only show for Technical types */}
          {interviewType === 'Technical' && (
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

          </TabsContent>

          <TabsContent value="custom" className="space-y-6 mt-6">
            {/* Custom JD Input */}
            <div className="space-y-2">
              <Label htmlFor="custom-jd" className="text-sm font-medium">
                Job Description *
              </Label>
              <Textarea
                id="custom-jd"
                placeholder="Paste your job description here. The system will analyze it and create a tailored interview prompt."
                value={customJD}
                onChange={(e) => setCustomJD(e.target.value)}
                className="h-[200px] overflow-y-auto resize-none"
                disabled={isAnalyzingJD}
              />
              <p className="text-xs text-gray-500">
                The AI will analyze your job description and generate a custom interview prompt optimized for assessing candidates for this role.
              </p>
            </div>

            {/* CV Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="cv-upload" className="text-sm font-medium">
                Upload CV/Resume (Optional)
              </Label>
              <div className="space-y-3">
                <Input
                  id="cv-upload"
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleCvFileSelect}
                  disabled={isAnalyzingJD || isExtractingCV}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500">
                  Upload your CV/resume (PDF or DOCX, max 10MB) to personalize the interview questions based on your background.
                </p>

                {/* CV Preview */}
                {cvFile && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm text-blue-900">{cvFile.name}</p>
                        <p className="text-xs text-blue-600">{formatFileSize(cvFile.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCvFile}
                      disabled={isAnalyzingJD || isExtractingCV}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Loading indicator for CV extraction */}
                {isExtractingCV && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Extracting text from CV...
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
              activeTab === 'predefined'
                ? (!interviewType ||
                   (interviewType === 'General' ? !generalSubType :
                    interviewType === 'HR' ? !hrSubType :
                    interviewType === 'Technical' ? (!selectedRole || !selectedLevel) : false))
                : (!customJD.trim() || isAnalyzingJD || isExtractingCV)
            }
            className="bg-primary hover:bg-primary/90"
          >
            {isAnalyzingJD ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : activeTab === 'custom' ? (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Create Custom Interview
              </>
            ) : (
              'Create Interview'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
