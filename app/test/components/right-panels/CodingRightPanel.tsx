"use client";

import { useState } from 'react';
import CodeEditor from './coding/CodeEditor';
import ConsoleOutput from './coding/ConsoleOutput';

interface CodingRightPanelProps {
  language?: string;
  onConsoleOutput: (output: string) => void;
}

const CodingRightPanel = ({ language, onConsoleOutput }: CodingRightPanelProps) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');

  const handleConsoleOutput = (output: string) => {
    setConsoleOutput(output);
    onConsoleOutput(output);
  };

  return (
    <div className="h-full bg-muted/20 border-l border-border overflow-hidden flex flex-col">
      {/* Top Section - Code Editor */}
      <div className="flex-1 border-b border-border">
        <CodeEditor onConsoleOutput={handleConsoleOutput} language={language} />
      </div>

      {/* Bottom Section - Console Output */}
      <div className="h-64">
        <ConsoleOutput consoleOutput={consoleOutput} />
      </div>
    </div>
  );
};

export default CodingRightPanel;
