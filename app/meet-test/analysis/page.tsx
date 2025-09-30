'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Brain, Clock, MessageSquare, TrendingUp, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface TranscriptMessage {
  role: string
  text: string
  timestamp: string
}

interface AnalysisData {
  totalQuestions: number
  answeredQuestions: number
  responseTime: number
  technicalAccuracy: number
  communicationScore: number
  overallScore: number
  strengths: string[]
  areasForImprovement: string[]
  detailedFeedback: {
    question: string
    userAnswer: string
    score: number
    feedback: string
    timestamp: string
  }[]
  conversationDuration: number
  wordCount: number
  averageResponseLength: number
}

export default function AnalysisPage() {
  const router = useRouter()
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Analysis functions
  const analyzeTranscript = (transcript: TranscriptMessage[]): AnalysisData => {
    const assistantMessages = transcript.filter(msg => msg.role === 'assistant')
    const userMessages = transcript.filter(msg => msg.role === 'user')
    
    // Extract questions from assistant messages
    const questions = assistantMessages
      .map(msg => msg.text)
      .filter(text => {
        // Look for question patterns
        const questionPatterns = [
          /\?$/, // Ends with question mark
          /^(what|how|why|when|where|which|who|can|could|would|should|do|does|did|is|are|was|were)/i,
          /explain|describe|tell me|walk me through/i
        ]
        return questionPatterns.some(pattern => pattern.test(text))
      })

    // Calculate response times
    const responseTimes: number[] = []
    for (let i = 0; i < transcript.length - 1; i++) {
      const current = transcript[i]
      const next = transcript[i + 1]
      
      if (current.role === 'assistant' && next.role === 'user') {
        const currentTime = new Date(current.timestamp).getTime()
        const nextTime = new Date(next.timestamp).getTime()
        const responseTime = (nextTime - currentTime) / 1000 // Convert to seconds
        responseTimes.push(responseTime)
      }
    }

    const averageResponseTime = responseTimes.length > 0 
      ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
      : 0

    // Calculate conversation duration
    const startTime = new Date(transcript[0]?.timestamp || Date.now()).getTime()
    const endTime = new Date(transcript[transcript.length - 1]?.timestamp || Date.now()).getTime()
    const conversationDuration = Math.round((endTime - startTime) / 1000 / 60) // minutes

    // Calculate word count and average response length
    const totalWords = userMessages.reduce((sum, msg) => sum + msg.text.split(' ').length, 0)
    const averageResponseLength = userMessages.length > 0 ? Math.round(totalWords / userMessages.length) : 0

    // Analyze technical content with weighted scoring
    const technicalKeywords = {
      // High-value technical terms
      'algorithm': 3, 'data structure': 3, 'complexity': 2, 'time complexity': 3, 'space complexity': 3,
      'array': 1, 'linked list': 2, 'tree': 2, 'graph': 2, 'hash': 2, 'stack': 1, 'queue': 1, 'heap': 2,
      'sorting': 2, 'searching': 2, 'recursion': 2, 'iteration': 1, 'dynamic programming': 3,
      'binary search': 3, 'merge sort': 2, 'quick sort': 2, 'bubble sort': 1, 'insertion sort': 1,
      'O(n)': 2, 'O(log n)': 2, 'O(n log n)': 2, 'O(n²)': 2, 'big o': 2, 'asymptotic': 2,
      'database': 2, 'sql': 2, 'index': 1, 'query': 1, 'optimization': 2, 'scalability': 2,
      'api': 1, 'rest': 1, 'http': 1, 'json': 1, 'xml': 1, 'microservices': 2, 'architecture': 2,
      'design pattern': 3, 'singleton': 2, 'factory': 2, 'observer': 2, 'mvc': 2,
      'testing': 1, 'unit test': 2, 'integration test': 2, 'tdd': 2, 'bdd': 2,
      'git': 1, 'version control': 1, 'ci/cd': 2, 'deployment': 1, 'docker': 2, 'kubernetes': 2
    }

    const userText = userMessages.map(msg => msg.text).join(' ').toLowerCase()
    let technicalScore = 0
    
    // Calculate weighted technical score
    Object.entries(technicalKeywords).forEach(([keyword, weight]) => {
      if (userText.includes(keyword.toLowerCase())) {
        technicalScore += weight
      }
    })

    // Normalize technical score (0-100)
    const maxPossibleScore = Object.values(technicalKeywords).reduce((sum, weight) => sum + weight, 0)
    const technicalAccuracy = Math.min(100, Math.round((technicalScore / maxPossibleScore) * 100 + 30))
    const communicationScore = Math.min(100, Math.round(
      (averageResponseLength > 10 ? 20 : 0) + 
      (responseTimes.length > 0 ? 20 : 0) + 
      (userMessages.length > 2 ? 20 : 0) + 
      (questions.length > 0 ? 20 : 0) + 
      20
    ))
    const overallScore = Math.round((technicalAccuracy + communicationScore) / 2)

    // Generate detailed feedback
    const detailedFeedback = questions.slice(0, 5).map((question, index) => {
      const correspondingUserMessage = userMessages[index] || { text: 'No response recorded', timestamp: '' }
      
      // Advanced scoring based on response quality
      let score = 40 // Base score
      const response = correspondingUserMessage.text.toLowerCase()
      
      // Length scoring
      if (response.length > 50) score += 15
      if (response.length > 100) score += 10
      if (response.length > 200) score += 5
      
      // Technical content scoring using weighted keywords
      let responseTechnicalScore = 0
      Object.entries(technicalKeywords).forEach(([keyword, weight]) => {
        if (response.includes(keyword.toLowerCase())) {
          responseTechnicalScore += weight
        }
      })
      score += Math.min(30, responseTechnicalScore * 2) // Cap technical bonus at 30
      
      // Communication quality indicators
      if (response.includes('i think') || response.includes('i believe')) score += 5
      if (response.includes('for example') || response.includes('let me explain')) score += 5
      if (response.includes('step by step') || response.includes('first, then')) score += 5
      if (response.includes('not sure') || response.includes('don\'t know')) score -= 10
      if (response.includes('i don\'t understand') || response.includes('confused')) score -= 5
      
      // Question-specific scoring
      if (question.toLowerCase().includes('complexity') && response.includes('o(')) score += 10
      if (question.toLowerCase().includes('algorithm') && response.includes('step')) score += 10
      if (question.toLowerCase().includes('design') && response.includes('pattern')) score += 10
      
      score = Math.max(0, Math.min(100, score))

      // Generate detailed feedback based on score and content
      let feedback = ''
      const hasTechnicalTerms = responseTechnicalScore > 0
      const isDetailed = response.length > 100
      const isStructured = response.includes('step') || response.includes('first') || response.includes('then')
      
      if (score >= 80) {
        feedback = 'Excellent response! '
        if (hasTechnicalTerms) feedback += 'Great use of technical terminology. '
        if (isDetailed) feedback += 'Very detailed explanation. '
        if (isStructured) feedback += 'Well-structured approach. '
        feedback += 'Shows strong understanding and clear communication.'
      } else if (score >= 60) {
        feedback = 'Good response with room for improvement. '
        if (!hasTechnicalTerms) feedback += 'Consider using more technical vocabulary. '
        if (!isDetailed) feedback += 'Try to provide more detailed explanations. '
        if (!isStructured) feedback += 'Consider structuring your response step-by-step. '
        feedback += 'Overall solid understanding demonstrated.'
      } else {
        feedback = 'Response needs improvement. '
        if (response.length < 50) feedback += 'Try to provide more detailed answers. '
        if (!hasTechnicalTerms) feedback += 'Use more technical terminology. '
        if (response.includes('not sure')) feedback += 'Be more confident in your explanations. '
        feedback += 'Consider explaining your thought process more clearly.'
      }

      return {
        question,
        userAnswer: correspondingUserMessage.text,
        score,
        feedback,
        timestamp: correspondingUserMessage.timestamp
      }
    })

    // Generate strengths and areas for improvement based on actual performance
    const strengths: string[] = []
    const areasForImprovement: string[] = []

    // Strengths analysis
    if (averageResponseLength > 20) strengths.push('Provides detailed and comprehensive responses')
    else if (averageResponseLength > 10) strengths.push('Gives adequate response length')
    
    if (responseTimes.length > 0 && averageResponseTime < 30) strengths.push('Responds quickly to questions')
    else if (responseTimes.length > 0) strengths.push('Responds to questions in reasonable time')
    
    if (technicalScore > 10) strengths.push('Uses appropriate technical terminology effectively')
    else if (technicalScore > 5) strengths.push('Shows some technical knowledge')
    
    if (userMessages.length > 5) strengths.push('Highly engaged in conversation')
    else if (userMessages.length > 2) strengths.push('Actively participates in discussion')
    
    if (questions.length > 0) strengths.push('Successfully participates in Q&A format')
    
    if (conversationDuration > 10) strengths.push('Maintains sustained conversation')
    
    // Areas for improvement analysis
    if (averageResponseLength < 15) areasForImprovement.push('Provide more detailed explanations and examples')
    
    if (technicalScore < 5) areasForImprovement.push('Use more technical vocabulary and concepts')
    
    if (responseTimes.length === 0) areasForImprovement.push('Respond more quickly to questions')
    else if (averageResponseTime > 60) areasForImprovement.push('Work on reducing response time')
    
    if (userMessages.length < 3) areasForImprovement.push('Engage more actively in conversation')
    
    if (conversationDuration < 5) areasForImprovement.push('Try to maintain longer, more detailed discussions')
    
    // Add specific technical improvement suggestions
    if (technicalScore < 10) {
      areasForImprovement.push('Study data structures and algorithms more thoroughly')
      areasForImprovement.push('Practice explaining technical concepts clearly')
    }
    
    if (averageResponseLength < 20) {
      areasForImprovement.push('Practice providing step-by-step explanations')
    }

    return {
      totalQuestions: questions.length,
      answeredQuestions: Math.min(questions.length, userMessages.length),
      responseTime: averageResponseTime,
      technicalAccuracy,
      communicationScore,
      overallScore,
      strengths: strengths.length > 0 ? strengths : ['Participated in interview'],
      areasForImprovement: areasForImprovement.length > 0 ? areasForImprovement : ['Continue practicing technical concepts'],
      detailedFeedback,
      conversationDuration,
      wordCount: totalWords,
      averageResponseLength
    }
  }

  useEffect(() => {
    // Get transcript data from sessionStorage
    const transcriptData = sessionStorage.getItem('interviewTranscript')
    
    if (!transcriptData) {
      setIsLoading(false)
      return
    }

    try {
      const transcript: TranscriptMessage[] = JSON.parse(transcriptData)
      
      if (transcript.length === 0) {
        setIsLoading(false)
        return
      }

      // Process the actual transcript data
      const analysis = analyzeTranscript(transcript)
      
      // Simulate processing delay for better UX
      setTimeout(() => {
        setAnalysisData(analysis)
        setIsLoading(false)
      }, 1500)
      
    } catch (error) {
      console.error('Error parsing transcript data:', error)
      setIsLoading(false)
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Interview</h2>
          <p className="text-muted-foreground">Please wait while we process your responses...</p>
        </div>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Analysis Available</h2>
          <p className="text-muted-foreground mb-4">No interview data found to analyze.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Interview
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Interview Analysis
                </h1>
                <p className="text-muted-foreground">Detailed feedback on your performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overall Score Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Overall Performance
            </CardTitle>
            <CardDescription>
              Your interview performance summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysisData.overallScore)}`}>
                  {analysisData.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {analysisData.answeredQuestions}/{analysisData.totalQuestions}
                </div>
                <p className="text-sm text-muted-foreground">Questions Answered</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analysisData.responseTime}s
                </div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {analysisData.technicalAccuracy}%
                </div>
                <p className="text-sm text-muted-foreground">Technical Accuracy</p>
              </div>
            </div>
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {analysisData.conversationDuration}m
                </div>
                <p className="text-sm text-muted-foreground">Interview Duration</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">
                  {analysisData.wordCount}
                </div>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {analysisData.averageResponseLength}
                </div>
                <p className="text-sm text-muted-foreground">Avg Words per Response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </CardTitle>
              <CardDescription>
                Areas where you performed well
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Target className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>
                Focus areas for your next interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.areasForImprovement.map((area, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Detailed Question Analysis
            </CardTitle>
            <CardDescription>
              Question-by-question feedback and scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysisData.detailedFeedback.map((feedback, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Question {index + 1}
                      </h4>
                      {feedback.timestamp && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(feedback.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <Badge variant={getScoreBadgeVariant(feedback.score)}>
                      {feedback.score}%
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium mb-2">{feedback.question}</p>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        <strong>Your Answer:</strong> {feedback.userAnswer}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Feedback:</strong> {feedback.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => router.push('/meet-test')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start New Interview
          </Button>
          <Button onClick={() => window.print()}>
            <Clock className="w-4 h-4 mr-2" />
            Save Report
          </Button>
        </div>
      </div>
    </div>
  )
}
