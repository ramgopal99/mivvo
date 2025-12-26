export { default as CourseOverview } from './CourseOverview';
export { default as CourseHeader } from './CourseHeader';
export { default as CourseFeatures } from './CourseFeatures';
export { default as CourseFAQ } from './CourseFAQ';
export { default as CourseFooter } from './CourseFooter';
export { LoadingState, NotFoundState } from './LoadingStates';

export interface CoursePricing {
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  isEnrolled: boolean;
  pricingTier: string;
}

export interface Module {
  id: string;
  title: string;
  order?: number;
  topics?: SubLesson[];
  exercises?: Exercise[];
}

export interface SubLesson {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
}

export interface Exercise {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  type?: 'mcq' | 'code';
  mcqQuestions?: MCQQuestion[];
  codeQuestions?: CodeQuestion[];
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

export interface CourseStats {
  sections: number;
  lessons: number;
}
