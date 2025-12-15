import { Badge } from "@/components/ui/badge";
import type { SpeakingQuestion } from "../types";

interface SpeakingPracticeHeaderProps {
  currentQuestion: SpeakingQuestion;
}

export function SpeakingPracticeHeader({ currentQuestion }: SpeakingPracticeHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-4 flex-shrink-0">
      <Badge variant="outline">
        Speaking Question
      </Badge>
      <Badge variant="secondary" className="capitalize">
        {currentQuestion.category.replace('-', ' ')}
      </Badge>
    </div>
  );
}
