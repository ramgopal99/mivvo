"use client";

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, RotateCcw, Code, Info, ChevronDown, ChevronUp, Terminal, HelpCircle } from 'lucide-react';
import MonacoEditor, { MonacoEditorRef } from '../../MonacoEditor';

// Monaco editor interface for the methods we use
interface MonacoEditorInstance {
  getValue(): string;
  onDidChangeModelContent(callback: () => void): void;
}
interface CodeEditorProps {
  onConsoleOutput: (output: string) => void;
  language?: string;
  defaultCode?: string;
  displayName?: string;
}

const CodeEditor = ({ onConsoleOutput, language = 'python', defaultCode, displayName }: CodeEditorProps) => {
  const editorRef = useRef<MonacoEditorRef>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [isAutoShown, setIsAutoShown] = useState(false);

  // Detect if code needs input
  const checkIfNeedsInput = (code: string) => {
    if (!code) return false;
    const inputPatterns = [
      /input\s*\(/i,           // Python input()
      /scanf\s*\(/i,           // C/C++ scanf()
      /readLine\s*\(/i,        // Java readLine()
      /Scanner\s*\./i,         // Java Scanner
      /cin\s*>>/i,             // C++ cin
      /read\s*\(/i,            // Other languages
    ];
    return inputPatterns.some(pattern => pattern.test(code));
  };

  // Auto-show/hide stdin based on code content
  const updateStdinVisibility = (code: string) => {
    const needsInput = checkIfNeedsInput(code);
    setIsAutoShown(needsInput);
    // Only auto-show if it needs input, but allow manual hiding
    if (needsInput) {
      setShowStdin(true);
    }
  };

  // Clean output by removing input prompts
  const cleanOutput = (output: string, stdin: string, code: string) => {
    if (!output || !stdin) return output;

    // Only clean output if the code actually contains input functions
    const needsInput = checkIfNeedsInput(code);
    if (!needsInput) return output;

    const stdinLines = stdin.trim().split('\n').map(line => line.trim()).filter(line => line);
    if (stdinLines.length === 0) return output;

    const lines = output.split('\n');
    const cleanedLines: string[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();

      // Check if this line contains one of our input values with a prompt
      let foundMatch = false;
      for (const inputValue of stdinLines) {
        // More specific pattern: look for prompt patterns that are likely from input() functions
        // Should have some text before the input value that looks like a prompt (contains keywords or ends with punctuation)
        const promptPattern = new RegExp(`^(.{3,}?)(?::|\\s*\\?\\s*)${inputValue}$`, 'i');
        const match = trimmed.match(promptPattern);

        if (match && match[1].trim().length > 0) {
          // Additional check: the prompt part should contain typical input keywords or end with punctuation
          const promptText = match[1].trim().toLowerCase();
          const hasPromptKeywords = /\b(enter|input|please|type|give|provide|number|name|value|string)\b/i.test(promptText);
          const endsWithPunctuation = /[!?.:]$/.test(promptText);

          if (hasPromptKeywords || endsWithPunctuation) {
            // Replace the line with just the input value (remove the prompt)
            cleanedLines.push(inputValue);
            foundMatch = true;
            break;
          }
        }
      }

      // If no prompt pattern matched, keep the line as-is (it might be actual output)
      if (!foundMatch) {
        cleanedLines.push(line);
      }
    });

    return cleanedLines.join('\n').trim();
  };

  const editorConfig = {
    monacoLanguage: language,
    displayName: displayName || language,
    defaultCode: defaultCode || `// ${language} code`,
    executionLanguage: language,
    executionVersion: language === 'python' ? '3.10.0' : language === 'java' ? '15.0.2' : 'latest'
  };

  const getDefaultValue = () => {
    return defaultCode || `// ${language} code`;
  };

  const handleRun = async () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    if (!code.trim()) {
      onConsoleOutput('Please enter some code to run.');
      return;
    }

    // Check if code needs input
    const needsInput = checkIfNeedsInput(code);
    if (needsInput && !stdin.trim()) {
      onConsoleOutput('⚠️ Your code requires input. Please provide input values in the terminal stdin field.');
      return;
    }

    setIsRunning(true);
    // Auto-close stdin section when running code
    setShowStdin(false);
    setIsAutoShown(false);
    onConsoleOutput('Running code...');

    try {
      // Prepare the request for Piston API
      const requestBody: {
        code: string;
        language: string;
        version: string;
        stdin?: string;
      } = {
        code: code,
        language: editorConfig.executionLanguage,
        version: editorConfig.executionVersion
      };

      // Add stdin if provided (for handling input() in Python, scanf() in C, etc.)
      if (stdin.trim()) {
        requestBody.stdin = stdin;
      }

      // Call the API
      const response = await fetch('/api/piston', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Clean the output by removing input prompts if stdin was provided
      if (stdin.trim() && result.output) {
        result.output = cleanOutput(result.output, stdin, code);
      }

      // Pass the cleaned result to be displayed by ConsoleOutput
      onConsoleOutput(JSON.stringify(result));

    } catch (error: unknown) {
      let errorMessage = error instanceof Error ? error.message : String(error);

      // Provide more user-friendly error messages
      if (errorMessage.includes('timed out') || errorMessage.includes('Time limit exceeded')) {
        errorMessage = 'Code execution timed out. Try simpler code or avoid infinite loops.';
      } else if (errorMessage.includes('Failed to execute code')) {
        errorMessage = 'Unable to connect to code execution service. Please try again later.';
      } else if (errorMessage.includes('SyntaxError') || errorMessage.includes('IndentationError')) {
        errorMessage = 'Syntax error in your code. Please check your code and try again.';
      }

      const errorResult = {
        output: "",
        error: errorMessage,
        language: 'python',
        executionTime: 0,
        memoryUsage: 0,
        exitCode: 1
      };
      onConsoleOutput(JSON.stringify(errorResult));
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (editorRef.current) {
      const defaultCode = getDefaultValue();
      editorRef.current.setValue(defaultCode);
      setStdin('');
      onConsoleOutput('');
      // Reset auto-show state and check if default code needs input
      updateStdinVisibility(defaultCode);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Code Editor</h3>
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{displayName || language}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">{displayName || language} Code Execution</p>
                {language === 'python' && (
                  <>
                    <p className="text-xs">No GUI libraries (PyGame, Tkinter)</p>
                    <p className="text-xs">No web frameworks or complex dependencies</p>
                  </>
                )}
                {language === 'java' && (
                  <>
                    <p className="text-xs">Standard Java syntax supported</p>
                    <p className="text-xs">No external libraries or frameworks</p>
                  </>
                )}
                <p className="text-xs">Time limit: ~3 seconds</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <MonacoEditor
            ref={editorRef}
            defaultValue={getDefaultValue()}
            height="100%"
            language={editorConfig.monacoLanguage}
            onMount={(editor) => {
              // Cast to MonacoEditorInstance to access methods
              const monacoEditor = editor as MonacoEditorInstance;
              // Check initial code for input functions
              const initialCode = monacoEditor.getValue();
              updateStdinVisibility(initialCode);

              // Add change listener to auto-update stdin visibility
              monacoEditor.onDidChangeModelContent(() => {
                const currentCode = monacoEditor.getValue();
                updateStdinVisibility(currentCode);
              });
            }}
          />
        </div>
        <div className="border-t bg-muted/30">
          {/* Collapsible stdin input section */}
          <div className="border-b">
            <button
              type="button"
              onClick={() => {
                // Allow manual toggle, but track that it's no longer auto-managed
                setShowStdin(!showStdin);
                setIsAutoShown(false);
              }}
              className="w-full px-6 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <Label className="text-xs font-medium text-foreground cursor-pointer">
                  Program Input
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <div className="space-y-3">
                      <div className="text-center">
                        <p className="font-semibold text-sm text-white">Input Examples</p>
                        <p className="text-xs text-white mt-1">For Python programs</p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800 border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs font-medium text-white">Your Code:</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1 mb-2">
                          <code className="text-xs text-slate-700 dark:text-slate-300">name = input(&quot;Enter name: &quot;)</code>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded px-2 py-1">
                          <code className="text-xs text-slate-700 dark:text-slate-300">age = input(&quot;Enter age: &quot;)</code>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-white">Enter Here:</span>
                        </div>
                        <div className="bg-white dark:bg-slate-700 border border-green-300 dark:border-green-600 rounded px-2 py-2">
                          <div className="text-xs font-mono text-green-700 dark:text-green-300 leading-relaxed">
                            John<br/>
                            25
                          </div>
                        </div>
                        <p className="text-xs text-white mt-2 font-medium">
                          One value per line
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
                {isAutoShown && showStdin && (
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                    Auto-shown
                  </span>
                )}
                {stdin.trim() && (
                  <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                    Ready
                  </span>
                )}
              </div>
              {showStdin ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {showStdin && (
              <div className="px-6 pb-3 pt-2 bg-muted/20">
                <Label htmlFor="stdin-input" className="text-xs text-muted-foreground mb-1 block">
              Enter values for program input (like <span className="font-mono bg-muted px-1 rounded">input()</span> in Python)
            </Label>
                <Textarea
                  id="stdin-input"
                  placeholder="Enter values here, one per line"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  className="mt-1 min-h-[80px] resize-none font-mono text-sm"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-2">
              💡 <strong>Tip:</strong> Enter all input values before running your code. Each line represents one input to your program.
            </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleRun}
                disabled={isRunning}
              >
                <Play className="h-4 w-4" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;