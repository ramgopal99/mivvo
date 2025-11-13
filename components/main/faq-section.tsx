"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { landingConfig } from "../../config/landing-config"

export function FaqSection() {
  const [selectedTab, setSelectedTab] = useState("faqs")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <SegmentedButton
              options={[...landingConfig.faq.header.tabOptions]}
              value={selectedTab}
              onChange={setSelectedTab}
              className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {landingConfig.faq.header.title}
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {landingConfig.faq.header.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {landingConfig.faq.questions.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200/50 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
