"use client";

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import MonacoEditor, { MonacoEditorRef } from './MonacoEditor';

interface RightTopSectionProps {
  onConsoleOutput: (output: string) => void;
}

const RightTopSection = ({ onConsoleOutput }: RightTopSectionProps) => {
  const editorRef = useRef<MonacoEditorRef>(null);

  const defaultValue = `// Welcome to Monaco Editor
console.log("Hello, World!");

function greet(name) {
  return "Hello, " + name + "!";
}

greet("Developer");`;

  const handleRun = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        // Create a safe execution context
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: unknown[]) => {
          logs.push(args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Execute the code
        eval(code);

        // Restore original console.log
        console.log = originalLog;

        onConsoleOutput(logs.join('\n') || 'Code executed successfully (no output)');
      } catch (error: unknown) {
        onConsoleOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(defaultValue);
      onConsoleOutput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-3 border-b bg-muted/30">
        <h3 className="text-sm font-medium text-foreground">Code Editor</h3>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <MonacoEditor
            ref={editorRef}
            defaultValue={defaultValue}
            height="100%"
            language="javascript"
            theme="vs-light"
          />
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/30">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleRun}
            >
              <Play className="h-4 w-4" />
              Run Code
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
