"use client"

import Image from "next/image"
import { useState } from "react"
import { SegmentedButton } from "@/components/ui/segmented-button"
import { landingConfig } from "../../config/landing-config"

export function TestimonialsSection() {
  const [selectedTab, setSelectedTab] = useState("testimonials")

  const tabOptions = [
    { label: landingConfig.testimonials.header.badge, value: "testimonials" },
    { label: landingConfig.testimonials.header.subtitle, value: "results" }
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <SegmentedButton
              options={[...tabOptions]}
              value={selectedTab}
              onChange={setSelectedTab}
              className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {landingConfig.testimonials.title}
          </h2>
        </div>

        {/* Testimonials Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
          {/* person 1 - 2 columns */}
          <div className={`${(() => {
            const baseClasses = "rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            return `${baseClasses} bg-white text-gray-900 border border-gray-200 md:col-span-2`
          })()}`}>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src={landingConfig.testimonials.testimonials[0].avatar}
                  alt={landingConfig.testimonials.testimonials[0].name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900">
                  {landingConfig.testimonials.testimonials[0].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {landingConfig.testimonials.testimonials[0].verified}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-white/20 text-8xl font-bold">
              <Image 
                src="/mivvo.svg" 
                alt="logo" 
                width={24} 
                height={24} 
              />
            </div>
            <h3 className="text-lg font-bold mb-4 leading-tight relative z-10 text-gray-900">
              {landingConfig.testimonials.testimonials[0].quote}
            </h3>
            <p className="text-sm leading-relaxed relative z-10 text-gray-700">
              {landingConfig.testimonials.testimonials[0].description}
            </p>
          </div>

          {/* person 2 - 1 column */}
          <div className={`${(() => {
            const baseClasses = "rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            return `${baseClasses} bg-gradient-to-br from-slate-700 to-slate-800 text-white md:col-span-1`
          })()}`}>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src={landingConfig.testimonials.testimonials[1].avatar}
                  alt={landingConfig.testimonials.testimonials[1].name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold">
                  {landingConfig.testimonials.testimonials[1].name}
                </h4>
                <p className="text-xs text-white/70">
                  {landingConfig.testimonials.testimonials[1].verified}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-white/20 text-8xl font-bold">
              <Image src="/mivvo.svg" alt="logo" width={24} height={24} />
            </div>
            <h3 className="text-lg font-bold mb-4 leading-tight relative z-10 text-white">
              {landingConfig.testimonials.testimonials[1].quote}
            </h3>
            <p className="text-sm leading-relaxed relative z-10 text-white/90">
              {landingConfig.testimonials.testimonials[1].description}
            </p>
          </div>

          {/* person 3 - 1 column (first half) */}
          <div className={`${(() => {
            const baseClasses = "rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            return `${baseClasses} bg-white text-gray-900 border border-gray-200 md:col-span-1 md:row-span-2`
          })()}`}>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src={landingConfig.testimonials.testimonials[2].avatar}
                  alt={landingConfig.testimonials.testimonials[2].name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900">
                  {landingConfig.testimonials.testimonials[2].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {landingConfig.testimonials.testimonials[2].verified}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-white/20 text-8xl font-bold">
              <Image src="/mivvo.svg" alt="logo" width={24} height={24} />
            </div>
            <h3 className="text-lg font-bold mb-4 leading-tight relative z-10 text-gray-900">
              {landingConfig.testimonials.testimonials[2].quote}
            </h3>
            <p className="text-sm leading-relaxed relative z-10 text-gray-700">
              {landingConfig.testimonials.testimonials[2].description}
            </p>
          </div>

          {/* person 4 - 1 column */}
          <div className={`${(() => {
            const baseClasses = "rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            return `${baseClasses} bg-white text-gray-900 border border-gray-200 md:col-span-1`
          })()}`}>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src={landingConfig.testimonials.testimonials[3].avatar}
                  alt={landingConfig.testimonials.testimonials[3].name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900">
                  {landingConfig.testimonials.testimonials[3].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {landingConfig.testimonials.testimonials[3].verified}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-white/20 text-8xl font-bold">
              <Image src="/mivvo.svg" alt="logo" width={24} height={24} />
            </div>
            <h3 className="text-lg font-bold mb-4 leading-tight relative z-10 text-gray-900">
              {landingConfig.testimonials.testimonials[3].quote}
            </h3>
            <p className="text-sm leading-relaxed relative z-10 text-gray-700">
              {landingConfig.testimonials.testimonials[3].description}
            </p>
          </div>

            {/* person 5 - 2 columns */}
          <div className={`${(() => {
            const baseClasses = "rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            return `${baseClasses} bg-gradient-to-br from-slate-700 to-slate-800 text-white md:col-span-2`
          })()}`}>
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src={landingConfig.testimonials.testimonials[4].avatar}
                  alt={landingConfig.testimonials.testimonials[4].name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold">
                  {landingConfig.testimonials.testimonials[4].name}
                </h4>
                <p className="text-xs text-white/70">
                  {landingConfig.testimonials.testimonials[4].verified}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 text-white/20 text-8xl font-bold">
              <Image src="/mivvo.svg" alt="quote" width={24} height={24} />
            </div>
            <h3 className="text-lg font-bold mb-4 leading-tight relative z-10 text-white">
              {landingConfig.testimonials.testimonials[4].quote}
            </h3>
            <p className="text-sm leading-relaxed relative z-10 text-white/90">
              {landingConfig.testimonials.testimonials[4].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
