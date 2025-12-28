"use client"

import { SegmentedButton } from "@/components/ui/segmented-button"
import { 
  AiInterviewsBox,
  TechnicalCodingBox,
  PerformanceAnalyticsBox,
  CompanyPracticeBox
} from "./features"


export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pink-50">
      {/* Box Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <div className="flex justify-center mb-4 sm:mb-6">
            <SegmentedButton
              options={[
                { label: "Features", value: "features" },
                { label: "What makes us special", value: "special" }
              ]}
              value="features"
              onChange={() => {}}
              className="bg-white"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight sm:leading-tight mb-4 sm:mb-6">
            <span className="block">Everything you need to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              master interviews & skills
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed break-words">
            Our comprehensive platform provides AI mock interviews and interactive courses to prepare for any career path - from technical roles to civil services, banking, and government exams.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid w-full auto-rows-[18rem] sm:auto-rows-[20rem] lg:auto-rows-[22rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {/* Box 1 - AI-Powered Interviews (2 columns) */}
          <AiInterviewsBox />
          
          {/* Box 2 - Technical Coding Interviews (1 column) */}
          <TechnicalCodingBox />
          
          {/* Box 3 - Performance Analytics (1 column) */}
          <PerformanceAnalyticsBox />
          
          {/* Box 4 - Company-Specific Practice (2 columns) */}
          <CompanyPracticeBox />
        </div>
      </div>
    </section>
  )
}
