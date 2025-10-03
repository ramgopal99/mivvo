"use client"

import { siteConfig } from "@/config/site"

export function BlogHeader() {
  return (
    <div className="text-center py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            {siteConfig.name} Blog
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Insights, tips, and stories from the world of interview preparation and career development.
        </p>
      </div>
    </div>
  )
}
