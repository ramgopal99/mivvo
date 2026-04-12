"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Mic,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState } from "react"
import Link from "next/link"
import { landingConfig } from "../../config/landing-config"

const iconMap = {
  FileText,
  Mic,
  BarChart3,
  Users,
  CheckCircle
}

export function RecruiterSection() {
  const [selectedTag, setSelectedTag] = useState<string>(
    landingConfig.recruiters.header.tabOptions[0].value
  )

  return (
    <section
      id="recruiters"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-pink-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 px-2 w-full">
            <div className="w-full sm:w-auto max-w-full flex justify-center">
              <SegmentedButton
                options={[...landingConfig.recruiters.header.tabOptions]}
                value={selectedTag}
                onChange={setSelectedTag}
                className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-auto max-w-full"
              />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {landingConfig.recruiters.header.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            {landingConfig.recruiters.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {landingConfig.recruiters.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href={landingConfig.recruiters.cta.href}>
                <Button
                  size="lg"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="sm:hidden">
                    {landingConfig.recruiters.cta.mobileText}
                  </span>
                  <span className="hidden sm:inline">
                    {landingConfig.recruiters.cta.text}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline sm:pl-1"
              >
                Or try the platform yourself
              </Link>
            </div>
          </div>

          <div className="relative">
            <Card className="border-2 border-slate-200 shadow-2xl bg-white">
              <CardContent className="p-0">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Mivvo — Recruiter dashboard
                  </div>
                  <div className="w-6" />
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        {landingConfig.recruiters.mockInterface.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {landingConfig.recruiters.mockInterface.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-slate-300">
                        {landingConfig.recruiters.mockInterface.roleBadge}
                      </Badge>
                      <Badge className="bg-primary text-white text-xs">
                        {landingConfig.recruiters.mockInterface.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                    {landingConfig.recruiters.mockInterface.stats.map((stat, i) => {
                      const StatIcon = iconMap[stat.icon as keyof typeof iconMap]
                      return (
                        <div key={i} className="bg-primary/10 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <StatIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-gray-700">
                              {stat.label}
                            </span>
                          </div>
                          <p className="text-xl font-bold text-primary mt-1">
                            {stat.value}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                      AI interview results
                    </h4>
                    {landingConfig.recruiters.mockInterface.candidates.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <div className="flex items-center space-x-2 min-w-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">
                              {c.initials}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {c.name}
                            </p>
                            <p className="text-xs text-gray-600 truncate">{c.detail}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 pl-2">
                          {c.score != null ? (
                            <>
                              <p className="font-bold text-gray-900 text-sm">{c.score}</p>
                              <p className="text-xs text-gray-500">{c.label}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-amber-700 text-sm">—</p>
                              <p className="text-xs text-gray-500">{c.label}</p>
                            </>
                          )}
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
    </section>
  )
}
