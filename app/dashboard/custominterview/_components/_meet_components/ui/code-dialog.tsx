'use client'

import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CodingQuestion } from '../config'

// Extend window interface for coding code getter
declare global {
  interface Window {
    getCurrentCodingCode?: () => { code: string; language: string }
  }
}

interface CodeDialogProps {
  isOpen: boolean
  onClose: () => void
  question?: CodingQuestion | null
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
]

const DEFAULT_CODE = {
  javascript: '',
  python: ''
}

export function CodeDialog({ isOpen, onClose, question }: CodeDialogProps) {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(DEFAULT_CODE.javascript)

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    const newCode = DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE] || ''
    setCode(newCode)
  }

  // Expose current code via global function for voice chat to access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.getCurrentCodingCode = () => ({ code, language })
    }
  }, [code, language])

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Interview Coding Challenge</DialogTitle>
          <DialogDescription>
            Solve the coding problem on the left and write your solution on the right.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex gap-6 mt-4">
          {/* Left Panel - Question */}
          <div className="flex-1 flex flex-col">
            <div className="bg-muted/50 rounded-lg p-6 h-full overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">{question?.title || 'Problem Statement'}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm">
                    {question?.description || 'No description available.'}
                  </p>
                </div>
                {question?.examples && question.examples.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Examples</h4>
                    <div className="space-y-3">
                      {question.examples.map((example, index) => (
                        <div key={index} className="bg-background p-3 rounded text-xs font-mono">
                          <div>Input: {typeof example.input === 'object' ? JSON.stringify(example.input) : example.input}</div>
                          <div>Output: {typeof example.output === 'object' ? JSON.stringify(example.output) : example.output}</div>
                          {example.explanation && (
                            <div className="mt-2 text-muted-foreground">Explanation: {example.explanation}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {question?.constraints && question.constraints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Constraints</h4>
                    <ul className="text-xs space-y-1">
                      {question.constraints.map((constraint, index) => (
                        <li key={index}>• {constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {question?.difficulty && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Difficulty</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <label htmlFor="language-select" className="text-sm font-medium">
                  Language:
                </label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language-select" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 min-h-0 border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                  tabSize: 2,
                  insertSpaces: true,
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
