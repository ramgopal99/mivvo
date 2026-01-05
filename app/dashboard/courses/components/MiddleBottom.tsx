"use client";

import { Button } from '@/components/ui/button';
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react';

interface MiddleBottomProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
  language?: string;
  isNextDisabled?: boolean;
}

const MiddleBottom = ({ onPrevious, onNext, onAI, isNextDisabled }: MiddleBottomProps) => (
  <div className="border-t">
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
          onClick={onAI}
        >
          <Brain className="h-4 w-4" />
          AI Assistant
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default MiddleBottom;
