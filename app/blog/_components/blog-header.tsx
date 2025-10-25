"use client"

import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/config/site"

export function BlogHeader() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 mt-16">
            {siteConfig.name} Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Insights, tips, and stories from the world of interview preparation and career development.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-gray-200">
              Interview Tips
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-gray-200">
              Career Guidance
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm border border-gray-200">
              AI Technology
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
