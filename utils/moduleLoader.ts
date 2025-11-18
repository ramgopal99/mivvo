import { Module } from '../app/dashboard/courses/[courseId]/data/lessonsData';

/**
 * Loads all modules from the database via API (works reliably in browser and server)
 * @returns Promise<Module[]> - Array of loaded modules
 */
export async function loadModules(): Promise<Module[]> {
  console.log('🔍 Loading modules from database API...');

  try {
    // Fetch courses from the API
    const response = await fetch('/api/courses');

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    const courses = await response.json();

    // Extract modules from the first course (for backward compatibility)
    if (courses.length > 0 && courses[0].modules) {
      const modules = courses[0].modules;
      console.log(`✅ Loaded ${modules.length} modules from database:`, modules.map((m: Module) => m.title));
  return modules;
    } else {
      console.log('⚠️ No courses found in database, returning empty array');
      return [];
    }
  } catch (error) {
    console.error('❌ Error loading modules from database:', error);
    return [];
  }
}

/**
 * Legacy function for backward compatibility
 * This now delegates to loadModules() for consistency
 */
export const getModules = loadModules;
