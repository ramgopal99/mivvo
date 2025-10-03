"use client"

import { StepCard } from "./step-card"
import { Step1Form } from "./step-1-form"
import { Step2Interview } from "./step-2-interview"
import { Step3Analysis } from "./step-3-analysis"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { useState } from "react"
import { landingConfig } from "../../config/landing-config"

export function StepsSection() {
  const [selectedTab, setSelectedTab] = useState("steps")

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-pink-100/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <SegmentedButton
              options={[...landingConfig.steps.header.tabOptions]}
              value={selectedTab}
              onChange={setSelectedTab}
              className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {landingConfig.steps.header.title}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Step 1: Create Interview */}
          <StepCard
            stepNumber={1}
            title={landingConfig.steps.step1.title}
            description={landingConfig.steps.step1.description}
          >
            <Step1Form />
          </StepCard>

          {/* Step 2: Give Interview */}
          <StepCard
            stepNumber={2}
            title={landingConfig.steps.step2.title}
            description={landingConfig.steps.step2.description}
            className="-mt-8"
          >
            <Step2Interview />
          </StepCard>

          {/* Step 3: Get Analysis */}
          <StepCard
            stepNumber={3}
            title={landingConfig.steps.step3.title}
            description={landingConfig.steps.step3.description}
          >
            <Step3Analysis />
          </StepCard>
        </div>
      </div>
    </div>
  )
}
