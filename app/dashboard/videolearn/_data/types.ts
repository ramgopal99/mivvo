/** A single lesson within a module (e.g. one video/slide set). */
export interface Lesson {
  id: string
  title: string
  order: number
  durationMinutes?: number
}

/** A module groups lessons under one topic (module-type approach). */
export interface CourseModule {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

/** Course created by the user—topic they asked to learn, with modules. */
export interface Course {
  id: string
  title: string
  description?: string
  createdAt: string
  modules: CourseModule[]
}
