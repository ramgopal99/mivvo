"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, AlertCircle } from "lucide-react"
import { landingConfig } from "../../config/landing-config"

export function Step3Analysis() {
  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Overall Score */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-900">Overall Score</span>
            <Badge className="bg-green-500 text-white text-sm px-2 py-1">{landingConfig.steps.step3.analysis.overallScore.score}%</Badge>
          </div>
          <Progress value={landingConfig.steps.step3.analysis.overallScore.score} className="h-2 mb-1" />
          <p className="text-xs text-gray-600">{landingConfig.steps.step3.analysis.overallScore.text}</p>
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <Card className="flex-1">
        <CardContent className="p-3">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Performance</h4>
          <div className="space-y-2">
            {landingConfig.steps.step3.analysis.performanceData.slice(0, 2).map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.colorClass}`} />
                  <span className="text-xs font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={item.score} className="w-16 h-1.5" />
                  <span className="text-xs font-bold text-gray-900 w-6">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card className="flex-1">
        <CardContent className="p-3">
          <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1 text-orange-500" />
            Improvements
          </h4>
          <div className="space-y-1">
            {landingConfig.steps.step3.analysis.improvementAreas.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                <span className="text-xs font-medium text-gray-700">{item.area}</span>
                <Badge 
                  variant={item.priority === 'High' ? 'destructive' : 'secondary'}
                  className="text-xs px-1 py-0"
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
        <CardContent className="p-3">
          <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
            <Target className="w-3 h-3 mr-1 text-blue-500" />
            Tips
          </h4>
          <div className="space-y-1">
            {landingConfig.steps.step3.analysis.recommendations.slice(0, 2).map((rec, index) => (
              <div key={index} className="p-1.5 bg-blue-50 rounded">
                <p className="text-xs font-medium text-gray-900">{rec.title}</p>
                <p className="text-xs text-gray-500">{rec.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
