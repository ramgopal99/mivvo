"use client";

import { Badge } from "@/components/ui/badge";
import { type WritingTopicData } from "../data/practice-data";

interface WritingPracticeProps {
  data: WritingTopicData;
  userAnswer?: string;
  onAnswer: (answer: string) => void;
}

export function WritingPractice({
  data,
  userAnswer = "",
  onAnswer
}: WritingPracticeProps) {
  const wordCount = userAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = userAnswer.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden p-8">
      {/* Left side - Title and Instructions */}
      <div className="space-y-6 pr-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center lg:text-left">{data.topic}</h3>
          <p className="text-muted-foreground leading-relaxed">{data.instructions}</p>
          <div className="flex justify-center lg:justify-start gap-4 text-sm">
            <Badge variant="secondary">Word limit: {data.wordLimit}</Badge>
            <Badge variant="secondary">Time limit: {data.timeLimit} minutes</Badge>
          </div>
        </div>
      </div>

      {/* Right side - Writing Area */}
      <div className="space-y-4 pl-4">
        <textarea
          className="w-full p-4 border rounded-lg h-[calc(100vh-250px)] resize-none overflow-y-auto"
          placeholder="Start writing here..."
          value={userAnswer}
          onChange={(e) => onAnswer(e.target.value)}
          style={{ height: 'calc(100vh - 250px)', resize: 'none' }}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
        </div>
      </div>
    </div>
  );
}