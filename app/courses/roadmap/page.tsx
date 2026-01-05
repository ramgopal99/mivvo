"use client"

import { useRouter } from "next/navigation"
import type { Course } from "../types"

// Course roadmap data - easy to update when new courses are added
const roadmapCourses = [
  {
    id: 'logic',
    courseId: 'logic',
    title: 'Logic',
    description: 'Programming Fundamentals',
    available: true,
    position: 'left' as const
  },
  {
    id: 'python',
    courseId: 'python',
    title: 'Python',
    description: 'Python Programming',
    available: true,
    position: 'right' as const
  },
  {
    id: 'cpp',
    courseId: 'cpp',
    title: 'C++',
    description: 'System Programming & Algorithms',
    available: false,
    position: 'left' as const
  },
  {
    id: 'java',
    courseId: 'java',
    title: 'Java',
    description: 'Object-Oriented Programming',
    available: false,
    position: 'right' as const
  },
  {
    id: 'sql',
    courseId: 'sql',
    title: 'SQL',
    description: 'Database Management',
    available: false,
    position: 'left' as const
  },
  {
    id: 'verbal',
    courseId: 'verbal',
    title: 'Verbal',
    description: 'Communication Skills',
    available: false,
    position: 'right' as const
  },
  {
    id: 'quantitative',
    courseId: 'quantitative',
    title: 'Quantitative',
    description: 'Mathematical Reasoning',
    available: false,
    position: 'left' as const
  }
];

export default function CourseRoadmapPage() {
  const router = useRouter();

  const handleCourseClick = (course: Course) => {
    router.push(`/courses/${course.courseId || course.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-border"></div>

          <div className="space-y-16">
            {roadmapCourses.map((course) => {
              const isLeft = course.position === 'left';
              const colors = course.available
                ? {
                    dot: 'bg-primary',
                    button: 'bg-primary hover:bg-primary/90 cursor-pointer',
                    buttonText: `Start ${course.title}`
                  }
                : {
                    dot: 'bg-muted-foreground/50',
                    button: 'bg-muted-foreground/50 cursor-not-allowed',
                    buttonText: 'Coming Soon'
                  };

              return (
                <div key={course.id} className="relative flex items-center">
                  {isLeft ? (
                    <>
                      <div className="w-1/2 pr-8 text-right">
                        <div className={`bg-card rounded-lg border p-6 hover:shadow-md transition-shadow ${!course.available ? 'opacity-75' : ''}`}>
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                          <button
                            onClick={() => course.available && handleCourseClick({ id: course.id, courseId: course.courseId, title: course.title } as Course)}
                            className={`px-6 py-2 text-primary-foreground rounded-md transition-colors ${colors.button}`}
                            disabled={!course.available}
                          >
                            {colors.buttonText}
                          </button>
                        </div>
                      </div>
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${colors.dot} rounded-full border-4 border-background ${!course.available ? 'opacity-60' : ''}`}
                        style={course.id === 'sql' ? {
                          animation: 'pulse 2s infinite',
                          transform: 'translateX(-50%) scale(1.2)'
                        } : { transform: 'translateX(-50%)' }}
                      ></div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      {/* Timeline Dot */}
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${colors.dot} rounded-full border-4 border-background ${!course.available ? 'opacity-60' : ''}`}></div>
                      <div className="w-1/2 pl-8">
                        <div className={`bg-card rounded-lg border p-6 hover:shadow-md transition-shadow ${!course.available ? 'opacity-75' : ''}`}>
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                          <button
                            onClick={() => course.available && handleCourseClick({ id: course.id, courseId: course.courseId, title: course.title } as Course)}
                            className={`px-6 py-2 text-primary-foreground rounded-md transition-colors ${colors.button}`}
                            disabled={!course.available}
                          >
                            {colors.buttonText}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  )
}
