"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
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
  const localStorageKey = `writing-${sessionId}`;

  // Load from localStorage or use userAnswer
  const [text, setText] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(localStorageKey);
      return saved || userAnswer;
    }
    return userAnswer;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save every 5 seconds when there are unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const saveTimer = setTimeout(async () => {
      setIsSaving(true);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(localStorageKey, text);
      }

      // Call onAnswer callback
      onAnswer(sessionId, text);

      // Simulate save delay for animation effect
      setTimeout(() => {
        setIsSaving(false);
        setHasUnsavedChanges(false);
      }, 500);
    }, 5000);

    return () => clearTimeout(saveTimer);
  }, [text, hasUnsavedChanges, sessionId, onAnswer, localStorageKey]);

  const handleTextChange = (value: string) => {
    setText(value);
    setHasUnsavedChanges(true);
  };


  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isOverLimit = data.wordLimit ? wordCount > data.wordLimit : false;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Writing Practice</CardTitle>
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
              <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                {wordCount} {data.wordLimit ? `/ ${data.wordLimit}` : ''} words
              </div>
            </div>

            <Textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start writing your response here..."
              className={`min-h-[300px] resize-none ${isOverLimit ? 'border-red-500' : ''}`}
            />

            {isOverLimit && (
              <p className="text-sm text-red-500">
                ⚠️ You have exceeded the word limit. Consider revising your response.
              </p>
            )}
          </div>

          {/* Auto-save indicator */}
          <div className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
            isSaving
              ? 'text-blue-600'
              : hasUnsavedChanges
                ? 'text-orange-600'
                : 'text-green-600'
          }`}>
            <Save className={`h-4 w-4 transition-transform duration-200 ${
              isSaving ? 'animate-pulse scale-110' : ''
            }`} />
            {isSaving
              ? 'Saving...'
              : hasUnsavedChanges
                ? 'Unsaved changes'
                : 'Auto-saved'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}