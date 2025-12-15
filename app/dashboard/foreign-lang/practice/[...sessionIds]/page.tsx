"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PracticeInterface } from "../../components/practice-interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // With [...sessionIds], params.sessionIds is already an array
  const sessionIds = Array.isArray(params.sessionIds) ? params.sessionIds : [params.sessionIds as string];

  const handlePracticeComplete = async (results: PracticeResult[]) => {
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    setSubmitMessage('Submitting your practice results...');

    try {
      // Determine session type by checking if it's an MCQ or reading session
      const mainSessionId = sessionIds[0];

      // Check if it's a speaking session first
      const speakingResponse = await fetch(`/api/foreign-language/speaking/sessions/${mainSessionId}`, {
        method: 'HEAD' // Just check if it exists
      });

      let apiEndpoint: string;
      if (speakingResponse.ok) {
        // It's a speaking session
        apiEndpoint = '/api/foreign-language/speaking/results';
      } else {
        // Check if it's a writing session (since writing sessions include both writing and chat)
        const writingResponse = await fetch(`/api/foreign-language/writing/sessions/${mainSessionId}`, {
          method: 'HEAD' // Just check if it exists
        });

        if (writingResponse.ok) {
          // It's a writing session
          apiEndpoint = '/api/foreign-language/writing/results';
        } else {
          // Check if it's an MCQ session
          const mcqResponse = await fetch(`/api/foreign-language/mcq/sessions/${mainSessionId}`, {
            method: 'HEAD' // Just check if it exists
          });

          if (mcqResponse.ok) {
            // It's an MCQ session
            apiEndpoint = '/api/foreign-language/mcq/results';
          } else {
            // Check if it's a reading session
            const readingResponse = await fetch(`/api/foreign-language/reading/sessions/${mainSessionId}`, {
              method: 'HEAD' // Just check if it exists
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

      // Prepare headers with JWT token if using JWT authentication
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Check for JWT tokens in localStorage
      const token = typeof window !== 'undefined' ? (
        localStorage.getItem('token') ||
        localStorage.getItem('student_token') ||
        localStorage.getItem('college_token')
      ) : null;

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

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
        setSubmitStatus('success');
        setSubmitMessage('Practice completed successfully! Redirecting...');

        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push('/dashboard/foreign-lang');
        }, 2000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Failed to submit results. Please try again.');
        setIsSubmitting(false);
      }
    } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setSubmitStatus('error');
      setSubmitMessage('Network error occurred. Please check your connection and try again.');
      setIsSubmitting(false);
    }
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
              {submitStatus === 'submitting' && <Loader2 className="h-5 w-5 animate-spin" />}
              {submitStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
              {submitStatus === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
              {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Success!' : 'Error'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{submitMessage}</p>
            {submitStatus === 'success' && (
              <p className="text-sm text-muted-foreground">You will be redirected shortly...</p>
            )}
            {submitStatus === 'error' && (
              <Button
                onClick={() => {
                  setSubmitStatus('idle');
                  setIsSubmitting(false);
                  setSubmitMessage('');
                }}
                variant="outline"
              >
                Try Again
              </Button>
            )}
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


