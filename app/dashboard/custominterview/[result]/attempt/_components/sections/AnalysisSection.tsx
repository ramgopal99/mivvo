import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageCircle, CheckCircle, XCircle, Lightbulb, AlertCircle, BookOpen, Heart, FileText, HelpCircle, ArrowRight, Check, X } from "lucide-react"

interface InterviewResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  communication: number | null
  knowledge: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  vocabularyComplexity: number | null
  emotionalTone: string | null
  wordCountAnalysis: string | null
  questionAnsweringQuality: number | null
  followUpHandling: boolean | null
  answerStructure: string | null
  exampleUsage: boolean | null
  relevantTopicAnswer: boolean | null
}

interface AnalysisSectionProps {
  result: InterviewResult | undefined
}

export function AnalysisSection({ result }: AnalysisSectionProps) {
  if (!result) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Available</h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            Analysis data is not available for this attempt.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Feedback */}
      <Card className="hover:shadow-lg transition-shadow lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-indigo-600" />
            Overall Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.overallFeedback || 'No detailed feedback available'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.strengths && result.strengths.length > 0 ? (
            <div className="space-y-3">
              {result.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{strength}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No strengths identified</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <XCircle className="w-5 h-5 mr-2" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.weaknesses && result.weaknesses.length > 0 ? (
            <div className="space-y-3">
              {result.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{weakness}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No weaknesses identified</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Analysis Metrics */}
      <Card className="hover:shadow-lg transition-shadow lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Advanced Analysis Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Vocabulary Complexity */}
            <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {result.vocabularyComplexity || 0}%
              </div>
              <div className="text-sm font-medium text-gray-600">Vocabulary Complexity</div>
            </div>

            {/* Emotional Tone */}
            <div className="text-center p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-pink-600 mb-1">
                {result.emotionalTone || 'N/A'}
              </div>
              <div className="text-sm font-medium text-gray-600">Emotional Tone</div>
            </div>

            {/* Word Count Analysis */}
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-green-600 mb-1">
                {result.wordCountAnalysis || 'N/A'}
              </div>
              <div className="text-sm font-medium text-gray-600">Response Length</div>
            </div>

            {/* Question Answering Quality */}
            <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <HelpCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {result.questionAnsweringQuality || 0}%
              </div>
              <div className="text-sm font-medium text-gray-600">Question Quality</div>
            </div>

            {/* Follow-up Handling */}
            <div className="text-center p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <ArrowRight className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="flex items-center justify-center mb-1">
                {result.followUpHandling ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-600">Follow-up Handling</div>
            </div>

            {/* Answer Structure */}
            <div className="text-center p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <MessageCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-teal-600 mb-1">
                {result.answerStructure || 'N/A'}
              </div>
              <div className="text-sm font-medium text-gray-600">Answer Structure</div>
            </div>

            {/* Example Usage */}
            <div className="text-center p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
              <CheckCircle className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <div className="flex items-center justify-center mb-1">
                {result.exampleUsage ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-600">Example Usage</div>
            </div>

            {/* Relevant Topic Answer */}
            <div className="text-center p-4 bg-violet-50 border border-violet-200 rounded-lg">
              <CheckCircle className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="flex items-center justify-center mb-1">
                {result.relevantTopicAnswer ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <X className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="text-sm font-medium text-gray-600">Topic Relevance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="hover:shadow-lg transition-shadow lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Lightbulb className="w-5 h-5 mr-2" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result.recommendations && result.recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.recommendations.map((recommendation, idx) => (
                <div key={idx} className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No recommendations available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
