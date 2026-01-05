"use client";

import { Button } from '@/components/ui/button';
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react';

interface MiddleBottomProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  onRightSidebar?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
  language?: string;
  isNextDisabled?: boolean;
}

const MiddleBottom = ({ onPrevious, onNext, onAI, onRightSidebar, isNextDisabled }: MiddleBottomProps) => (
  <div className="border-t">
    <div className="flex items-center justify-between px-3 py-2 md:px-6 md:py-3">
      {/* AI Assistant and Tools Buttons */}
      <div className="flex gap-1 md:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 md:gap-2 cursor-pointer text-xs md:text-sm"
          onClick={onAI}
        >
          <Brain className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden sm:inline">AI Assistant</span>
          <span className="sm:hidden">AI</span>
        </Button>

        {/* Right Sidebar Button - Mobile Only */}
        {onRightSidebar && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 md:gap-2 cursor-pointer text-xs md:text-sm md:hidden"
            onClick={onRightSidebar}
            title="Open tools panel"
          >
            <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Tools</span>
            <span className="sm:hidden">📄</span>
          </Button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-1 md:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 md:gap-2 cursor-pointer text-xs md:text-sm px-2 md:px-3"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden md:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default MiddleBottom;
