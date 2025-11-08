// Database-driven data interfaces
export interface SubLesson {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
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

export interface Exercise {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
  type?: 'mcq' | 'code';
  mcqQuestions?: MCQQuestion[];
  codeQuestions?: CodeQuestion[];
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
  isActive: boolean;
  modules: Module[];
}

// Global state for modules (will be populated from API)
let modules: Module[] = [];
let courses: Course[] = [];

// Fetch courses from database
export async function loadCourses(): Promise<Course[]> {
  try {
    console.log('🔍 Loading courses from database...');
    const response = await fetch('/api/courses');

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    const data = await response.json();
    courses = data;
    console.log('✅ Loaded', courses.length, 'courses from database');

    // For backward compatibility, also set modules from the first course
    if (courses.length > 0) {
      modules = courses[0].modules;
      console.log('✅ Set modules from first course:', modules.length, 'modules');
    }

    return courses;
  } catch (error) {
    console.error('❌ Error loading courses:', error);
    return [];
  }
}

// Load modules from the first course (for backward compatibility)
export async function loadModules(): Promise<Module[]> {
  await loadCourses();
  return modules;
}

// Export modules array for immediate access
export { modules, courses };

// Also export async functions
export { loadCourses as getCourses, loadModules as getModules };

// Initialize on module load
if (typeof window !== 'undefined') {
  loadCourses();
}
