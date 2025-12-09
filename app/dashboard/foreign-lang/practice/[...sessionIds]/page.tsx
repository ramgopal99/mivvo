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

  // Handle the case where sessionIds might be a string or array
  const sessionIds = Array.isArray(params.sessionIds)
    ? params.sessionIds
    : params.sessionIds?.split(',') || [];

  const handlePracticeComplete = (results: PracticeResult[]) => {
    console.log("Practice completed with results:", results);
    // Redirect back to main foreign language page
    router.push('/dashboard/foreign-lang');
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


