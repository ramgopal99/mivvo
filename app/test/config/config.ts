// =============================================
// CENTRALIZED CONFIGURATION INDEX
// Main entry point for all configuration exports
// =============================================

// Export types
export type { CourseModel } from './types/course';

// Export course registry
export { COURSES, CURRENT_COURSE } from './courses/registry';

// Export utility functions
export {
  getCurrentCourse,
  getCourse,
  isCourseAvailable,
  getCourseDisplayName,
  shouldShowCodeEditor,
  getHeaderData,
  getAvailableCourses,
  getCodeEditorConfig,
  getMonacoLanguage,
  getCodeEditorDisplayName,
  getDefaultCode,
  getAIAssistantConfig,
  getAIAssistantName,
  getAIAssistantDescription,
  getAIAssistantPrompt,
} from './utils/courseUtils';

// =============================================
// INSTRUCTIONS FOR ADDING NEW COURSES
// =============================================
/*
To add a new course (e.g., 'javascript'):

1. Create the course content structure:
   - app/test/modules-javascript/
   - Update moduleLoader.ts to include the new language

2. Add to COURSES registry in config/courses/registry.ts:
   ```typescript
   export const COURSES: Record<string, CourseModel> = {
     // existing courses...
     javascript: {
       id: 'javascript',
       displayName: 'JavaScript Programming',
       headerData: {
         title: 'JavaScript Programming Course',
         completionPercentage: '0% Completed',
       },
       codeEditor: {
         monacoLanguage: 'javascript',
         displayName: 'JavaScript',
         defaultCode: 'console.log("Hello, World!");',
         executionLanguage: 'javascript',
         executionVersion: '18.15.0'
       },
       showCodeEditor: true,
       defaultModule: 1,
       autoSelectFirstTopic: true,
       showCourseSwitcher: true,
     }
   };
   ```

3. For theory courses, omit codeEditor and set showCodeEditor: false:
   ```typescript
   theory: {
     id: 'theory',
     displayName: 'Computer Science Theory',
     headerData: { title: 'CS Theory', completionPercentage: '0%' },
     showCodeEditor: false, // No code editor
     // ... other properties
   }
   ```

That's it! The entire system will automatically work with the new course.
*/