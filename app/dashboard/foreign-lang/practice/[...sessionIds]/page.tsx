"use client";

import { useParams, useRouter } from "next/navigation";
import { PracticeInterface } from "../../components/practice-interface";

// Import the result type
interface PracticeResult {
  sessionId: string;
  userAnswer?: string | number | string[];
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

      // Check if it's an MCQ session
      const mcqResponse = await fetch(`/api/foreign-language/mcq/sessions/${mainSessionId}`, {
        method: 'HEAD' // Just check if it exists
      });

      let apiEndpoint: string;
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

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results,
          sessionId: mainSessionId
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Results saved successfully:', result.data);
        // Always redirect back to main foreign language page
        router.push('/dashboard/foreign-lang');
      } else {
        console.error('Failed to save results:', result.error);
        // Still redirect back to main page on error
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


