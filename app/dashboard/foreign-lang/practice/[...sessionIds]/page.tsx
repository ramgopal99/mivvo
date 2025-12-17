"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PracticeInterface } from "../../components/practice-interface";
import { getAuthHeaders } from "@/lib/auth-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Import the result type from practice interface
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface PracticeResult {
  sessionId: string;
  userAnswer?: string | number | string[] | ChatMessage[];
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // With [...sessionIds], params.sessionIds is already an array
  const sessionIds = Array.isArray(params.sessionIds) ? params.sessionIds : [params.sessionIds as string];

  const handlePracticeComplete = async (results: PracticeResult[]) => {
    // Immediately show success state and start redirect timer
    setIsSubmitting(true);
    setSubmitStatus('success');
    setSubmitMessage('Practice completed successfully! Your detailed analysis results will be available automatically in a few minutes.');

    // Start redirect timer (3 seconds)
    setTimeout(() => {
      router.push('/dashboard/foreign-lang');
    }, 3000);

    // Submit results in background (fire and forget)
    const submitInBackground = async () => {
      try {
        // Determine session type by checking if it's an MCQ or reading session
        const mainSessionId = sessionIds[0];

        // Check if it's a speaking session first
        const speakingResponse = await fetch(`/api/foreign-language/speaking/sessions/${mainSessionId}`, {
          method: 'HEAD', // Just check if it exists
          headers: getAuthHeaders()
        });

        let apiEndpoint: string;
        if (speakingResponse.ok) {
          // It's a speaking session
          apiEndpoint = '/api/foreign-language/speaking/results';
        } else {
          // Check if it's a writing session (since writing sessions include both writing and chat)
          const writingResponse = await fetch(`/api/foreign-language/writing/sessions/${mainSessionId}`, {
            method: 'HEAD', // Just check if it exists
            headers: getAuthHeaders()
          });

          if (writingResponse.ok) {
            // It's a writing session
            apiEndpoint = '/api/foreign-language/writing/results';
          } else {
            // Check if it's an MCQ session
            const mcqResponse = await fetch(`/api/foreign-language/mcq/sessions/${mainSessionId}`, {
              method: 'HEAD', // Just check if it exists
              headers: getAuthHeaders()
            });

            if (mcqResponse.ok) {
              // It's an MCQ session
              apiEndpoint = '/api/foreign-language/mcq/results';
            } else {
              // Check if it's a reading session
              const readingResponse = await fetch(`/api/foreign-language/reading/sessions/${mainSessionId}`, {
                method: 'HEAD', // Just check if it exists
                headers: getAuthHeaders()
              });

              if (readingResponse.ok) {
                // It's a reading session
                apiEndpoint = '/api/foreign-language/reading/results';
              } else {
                // Fallback to the old combined endpoint
                apiEndpoint = '/api/foreign-language/user/results';
              }
            }
          }
        }

        // Enhance results with localStorage data for speaking sessions
        let enhancedResults = results;
        if (apiEndpoint === '/api/foreign-language/speaking/results' && typeof window !== 'undefined') {
          enhancedResults = results.map(result => {
            const resultKey = `speaking-result-${result.sessionId}`;
            const resultData = localStorage.getItem(resultKey);

            console.log('Enhancing result for sessionId:', result.sessionId);
            console.log('Looking for localStorage key:', resultKey);
            console.log('localStorage data found:', !!resultData);

            if (resultData) {
              try {
                const savedResult = JSON.parse(resultData);
                console.log('Parsed saved result:', savedResult);
                console.log('Saved userAnswer:', savedResult.userAnswer);
                console.log('Saved duration:', savedResult.duration);

                // Only use saved result if it's recent (within last 24 hours)
                if (Date.now() - savedResult.timestamp < 24 * 60 * 60 * 1000) {
                  // Calculate word count from user answer
                  const userAnswer = savedResult.userAnswer || result.userAnswer || '';
                  const wordCount = userAnswer.trim().length > 0 ? userAnswer.trim().split(/\s+/).filter((word: string) => word.length > 0).length : 0;

                  const enhanced = {
                    ...result,
                    userAnswer: userAnswer,
                    timeSpent: savedResult.duration || result.timeSpent,
                    wordCount: wordCount
                  };
                  console.log('Enhanced result:', enhanced);
                  return enhanced;
                } else {
                  console.log('Saved result is too old');
                }
              } catch (error) {
                console.warn('Failed to parse speaking result:', error);
              }
            } else {
              console.log('No localStorage data found for key:', resultKey);
            }

            console.log('Returning original result:', result);
            return result;
          });

          // Clean up saved results after submission
          enhancedResults.forEach(result => {
            const resultKey = `speaking-result-${result.sessionId}`;
            localStorage.removeItem(resultKey);
          });
        }

        // Prepare headers with authentication
        const headers = getAuthHeaders(true);

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            results: enhancedResults,
            sessionId: mainSessionId
          }),
        });

        const result = await response.json();
        if (result.success) {
          console.log('Background submission successful');
        } else {
          console.warn('Background submission failed:', result.message);
          // Note: User has already been redirected, so we just log the error
          // In a real app, you might want to show a toast notification or save to retry later
        }
      } catch (error) {
        console.warn('Background submission error:', error);
        // Note: User has already been redirected, so we just log the error
        // In a real app, you might want to implement retry logic or user notification
      }
    };

    // Start background submission
    submitInBackground();
  };


  if (sessionIds.length === 0) {
    return <div>Invalid practice session</div>;
  }

  // Show submission status overlay when submitting
  if (isSubmitting || submitStatus !== 'idle') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Success!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{submitMessage}</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Redirecting you back...</p>
              <p className="text-xs text-muted-foreground/80">⏱️ Analysis typically takes 1-2 minutes</p>-
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <PracticeInterface
      sessionIds={sessionIds}
      onComplete={handlePracticeComplete}
    />
  );
}


