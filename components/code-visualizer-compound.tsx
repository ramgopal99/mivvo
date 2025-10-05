"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Square,
  RotateCcw,
  Copy,
  Check,
  StepForward,
  StepBack,
  Eye,
  Variable,
  FunctionSquare,
  Layers,
  Zap
} from "lucide-react"
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

interface FunctionInfo {
  name: string
  params?: string
  line: number
  body: string[]
}

interface ExecutionStep {
  line: number
  variables: Record<string, string | number | boolean>
  functions: Record<string, FunctionInfo>
  globals: Record<string, string | number | boolean>
  output: string
  isFunctionCall: boolean
  functionName?: string
  callStack: string[]
}

interface VisualizationState {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  isPaused: boolean
  executionSteps: ExecutionStep[]
  currentLine: number | null
}

export interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime?: number
  visualization?: ExecutionStep[]
}

interface CodeVisualizerCompoundProps {
  className?: string
  defaultLanguage?: string
  defaultCode?: string
  apiBaseUrl?: string
  onExecute?: (result: ExecutionResult) => void
}

// Simple Python AST parser for visualization
class PythonCodeParser {
  parseCode(code: string): ExecutionStep[] {
    const lines = code.split('\n')
    const steps: ExecutionStep[] = []
    const variables: Record<string, string | number | boolean> = {}
    const functions: Record<string, FunctionInfo> = {}
    const globals: Record<string, string | number | boolean> = {}
    const callStack: string[] = []

    let output = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const step: ExecutionStep = {
        line: i + 1,
        variables: { ...variables },
        functions: { ...functions },
        globals: { ...globals },
        output: output,
        isFunctionCall: false,
        callStack: [...callStack]
      }

      // Parse function definitions
      if (line.startsWith('def ')) {
        const funcMatch = line.match(/def (\w+)\s*\((.*?)\):/)
        if (funcMatch) {
          const funcName = funcMatch[1]
          const params = funcMatch[2]
          functions[funcName] = {
            name: funcName,
            params: params,
            line: i + 1,
            body: []
          }
          step.functions = { ...functions }
        }
      }

      // Parse variable assignments
      const varMatch = line.match(/^(\w+)\s*=\s*(.+)$/)
      if (varMatch && !line.includes('def ') && !line.includes('print(') && !line.includes('return ')) {
        const varName = varMatch[1]
        const varValue = varMatch[2]
        variables[varName] = varValue
        step.variables = { ...variables }
      }

      // Parse function calls
      const callMatch = line.match(/(\w+)\s*\(/)
      if (callMatch && callMatch[1] !== 'print') {
        const funcName = callMatch[1]
        step.isFunctionCall = true
        step.functionName = funcName
        callStack.push(funcName)
        step.callStack = [...callStack]
      }

      // Parse print statements
      if (line.startsWith('print(')) {
        const printMatch = line.match(/print\((.+)\)/)
        if (printMatch) {
          const content = printMatch[1]
          if (content.includes('"') || content.includes("'")) {
            // String literal
            const stringMatch = content.match(/["']([^"']*)["']/)
            if (stringMatch) {
              output += stringMatch[1] + "\n"
            }
          } else if (variables[content]) {
            // Variable
            output += variables[content] + "\n"
          } else {
            // Function call result
            output += "[Function result]\n"
          }
        }
      }

      steps.push(step)
    }

    return steps
  }
}

// Simple Java/C++ parser for visualization
class JavaCppCodeParser {
  parseCode(code: string, language: string): ExecutionStep[] {
    const lines = code.split('\n')
    const steps: ExecutionStep[] = []
    const variables: Record<string, string | number | boolean> = {}
    const functions: Record<string, FunctionInfo> = {}
    const globals: Record<string, string | number | boolean> = {}
    const callStack: string[] = []

    let output = ""

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      const step: ExecutionStep = {
        line: i + 1,
        variables: { ...variables },
        functions: { ...functions },
        globals: { ...globals },
        output: output,
        isFunctionCall: false,
        callStack: [...callStack]
      }

      // Parse function definitions
      const funcPattern = language === 'java'
        ? /(?:public\s+)?(?:static\s+)?(?:\w+\s+)?(\w+)\s*\([^)]*\)\s*{?/
        : /(\w+)\s+(\w+)\s*\([^)]*\)\s*{?/

      const funcMatch = line.match(funcPattern)
      if (funcMatch && !line.includes('if ') && !line.includes('for ') && !line.includes('while ')) {
        const funcName = funcMatch[1]
        functions[funcName] = {
          name: funcName,
          line: i + 1,
          body: []
        }
        step.functions = { ...functions }
      }

      // Parse variable declarations and assignments
      const varPattern = language === 'java'
        ? /(?:int|String|double|boolean)\s+(\w+)\s*=\s*(.+);/
        : /(?:int|string|double|bool)\s+(\w+)\s*=\s*(.+);/

      const varMatch = line.match(varPattern)
      if (varMatch) {
        const varName = varMatch[1]
        const varValue = varMatch[2]
        variables[varName] = varValue
        step.variables = { ...variables }
      }

      // Parse cout/println statements
      if (line.includes('cout') || line.includes('println')) {
        if (line.includes('<< "') || line.includes('.println("')) {
          const contentMatch = line.match(/(?:<< |println\()["']([^"']*)["']/)
          if (contentMatch) {
            output += contentMatch[1] + "\n"
          }
        }
      }

      // Parse function calls
      const callMatch = line.match(/(\w+)\s*\(/)
      if (callMatch && callMatch[1] !== 'cout' && callMatch[1] !== 'println' && callMatch[1] !== 'main') {
        const funcName = callMatch[1]
        step.isFunctionCall = true
        step.functionName = funcName
        callStack.push(funcName)
        step.callStack = [...callStack]
      }

      steps.push(step)
    }

    return steps
  }
}

export function CodeVisualizerCompound({
  className,
  defaultLanguage = "python",
  defaultCode,
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://emkc.org/api/v2/piston",
  onExecute
}: CodeVisualizerCompoundProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    LANGUAGES.find(lang => lang.id === defaultLanguage) || LANGUAGES[0]
  )
  const [code, setCode] = useState(() =>
    defaultCode || DEFAULT_CODE[selectedLanguage.id as keyof typeof DEFAULT_CODE]
  )
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [visualization, setVisualization] = useState<VisualizationState>({
    currentStep: 0,
    totalSteps: 0,
    isPlaying: false,
    isPaused: false,
    executionSteps: [],
    currentLine: null
  })

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const pythonParser = new PythonCodeParser()
  const javaCppParser = new JavaCppCodeParser()

  const handleLanguageChange = (languageId: string) => {
    const newLanguage = LANGUAGES.find(lang => lang.id === languageId)
    if (newLanguage) {
      setSelectedLanguage(newLanguage)
      setCode(DEFAULT_CODE[languageId as keyof typeof DEFAULT_CODE])
      setExecutionResult(null)
      resetVisualization()
    }
  }

  const resetVisualization = () => {
    setVisualization({
      currentStep: 0,
      totalSteps: 0,
      isPlaying: false,
      isPaused: false,
      executionSteps: [],
      currentLine: null
    })
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleEditorDidMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }, [])

  const parseCodeForVisualization = (code: string, language: string): ExecutionStep[] => {
    try {
      if (language === 'python') {
        return pythonParser.parseCode(code)
      } else if (language === 'java' || language === 'cpp') {
        return javaCppParser.parseCode(code, language)
      }
      return []
    } catch (error) {
      console.error('Error parsing code:', error)
      return []
    }
  }

  const handleVisualize = () => {
    const steps = parseCodeForVisualization(code, selectedLanguage.id)
    setVisualization({
      currentStep: 0,
      totalSteps: steps.length,
      isPlaying: false,
      isPaused: false,
      executionSteps: steps,
      currentLine: steps.length > 0 ? steps[0].line : null
    })
  }

  const handleStepForward = () => {
    setVisualization(prev => {
      if (prev.currentStep < prev.totalSteps - 1) {
        const nextStep = prev.currentStep + 1
        const currentStepData = prev.executionSteps[nextStep]
        return {
          ...prev,
          currentStep: nextStep,
          currentLine: currentStepData ? currentStepData.line : null
        }
      }
      return prev
    })
  }

  const handleStepBack = () => {
    setVisualization(prev => {
      if (prev.currentStep > 0) {
        const prevStep = prev.currentStep - 1
        const currentStepData = prev.executionSteps[prevStep]
        return {
          ...prev,
          currentStep: prevStep,
          currentLine: currentStepData ? currentStepData.line : null
        }
      }
      return prev
    })
  }

  const handlePlay = () => {
    if (visualization.executionSteps.length === 0) {
      handleVisualize()
    }

    setVisualization(prev => ({ ...prev, isPlaying: true, isPaused: false }))

    intervalRef.current = setInterval(() => {
      setVisualization(prev => {
        if (prev.currentStep >= prev.totalSteps - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return { ...prev, isPlaying: false }
        }

        const nextStep = prev.currentStep + 1
        const currentStepData = prev.executionSteps[nextStep]
        return {
          ...prev,
          currentStep: nextStep,
          currentLine: currentStepData ? currentStepData.line : null
        }
      })
    }, 1000)
  }

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setVisualization(prev => ({ ...prev, isPlaying: false, isPaused: true }))
  }

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    resetVisualization()
  }

  const handleExecute = async () => {
    if (!code.trim()) return

    setIsExecuting(true)
    setExecutionResult(null)
    resetVisualization()

    try {
      const startTime = Date.now()

      const response = await fetch(`${apiBaseUrl}/execute`, {
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
    resetVisualization()
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

  // Apply line highlighting
  useEffect(() => {
    if (editorRef.current && visualization.currentLine) {
      editorRef.current.deltaDecorations([], [
        {
          range: {
            startLineNumber: visualization.currentLine,
            startColumn: 1,
            endLineNumber: visualization.currentLine,
            endColumn: 1
          },
          options: {
            isWholeLine: true,
            className: 'current-line-highlight'
          }
        }
      ])
    }
  }, [visualization.currentLine])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const currentStepData = visualization.executionSteps[visualization.currentStep]
  const currentVariables = currentStepData?.variables || {}
  const currentFunctions = currentStepData?.functions || {}
  const currentCallStack = currentStepData?.callStack || []

  return (
    <div className={cn("w-full h-full flex", className)}>
      {/* Main Editor Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Card className="rounded-none border-x-0 border-t-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Code Visualizer
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedLanguage.id} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-32">
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

        {/* Editor with Visualization Controls */}
        <div className="flex-1 flex flex-col">
          <div className="bg-muted/30 p-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStepBack}
                  disabled={visualization.currentStep === 0}
                >
                  <StepBack className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={visualization.isPlaying ? handlePause : handlePlay}
                  disabled={visualization.executionSteps.length === 0 && !visualization.isPlaying}
                >
                  {visualization.isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span className="ml-1 hidden sm:inline">
                    {visualization.isPlaying ? "Pause" : "Play"}
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStepForward}
                  disabled={visualization.currentStep >= visualization.totalSteps - 1}
                >
                  <StepForward className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStop}
                  disabled={!visualization.isPlaying && visualization.currentStep === 0}
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleVisualize}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Visualize
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Step {visualization.currentStep + 1} of {visualization.totalSteps}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 relative">
            <style jsx global>{`
              .current-line-highlight {
                background-color: rgba(59, 130, 246, 0.2) !important;
                border-left: 3px solid #3b82f6 !important;
              }
            `}</style>
            <Editor
              height="100%"
              language={selectedLanguage.id}
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                readOnly: visualization.isPlaying,
                glyphMargin: true,
                lineDecorationsWidth: 10
              }}
            />

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="h-8 px-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                  {isExecuting ? "Running..." : "Execute"}
                </span>
              </Button>
            </div>
          </div>

          {/* Output Section */}
          {executionResult && (
            <Card className="rounded-none border-x-0 border-b-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Execution Output</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-24 w-full">
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

      {/* Visualization Sidebar */}
      <div className="w-80 border-l border-border flex flex-col bg-muted/20">
        <div className="bg-muted/50 p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Visualization
          </h2>
          <p className="text-sm text-muted-foreground">Code execution analysis</p>
        </div>

        <Tabs defaultValue="variables" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="variables" className="text-xs">
              <Variable className="h-3 w-3 mr-1" />
              Variables
            </TabsTrigger>
            <TabsTrigger value="functions" className="text-xs">
              <FunctionSquare className="h-3 w-3 mr-1" />
              Functions
            </TabsTrigger>
            <TabsTrigger value="stack" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              Call Stack
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 p-4">
            <TabsContent value="variables" className="space-y-3 mt-0">
              <div className="text-sm font-medium text-foreground">Variables</div>
              {Object.keys(currentVariables).length === 0 ? (
                <div className="text-sm text-muted-foreground">No variables defined</div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(currentVariables).map(([name, value]) => (
                    <div key={name} className="bg-background/50 p-2 rounded text-sm">
                      <div className="font-mono text-blue-400">{name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="functions" className="space-y-3 mt-0">
              <div className="text-sm font-medium text-foreground">Functions</div>
              {Object.keys(currentFunctions).length === 0 ? (
                <div className="text-sm text-muted-foreground">No functions defined</div>
              ) : (
                <div className="space-y-2">
                  {Object.entries(currentFunctions).map(([name, func]) => (
                    <div key={name} className="bg-background/50 p-2 rounded text-sm">
                      <div className="font-mono text-green-400">{name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Line {func.line}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="stack" className="space-y-3 mt-0">
              <div className="text-sm font-medium text-foreground">Call Stack</div>
              {currentCallStack.length === 0 ? (
                <div className="text-sm text-muted-foreground">Call stack is empty</div>
              ) : (
                <div className="space-y-1">
                  {currentCallStack.map((func, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-2 text-sm font-mono rounded",
                        index === currentCallStack.length - 1
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-background/50 text-muted-foreground"
                      )}
                    >
                      {func}()
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
