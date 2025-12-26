export interface Course {
  id: string;
  courseId: string;
  title: string;
  displayName: string;
  description: string | null;
  headerTitle: string | null;
  completionPercentage: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  modules?: Module[];
  userProgress?: {
    completedItems: number;
    totalItems: number;
    progressPercentage: number;
    isEnrolled: boolean;
  };
}

export interface Module {
  id: string;
  title: string;
  hasDemo: boolean;
  isExpanded?: boolean;
  isActive?: boolean;
  order: number;
  topics?: SubLesson[];
  exercises?: Exercise[];
}

export interface SubLesson {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  type?: 'mcq' | 'code';
  mcqQuestions?: MCQQuestion[];
  codeQuestions?: CodeQuestion[];
  order: number;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CodeQuestion {
  id: string;
  question: string;
  solution: string;
}

export interface UserProgress {
  courseId: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export interface CourseStats {
  sections: number;
  lessons: number;
}
