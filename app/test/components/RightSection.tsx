"use client";

import { useState } from 'react';
import CodingRightPanel from './right-panels/CodingRightPanel';
import AptitudeRightPanel from './right-panels/AptitudeRightPanel';
import { shouldShowCodeEditor } from '../config';

interface RightSectionProps {
  language?: string;
}

const RightSection = ({ language }: RightSectionProps) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const showCodeEditor = shouldShowCodeEditor(language || 'python');

  const handleConsoleOutput = (output: string) => {
    setConsoleOutput(output);
  };

  return (
    <div className="h-full bg-muted/20 border-l border-border overflow-hidden flex flex-col">
      {/* Top Section - Monaco Editor, Aptitude Panel, or Placeholder */}
      <div className={`${language === 'aptitude' ? 'flex-1' : 'flex-1'}`}>
        {showCodeEditor ? (
          <CodingRightPanel language={language} onConsoleOutput={handleConsoleOutput} />
        ) : language === 'aptitude' ? (
          <AptitudeRightPanel />
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Theory Course</h3>
              <p className="text-muted-foreground text-sm">
                This course focuses on theoretical concepts. No code editor is available for this course.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;
