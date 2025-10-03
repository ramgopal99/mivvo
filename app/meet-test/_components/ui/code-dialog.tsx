'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CodeDialogProps {
  isOpen: boolean
  onClose: () => void
}

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
]

const DEFAULT_CODE = {
  javascript: 'function hello() {\n  console.log("Hello, World!");\n}\n\nhello();',
  python: 'def hello():\n    print("Hello, World!")\n\nhello()'
}

export function CodeDialog({ isOpen, onClose }: CodeDialogProps) {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState(DEFAULT_CODE.javascript)

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(DEFAULT_CODE[newLanguage as keyof typeof DEFAULT_CODE] || '')
  }

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
              <h3 className="text-lg font-semibold mb-4">Problem Statement</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm">
                    Write a function that takes an array of integers and returns the sum of all even numbers in the array.
                    If there are no even numbers, return 0.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Examples</h4>
                  <div className="bg-background p-3 rounded text-xs font-mono">
                    <div>Input: [1, 2, 3, 4, 5]</div>
                    <div>Output: 6 (2 + 4)</div>
                    <br />
                    <div>Input: [1, 3, 5]</div>
                    <div>Output: 0</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Constraints</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Array length: 1 ≤ length ≤ 1000</li>
                    <li>• Numbers range: -1000 ≤ number ≤ 1000</li>
                  </ul>
                </div>
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
                theme="vs-dark"
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
