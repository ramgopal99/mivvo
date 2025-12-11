"use client";

import { useState } from 'react';
import RightTopSection from './RightTopSection';
import RightBottomSection from './RightBottomSection';

interface RightSectionProps {
  isDemo?: boolean;
}

const RightSection = ({ isDemo = false }: RightSectionProps) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');

  const handleConsoleOutput = (output: string) => {
    setConsoleOutput(output);
  };

  return (
    <div className="h-full bg-muted/20 border-l border-border overflow-hidden flex flex-col">
      {/* Top Section - Monaco Editor */}
      <div className="flex-1 border-b border-border">
        <RightTopSection onConsoleOutput={handleConsoleOutput} isDemo={isDemo} />
      </div>

      {/* Bottom Section - Console Output */}
      <div className="h-64">
        <RightBottomSection consoleOutput={consoleOutput} />
      </div>
    </div>
  );
};

export default RightSection;
