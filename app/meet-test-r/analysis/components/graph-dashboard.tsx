import { useState, useEffect } from 'react'
import { BarChart } from './bar-chart'
import { RadarChart } from './radar-chart'
import { PieChart } from './pie-chart'
import { LineChart } from './line-chart'
import { dummyGraphData } from './dummy-graph-data'

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

interface ChartData {
  barChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  radarChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  pieChart?: {
    title: string
    data: Array<{
      label: string
      value: number
      color: string
    }>
  }
  lineChart?: {
    title: string
    data: Array<{
      x: number
      y: number
      label: string
    }>
  }
}

interface RawChartItem {
  label?: unknown
  value?: unknown
  color?: unknown
  x?: unknown
  y?: unknown
  name?: unknown
}

interface GraphDashboardProps {
  analysis: AnalysisResult
  transcript: TranscriptMessage[]
  topic: string
}

type DataSource = 'ai' | 'dummy'

export function GraphDashboard({ analysis, transcript, topic }: GraphDashboardProps) {
  const [aiGraphData, setAiGraphData] = useState<ChartData | null>(null)
  const [isLoadingGraphs, setIsLoadingGraphs] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<DataSource>('ai')

  // Fetch AI-generated graph data only when AI mode is selected
  useEffect(() => {
    if (dataSource !== 'ai') {
      setIsLoadingGraphs(false)
      return
    }

    const fetchGraphData = async () => {
      setIsLoadingGraphs(true)
      setError(null)

      try {
        const response = await fetch('/api/graph-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversation: transcript,
            analysis: analysis,
            topic: topic,
            chartType: 'all'
          })
        })

        if (response.ok) {
          const data = await response.json()

          // Validate and sanitize the AI data with better error handling
          const sanitizedData: ChartData = {}

          try {
            if (data.barChart && typeof data.barChart === 'object') {
              const chartData = data.barChart.data || data.barChart
              if (Array.isArray(chartData)) {
                const validItems = chartData
                  .filter((item: unknown) => item && typeof item === 'object')
                  .map((item: RawChartItem) => ({
                    label: String(item.label || item.name || 'Unknown'),
                    value: Math.max(0, Number(item.value) || 0),
                    color: String(item.color || '#3b82f6')
                  }))
                  .filter(item => item.value >= 0 && !isNaN(item.value))

                if (validItems.length > 0) {
                  sanitizedData.barChart = {
                    title: String(data.barChart.title || 'AI Skills Assessment'),
                    data: validItems
                  }
                }
              }
            }

            if (data.radarChart && typeof data.radarChart === 'object') {
              const chartData = data.radarChart.data || data.radarChart
              if (Array.isArray(chartData)) {
                const validItems = chartData
                  .filter((item: unknown) => item && typeof item === 'object')
                  .map((item: RawChartItem) => ({
                    label: String(item.label || item.name || 'Unknown'),
                    value: Math.max(0, Number(item.value) || 0),
                    color: String(item.color || '#3b82f6')
                  }))
                  .filter(item => item.value >= 0 && !isNaN(item.value))

                if (validItems.length > 0) {
                  sanitizedData.radarChart = {
                    title: String(data.radarChart.title || 'AI Performance Radar'),
                    data: validItems
                  }
                }
              }
            }

            if (data.pieChart && typeof data.pieChart === 'object') {
              const chartData = data.pieChart.data || data.pieChart
              if (Array.isArray(chartData)) {
                const validItems = chartData
                  .filter((item: unknown) => item && typeof item === 'object')
                  .map((item: RawChartItem) => ({
                    label: String(item.label || item.name || 'Unknown'),
                    value: Math.max(0, Number(item.value) || 0),
                    color: String(item.color || '#3b82f6')
                  }))
                  .filter(item => item.value >= 0 && !isNaN(item.value))

                if (validItems.length > 0) {
                  sanitizedData.pieChart = {
                    title: String(data.pieChart.title || 'AI Score Distribution'),
                    data: validItems
                  }
                }
              }
            }

            if (data.lineChart && typeof data.lineChart === 'object') {
              const chartData = data.lineChart.data || data.lineChart
              if (Array.isArray(chartData)) {
                const validItems = chartData
                  .filter((item: unknown) => item && typeof item === 'object')
                  .map((item: RawChartItem) => ({
                    x: Math.max(0, Number(item.x) || 0),
                    y: Math.max(0, Number(item.y) || 0),
                    label: String(item.label || '')
                  }))
                  .filter(item => !isNaN(item.x) && !isNaN(item.y))

                if (validItems.length > 0) {
                  sanitizedData.lineChart = {
                    title: String(data.lineChart.title || 'AI Conversation Engagement'),
                    data: validItems
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error sanitizing AI graph data:', error)
            // Continue with empty data if sanitization fails
          }

          setAiGraphData(sanitizedData)
        } else {
          setError('Failed to generate AI graphs')
        }
      } catch (error) {
        console.error('Failed to fetch graph data:', error)
        setError('Failed to load AI graphs')
      } finally {
        setIsLoadingGraphs(false)
      }
    }

    fetchGraphData()
  }, [analysis, transcript, topic, dataSource])

  // Select data based on source
  const getCurrentData = () => {
    switch (dataSource) {
      case 'ai':
        return {
          skillsData: aiGraphData?.barChart?.data || [],
          radarData: aiGraphData?.radarChart?.data || [],
          scoreDistribution: aiGraphData?.pieChart?.data || [],
          conversationData: aiGraphData?.lineChart?.data || [],
          barChartTitle: aiGraphData?.barChart?.title || 'AI Skills Assessment',
          radarChartTitle: aiGraphData?.radarChart?.title || 'AI Performance Radar',
          pieChartTitle: aiGraphData?.pieChart?.title || 'AI Score Distribution',
          lineChartTitle: aiGraphData?.lineChart?.title || 'AI Conversation Engagement'
        }
      case 'dummy':
        return {
          skillsData: dummyGraphData.barChart.data,
          radarData: dummyGraphData.radarChart.data,
          scoreDistribution: dummyGraphData.pieChart.data,
          conversationData: dummyGraphData.lineChart.data,
          barChartTitle: dummyGraphData.barChart.title,
          radarChartTitle: dummyGraphData.radarChart.title,
          pieChartTitle: dummyGraphData.pieChart.title,
          lineChartTitle: dummyGraphData.lineChart.title
        }
      default:
        return {
          skillsData: [],
          radarData: [],
          scoreDistribution: [],
          conversationData: [],
          barChartTitle: 'Skills Assessment',
          radarChartTitle: 'Performance Radar',
          pieChartTitle: 'Score Distribution',
          lineChartTitle: 'Conversation Engagement'
        }
    }
  }

  const {
    skillsData,
    radarData,
    scoreDistribution,
    conversationData,
    barChartTitle,
    radarChartTitle,
    pieChartTitle,
    lineChartTitle
  } = getCurrentData()

  // Show loading state only for AI
  if (dataSource === 'ai' && isLoadingGraphs) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">AI is generating personalized graphs...</p>
          <p className="text-sm text-muted-foreground mt-2">Analyzing conversation and creating visualizations</p>
        </div>
      </div>
    )
  }

  // Show error state only for AI
  if (dataSource === 'ai' && error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-red-600">Failed to Generate AI Graphs</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Show empty state only for AI when no data is available
  if (dataSource === 'ai' && !aiGraphData || (dataSource === 'ai' && !skillsData.length && !radarData.length && !scoreDistribution.length && !conversationData.length)) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-lg font-semibold">No Graph Data Available</p>
          <p className="text-sm text-muted-foreground mt-2">AI could not generate graphs for this conversation</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Data Source Selector */}
      <div className="flex justify-end">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Data Source:</span>
          <select
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value as DataSource)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Select data source for graphs"
          >
            <option value="ai">🤖 AI Generated</option>
            <option value="dummy">📊 Dummy Data</option>
          </select>
          {dataSource === 'ai' && isLoadingGraphs && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">Generating...</span>
            </div>
          )}
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Performance</h3>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{analysis.final_score}/10</div>
            <div className="text-lg text-gray-600 mb-4">{analysis.recommendation}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  analysis.final_score >= 7 ? 'bg-green-600' :
                  analysis.final_score >= 5 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${analysis.final_score * 10}%` }}
              />
            </div>
            <div className="text-sm text-gray-500">Performance Score</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sentiment:</span>
              <span className={`font-semibold ${
                analysis.sentiment === 'Positive' ? 'text-green-600' :
                analysis.sentiment === 'Neutral' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.sentiment}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confidence:</span>
              <span className={`font-semibold ${
                analysis.confidence_level === 'High' ? 'text-green-600' :
                analysis.confidence_level === 'Medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.confidence_level}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Messages:</span>
              <span className="font-semibold text-blue-600">{transcript.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Strengths:</span>
              <span className="font-semibold text-green-600">{analysis.strengths.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Skills Bar Chart */}
        {skillsData.length > 0 && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <BarChart
              data={skillsData}
              title={barChartTitle}
              height={350}
            />
          </div>
        )}

        {/* Radar Chart */}
        {radarData.length > 0 && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <RadarChart
              data={radarData}
              title={radarChartTitle}
              size={350}
            />
          </div>
        )}

        {/* Score Distribution Pie Chart */}
        {scoreDistribution.length > 0 && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <PieChart
              data={scoreDistribution}
              title={pieChartTitle}
              size={350}
            />
          </div>
        )}

        {/* Conversation Flow Line Chart */}
        {conversationData.length > 0 && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <LineChart
              data={conversationData}
              title={lineChartTitle}
              xLabel="Message Number"
              yLabel="Engagement Level"
              height={350}
            />
          </div>
        )}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {analysis.communication_skills.clarity === 'Clear' ? 'A' :
             analysis.communication_skills.clarity === 'Moderate' ? 'B' : 'C'}
          </div>
          <div className="text-gray-600">Communication Grade</div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {analysis.technical_knowledge.depth === 'Expert' ? 'A' :
             analysis.technical_knowledge.depth === 'Intermediate' ? 'B' : 'C'}
          </div>
          <div className="text-gray-600">Technical Grade</div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {analysis.soft_skills.problem_solving === 'Strong' ? 'A' :
             analysis.soft_skills.problem_solving === 'Average' ? 'B' : 'C'}
          </div>
          <div className="text-gray-600">Problem Solving Grade</div>
        </div>
      </div>
    </div>
  )
}
