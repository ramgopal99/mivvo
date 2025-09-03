"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Edit, Trash2, Eye, Building, Briefcase, Play } from "lucide-react"
import { getMockInterviews, deleteMockInterview } from "./actions"
import { CreateMockInterviewDialog } from "./components/create-mock-interview-dialog"
import { DeleteInterviewDialog } from "./components/delete-interview-dialog"
import { EditInterviewDialog } from "./components/edit-interview-dialog"
import { MockInterviewHeader } from "./components/mock-interview-header"
import { InterviewDetailsSidebar } from "./components/interview-details-sidebar-compound"
import { MockInterview } from "./types"
import { toast } from "sonner"

export default function MockInterviewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mockInterviews, setMockInterviews] = useState<MockInterview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [interviewToEdit, setInterviewToEdit] = useState<MockInterview | null>(null)
  const [interviewToDelete, setInterviewToDelete] = useState<MockInterview | null>(null)
  const [interviewToView, setInterviewToView] = useState<MockInterview | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [interviewToStart, setInterviewToStart] = useState<MockInterview | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchMockInterviews()
  }, [])

  const fetchMockInterviews = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await getMockInterviews()

      if (result.success) {
        setMockInterviews(result.data || [])
      } else {
        setError(result.error || "Failed to fetch mock interviews")
      }
    } catch (error) {
      setError("An unexpected error occurred")
      console.error("Error fetching mock interviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditInterview = (interview: MockInterview) => {
    setInterviewToEdit(interview)
  }

  const handleDeleteInterview = (interview: MockInterview) => {
    setInterviewToDelete(interview)
  }

  const confirmDelete = async (interview: MockInterview) => {
    try {
      const result = await deleteMockInterview(interview.id)

      if (result.success) {
        toast.success(`"${interview.companyName || "Company not specified"} - ${interview.position || "Position not specified"}" has been deleted successfully`)
        // Refresh the list
        fetchMockInterviews()
      } else {
        toast.error(result.error || "Failed to delete interview")
      }
    } catch (error) {
      toast.error("Failed to delete interview")
      console.error("Error deleting interview:", error)
    } finally {
      setInterviewToDelete(null)
    }
  }

  const handleInterviewUpdated = () => {
    setInterviewToEdit(null)
    fetchMockInterviews()
  }

  const handleViewInterview = (interview: MockInterview) => {
    setInterviewToView(interview)
    setIsSidebarOpen(true)
  }

  const handleStartInterview = (interview: MockInterview) => {
    setInterviewToStart(interview)
  }

  const confirmStartInterview = () => {
    if (interviewToStart) {
      router.push(`/dashboard/mockinterview/${interviewToStart.id}`)
    }
    setInterviewToStart(null)
  }

  const cancelStartInterview = () => {
    setInterviewToStart(null)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
    setInterviewToView(null)
  }

  // Filter mock interviews based on search query
  const filteredInterviews = mockInterviews.filter(interview =>
                    (interview.companyName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (interview.position || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (interview.industry || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (interview.interviewType || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-6">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading mock interviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <MockInterviewHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onInterviewCreated={fetchMockInterviews}
        />

        <Card className="text-center py-12 p-6">
          <CardContent className="px-0">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <Briefcase className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Error Loading Interviews</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <Button onClick={fetchMockInterviews} variant="outline" className="cursor-pointer">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <MockInterviewHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onInterviewCreated={fetchMockInterviews}
      />

      {/* Mock Interviews */}
      <Card className="p-6">
        <CardHeader className="px-0 pb-4">
          <CardTitle>
            {searchQuery ? "Your Search" : "Mock Interviews"}
          </CardTitle>
          <CardDescription>
            {searchQuery
              ? `Found ${filteredInterviews.length} interview${filteredInterviews.length !== 1 ? 's' : ''} matching "${searchQuery}"`
              : `${filteredInterviews.length} mock interview${filteredInterviews.length !== 1 ? 's' : ''} available`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          {filteredInterviews.length === 0 ? (
            searchQuery ? (
              <div className="text-center py-8 text-muted-foreground">
                No interviews found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No mock interviews created yet.
              </div>
            )
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position & Company</TableHead>
                    <TableHead>Interview Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Experience Level</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">
                            {interview.position || "Position not specified"}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Building className="h-3 w-3 mr-1" />
                            {interview.companyName || "Company not specified"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {interview.interviewType || "General"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            (interview.difficulty || "medium").toLowerCase() === 'easy'
                              ? 'bg-green-100 text-green-800'
                              : (interview.difficulty || "medium").toLowerCase() === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {(interview.difficulty || "Medium").charAt(0).toUpperCase() + (interview.difficulty || "Medium").slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            (interview.experienceLevel || "mid").toLowerCase() === 'entry'
                              ? 'bg-blue-100 text-blue-800'
                              : (interview.experienceLevel || "mid").toLowerCase() === 'mid'
                              ? 'bg-purple-100 text-purple-800'
                              : (interview.experienceLevel || "mid").toLowerCase() === 'senior'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {interview.experienceLevel === 'entry' ? 'Entry Level' :
                           interview.experienceLevel === 'mid' ? 'Mid Level' :
                           interview.experienceLevel === 'senior' ? 'Senior Level' :
                           interview.experienceLevel === 'lead' ? 'Lead/Principal' :
                           'Mid Level'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{interview.industry || "General"}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleStartInterview(interview)}
                            className="h-8 px-2 cursor-pointer bg-primary hover:bg-primary/90"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline text-xs">Start</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewInterview(interview)}
                            className="h-8 px-2 cursor-pointer"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline text-xs">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditInterview(interview)}
                            className="h-8 px-2 cursor-pointer"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline text-xs">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteInterview(interview)}
                            className="h-8 px-2 cursor-pointer text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline text-xs">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Empty State - No interviews at all */}
      {mockInterviews.length === 0 && !searchQuery && (
        <Card className="text-center py-12 p-6">
          <CardContent className="px-0">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Mock Interviews</h3>
                <p className="text-muted-foreground">
                  Create your first mock interview to practice for any position at any company
                </p>
              </div>
              <CreateMockInterviewDialog onInterviewCreated={fetchMockInterviews} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteInterviewDialog
        interview={interviewToDelete}
        isOpen={!!interviewToDelete}
        onClose={() => setInterviewToDelete(null)}
        onConfirm={confirmDelete}
      />

      {/* Edit Interview Dialog */}
      <EditInterviewDialog
        interview={interviewToEdit}
        isOpen={!!interviewToEdit}
        onClose={() => setInterviewToEdit(null)}
        onInterviewUpdated={handleInterviewUpdated}
      />

      {/* Start Interview Confirmation Dialog */}
      {interviewToStart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary/10 rounded-full mr-3">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Start Interview</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you ready to start the interview for{" "}
              <span className="font-medium text-foreground">
                {interviewToStart.position || "this position"}
              </span>
              {" "}at{" "}
              <span className="font-medium text-foreground">
                {interviewToStart.companyName || "this company"}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={cancelStartInterview}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmStartInterview}
                className="cursor-pointer bg-primary hover:bg-primary/90"
              >
                Start Interview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Details Sidebar */}
      <InterviewDetailsSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        interview={interviewToView}
      />
    </div>
  )
}
