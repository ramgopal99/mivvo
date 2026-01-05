import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserCourse {
  title: string
  enrolledAt: string
  progress: number
}

interface UserCoursesProps {
  courses: UserCourse[]
}

export function UserCourses({ courses }: UserCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Enrolled Courses</CardTitle>
        <CardDescription>
          Courses this user has enrolled in
        </CardDescription>
      </CardHeader>
      <CardContent>
        {courses && courses.length > 0 ? (
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline">{course.progress}%</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No courses enrolled</p>
        )}
      </CardContent>
    </Card>
  )
}
