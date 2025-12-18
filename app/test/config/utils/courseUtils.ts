// =============================================
// COURSE MODEL METHODS
// =============================================

import { CourseModel } from '../types/course';
import { COURSES, CURRENT_COURSE } from '../courses/registry';

/**
 * Get the current course model
 */
export function getCurrentCourse(): CourseModel {
  return COURSES[CURRENT_COURSE];
}

/**
 * Get a course model by ID
 */
export function getCourse(courseId: string): CourseModel | null {
  return COURSES[courseId] || null;
}

/**
 * Check if a course is available
 */
export function isCourseAvailable(courseId: string): boolean {
  return courseId in COURSES;
}

/**
 * Get display name for a course
 */
export function getCourseDisplayName(courseId: string): string {
  const course = getCourse(courseId);
  return course?.displayName || courseId;
}

/**
 * Check if a course should show the code editor
 */
export function shouldShowCodeEditor(courseId: string): boolean {
  const course = getCourse(courseId);
  return course?.showCodeEditor ?? false;
}

/**
 * Get header data for a specific course
 */
export function getHeaderData(courseId: string = CURRENT_COURSE) {
  const course = getCourse(courseId);
  if (!course) {
    console.warn(`⚠️ Course '${courseId}' not found. Using default course header.`);
    return getCurrentCourse().headerData;
  }
  return course.headerData;
}

/**
 * Get available course IDs
 */
export function getAvailableCourses(): string[] {
  return Object.keys(COURSES);
}

/**
 * Get code editor configuration for a specific course
 */
export function getCodeEditorConfig(courseId: string) {
  const course = getCourse(courseId);
  if (!course?.codeEditor) {
    console.warn(`⚠️ Code editor config for course '${courseId}' not found. Using default course config.`);
    return getCurrentCourse().codeEditor;
  }
  return course.codeEditor;
}

/**
 * Get Monaco editor language identifier for a course
 */
export function getMonacoLanguage(courseId: string): string {
  const config = getCodeEditorConfig(courseId);
  return config?.monacoLanguage || 'plaintext';
}

/**
 * Get display name for code editor for a course
 */
export function getCodeEditorDisplayName(courseId: string): string {
  const config = getCodeEditorConfig(courseId);
  return config?.displayName || 'Code';
}

/**
 * Get default code template for a course
 */
export function getDefaultCode(courseId: string): string {
  const config = getCodeEditorConfig(courseId);
  return config?.defaultCode || '// No default code available';
}

/**
 * Get AI assistant configuration for a course
 */
export function getAIAssistantConfig(courseId: string) {
  const course = getCourse(courseId);
  if (!course?.aiAssistant) {
    console.warn(`⚠️ AI assistant config for course '${courseId}' not found. Using default course config.`);
    return getCurrentCourse().aiAssistant;
  }
  return course.aiAssistant;
}

/**
 * Get AI assistant name for a course
 */
export function getAIAssistantName(courseId: string): string {
  const config = getAIAssistantConfig(courseId);
  return config?.name || 'Mivvo Assistant';
}

/**
 * Get AI assistant description for a course
 */
export function getAIAssistantDescription(courseId: string): string {
  const config = getAIAssistantConfig(courseId);
  return config?.description || 'Learning Assistant';
}

/**
 * Get AI assistant system prompt for a course
 */
export function getAIAssistantPrompt(courseId: string): string {
  const config = getAIAssistantConfig(courseId);
  return config?.systemPrompt || 'You are a helpful learning assistant.';
}