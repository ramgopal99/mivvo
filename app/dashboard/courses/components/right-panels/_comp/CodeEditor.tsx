"use client";

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, RotateCcw, Code, Info } from 'lucide-react';
import MonacoEditor, { MonacoEditorRef } from '../../MonacoEditor';
interface CodeEditorProps {
  onConsoleOutput: (output: string) => void;
  language?: string;
  defaultCode?: string;
  displayName?: string;
}

const CodeEditor = ({ onConsoleOutput, language = 'python', defaultCode, displayName }: CodeEditorProps) => {
  const editorRef = useRef<MonacoEditorRef>(null);
  const [isRunning, setIsRunning] = useState(false);

  const editorConfig = {
    monacoLanguage: language,
    displayName: displayName || language,
    defaultCode: defaultCode || `// ${language} code`
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

    setIsRunning(true);
    onConsoleOutput('Running code...');

    try {
      // Prepare the request for Piston API
      const requestBody = {
        code: code,
        language: editorConfig.executionLanguage,
        version: editorConfig.executionVersion
      };

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

      // Pass the raw result to be displayed by ConsoleOutput
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
      onConsoleOutput('');
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
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
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
          />
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/30">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleRun}
              disabled={isRunning}
            >
              <Play className="h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;