"use client";

import { useState, useEffect } from 'react';
import CodeEditor from './_comp/CodeEditor';
import ConsoleOutput from './_comp/ConsoleOutput';

interface CodingTabProps {
  language?: string;
}

const CodingTab = ({ language }: CodingTabProps) => {
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (language) {
        try {
          const response = await fetch(`/api/courses/${language}`);
          if (response.ok) {
            const data = await response.json();
            setCourseData(data);
          }
        } catch (error) {
          console.error('Failed to fetch course data:', error);
        }
      }
    };

    fetchCourseData();
  }, [language]);

  const handleConsoleOutput = (output: string) => {
    setConsoleOutput(output);
  };

  const defaultCode = courseData?.defaultCode || `// ${language || 'code'}`;
  const displayName = courseData?.codeDisplayName || language || 'Code';

  return (
    <div className="h-full flex flex-col">
      {/* Top Section - Code Editor */}
      <div className="flex-1 border-b border-border">
        <CodeEditor
          onConsoleOutput={handleConsoleOutput}
          language={courseData?.monacoLanguage || language}
          defaultCode={defaultCode}
          displayName={displayName}
        />
      </div>

      {/* Bottom Section - Console Output */}
      <div className="h-64">
        <ConsoleOutput consoleOutput={consoleOutput} />
      </div>
    </div>
  );
};

export default CodingTab;