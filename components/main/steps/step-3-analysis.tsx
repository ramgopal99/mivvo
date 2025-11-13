"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, AlertCircle } from "lucide-react"
import { landingConfig } from "../../../config/landing-config"

export function Step3Analysis() {
  return (
    <div className="space-y-2 sm:space-y-3 h-full flex flex-col">
      {/* Overall Score */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
            <span className="text-xs sm:text-sm font-bold text-gray-900">Overall Score</span>
            <Badge className="bg-green-500 text-white text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 flex-shrink-0">{landingConfig.steps.step3.analysis.overallScore.score}%</Badge>
          </div>
          <Progress value={landingConfig.steps.step3.analysis.overallScore.score} className="h-1.5 sm:h-2 mb-1" />
          <p className="text-[10px] sm:text-xs text-gray-600 break-words">{landingConfig.steps.step3.analysis.overallScore.text}</p>
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <Card className="flex-1">
        <CardContent className="p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">Performance</h4>
          <div className="space-y-1.5 sm:space-y-2">
            {landingConfig.steps.step3.analysis.performanceData.slice(0, 2).map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${item.colorClass} flex-shrink-0`} />
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">{item.name}</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                  <Progress value={item.score} className="w-12 sm:w-16 h-1 sm:h-1.5" />
                  <span className="text-[10px] sm:text-xs font-bold text-gray-900 w-5 sm:w-6">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card className="flex-1">
        <CardContent className="p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center">
            <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 text-orange-500 flex-shrink-0" />
            Improvements
          </h4>
          <div className="space-y-1">
            {landingConfig.steps.step3.analysis.improvementAreas.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-1 sm:p-1.5 bg-gray-50 rounded gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">{item.area}</span>
                <Badge 
                  variant={item.priority === 'High' ? 'destructive' : 'secondary'}
                  className="text-[10px] sm:text-xs px-1 py-0 flex-shrink-0"
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="flex-1">
        <CardContent className="p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center">
            <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 text-blue-500 flex-shrink-0" />
            Tips
          </h4>
          <div className="space-y-1">
            {landingConfig.steps.step3.analysis.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="p-1 sm:p-1.5 bg-blue-50 rounded">
                <p className="text-[10px] sm:text-xs font-medium text-gray-900 break-words">{rec.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 break-words">{rec.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
