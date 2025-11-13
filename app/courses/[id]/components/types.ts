export interface SubLesson {
  id: string;
  title: string;
  status: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  status: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
  subLessons: SubLesson[];
  exercises: Exercise[];
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  hasDemo: boolean;
  isExpanded: boolean;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseStats {
  sections: number;
  lessons: number;
}

