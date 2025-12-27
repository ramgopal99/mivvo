// Database-compatible interfaces for dashboard courses
// These match the Prisma schema models

export interface CourseTopic {
  id: string;
  title: string;
  order: number;
  status: 'DEMO' | 'LOCKED' | 'COMPLETED';
  content?: string;
}

export interface CourseMcqQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  order: number;
}

export interface CourseCodeQuestion {
  id: string;
  question: string;
  solution: string;
  order: number;
}

export interface CourseExercise {
  id: string;
  title: string;
  order: number;
  status: 'DEMO' | 'LOCKED' | 'COMPLETED';
  content?: string;
  type: 'MCQ' | 'CODE';
  mcqQuestions: CourseMcqQuestion[];
  codeQuestions: CourseCodeQuestion[];
}

export interface CourseFormula {
  id: string;
  formulaId: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables?: Array<{
    symbol: string;
    description: string;
  }>;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
  topics: CourseTopic[];
  exercises: CourseExercise[];
  formulas: CourseFormula[];
}

// Utility functions for working with course data
export function findModuleByOrder(modules: CourseModule[], order: number): CourseModule | undefined {
  return modules.find(m => m.order === order);
}

export function findTopicById(topics: CourseTopic[], id: string): CourseTopic | undefined {
  return topics.find(t => t.id === id);
}

export function findExerciseById(exercises: CourseExercise[], id: string): CourseExercise | undefined {
  return exercises.find(e => e.id === id);
}
