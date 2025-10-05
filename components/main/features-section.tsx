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
    <section id="features" className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fef7f0 0%, #fdf2f8 50%, #fef7f0 100%)'
    }}>
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
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 ">
            Everything you need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              ace your interviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 ">
            Our comprehensive platform provides all the tools and features you need to prepare for any interview scenario.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid w-full auto-rows-[22rem] grid-cols-3 gap-4 max-w-7xl mx-auto">
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
