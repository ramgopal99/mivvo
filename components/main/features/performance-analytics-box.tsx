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
    <div className="col-span-3 lg:col-span-1 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{featureData.header}</span>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{featureData.badge}</div>
        </div>

        {/* Main Metric */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">{featureData.mainScore}%</div>
          <div className="text-sm text-gray-500">{featureData.scoreLabel}</div>
        </div>

        {/* Card Content */}
        <div className="bg-gray-50 rounded-lg p-3">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
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
                <div key={metric.name} className="flex flex-col">
                  <span className="text-xs text-gray-600 mb-1">{metric.name}</span>
                  <span className="text-lg font-bold text-gray-900 mb-2">{metric.value}%</span>
                  <div className="relative h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className={`absolute bottom-0 w-full ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-lg transition-all duration-300 ease-out`}
                      style={{ height: `${barHeight}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <span className="font-semibold text-gray-900">{Math.round(barHeight)}%</span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
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