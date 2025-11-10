// =============================================
// COURSE CONFIGURATION
// Change this variable to switch courses
// =============================================

// Available courses: 'python', 'java', 'c', 'cpp', 'javascript'
// Future courses will be added here
export const CURRENT_COURSE: 'python' | 'java' | 'c' | 'cpp' | 'javascript' = 'javascript';

// 🚀 QUICK START: Change the line above to switch courses!
// Examples:
// export const CURRENT_COURSE = 'python';      // Switch to Python
// export const CURRENT_COURSE = 'java';        // Switch to Java
// export const CURRENT_COURSE = 'c';           // Switch to C
// export const CURRENT_COURSE = 'cpp';         // Switch to C++
// export const CURRENT_COURSE = 'javascript';  // Switch to JavaScript

// =============================================
// ADVANCED CONFIGURATION (Optional)
// =============================================

// You can also configure multiple settings here
export const COURSE_CONFIG = {
  // Current active course
  activeCourse: CURRENT_COURSE,

  // Available courses (automatically detected)
  availableCourses: ['python', 'java', 'c', 'cpp', 'javascript'] as const,

  // Course display names
  courseDisplayNames: {
    python: 'Python Programming',
    java: 'Java Programming',
    c: 'C Programming',
    cpp: 'C++ Programming',
    javascript: 'JavaScript Programming',
  } as const,

  // Default module to show (1-based)
  defaultModule: 1,

  // Auto-select first topic when switching courses
  autoSelectFirstTopic: true,

  // Show course switcher in UI
  showCourseSwitcher: true,
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Get the current course configuration
 */
export function getCurrentCourse() {
  return CURRENT_COURSE;
}

/**
 * Check if a course is available
 */
export function isCourseAvailable(course: string): boolean {
  return COURSE_CONFIG.availableCourses.includes(course as any);
}

/**
 * Get display name for a course
 */
export function getCourseDisplayName(course: string): string {
  return COURSE_CONFIG.courseDisplayNames[course as keyof typeof COURSE_CONFIG.courseDisplayNames] || course;
}

// =============================================
// INSTRUCTIONS FOR ADDING NEW COURSES
// =============================================
/*
To add a new course (e.g., 'javascript'):

1. Create the course content structure:
   - app/test/modules-javascript/
   - app/test/data/headerData-javascript.ts

2. Update the utils/moduleLoader.ts and utils/headerDataLoader.ts files

3. Update this config file:
   export const CURRENT_COURSE: 'python' | 'java' | 'javascript' = 'javascript';

   export const COURSE_CONFIG = {
     availableCourses: ['python', 'java', 'javascript'] as const,
     courseDisplayNames: {
       python: 'Python Programming',
       java: 'Java Programming',
       javascript: 'JavaScript Programming',
     } as const,
     // ... rest of config
   };

4. That's it! Change CURRENT_COURSE to switch to the new course.
*/
