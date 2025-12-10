"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Save, Eye } from "lucide-react";
import { type WritingTopicData } from "../data/writing-practice-data";

interface WritingPracticeInterfaceProps {
  sessionId: string;
  data: WritingTopicData;
  userAnswer?: string;
  onAnswer: (sessionId: string, answer: string) => void;
}

export function WritingPracticeInterface({
  sessionId,
  data,
  userAnswer = "",
  onAnswer
}: WritingPracticeInterfaceProps) {
  const [text, setText] = useState(userAnswer);
  const [timeRemaining, setTimeRemaining] = useState(data.timeLimit * 60); // Convert to seconds
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  // Auto-save the answer
  useEffect(() => {
    onAnswer(sessionId, text);
  }, [text, onAnswer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isOverLimit = data.wordLimit ? wordCount > data.wordLimit : false;

  const handleTextChange = (value: string) => {
    setText(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Writing Practice</CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Time Limit: {data.timeLimit} minutes</Badge>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={`text-sm ${timeRemaining < 300 ? 'text-red-500 font-bold' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Topic Information */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">{data.topic}</h3>
            <p className="text-sm text-muted-foreground mb-3">{data.description}</p>
            <div className="p-3 bg-background rounded border-l-4 border-primary">
              <h4 className="font-medium mb-2">Instructions:</h4>
              <p className="text-sm">{data.instructions}</p>
            </div>
            {data.wordLimit && (
              <div className="mt-3 text-sm text-muted-foreground">
                Word limit: {data.wordLimit} words
              </div>
            )}
          </div>

          {/* Writing Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Your Response:</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {isPreviewMode ? 'Edit' : 'Preview'}
                </Button>
                <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {wordCount} {data.wordLimit ? `/ ${data.wordLimit}` : ''} words
                </div>
              </div>
            </div>

            {isPreviewMode ? (
              <div className="p-4 border rounded-lg bg-muted/20 min-h-[300px] whitespace-pre-wrap">
                {text || <span className="text-muted-foreground">Your writing will appear here...</span>}
              </div>
            ) : (
              <Textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Start writing your response here..."
                className={`min-h-[300px] resize-none ${isOverLimit ? 'border-red-500' : ''}`}
              />
            )}

            {isOverLimit && (
              <p className="text-sm text-red-500">
                ⚠️ You have exceeded the word limit. Consider revising your response.
              </p>
            )}
          </div>

          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Save className="h-4 w-4" />
            Auto-saved
          </div>
        </CardContent>
      </Card>
    </div>
  );
}