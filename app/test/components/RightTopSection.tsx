"use client";

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, RotateCcw, Code, Info } from 'lucide-react';
import MonacoEditor, { MonacoEditorRef } from './MonacoEditor';

interface RightTopSectionProps {
  onConsoleOutput: (output: string) => void;
}

// Language configurations for Piston API
const SUPPORTED_LANGUAGES = {
  python: { name: 'Python', version: '3.10.0' },
};

const RightTopSection = ({ onConsoleOutput }: RightTopSectionProps) => {
  const editorRef = useRef<MonacoEditorRef>(null);
  const [currentLanguage, setCurrentLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);

  const getDefaultValue = (language: string) => {
    const templates = {
      python: `# Welcome to Python
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`
    };
    return templates[language as keyof typeof templates] || templates.python;
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
      const languageConfig = SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES];
      if (!languageConfig) {
        throw new Error(`Unsupported language: ${currentLanguage}`);
      }

      // Prepare the request for Piston API
      const requestBody = {
        code: code,
        language: currentLanguage
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

      // Pass the raw result to be displayed by RightBottomSection
      onConsoleOutput(JSON.stringify(result));

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorResult = {
        output: "",
        error: errorMessage,
        language: currentLanguage,
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
      const defaultCode = getDefaultValue(currentLanguage);
      editorRef.current.setValue(defaultCode);
      onConsoleOutput('');
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    if (editorRef.current) {
      // Get current code before changing language
      const currentCode = editorRef.current.getValue();

      editorRef.current.setLanguage(language);

      // Only reset to default code if the editor is empty or contains default code
      // This prevents overwriting user-written code when changing languages
      if (!currentCode.trim() || currentCode.trim() === getDefaultValue(currentLanguage).trim()) {
        const defaultCode = getDefaultValue(language);
        editorRef.current.setValue(defaultCode);
      }
      // Don't clear console output when changing language - only clear when running new code
      // onConsoleOutput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Code Editor</h3>
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SUPPORTED_LANGUAGES).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Basic Python Execution</p>
                <p className="text-xs">No GUI libraries (PyGame, Tkinter)</p>
                <p className="text-xs">No web frameworks or complex dependencies</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <MonacoEditor
            ref={editorRef}
            defaultValue={getDefaultValue(currentLanguage)}
            height="100%"
            language={currentLanguage}
            onLanguageChange={handleLanguageChange}
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

export default RightTopSection;
