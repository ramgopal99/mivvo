"use client"

import { useState, useRef, forwardRef, useImperativeHandle, useCallback } from "react"

// Web Speech API types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: (event: Event) => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onend: (event: Event) => void
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}
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
import { Plus, FileText, X, Mic, Square } from "lucide-react"
import {
  generateJDFromPredefined,
  getAvailableRoles,
  getAvailableLevels,
  getAvailableInterviewTypes,
  getGeneralInterviewSubTypes,
  getHRInterviewSubTypes
} from "./utils/interview-utils"
import { VoiceRecordingAnimation } from "./animations"
import { generateInterviewTitle } from "./utils/interview-title-utils"
import { CreditUsageInfo } from "@/lib/credit-converter"

interface VoiceProfile {
  professionalSummary: string
  [key: string]: unknown // Allow additional properties from API response
}



interface CreateInterviewDialogProps {
  onInterviewCreated?: (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string; customPrompt?: string; generalSubType?: string; hrSubType?: string; cvText?: string; title?: string; voiceProfile?: VoiceProfile }) => void
  creditUsage?: CreditUsageInfo | null
  userCvData?: string | null
  isCreating?: boolean
}

const CreateInterviewDialog = forwardRef<{ reset: () => void }, CreateInterviewDialogProps>(
  ({ onInterviewCreated, creditUsage, userCvData, isCreating = false }, ref) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Predefined Role state
  const [selectedRole, setSelectedRole] = useState("")
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

  // Voice input state
  const [voiceText, setVoiceText] = useState("") // Raw transcription (not displayed)
  const [refinedText, setRefinedText] = useState("") // Refined professional summary (displayed)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessingVoice, setIsProcessingVoice] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  // Check if user has credit allowance remaining
  const checkCreditLimit = () => {
    if (!creditUsage) return true // Allow if no data (will be checked on API)
    return creditUsage.remainingCredits > 0
  }

  // Handle button click with credit limit check
  const handleCreateClick = () => {
    if (!checkCreditLimit()) {
      import('sonner').then(({ toast }) => {
        toast.error(`You have used all ${creditUsage?.totalCredits} credits of your interview allowance. Please upgrade to continue practicing.`)
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

  // Voice recording functions
  const initializeSpeechRecognition = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      import('sonner').then(({ toast }) => {
        toast.error('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      })
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = false // Only show final results, no live transcription
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        }
      }

      // Only update text with final results
      if (finalTranscript) {
        setVoiceText(prevText => prevText + finalTranscript)
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
 
      setIsRecording(false)

      // Handle specific error types
      if (event.error === 'no-speech') {
        import('sonner').then(({ toast }) => {
          toast.warning('No speech detected. Please speak clearly and try again.')
        })
      } else if (event.error === 'audio-capture') {
        import('sonner').then(({ toast }) => {
          toast.error('Microphone access denied. Please check your microphone permissions.')
        })
      } else if (event.error === 'not-allowed') {
        import('sonner').then(({ toast }) => {
          toast.error('Microphone permission denied. Please allow microphone access and try again.')
        })
      } else if (event.error === 'network') {
        import('sonner').then(({ toast }) => {
          toast.error('Network error during speech recognition. Please check your connection.')
        })
      } else {
      import('sonner').then(({ toast }) => {
        toast.error('Speech recognition error. Please try again.')
      })
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    return recognition
  }

  const startRecording = () => {
    if (isRecording) return

    const recognitionInstance = initializeSpeechRecognition()
    if (recognitionInstance) {
      setRecognition(recognitionInstance)
      recognitionInstance.start()
    }
  }

  const stopRecording = async () => {
    if (recognition && isRecording) {
      recognition.stop()
      setRecognition(null)
      setIsProcessingVoice(true)

      try {
        // Check if any speech was detected
        const transcribedText = voiceText.trim()
        if (!transcribedText) {
          setIsProcessingVoice(false)
          import('sonner').then(({ toast }) => {
            toast.warning('No speech was detected. Please speak clearly and try recording again.')
          })
          return
        }

        // Refine the transcribed voice text using OpenAI

        const refineResponse = await fetch('/api/custom-interviews/refine-voice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            voiceText: transcribedText
          }),
        })

        const refineResult = await refineResponse.json()

        if (!refineResponse.ok || !refineResult.success) {
          throw new Error(refineResult.error || 'Failed to refine voice text')
        }

        // Show the refined text in the textarea
        setRefinedText(refineResult.refinedText)

      } catch (error) {
        console.error('Voice refinement error:', error)
        import('sonner').then(({ toast }) => {
          toast.error('Failed to refine voice input. Please try again.')
        })
        // Fallback to raw text if refinement fails
        setRefinedText(voiceText.trim())
      } finally {
        setIsProcessingVoice(false)
  }
    }
  }


  // Function to reset the form
  const resetForm = useCallback(() => {
    setSelectedRole("")
    setSelectedLevel("")
    setInterviewType("")
    setGeneralSubType("")
    setHrSubType("")
    setCustomJD("")
    setCvFile(null)
    setCvText("")
    setVoiceText("")
    setRefinedText("")
    setIsDialogOpen(false)
    if (cvInputRef.current) {
      cvInputRef.current.value = ''
    }
  }, [])

  // Expose reset function to parent
  useImperativeHandle(ref, () => ({
    reset: resetForm
  }), [resetForm])


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
          cvText: cvText || userCvData || undefined, // Include CV text if available (uploaded or existing)
          title: generateInterviewTitle("Custom")
        }

        // For custom interviews, don't provide a title so the backend can generate one based on extracted role
        const finalInterviewData = activeTab === "custom"
          ? { ...interviewData, title: undefined }
          : interviewData

        onInterviewCreated?.(finalInterviewData)

        // Reset form
        setIsDialogOpen(false)
        setCustomJD("")
        setCvFile(null)
        setCvText("")
        setVoiceText("")
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

    // Handle voice input tab
    if (activeTab === "voice") {
      if (!refinedText.trim()) {
        import('sonner').then(({ toast }) => {
          toast.error('Please record and process your interview request first')
        })
        return
      }

      // Use the already refined text to create the interview
        const interviewData = {
        jdDetails: refinedText,
        interviewType: "Custom", // Use Custom interview type for voice input
          screenShare: false,
        customPrompt: `Create an interview based on this request: ${refinedText}`,
        company: "Voice Interview Company",
        title: "Voice Requested Interview"
        }

        onInterviewCreated?.(interviewData)

        // Reset form
        setIsDialogOpen(false)
        setVoiceText("")
      setRefinedText("")
        setActiveTab("predefined")
        setCustomJD("")
        setCvFile(null)
        setCvText("")
        if (cvInputRef.current) {
          cvInputRef.current.value = ''
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
      screenShare: false, // Screen sharing disabled for now since Coding interviews are coming soon
      generalSubType: interviewType === 'General' ? generalSubType : (interviewType === 'Technical' ? selectedRole : undefined), // Pass role as generalSubType for technical interviews
      hrSubType: interviewType === 'HR' ? hrSubType : undefined, // Pass HR sub-type for HR interviews
      role: interviewType === 'Technical' ? selectedRole : undefined, // Keep role field for backward compatibility
      experienceLevel: interviewType === 'Technical' ? selectedLevel : undefined, // Pass the selected experience level only for Technical interviews
      cvText: cvText || userCvData || undefined, // Use uploaded CV, or existing CV if available
      // Let backend generate title based on interview type and role/subtype
      title: undefined
    }


    onInterviewCreated?.(interviewData)

    // Form will be reset and dialog closed by parent after successful creation
  }

  return (
    <>
      <Button
        className="bg-primary hover:bg-primary/90 cursor-pointer"
        onClick={handleCreateClick}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Custom Interview
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !isCreating && setIsDialogOpen(open)}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Interview</DialogTitle>
          <DialogDescription>
            Choose how you want to create your interview: use predefined templates or paste your own job description.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predefined">Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom JD</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
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
                setSelectedLevel("")
                setHrSubType("")
              } else if (value === 'HR') {
                // Clear role-related fields when switching to HR
                setSelectedRole("")
                setSelectedLevel("")
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

          {/* Role Selection - Only show for Technical types */}
          {interviewType === 'Technical' && (
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role *
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableRoles().map(role => (
                    <SelectItem
                      key={role.value}
                      value={role.value}
                    >
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Level Selection - Only show for Technical types */}
          {interviewType === 'Technical' && (
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

          <TabsContent value="voice" className="space-y-6 mt-6">
            {/* Voice Input Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">
                Voice Input *
              </Label>

              {/* Voice Recording Controls */}
              <div className="flex items-center gap-4">
                {!isRecording ? (
                  <Button
                    type="button"
                    onClick={startRecording}
                    disabled={isProcessingVoice}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Mic className="w-4 h-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 animate-pulse"
                  >
                    <Square className="w-4 h-4" />
                    Stop Recording
                  </Button>
                )}

                {refinedText && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setRefinedText("")}
                    disabled={isProcessingVoice}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Recording Status */}
              <VoiceRecordingAnimation isRecording={isRecording} />

              {/* Interview Request */}
              <div className="space-y-2">
                <Label htmlFor="voice-text" className="text-sm font-medium">
                  Interview Request
                </Label>
                <Textarea
                  id="voice-text"
                  placeholder="Your AI-refined interview request will appear here after you stop recording. You can also edit this text manually if needed."
                  value={refinedText}
                  onChange={(e) => setRefinedText(e.target.value)}
                  className="h-[200px] overflow-y-auto resize-none"
                  disabled={isProcessingVoice}
                />
                <p className="text-xs text-gray-500">
                  Simply mention what type of interview you want to conduct. For example: &quot;I want a Python developer interview&quot; or &quot;Give me a junior frontend developer interview&quot;
                </p>
              </div>

              {/* Processing indicator */}
              {isProcessingVoice && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  AI is refining your voice request...
                </div>
              )}
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
              isCreating || (
                activeTab === 'predefined'
                  ? (!interviewType ||
                     (interviewType === 'General' ? !generalSubType :
                      interviewType === 'HR' ? !hrSubType :
                      interviewType === 'Technical' ? (!selectedRole || !selectedLevel) : false))
                  : activeTab === 'custom'
                  ? (!customJD.trim() || isAnalyzingJD || isExtractingCV)
                  : activeTab === 'voice'
                  ? (!refinedText.trim() || isProcessingVoice || isRecording)
                  : false
              )
            }
            className="bg-primary hover:bg-primary/90"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Interview...
              </>
            ) : isAnalyzingJD || isProcessingVoice ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isAnalyzingJD ? 'Analyzing...' : 'Processing Voice...'}
              </>
            ) : activeTab === 'custom' ? (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Create Custom Interview
              </>
            ) : activeTab === 'voice' ? (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Create Interview
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
})


CreateInterviewDialog.displayName = 'CreateInterviewDialog'

export default CreateInterviewDialog
