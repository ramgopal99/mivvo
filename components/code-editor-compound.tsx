"use client"

import React, { useState, useRef, useCallback } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Square, RotateCcw, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { editor } from "monaco-editor"

// Language definitions with Monaco identifiers and display names
const LANGUAGES = [
  { id: "python", name: "Python", version: "3.10.0" },
  { id: "java", name: "Java", version: "15.0.2" },
  { id: "cpp", name: "C++", version: "10.2.0" },
]

// Default code snippets for each language
const DEFAULT_CODE = {
  python: `print("Hello, World!")
def greet(name):
    return f"Hello, {name}!"
print(greet("Developer"))`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println(greet("Developer"));
    }

    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
  cpp: `#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;
    cout << greet("Developer") << endl;
    return 0;
}`
}

interface CodeEditorCompoundProps {
  className?: string
  defaultLanguage?: string
  defaultCode?: string
  apiBaseUrl?: string
  onExecute?: (result: ExecutionResult) => void
}

export interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime?: number
}

// Timeout utility for fetch requests
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

export function CodeEditorCompound({
  className,
  defaultLanguage = "python",
  defaultCode,
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://emkc.org/api/v2/piston",
  onExecute
}: CodeEditorCompoundProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    LANGUAGES.find(lang => lang.id === defaultLanguage) || LANGUAGES[0]
  )
  const [code, setCode] = useState(() =>
    defaultCode || DEFAULT_CODE[selectedLanguage.id as keyof typeof DEFAULT_CODE]
  )
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [copied, setCopied] = useState(false)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleLanguageChange = (languageId: string) => {
    const newLanguage = LANGUAGES.find(lang => lang.id === languageId)
    if (newLanguage) {
      setSelectedLanguage(newLanguage)
      setCode(DEFAULT_CODE[languageId as keyof typeof DEFAULT_CODE])
      setExecutionResult(null)
    }
  }

  const handleEditorDidMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }, [])

  const handleExecute = async () => {
    if (!code.trim()) return

    setIsExecuting(true)
    setExecutionResult(null)

    try {
      const startTime = Date.now()

      const response = await fetchWithTimeout(`${apiBaseUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage.id,
          version: selectedLanguage.version,
          files: [{ content: code }],
        }),
      })

      const endTime = Date.now()
      const executionTime = endTime - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      let output = ""
      let error = ""
      let success = true

      if (result.run) {
        output = result.run.output || ""
        error = result.run.stderr || ""
        success = result.run.code === 0

        if (error && !output) {
          output = error
          success = false
        } else if (error && output) {
          output += "\n" + error
        }
      } else {
        success = false
        output = "No execution result received"
      }

      const executionResult: ExecutionResult = {
        success,
        output,
        executionTime
      }

      setExecutionResult(executionResult)
      onExecute?.(executionResult)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      const executionResult: ExecutionResult = {
        success: false,
        output: `Execution failed: ${errorMessage}`,
        executionTime: 0
      }

      setExecutionResult(executionResult)
      onExecute?.(executionResult)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleReset = () => {
    setCode(DEFAULT_CODE[selectedLanguage.id as keyof typeof DEFAULT_CODE])
    setExecutionResult(null)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Header with controls */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedLanguage.id} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="px-2 py-1">
                v{selectedLanguage.version}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative">
          <Editor
            height="100%"
            language={selectedLanguage.id}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: "on",
              quickSuggestions: {
                other: true,
                comments: false,
                strings: true
              },
              parameterHints: {
                enabled: true
              },
              hover: {
                enabled: true
              },
              contextmenu: true,
              mouseWheelZoom: true,
              smoothScrolling: true,
              cursorBlinking: "blink",
              renderWhitespace: "selection",
              renderControlCharacters: false,
              fontFamily: "JetBrains Mono, 'Courier New', monospace",
              fontLigatures: true,
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              autoIndent: "full",
              formatOnPaste: true,
              formatOnType: true
            }}
          />

          {/* Code Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="h-8 px-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="h-8 px-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleExecute}
              disabled={isExecuting || !code.trim()}
              className="h-8 px-3"
            >
              {isExecuting ? (
                <Square className="h-4 w-4 animate-pulse" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="ml-1 hidden sm:inline">
                {isExecuting ? "Running..." : "Run"}
              </span>
            </Button>
          </div>
        </div>

        {/* Output Section */}
        {executionResult && (
          <Card className="rounded-none border-x-0 border-b-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Output</CardTitle>
                {executionResult.executionTime && (
                  <Badge variant="secondary" className="text-xs">
                    {executionResult.executionTime}ms
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-32 w-full">
                <pre className={cn(
                  "text-sm font-mono whitespace-pre-wrap break-words",
                  executionResult.success
                    ? "text-green-400"
                    : "text-red-400"
                )}>
                  {executionResult.output}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
