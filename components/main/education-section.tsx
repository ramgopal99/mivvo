"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, BookOpen, Award, ArrowRight, CheckCircle, Star } from "lucide-react"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState } from "react"
import { landingConfig } from "../../config/landing-config"

const iconMap = {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Star,
  CheckCircle
}

export function EducationSection() {
  const [selectedTag, setSelectedTag] = useState("schools")

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-pink-100/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <SegmentedButton
              options={[...landingConfig.education.header.tabOptions]}
              value={selectedTag}
              onChange={setSelectedTag}
              className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {landingConfig.education.header.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {landingConfig.education.header.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
              <Button 
                size="lg" 
                className="px-6 py-3 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {landingConfig.education.cta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
                  <div className="text-sm text-gray-600 font-medium">Mivvo AI - Student Dashboard</div>
                  <div className="w-6"></div>
                </div>

                {/* Mock Content */}
                <div className="p-4 bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{landingConfig.education.mockInterface.title}</h3>
                      <p className="text-sm text-gray-600">{landingConfig.education.mockInterface.subtitle}</p>
                    </div>
                    <Badge className="bg-primary text-white">{landingConfig.education.mockInterface.status}</Badge>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {landingConfig.education.mockInterface.stats.map((stat, index) => {
                      const IconComponent = iconMap[stat.icon as keyof typeof iconMap]
                      return (
                        <div key={index} className="bg-primary/10 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-gray-700">{stat.label}</span>
                          </div>
                          <p className="text-xl font-bold text-primary mt-1">{stat.value}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Student List */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recent Practice Sessions</h4>
                    {landingConfig.education.mockInterface.students.slice(0, 3).map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                            <p className="text-xs text-gray-600">{student.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-sm">{student.score}%</p>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      </div>
                    ))}
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
