import type { Course } from "./types"

export const dummyCourses: Course[] = [
  {
    id: "course-python",
    title: "Python fundamentals",
    description: "Learn the basics of Python—syntax, data types, and control flow.",
    createdAt: "2025-02-10T09:00:00Z",
    modules: [
      {
        id: "mod-p1",
        title: "Basics",
        order: 1,
        lessons: [
          { id: "les-1", title: "Getting started with Python", order: 1, durationMinutes: 5 },
          { id: "les-2", title: "Variables and data types", order: 2, durationMinutes: 5 },
        ],
      },
    ],
  },
]
