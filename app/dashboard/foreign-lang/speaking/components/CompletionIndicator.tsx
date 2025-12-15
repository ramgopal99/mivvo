import { CheckCircle } from "lucide-react";

interface CompletionIndicatorProps {
  hasAnswered: boolean;
  recordingCompleted: boolean;
}

export function CompletionIndicator({ hasAnswered, recordingCompleted }: CompletionIndicatorProps) {
  if (!hasAnswered && !recordingCompleted) return null;

  return (
    <div className="flex justify-center mt-4 flex-shrink-0">
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm md:text-base">
        <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
        <span className="font-medium text-center">Question completed! Use the Next button in the footer to continue.</span>
      </div>
    </div>
  );
}
