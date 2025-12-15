"use client";

import { useParams, useRouter } from "next/navigation";
import { PracticeInterface } from "../../components/practice-interface";

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

  // With [...sessionIds], params.sessionIds is already an array
  const sessionIds = Array.isArray(params.sessionIds) ? params.sessionIds : [params.sessionIds as string];

  const handlePracticeComplete = async (results: PracticeResult[]) => {
    console.log("Practice completed with results:", results);
    console.log("Session IDs:", sessionIds);

    try {
      // Determine session type by checking if it's an MCQ or reading session
      const mainSessionId = sessionIds[0];
      console.log("Using main session ID:", mainSessionId);

      // Check if it's a writing session first (since writing sessions include both writing and chat)
      const writingResponse = await fetch(`/api/foreign-language/writing/sessions/${mainSessionId}`, {
        method: 'HEAD' // Just check if it exists
      });

      let apiEndpoint: string;
      if (writingResponse.ok) {
        // It's a writing session
        apiEndpoint = '/api/foreign-language/writing/results';
        console.log("Detected writing session, using endpoint:", apiEndpoint);
      } else {
        // Check if it's an MCQ session
        const mcqResponse = await fetch(`/api/foreign-language/mcq/sessions/${mainSessionId}`, {
          method: 'HEAD' // Just check if it exists
        });

        if (mcqResponse.ok) {
          // It's an MCQ session
          apiEndpoint = '/api/foreign-language/mcq/results';
          console.log("Detected MCQ session, using endpoint:", apiEndpoint);
        } else {
          // Check if it's a reading session
          const readingResponse = await fetch(`/api/foreign-language/reading/sessions/${mainSessionId}`, {
            method: 'HEAD' // Just check if it exists
          });

          if (readingResponse.ok) {
            // It's a reading session
            apiEndpoint = '/api/foreign-language/reading/results';
            console.log("Detected reading session, using endpoint:", apiEndpoint);
          } else {
            // Fallback to the old combined endpoint
            apiEndpoint = '/api/foreign-language/user/results';
            console.log("Could not determine session type, using fallback endpoint:", apiEndpoint);
          }
        }
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
          results,
          sessionId: mainSessionId
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Results saved successfully:', result.data);
        // Always redirect to main foreign language page
        router.push('/dashboard/foreign-lang');
      } else {
        console.error('Failed to save results:', result.error);
        // Redirect back to main page on error
        router.push('/dashboard/foreign-lang');
      }
    } catch (error) {
      console.error('Error saving practice results:', error);
      // Redirect back to main page on error
      router.push('/dashboard/foreign-lang');
    }
  };

  const handleExitPractice = () => {
    // Redirect back to main foreign language page
    router.push('/dashboard/foreign-lang');
  };

  if (sessionIds.length === 0) {
    return <div>Invalid practice session</div>;
  }

  return (
    <PracticeInterface
      sessionIds={sessionIds}
      onComplete={handlePracticeComplete}
      onExit={handleExitPractice}
    />
  );
}


