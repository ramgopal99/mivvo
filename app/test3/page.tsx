"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, FileText, Upload, CheckCircle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ExtractedData {
  fileName: string
  fileType: string
  fileSize: number
  extractedText: string
  textLength: number
  wordCount: number
  lineCount: number
}

export default function FileExtractionTestPage() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a PDF or DOCX file only.')
        return
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.')
        return
      }

      setFile(selectedFile)
      setError(null)
      setExtractedData(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setExtractedData(result.data)
      } else {
        setError(result.message || 'Failed to extract text from file')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Network error occurred while processing the file')
    } finally {
      setIsUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setExtractedData(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Text Extraction Test</h1>
          <p className="text-gray-600">
            Upload a PDF or DOCX file to extract and view its text content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                File Upload
              </CardTitle>
              <CardDescription>
                Select a PDF or DOCX file to extract text from
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Input */}
              <div className="space-y-2">
                <Label htmlFor="file-input">Choose File</Label>
                <Input
                  id="file-input"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOCX. Maximum size: 10MB
                </p>
              </div>

              {/* File Preview */}
              {file && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm text-blue-900">{file.name}</p>
                      <p className="text-xs text-blue-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Extracted Text
              </CardTitle>
              <CardDescription>
                Text content extracted from your file
              </CardDescription>
            </CardHeader>
            <CardContent>
              {extractedData ? (
                <div className="space-y-4">
                  {/* File Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium text-green-800">File Name</p>
                      <p className="text-sm text-green-600">{extractedData.fileName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">File Type</p>
                      <p className="text-sm text-green-600">{extractedData.fileType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">File Size</p>
                      <p className="text-sm text-green-600">{formatFileSize(extractedData.fileSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Word Count</p>
                      <p className="text-sm text-green-600">{extractedData.wordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Line Count</p>
                      <p className="text-sm text-green-600">{extractedData.lineCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Character Count</p>
                      <p className="text-sm text-green-600">{extractedData.textLength.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Extracted Text ({extractedData.textLength.toLocaleString()} characters)
                    </Label>
                    <Textarea
                      value={extractedData.extractedText}
                      readOnly
                      className="min-h-[300px] resize-none"
                      placeholder="Extracted text will appear here..."
                    />
                  </div>

                  {/* Copy Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(extractedData.extractedText)
                    }}
                  >
                    Copy Text
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">Upload a file to see extracted text here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ol className="list-decimal list-inside space-y-2">
                <li>Click &ldquo;Choose File&rdquo; to select a PDF or DOCX file from your computer</li>
                <li>The file must be smaller than 10MB</li>
                <li>Click &ldquo;Extract Text&rdquo; to process the file</li>
                <li>View the extracted text and file statistics in the results panel</li>
                <li>Use &ldquo;Copy Text&rdquo; to copy the extracted content to your clipboard</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
