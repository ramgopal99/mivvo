// Course-related type definitions
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  students: number;
  tags: string[];
  thumbnail?: string;
}

export interface CourseFilters {
  level?: string;
  category?: string;
  priceRange?: [number, number];
  rating?: number;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedModules: string[];
  currentModule?: string;
  progressPercentage: number;
  lastAccessedAt: Date;
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseCategory =
  | 'Web Development'
  | 'Mobile Development'
  | 'Data Science'
  | 'Machine Learning'
  | 'Design'
  | 'DevOps'
  | 'Security'
  | 'Business';
