"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, GraduationCap, Award, ArrowRight, Star, Clock, TrendingUp, Play, ChevronRight } from "lucide-react"
import Image from "next/image"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { landingConfig } from "../../config/landing-config"
import type { Course } from "../../app/courses/types"

const iconMap = {
  BookOpen,
  Users,
  GraduationCap,
  Award,
  Star,
  Clock,
  TrendingUp
}

export function CoursesSection() {
  const [selectedTag, setSelectedTag] = useState("courses")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const router = useRouter()

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses')
        if (response.ok) {
          const data = await response.json()
          setCourses(data.slice(0, 4)) // Fetch first 4 courses for carousel
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Auto-rotate through courses every 5 seconds
  useEffect(() => {
    if (courses.length <= 1) return

    const interval = setInterval(() => {
      setCurrentCourseIndex((prevIndex) =>
        prevIndex === courses.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [courses.length])

  const calculateTotalItems = (course: Course): number => {
    let total = 0
    course.modules?.forEach(module => {
      module.topics?.forEach(() => {
        total++
      })
      module.exercises?.forEach((exercise) => {
        if (exercise.status !== 'locked') total++
      })
    })
    return total
  }

  const handleCourseClick = (course: Course) => {
    router.push(`/courses/${course.courseId || course.id}`)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 px-2 w-full">
            <div className="w-full sm:w-auto max-w-full flex justify-center">
              <SegmentedButton
                options={[...landingConfig.courses.header.tabOptions]}
                value={selectedTag}
                onChange={setSelectedTag}
                className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto max-w-full"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {landingConfig.courses.header.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            {landingConfig.courses.header.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-12">
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Features List */}
            <div className="space-y-4">
              {landingConfig.courses.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                size="lg"
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => router.push(landingConfig.courses.cta.href)}
              >
                <span className="sm:hidden">{landingConfig.courses.cta.mobileText}</span>
                <span className="hidden sm:inline">{landingConfig.courses.cta.text}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Side - Popular Courses */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h3>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 1 }).map((_, index) => (
                <Card key={index} className="border border-gray-200 shadow-lg animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-14"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : courses.length > 0 ? (
              (() => {
                const course = courses[currentCourseIndex]
                return (
                  <div>
                    <Card
                      key={course.id}
                      className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => handleCourseClick(course)}
                    >
                      <CardHeader className="pb-3">
                        {/* Course Image */}
                        <div className="relative overflow-hidden rounded-lg h-32 bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
                          {course.image ? (
                            <Image
                              src={course.image}
                              alt={course.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-primary/30" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">
                              {course.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">
                              {course.description || "Comprehensive learning experience with hands-on exercises and real-world applications."}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {course.modules?.length || 0} modules
                            </div>
                            <div className="flex items-center">
                              <Play className="w-4 h-4 mr-1" />
                              {calculateTotalItems(course)} lessons
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">₹{course.price}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full group-hover:bg-primary/10 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCourseClick(course)
                          }}
                        >
                          View Course
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Carousel Indicators */}
                    {courses.length > 1 && (
                      <div className="flex justify-center space-x-2 mt-4">
                        {courses.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentCourseIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentCourseIndex
                                ? 'bg-primary scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to course ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })()
            ) : (
              <Card className="border border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Courses coming soon!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
