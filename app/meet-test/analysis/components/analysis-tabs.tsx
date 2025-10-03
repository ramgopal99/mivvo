'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, MessageSquare, Brain, Target, Users, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { GraphDashboard } from './graph-dashboard'

interface AnalysisResult {
  sentiment: "Positive" | "Neutral" | "Negative"
  confidence_level: "High" | "Medium" | "Low"
  communication_skills: {
    clarity: "Clear" | "Moderate" | "Confusing"
    grammar: "Good" | "Average" | "Poor"
    filler_words: "Low" | "Medium" | "High"
  }
  technical_knowledge: {
    accuracy: "Correct" | "Partially correct" | "Wrong"
    depth: "Basic" | "Intermediate" | "Expert"
  }
  soft_skills: {
    problem_solving: "Strong" | "Average" | "Weak"
    attitude: "Positive" | "Neutral" | "Negative"
  }
  strengths: string[]
  weaknesses: string[]
  final_score: number
  recommendation: "Proceed" | "Maybe" | "Reject"
}

interface TranscriptMessage {
  role: string
  text: string
  timestamp: string
}

interface AnalysisTabsProps {
  analysis: AnalysisResult
  transcript: TranscriptMessage[]
  topic: string
}

export function AnalysisTabs({ analysis, transcript, topic }: AnalysisTabsProps) {
  const [showGraphs, setShowGraphs] = useState(false)


  return (
    <div className="space-y-8">

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
          <Button
            onClick={() => setShowGraphs(false)}
            variant={!showGraphs ? "default" : "ghost"}
            className="flex items-center gap-2 px-6"
          >
            <MessageSquare className="h-4 w-4" />
            Detailed Analysis
          </Button>
          <Button
            onClick={() => setShowGraphs(true)}
            variant={showGraphs ? "default" : "ghost"}
            className="flex items-center gap-2 px-6"
          >
            <BarChart3 className="h-4 w-4" />
            Visual Graphs
          </Button>
        </div>
      </div>

      {/* Content */}
      {showGraphs ? (
        <GraphView analysis={analysis} transcript={transcript} topic={topic} />
      ) : (
        <DetailedView analysis={analysis} transcript={transcript} />
      )}
    </div>
  )
}

function DetailedView({ analysis, transcript }: { analysis: AnalysisResult, transcript: TranscriptMessage[] }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-6">
        <OverviewTab analysis={analysis} />
      </TabsContent>

      <TabsContent value="skills" className="space-y-4 mt-6">
        <SkillsTab analysis={analysis} />
      </TabsContent>

      <TabsContent value="feedback" className="space-y-4 mt-6">
        <FeedbackTab analysis={analysis} />
      </TabsContent>

      <TabsContent value="transcript" className="space-y-4 mt-6">
        <TranscriptTab transcript={transcript} />
      </TabsContent>
    </Tabs>
  )
}

function OverviewTab({ analysis }: { analysis: AnalysisResult }) {
  const scorePercentage = (analysis.final_score / 10) * 100

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Proceed': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'Maybe': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'Reject': return <XCircle className="h-5 w-5 text-red-600" />
      default: return null
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Proceed': return 'border-green-200 bg-green-50'
      case 'Maybe': return 'border-yellow-200 bg-yellow-50'
      case 'Reject': return 'border-red-200 bg-red-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-4">
      {/* Compact Score Display */}
      <Card className={`border-2 ${getRecommendationColor(analysis.recommendation)}`}>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getRecommendationIcon(analysis.recommendation)}
              <div>
                <div className="text-3xl font-bold text-primary">{analysis.final_score}/10</div>
                <div className="text-sm text-muted-foreground">{scorePercentage.toFixed(0)}% Performance</div>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              analysis.recommendation === 'Proceed' ? 'border-green-300 bg-green-100 text-green-800' :
              analysis.recommendation === 'Maybe' ? 'border-yellow-300 bg-yellow-100 text-yellow-800' :
              'border-red-300 bg-red-100 text-red-800'
            }`}>
              {analysis.recommendation}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics - Compact Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
              analysis.sentiment === 'Positive' ? 'bg-green-500' :
              analysis.sentiment === 'Neutral' ? 'bg-blue-500' : 'bg-red-500'
            }`} />
            <div className="text-xs text-muted-foreground">Sentiment</div>
            <div className="text-sm font-semibold">{analysis.sentiment}</div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="text-center">
            <Brain className={`h-3 w-3 mx-auto mb-1 ${
              analysis.confidence_level === 'High' ? 'text-green-600' :
              analysis.confidence_level === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="text-sm font-semibold">{analysis.confidence_level}</div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="text-center">
            <MessageSquare className={`h-3 w-3 mx-auto mb-1 ${
              analysis.communication_skills.clarity === 'Clear' ? 'text-green-600' :
              analysis.communication_skills.clarity === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div className="text-xs text-muted-foreground">Communication</div>
            <div className="text-sm font-semibold">{analysis.communication_skills.clarity}</div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="text-center">
            <Target className={`h-3 w-3 mx-auto mb-1 ${
              analysis.technical_knowledge.depth === 'Expert' ? 'text-green-600' :
              analysis.technical_knowledge.depth === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div className="text-xs text-muted-foreground">Technical</div>
            <div className="text-sm font-semibold">{analysis.technical_knowledge.depth}</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function SkillsTab({ analysis }: { analysis: AnalysisResult }) {
  const getSkillScore = (skill: string): number => {
    const scoreMap: Record<string, number> = {
      // Communication
      'Clear': 85, 'Moderate': 60, 'Confusing': 30,
      'Good': 80, 'Average': 55, 'Poor': 25,
      'Low': 80, 'Medium': 50, 'High': 20,
      // Technical
      'Correct': 90, 'Partially correct': 65, 'Wrong': 20,
      'Expert': 95, 'Intermediate': 70, 'Basic': 35,
      // Soft Skills
      'Strong': 90, 'Average_Soft': 60, 'Weak': 25,
      'Positive': 85, 'Neutral': 55, 'Negative': 25
    }
    return scoreMap[skill] || 50
  }


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communication Skills */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Communication Skills
            </CardTitle>
            <CardDescription>How effectively you expressed yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Clarity</span>
                <Badge variant="outline">{analysis.communication_skills.clarity}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.communication_skills.clarity)}
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Grammar</span>
                <Badge variant="outline">{analysis.communication_skills.grammar}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.communication_skills.grammar)}
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Filler Words</span>
                <Badge variant="outline">{analysis.communication_skills.filler_words}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.communication_skills.filler_words)}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Knowledge */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Technical Skills
            </CardTitle>
            <CardDescription>Your technical knowledge and accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Accuracy</span>
                <Badge variant="outline">{analysis.technical_knowledge.accuracy}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.technical_knowledge.accuracy)}
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Depth</span>
                <Badge variant="outline">{analysis.technical_knowledge.depth}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.technical_knowledge.depth)}
                className="h-2"
              />
            </div>

            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                <strong>Tip:</strong> Technical interviews value both accuracy and the ability to explain concepts clearly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Soft Skills
            </CardTitle>
            <CardDescription>Problem-solving and interpersonal abilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Problem Solving</span>
                <Badge variant="outline">{analysis.soft_skills.problem_solving}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.soft_skills.problem_solving)}
                className="h-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attitude</span>
                <Badge variant="outline">{analysis.soft_skills.attitude}</Badge>
              </div>
              <Progress
                value={getSkillScore(analysis.soft_skills.attitude)}
                className="h-2"
              />
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>Tip:</strong> Employers value candidates who show enthusiasm and a positive approach to challenges.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Skills Summary
          </CardTitle>
          <CardDescription>Overall assessment of your skill areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">
                {Math.round((getSkillScore(analysis.communication_skills.clarity) +
                            getSkillScore(analysis.communication_skills.grammar) +
                            getSkillScore(analysis.communication_skills.filler_words)) / 3)}%
              </div>
              <div className="text-sm text-blue-600">Communication</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">
                {Math.round((getSkillScore(analysis.technical_knowledge.accuracy) +
                            getSkillScore(analysis.technical_knowledge.depth)) / 2)}%
              </div>
              <div className="text-sm text-purple-600">Technical</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">
                {Math.round((getSkillScore(analysis.soft_skills.problem_solving) +
                            getSkillScore(analysis.soft_skills.attitude)) / 2)}%
              </div>
              <div className="text-sm text-green-600">Soft Skills</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeedbackTab({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Key Strengths
            </CardTitle>
            <CardDescription>Areas where you performed well</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.strengths.length > 0 ? (
              <div className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-900">{strength}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No significant strengths were identified in this interview.</p>
                <p className="text-xs text-muted-foreground mt-2">Consider focusing on building fundamental skills for future interviews.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>Opportunities to develop and grow</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.weaknesses.length > 0 ? (
              <div className="space-y-3">
                {analysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-orange-900">{weakness}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Great job! No significant weaknesses were identified.</p>
                <p className="text-xs text-muted-foreground mt-2">Continue building on your strengths for even better performance.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      {(analysis.strengths.length > 0 || analysis.weaknesses.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Development Action Plan
            </CardTitle>
            <CardDescription>Next steps to improve your interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Build on Strengths</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Practice similar scenarios to reinforce what works
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Share your successes with mentors or peers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Use these strengths in future interviews
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Address Weaknesses</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Focus on targeted practice for weak areas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Seek feedback from experienced professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Set specific improvement goals
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Recommendation */}
      <Card className={`border-2 ${analysis.recommendation === 'Proceed' ? 'border-green-200 bg-green-50' : analysis.recommendation === 'Maybe' ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {analysis.recommendation === 'Proceed' ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : analysis.recommendation === 'Maybe' ? (
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              <div className="text-xl font-semibold">
                {analysis.recommendation === 'Proceed' ? 'Ready to Proceed!' :
                 analysis.recommendation === 'Maybe' ? 'Consider More Preparation' : 'Needs Significant Improvement'}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {analysis.recommendation === 'Proceed'
                ? 'You demonstrate the skills and knowledge needed for this role. Consider applying!'
                : analysis.recommendation === 'Maybe'
                ? 'You show potential but need more preparation. Focus on weak areas before reapplying.'
                : 'Significant improvement is needed before considering this type of role.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TranscriptTab({ transcript }: { transcript: TranscriptMessage[] }) {
  const userMessages = transcript.filter(m => m.role === 'user')
  const aiMessages = transcript.filter(m => m.role === 'assistant' || m.role === 'ai')

  const totalWords = transcript.reduce((sum, msg) => sum + msg.text.split(' ').length, 0)
  const avgResponseLength = transcript.length > 0 ? Math.round(totalWords / transcript.length) : 0

  return (
    <div className="space-y-6">
      {/* Transcript Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{transcript.length}</div>
              <div className="text-sm text-blue-600">Total Messages</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{userMessages.length}</div>
              <div className="text-sm text-green-600">Your Responses</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{aiMessages.length}</div>
              <div className="text-sm text-purple-600">AI Responses</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{avgResponseLength}</div>
              <div className="text-sm text-orange-600">Avg Words/Message</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Transcript */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Full Conversation
          </CardTitle>
          <CardDescription>
            Complete transcript of your interview conversation ({totalWords} total words)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {transcript.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No conversation transcript available.</p>
              </div>
            ) : (
              transcript.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-lg shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        message.role === 'user' ? 'bg-blue-300' : 'bg-purple-400'
                      }`} />
                      <div className={`text-xs font-medium ${
                        message.role === 'user' ? 'text-blue-200' : 'text-purple-600'
                      }`}>
                        {message.role === 'user' ? 'You' : 'AI Interviewer'}
                      </div>
                      <div className={`text-xs ${
                        message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-sm leading-relaxed">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {transcript.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>End of conversation</span>
                <span>{new Date(transcript[transcript.length - 1]?.timestamp).toLocaleString()}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversation Analysis */}
      {transcript.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Conversation Analysis
            </CardTitle>
            <CardDescription>Key insights from your interview dialogue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-blue-700">
                  {userMessages.length > aiMessages.length ? 'Talkative' :
                   userMessages.length < aiMessages.length ? 'Concise' : 'Balanced'}
                </div>
                <div className="text-xs text-blue-600">Response Style</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-green-700">
                  {avgResponseLength > 20 ? 'Detailed' :
                   avgResponseLength > 10 ? 'Moderate' : 'Brief'}
                </div>
                <div className="text-xs text-green-600">Response Length</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-purple-700">
                  {Math.round((transcript.length / 2))} exchanges
                </div>
                <div className="text-xs text-purple-600">Question-Answer Pairs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function GraphView({ analysis, transcript, topic }: { analysis: AnalysisResult, transcript: TranscriptMessage[], topic: string }) {
  return <GraphDashboard analysis={analysis} transcript={transcript} topic={topic} />
}
