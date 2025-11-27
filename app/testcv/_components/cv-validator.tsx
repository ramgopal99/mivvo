"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  FileText,
  Download,
  Eye,
  BarChart3,
  Layout,
  FileCheck,
  Zap
} from "lucide-react"
import { extractPDFLayout, analyzeLayout, type PDFLayout } from "./pdf-layout-extractor"
import { convertToMarkdown, type MarkdownConversionResult } from "./markdown-converter"
import { validateStructure, generateImprovementSuggestions, type StructureValidationResult } from "./structure-validator"

interface CVValidationResult {
  layout: {
    layoutData: PDFLayout
    analysis: { layoutErrors: string[]; layoutScore: number }
  }
  markdown: MarkdownConversionResult
  structure: StructureValidationResult
  overall: {
    score: number
    cost: number
    processingTime: number
  }
}

interface CVValidatorProps {
  cvFile: File
  onValidationComplete?: (result: CVValidationResult) => void
}

export function CVValidator({ cvFile, onValidationComplete }: CVValidatorProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [currentStep, setCurrentStep] = useState<string>("")
  const [validationResult, setValidationResult] = useState<CVValidationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const steps = [
    { id: "layout", label: "PDF Layout Extraction", icon: Layout },
    { id: "markdown", label: "Markdown Conversion", icon: FileText },
    { id: "structure", label: "Structure Validation", icon: FileCheck },
    { id: "final", label: "Final Analysis", icon: BarChart3 }
  ]

  const validateCV = async () => {
    if (!cvFile) return

    setIsValidating(true)
    setError(null)
    const startTime = Date.now()

    try {
      // Step 1: Extract PDF Layout
      setCurrentStep("layout")
      const layoutData = await extractPDFLayout(cvFile)
      const layoutAnalysis = analyzeLayout(layoutData)

      // Step 2: Convert to Markdown
      setCurrentStep("markdown")
      const cvText = layoutData.elements.map(el => el.text).join(' ')
      const markdownResult = await convertToMarkdown(cvText)

      // Step 3: Validate Structure
      setCurrentStep("structure")
      const structureResult = validateStructure(markdownResult.markdown, markdownResult.sections)

      // Step 4: Calculate final results
      setCurrentStep("final")
      const processingTime = Date.now() - startTime

      // Calculate overall score (weighted average)
      const layoutWeight = 0.3
      const structureWeight = 0.7
      const overallScore = Math.round(
        (layoutAnalysis.layoutScore * layoutWeight) +
        (structureResult.score * structureWeight)
      )

      // Calculate cost (approximate)
      const cost = (markdownResult.tokensUsed * 0.000012) + 0.0001 // GPT-4o-mini cost + processing

      const result: CVValidationResult = {
        layout: {
          layoutData,
          analysis: layoutAnalysis
        },
        markdown: markdownResult,
        structure: structureResult,
        overall: {
          score: overallScore,
          cost,
          processingTime
        }
      }

      setValidationResult(result)
      onValidationComplete?.(result)

    } catch (err) {
      console.error('CV validation error:', err)
      setError(err instanceof Error ? err.message : 'Validation failed')
    } finally {
      setIsValidating(false)
      setCurrentStep("")
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
      default: return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-700 mb-2">Validation Failed</h3>
            <p className="text-red-600">{error}</p>
            <Button onClick={() => setError(null)} className="mt-4">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Validation Trigger */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            CV Structure Validator
          </CardTitle>
          <CardDescription>
            Advanced AI-powered validation using layout analysis + structure checking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                File: <span className="font-medium">{cvFile.name}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Expected cost: ~₹0.04-0.06 | Processing time: ~3-5 seconds
              </p>
            </div>
            <Button
              onClick={validateCV}
              disabled={isValidating}
              className="min-w-[140px]"
            >
              {isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {currentStep && steps.find(s => s.id === currentStep)?.label}
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Validate CV
                </>
              )}
            </Button>
          </div>

          {/* Progress Steps */}
          {isValidating && (
            <div className="mt-6 space-y-3">
              {steps.map((step, index) => {
                const isActive = currentStep === step.id
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index

                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      isCompleted ? 'bg-green-100 text-green-600' :
                      isActive ? 'bg-blue-100 text-blue-600 animate-pulse' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm ${
                      isCompleted ? 'text-green-700 font-medium' :
                      isActive ? 'text-blue-700 font-medium' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Display */}
      {validationResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(validationResult.overall.score)}`}>
                  {validationResult.overall.score}%
                </div>
                <div>
                  <Badge variant={getScoreBadgeVariant(validationResult.overall.score)} className="text-sm">
                    {validationResult.overall.score >= 90 ? 'Excellent' :
                     validationResult.overall.score >= 70 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <div className="font-medium">Cost</div>
                    <div>₹{validationResult.overall.cost.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Time</div>
                    <div>{validationResult.overall.processingTime}ms</div>
                  </div>
                  <div>
                    <div className="font-medium">Method</div>
                    <div>Hybrid AI</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Tabs defaultValue="issues" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>

            <TabsContent value="issues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Validation Issues</CardTitle>
                  <CardDescription>
                    Problems found in your CV that need attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validationResult.structure.issues.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-700">No Issues Found!</h3>
                      <p className="text-green-600">Your CV structure looks good.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {validationResult.structure.issues.map((issue, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="font-medium">{issue.message}</div>
                            {issue.section && (
                              <div className="text-sm text-muted-foreground">Section: {issue.section}</div>
                            )}
                            {issue.suggestion && (
                              <div className="text-sm text-blue-600 mt-1">💡 {issue.suggestion}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {validationResult.structure.issues.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Improvement Suggestions</h4>
                      <ul className="space-y-1">
                        {generateImprovementSuggestions(validationResult.structure).map((suggestion, index) => (
                          <li key={index} className="text-sm text-blue-800">• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Layout Analysis
                  </CardTitle>
                  <CardDescription>
                    PDF layout and positioning analysis (no AI cost)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {validationResult.layout.analysis.layoutScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Layout Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {validationResult.layout.layoutData.totalPages}
                      </div>
                      <div className="text-sm text-muted-foreground">Pages</div>
                    </div>
                  </div>

                  {validationResult.layout.analysis.layoutErrors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-red-700">Layout Issues:</h4>
                      <ul className="space-y-1">
                        {validationResult.layout.analysis.layoutErrors.map((error, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Layout Statistics:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Page Width: {Math.round(validationResult.layout.layoutData.pageWidth)}px</div>
                      <div>Page Height: {Math.round(validationResult.layout.layoutData.pageHeight)}px</div>
                      <div>Text Elements: {validationResult.layout.layoutData.elements.length}</div>
                      <div>Processing: Free (no AI)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    Structure Analysis
                  </CardTitle>
                  <CardDescription>
                    CV sections and organization validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {validationResult.structure.score}%
                      </div>
                      <div className="text-sm text-muted-foreground">Structure Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {validationResult.structure.sectionsFound.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Sections Found</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Found Sections:</h4>
                      <div className="flex flex-wrap gap-2">
                        {validationResult.structure.sectionsFound.map((section, index) => (
                          <Badge key={index} variant="outline">{section}</Badge>
                        ))}
                      </div>
                    </div>

                    {validationResult.structure.sectionsMissing.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-orange-700">Missing Sections:</h4>
                        <div className="flex flex-wrap gap-2">
                          {validationResult.structure.sectionsMissing.map((section, index) => (
                            <Badge key={index} variant="destructive">{section}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="markdown" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Markdown Conversion
                  </CardTitle>
                  <CardDescription>
                    AI-powered conversion to structured format (GPT-4o-mini)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {validationResult.markdown.confidence * 100}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-600">
                        {validationResult.markdown.tokensUsed}
                      </div>
                      <div className="text-sm text-muted-foreground">Tokens Used</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{(validationResult.markdown.tokensUsed * 0.000012).toFixed(4)}
                      </div>
                      <div className="text-sm text-muted-foreground">AI Cost</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Structured Markdown:</h4>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                        {validationResult.markdown.markdown}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

