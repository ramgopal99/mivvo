"use client";

import { Button } from '@/components/ui/button';
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react';
import ChatBox from './ChatBox';

interface MiddleBottomProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onAI?: () => void;
  isChatOpen?: boolean;
  onCloseChat?: () => void;
  language?: string;
}

const MiddleBottom = ({ onPrevious, onNext, onAI, isChatOpen, onCloseChat, language }: MiddleBottomProps) => (
  <div className="border-t bg-muted/30">
    {/* Chat Box */}
    {isChatOpen && (
      <div className="px-6 py-2 border-b">
        <div className="flex justify-start">
          <div className="w-full max-w-md">
            <ChatBox
              isOpen={isChatOpen}
              onClose={onCloseChat || (() => {})}
              language={language}
            />
          </div>
        </div>
      </div>
    )}

    {/* Action Buttons */}
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
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
          className="flex items-center gap-2"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onNext}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default MiddleBottom;
