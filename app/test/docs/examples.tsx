// =============================================
// USAGE EXAMPLES - Course Config System
// =============================================

import TestPage from '../pages/TestPage';
import LanguageTestWrapper from '../language/LanguageTestWrapper';
import { getCurrentCourse, isCourseAvailable } from '../config/course';

// =============================================
// EXAMPLE 1: Basic Usage (Uses config automatically)
// =============================================

// This will automatically use the course set in config/course.ts
export function BasicTestPage() {
  return <TestPage />;
}

// =============================================
// EXAMPLE 2: Override config (for testing/debugging)
// =============================================

// Force a specific course regardless of config
export function PythonTestPage() {
  return <TestPage language="python" />;
}

export function JavaTestPage() {
  return <TestPage language="java" />;
}

// =============================================
// EXAMPLE 3: With Course Switcher
// =============================================

// Includes UI buttons to switch between courses
export function CourseSwitcherPage() {
  return <LanguageTestWrapper />;
}

// =============================================
// EXAMPLE 4: Dynamic Course Loading
// =============================================

export function DynamicCoursePage() {
  const currentCourse = getCurrentCourse();

  return (
    <div>
      <h1>Current Course: {currentCourse}</h1>
      <TestPage language={currentCourse} />
    </div>
  );
}

// =============================================
// EXAMPLE 5: Conditional Course Loading
// =============================================

export function ConditionalCoursePage({ requestedCourse }: { requestedCourse: string }) {
  // Check if the requested course is available
  if (!isCourseAvailable(requestedCourse)) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-500">Course Not Available</h2>
        <p>The requested course &quot;{requestedCourse}&quot; is not available.</p>
        <p>Available courses: python, java</p>
        {/* Fallback to config course */}
        <TestPage />
      </div>
    );
  }

  return <TestPage language={requestedCourse} />;
}

// =============================================
// HOW TO SWITCH COURSES
// =============================================

/*
To switch courses, simply change the CURRENT_COURSE variable in config/course.ts:

1. Open app/test/config/course.ts
2. Change this line:
   export const CURRENT_COURSE: 'python' | 'java' = 'java';  // Currently Java

   To:
   export const CURRENT_COURSE: 'python' | 'java' = 'python'; // Switch to Python

3. Save the file - the entire app will now use Python content!

That's it! No other files need to be changed.
*/
