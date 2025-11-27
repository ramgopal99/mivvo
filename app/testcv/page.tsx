"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, AlertTriangle, FileText, X, Upload, Zap } from "lucide-react"
import { convertToMarkdown } from "./_components/markdown-converter"
import { validateStructure } from "./_components/structure-validator"

interface CVFile {
  file: File | null
  text: string
  isExtracting: boolean
}

export default function TestCVPage() {
  // Left side CV (to validate)
  const [leftCV, setLeftCV] = useState<CVFile>({
    file: null,
    text: "",
    isExtracting: false
  })

  // Right side CV (reference/template)
  const [rightCV, setRightCV] = useState<CVFile>({
    file: null,
    text: "",
    isExtracting: false
  })

  const [isValidating, setIsValidating] = useState(false)

  const [validationResults, setValidationResults] = useState<{
    score: number
    issues: string[]
    suggestions: string[]
    comparison: string[]
    showFullCV: boolean
    templateAnalysis?: {
      sections: string[]
      wordCount: number
      hasEmail: boolean
      hasPhone: boolean
    }
  }>({
    score: 0,
    issues: [],
    suggestions: [],
    comparison: [],
    showFullCV: false
  })

  const leftInputRef = useRef<HTMLInputElement>(null)
  const rightInputRef = useRef<HTMLInputElement>(null)


  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    side: 'left' | 'right'
  ) => {
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

    const setCV = side === 'left' ? setLeftCV : setRightCV

    setCV({
      file: selectedFile,
      text: "",
      isExtracting: true
    })

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setCV({
          file: selectedFile,
          text: result.data.extractedText,
          isExtracting: false
        })
        import('sonner').then(({ toast }) => {
          toast.success(`${side === 'left' ? 'Left' : 'Right'} CV extracted successfully`)
        })
      } else {
        throw new Error(result.message || 'Failed to extract text from file')
      }
    } catch (error) {
      console.error('File extraction error:', error)
      setCV({
        file: null,
        text: "",
        isExtracting: false
      })
      import('sonner').then(({ toast }) => {
        toast.error(`Failed to extract text from ${side} file. Please try again.`)
      })
    }
  }

  const clearFile = (side: 'left' | 'right') => {
    const setCV = side === 'left' ? setLeftCV : setRightCV
    const inputRef = side === 'left' ? leftInputRef : rightInputRef

    setCV({
      file: null,
      text: "",
      isExtracting: false
    })

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    // Reset validation results when files are cleared
    setValidationResults({
      score: 0,
      issues: [],
      suggestions: [],
      comparison: [],
      showFullCV: false,
      templateAnalysis: undefined
    })
  }

  const compareAgainstTemplate = async () => {
    if (!leftCV.text.trim() || !rightCV.text.trim()) {
      import('sonner').then(({ toast }) => {
        toast.error('Please upload both CVs to compare')
      })
      return
    }

    console.log('Starting template comparison...')
    console.log('Left CV text length:', leftCV.text.length)
    console.log('Right CV text length:', rightCV.text.length)

    setIsValidating(true)

    try {
      console.log('Step 1: Converting template to markdown...')
      // Step 1: Convert reference CV (right) to markdown to establish template
      const templateMarkdown = await convertToMarkdown(rightCV.text)
      const templateSections = templateMarkdown.sections
      console.log('Template sections found:', templateSections)

      // Step 2: Analyze what sections the template has
      const templateStructure = validateStructure(templateMarkdown.markdown, templateSections)
      console.log('Template structure score:', templateStructure.score)

      console.log('Step 3: Converting user CV to markdown...')
      // Step 3: Convert user's CV (left) to markdown
      const userMarkdown = await convertToMarkdown(leftCV.text)
      const userSections = userMarkdown.sections
      console.log('User sections found:', userSections)

      // Step 4: Analyze template and create structural validation for user's CV
      const issues: string[] = []
      const suggestions: string[] = []
      const comparison: string[] = []

      console.log('Template sections:', templateSections)
      console.log('User sections:', userSections)

      // Define essential CV sections that should be present
      const essentialSections = ['contact', 'experience', 'education', 'skills']
      const recommendedSections = ['summary', 'certifications', 'projects', 'languages']

      // Check if user CV has essential sections (regardless of template)
      const missingEssential = essentialSections.filter(section =>
        !userSections.some(userSection =>
          userSection.toLowerCase().includes(section.toLowerCase().slice(0, -1)) || // singular forms
          section.toLowerCase().includes(userSection.toLowerCase())
        )
      )

      if (missingEssential.length > 0) {
        issues.push(`Missing essential sections: ${missingEssential.join(', ')}`)
        suggestions.push(`Add these critical sections to your CV: ${missingEssential.join(', ')}`)
      }

      // Check for recommended sections
      const missingRecommended = recommendedSections.filter(section =>
        !userSections.some(userSection =>
          userSection.toLowerCase().includes(section.toLowerCase().slice(0, -1)) ||
          section.toLowerCase().includes(userSection.toLowerCase())
        )
      )

      if (missingRecommended.length > 0) {
        suggestions.push(`Consider adding these sections for a complete CV: ${missingRecommended.join(', ')}`)
      }

      // Check section order (standard CV flow)
      const userOrder = validateStructure(userMarkdown.markdown, userSections).sectionsOrder

      const orderIssues = []
      let summaryIndex = -1, experienceIndex = -1, educationIndex = -1

      userOrder.forEach((section, index) => {
        const sectionLower = section.toLowerCase()
        if (sectionLower.includes('summary')) summaryIndex = index
        if (sectionLower.includes('experience')) experienceIndex = index
        if (sectionLower.includes('education')) educationIndex = index
      })

      if (summaryIndex !== -1 && experienceIndex !== -1 && summaryIndex > experienceIndex) {
        orderIssues.push('Experience section should come after Summary')
      }

      if (experienceIndex !== -1 && educationIndex !== -1 && experienceIndex > educationIndex) {
        orderIssues.push('Education section should come after Experience')
      }

      if (orderIssues.length > 0) {
        issues.push(`Section ordering issues: ${orderIssues.join(', ')}`)
        suggestions.push('Reorder sections to follow standard CV flow: Contact → Summary → Experience → Education → Skills')
      }

      // Check content quality (based on template as reference)
      const templateWordCount = rightCV.text.split(/\s+/).length
      const userWordCount = leftCV.text.split(/\s+/).length

      if (userWordCount < 200) {
        issues.push('CV content is too brief - aim for 300-600 words')
        suggestions.push('Expand each section with specific details, achievements, and metrics')
      } else if (userWordCount < templateWordCount * 0.5) {
        comparison.push(`Content length: Your CV (${userWordCount} words) is much shorter than typical professional CVs`)
        suggestions.push('Add more detailed descriptions of your experience and achievements')
      }

      // Check for contact information (essential)
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i
      const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/

      const userHasEmail = emailRegex.test(leftCV.text)
      const userHasPhone = phoneRegex.test(leftCV.text)

      if (!userHasEmail) {
        issues.push('Email address is missing from CV')
        suggestions.push('Add your professional email address in the contact section')
      }

      if (!userHasPhone) {
        issues.push('Phone number is missing from CV')
        suggestions.push('Include your phone number for easy contact')
      }

      // Check for education details (like college name)
      const hasEducationKeywords = /\b(university|college|institute|school|degree|bachelor|master|phd)\b/i.test(leftCV.text)
      if (!hasEducationKeywords && userSections.some(s => s.toLowerCase().includes('education'))) {
        suggestions.push('Include specific institution names, degrees, and graduation years in education section')
      }

      // Calculate score based on structural completeness
      const baseScore = 100
      const essentialPenalty = 20 // Higher penalty for missing essential sections
      const recommendedBonus = 5 // Bonus for having recommended sections

      console.log('Score calculation:', {
        baseScore,
        missingEssential: missingEssential.length,
        missingRecommended: missingRecommended.length,
        orderIssues: orderIssues.length,
        hasEmail: userHasEmail,
        hasPhone: userHasPhone,
        userWordCount
      })

      let score = baseScore

      // Deduct for missing essential sections
      score -= missingEssential.length * essentialPenalty

      // Deduct for order issues
      score -= orderIssues.length * 10

      // Deduct for missing contact info
      if (!userHasEmail) score -= 10
      if (!userHasPhone) score -= 5

      // Deduct for too brief content
      if (userWordCount < 200) score -= 15
      else if (userWordCount < 300) score -= 5

      // Bonus for having recommended sections
      const hasRecommended = recommendedSections.filter(section =>
        userSections.some(userSection =>
          userSection.toLowerCase().includes(section.toLowerCase().slice(0, -1)) ||
          section.toLowerCase().includes(userSection.toLowerCase())
        )
      ).length
      score += hasRecommended * recommendedBonus

      const finalScore = Math.max(0, Math.min(100, score))

      console.log('Final score:', finalScore, 'Raw score:', score)


      // If no critical issues found, add success feedback
      if (issues.length === 0) {
        if (suggestions.length === 0) {
          suggestions.push('🎉 Excellent! Your CV has all essential sections and good structure.')
        }
        suggestions.push('💡 Your CV follows standard professional formatting.')
      }

      console.log('Setting validation results:', {
        score: finalScore,
        issues,
        suggestions,
        comparison,
        userSections,
        templateSections
      })

      setValidationResults({
        score: finalScore,
        issues,
        suggestions,
        comparison,
        showFullCV: true,
        templateAnalysis: {
          sections: templateSections, // Template sections as reference
          wordCount: templateWordCount,
          hasEmail: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i.test(rightCV.text),
          hasPhone: /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/.test(rightCV.text)
        }
      })

    } catch (error) {
      console.error('Template comparison error:', error)
      import('sonner').then(({ toast }) => {
        toast.error('Error during template comparison. Please try again.')
      })
    } finally {
      setIsValidating(false)
    }
  }


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">CV Structure Validator</h1>
          <p className="text-muted-foreground mt-2">
            Upload a reference CV (right) to analyze structure, then upload your CV (left) for comprehensive validation
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📄 Best Format for Validation:</h3>
            <p className="text-blue-800 text-sm">
              <strong>PDF files provide the most accurate text extraction</strong> for validation because they preserve exact formatting and structure.
              DOCX files work well too, but PDFs are preferred for consistent parsing of complex layouts.
            </p>
            <p className="text-blue-800 text-sm mt-2">
              <strong>💡 How it works:</strong> Upload any professional CV as reference (right side) to establish structure expectations, then upload your CV (left side) for detailed structural validation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - CV to Check Against Template */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  CV to Validate
                </CardTitle>
                <CardDescription>
                  Upload your CV to check against the reference template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="left-cv-upload">Upload Your CV</Label>
                  <input
                    id="left-cv-upload"
                    ref={leftInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => handleFileSelect(e, 'left')}
                    disabled={leftCV.isExtracting}
                    className="hidden"
                    aria-label="Upload Your CV"
                  />
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => leftInputRef.current?.click()}
                      disabled={leftCV.isExtracting}
                      className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {leftCV.isExtracting ? 'Extracting...' : 'Choose Your CV'}
                    </Button>

                    {/* File Preview */}
                    {leftCV.file && (
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="font-medium text-sm text-green-900">{leftCV.file.name}</p>
                            <p className="text-xs text-green-600">{formatFileSize(leftCV.file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearFile('left')}
                          disabled={leftCV.isExtracting}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Loading indicator */}
                    {leftCV.isExtracting && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        Extracting text from your CV...
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Reference Template */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Reference Template
                </CardTitle>
                <CardDescription>
                  Upload a well-formatted CV to use as the template for validation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="right-cv-upload">Upload Reference CV</Label>
                  <input
                    id="right-cv-upload"
                    ref={rightInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => handleFileSelect(e, 'right')}
                    disabled={rightCV.isExtracting}
                    className="hidden"
                    aria-label="Upload Reference CV"
                  />
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => rightInputRef.current?.click()}
                      disabled={rightCV.isExtracting}
                      className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {rightCV.isExtracting ? 'Analyzing...' : 'Choose Reference CV'}
                    </Button>

                    {/* File Preview */}
                    {rightCV.file && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm text-blue-900">{rightCV.file.name}</p>
                            <p className="text-xs text-blue-600">{formatFileSize(rightCV.file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearFile('right')}
                          disabled={rightCV.isExtracting}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Loading indicator */}
                    {rightCV.isExtracting && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        Analyzing reference template...
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Analysis Display */}
            {rightCV.text && !rightCV.isExtracting && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Template Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sections Detected:</span>
                      <span className="font-medium">{rightCV.text.split('\n').filter(line => line.includes('#')).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Words:</span>
                      <span className="font-medium">{rightCV.text.split(/\s+/).length}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      This template will be used to validate your CV structure and content.
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Single Validation Button */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={compareAgainstTemplate}
            size="lg"
            disabled={!leftCV.text.trim() || !rightCV.text.trim() || isValidating}
            className="px-8"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing CV...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Compare Against Template
              </>
            )}
          </Button>

          {/* Debug Test Button */}
          <Button
            onClick={() => {
              console.log('Setting test results...')
              setValidationResults({
                score: 85,
                issues: ['Test issue 1', 'Test issue 2'],
                suggestions: ['Test suggestion 1', 'Test suggestion 2'],
                comparison: ['Test comparison 1'],
                showFullCV: true,
                templateAnalysis: {
                  sections: ['contact', 'summary', 'experience'],
                  wordCount: 500,
                  hasEmail: true,
                  hasPhone: true
                }
              })
            }}
            variant="outline"
            size="lg"
          >
            Test Results Display
          </Button>
        </div>

        {/* Debug Info */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">
          <strong>Debug Info:</strong>
          <div>Score: {validationResults.score}</div>
          <div>Issues: {validationResults.issues.length}</div>
          <div>Suggestions: {validationResults.suggestions.length}</div>
          <div>Comparisons: {validationResults.comparison.length}</div>
          <div>Show Results: {validationResults.score > 0 ? 'Yes' : 'No'}</div>

          {validationResults.issues.length > 0 && (
            <div className="mt-2">
              <strong>Issues Details:</strong>
              <ul className="ml-4">
                {validationResults.issues.map((issue, i) => (
                  <li key={i}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResults.suggestions.length > 0 && (
            <div className="mt-2">
              <strong>Suggestions Details:</strong>
              <ul className="ml-4">
                {validationResults.suggestions.map((suggestion, i) => (
                  <li key={i}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResults.comparison.length > 0 && (
            <div className="mt-2">
              <strong>Comparisons Details:</strong>
              <ul className="ml-4">
                {validationResults.comparison.map((comparison, i) => (
                  <li key={i}>• {comparison}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Validation Results */}
        {(validationResults.score > 0 || validationResults.issues.length > 0 || validationResults.suggestions.length > 0 || validationResults.comparison.length > 0) && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Template Comparison Results
              </CardTitle>
              <CardDescription>
                How well your CV matches the reference template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${validationResults.score >= 90 ? 'text-green-600' : validationResults.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {validationResults.score}%
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Template Match Score
                  {validationResults.templateAnalysis && (
                    <div className="text-xs mt-1">
                      Template has {validationResults.templateAnalysis.sections.length} sections, {validationResults.templateAnalysis.wordCount} words
                    </div>
                  )}
                </div>
              </div>

              {validationResults.issues.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Issues Found (vs Template)
                  </h4>
                  <ul className="space-y-1">
                    {validationResults.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResults.comparison.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Content Comparison
                  </h4>
                  <ul className="space-y-1">
                    {validationResults.comparison.map((item, index) => (
                      <li key={index} className="text-sm text-orange-600 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {validationResults.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Suggestions to Match Template
                  </h4>
                  <ul className="space-y-1">
                    {validationResults.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-blue-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Process Steps Display */}
        {isValidating && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 animate-pulse" />
                Analysis in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <div className="font-medium text-blue-900">Step 1: Analyzing Template Structure</div>
                    <div className="text-sm text-blue-700">Converting reference CV to markdown format...</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <div>
                    <div className="font-medium text-green-900">Step 2: Processing Your CV</div>
                    <div className="text-sm text-green-700">Converting your CV to markdown for comparison...</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <div>
                    <div className="font-medium text-purple-900">Step 3: Template Comparison</div>
                    <div className="text-sm text-purple-700">Comparing sections, order, and content against template...</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                  <div>
                    <div className="font-medium text-orange-900">Step 4: Generating Report</div>
                    <div className="text-sm text-orange-700">Creating detailed feedback and suggestions...</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <strong>💡 What we&apos;re checking:</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Missing sections compared to template</li>
                    <li>• Section order alignment</li>
                    <li>• Content length and completeness</li>
                    <li>• Contact information consistency</li>
                    <li>• Formatting and structure issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}
