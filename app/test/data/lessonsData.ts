import { loadModules } from '../../../utils/moduleLoader';

export interface SubLesson {
  id: number;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
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
  id: number;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
  type?: 'mcq' | 'code';
  mcqQuestions?: MCQQuestion[];
  codeQuestions?: CodeQuestion[];
}

export interface Module {
  id: number;
  title: string;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
  subLessons: SubLesson[];
  exercises: Exercise[];
}

// Load modules synchronously using static imports
let modules: Module[] = [];

(async () => {
  try {
    console.log('🔍 Loading modules...');
    const loadedModules = await loadModules();
    modules = loadedModules;
    console.log('✅ Loaded', loadedModules.length, 'modules:', loadedModules.map(m => m.title));
  } catch (error) {
    console.error('❌ Error loading modules:', error);
  }
})();

// Export modules array for immediate access
export { modules };

// Also export async function for manual loading
export { loadModules as getModules };
