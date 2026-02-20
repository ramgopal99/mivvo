export type { Course, CourseModule, Lesson } from "./types"
export { dummyCourses } from "./dummy-courses"

import type { Course } from "./types"
import { dummyCourses } from "./dummy-courses"

export function getCourseById(courseId: string): Course | undefined {
  return dummyCourses.find((c) => c.id === courseId)
}

export function getLessonById(courseId: string, lessonId: string) {
  const course = getCourseById(courseId)
  if (!course) return undefined
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId)
    if (lesson) return { course, module: mod, lesson }
  }
  return undefined
}
