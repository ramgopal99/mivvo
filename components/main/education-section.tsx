"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, BookOpen, Award, ArrowRight } from "lucide-react"

const iconMap = {
  GraduationCap,
  Users,
  BookOpen,
  Award
}
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState } from "react"
import Link from "next/link"
import { landingConfig } from "../../config/landing-config"


export function EducationSection() {
  const [selectedTag, setSelectedTag] = useState("schools")

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 px-2 w-full">
            <div className="w-full sm:w-auto max-w-full flex justify-center">
              <SegmentedButton
                options={[...landingConfig.education.header.tabOptions]}
                value={selectedTag}
                onChange={setSelectedTag}
                className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto max-w-full"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {landingConfig.education.header.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            {landingConfig.education.header.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Features List */}
            <div className="space-y-4">
              {landingConfig.education.features.map((feature, index) => {
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
              <Link href={landingConfig.education.cta.href}>
                <Button
                  size="lg"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="sm:hidden">{landingConfig.education.cta.mobileText}</span>
                  <span className="hidden sm:inline">{landingConfig.education.cta.text}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Mock Interface */}
          <div className="relative">
            <Card className="border-2 border-gray-200 shadow-2xl">
              <CardContent className="p-0">
                {/* Mock Browser Header */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Mivvo - Complete Learning Platform</div>
                  <div className="w-6"></div>
                </div>

                {/* Mock Content */}
                <div className="p-3 sm:p-4 bg-white">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{landingConfig.education.mockInterface.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{landingConfig.education.mockInterface.subtitle}</p>
                    </div>
                    <Badge className="bg-primary text-white text-xs">Active</Badge>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-gray-700">Avg. Score</span>
                      </div>
                      <p className="text-xl font-bold text-primary mt-1">82%</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-gray-700">Courses</span>
                      </div>
                      <p className="text-xl font-bold text-primary mt-1">45/120</p>
                    </div>
                  </div>

                  {/* Student List */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recent Activity</h4>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PS</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Priya Sharma</p>
                          <p className="text-xs text-gray-600">Completed Interview</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">85%</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AK</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Arjun Kumar</p>
                          <p className="text-xs text-gray-600">Enrolled in Course</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">3/5</p>
                        <p className="text-xs text-gray-500">Modules</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">KR</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Kavya Reddy</p>
                          <p className="text-xs text-gray-600">Course Completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">92%</p>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
