"use client";

import { useState } from 'react';
import CodeEditor from './_comp/CodeEditor';
import ConsoleOutput from './_comp/ConsoleOutput';

interface CodingTabProps {
  language?: string;
}

const CodingTab = ({ language }: CodingTabProps) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');

  const handleConsoleOutput = (output: string) => {
    setConsoleOutput(output);
  };

  return (
    <div className="h-full flex flex-col">
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

export default CodingTab;