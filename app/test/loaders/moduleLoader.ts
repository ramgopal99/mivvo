import { Module } from '../data/lessonsData';
import { loadPythonModules } from './pythonModuleLoader';
import { loadJavaModules } from './javaModuleLoader';
import { loadAptitudeModules } from './aptitudeModuleLoader';
import { getAvailableCourses } from '../config';

// =============================================================================
// MODULE CONFIGURATIONS AND DELEGATION
// =============================================================================

/**
 * Loads modules for a specific programming language
 * @param language - The programming language ('python', 'java')
 * @returns Promise<Module[]> - Array of loaded modules for the specified language
 */
export async function loadModules(language: string = 'python'): Promise<Module[]> {
  console.log(`🔍 Loading ${language} modules...`);

  if (language === 'python') {
    return loadPythonModules();
  } else if (language === 'java') {
    return loadJavaModules();
  } else if (language === 'aptitude') {
    return loadAptitudeModules();
  }

  console.error(`❌ Language '${language}' not found. Available languages: ${getAvailableCourses().join(', ')}`);
  return [];
}

/**
 * Gets available languages
 * @returns string[] - Array of available programming languages
 */
export function getAvailableLanguages(): string[] {
  return [...getAvailableCourses()];
}