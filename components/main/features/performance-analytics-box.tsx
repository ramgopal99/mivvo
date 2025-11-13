"use client"

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { landingConfig } from "@/config/landing-config";

export function PerformanceAnalyticsBox() {
  const featureData = landingConfig.features.mainFeatures.performanceAnalytics
  
  // Animated values for bars
  const [bar1Height, setBar1Height] = useState(78);
  const [bar2Height, setBar2Height] = useState(92);
  const [bar3Height, setBar3Height] = useState(88);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate bar heights with smooth random variations
      setBar1Height(prev => {
        const target = 78 + Math.sin(Date.now() / 1000) * 12;
        return prev + (target - prev) * 0.1;
      });
      setBar2Height(prev => {
        const target = 92 + Math.sin(Date.now() / 1200 + 1) * 8;
        return prev + (target - prev) * 0.1;
      });
      setBar3Height(prev => {
        const target = 88 + Math.sin(Date.now() / 1400 + 2) * 10;
        return prev + (target - prev) * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-1 sm:col-span-1 lg:col-span-1 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative p-4 sm:p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{featureData.header}</span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">{featureData.badge}</div>
        </div>

        {/* Main Metric */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{featureData.mainScore}%</div>
          <div className="text-xs sm:text-sm text-gray-500">{featureData.scoreLabel}</div>
        </div>

        {/* Card Content */}
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-start">
            {featureData.metrics.map((metric, index) => {
              const barHeights = [bar1Height, bar2Height, bar3Height]
              const barHeight = barHeights[index]

              const colorClasses = {
                yellow: "bg-yellow-400",
                cyan: "bg-cyan-400",
                indigo: "bg-indigo-500",
                primary: "bg-primary/50"
              }

              return (
                <div key={metric.name} className="flex flex-col items-center h-full">
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1 leading-tight text-center whitespace-nowrap w-full px-0.5">{metric.name}</span>
                  <span className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 text-center whitespace-nowrap">{metric.value}%</span>
                  <div className="relative h-12 sm:h-16 bg-gray-200 rounded-lg overflow-hidden w-full flex-shrink-0">
                    <div
                      className={`absolute bottom-0 w-full ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-lg transition-all duration-300 ease-out`}
                      style={{ height: `${barHeight}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-1 text-[9px] sm:text-[10px] md:text-xs w-full">
                    <span className="font-semibold text-gray-900 whitespace-nowrap">{Math.round(barHeight)}%</span>
                    <TrendingUp className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-green-500 flex-shrink-0" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}