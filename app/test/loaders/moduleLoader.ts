import { Module } from '../data/lessonsData';
import { loadPythonModules } from './pythonModuleLoader';
import { loadJavaModules } from './javaModuleLoader';
import { loadAptitudeModules } from './aptitudeModuleLoader';
import { loadLogicalModules } from './logicalModuleLoader';
import { loadVerbalModules } from './verbalModuleLoader';
import { getAvailableCourses as getCoursesFromConfig } from '../config';

// =============================================================================
// MODULE CONFIGURATIONS AND DELEGATION
// =============================================================================

/**
 * Loads modules for a specific course
 * @param language - The course type ('python', 'java', 'aptitude', 'logical')
 * @returns Promise<Module[]> - Array of loaded modules for the specified course
 */
export async function loadModules(course: string = 'python'): Promise<Module[]> {
  console.log(`🔍 Loading ${course} modules...`);

  if (course === 'python') {
    return loadPythonModules();
  } else if (course === 'java') {
    return loadJavaModules();
  } else if (course === 'aptitude') {
    return loadAptitudeModules();
  } else if (course === 'logical') {
    return loadLogicalModules();
  } else if (course === 'verbal') {
    return loadVerbalModules();
  }

  console.error(`❌ Course '${course}' not found. Available courses: ${getCoursesFromConfig().join(', ')}`);
  return [];
}

/**
 * Gets available courses
 * @returns string[] - Array of available courses
 */
export function getAvailableCourses(): string[] {
  return [...getCoursesFromConfig()];
}