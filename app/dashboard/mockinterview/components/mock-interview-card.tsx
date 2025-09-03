"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Building, MoreHorizontal, Edit, Trash2, Eye, Brain } from "lucide-react"
import { MockInterview } from "../types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MockInterviewCardProps {
  interview: MockInterview
  onEdit: (interview: MockInterview) => void
  onDelete: (interview: MockInterview) => void
}

export function MockInterviewCard({ interview, onEdit, onDelete }: MockInterviewCardProps) {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  

  const handleStartInterviewClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmStartInterview = () => {
    setIsConfirmDialogOpen(false)
      router.push(`/dashboard/mockinterview/${interview.id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(interview)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(interview)
  }

  const truncateDescription = (text: string, maxLines: number = 2) => {
    const words = text.split(' ')
    const maxWords = maxLines * 8 // Approximate words per line

    if (words.length <= maxWords) {
      return text
    }

    return words.slice(0, maxWords).join(' ') + '...'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getExperienceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'entry':
        return 'bg-blue-100 text-blue-800'
      case 'mid':
        return 'bg-purple-100 text-purple-800'
      case 'senior':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card
      className="hover:shadow-md transition-shadow flex flex-col h-full relative"
    >
        {/* View More and Edit/Delete Menu */}
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-1">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs hover:bg-background/80 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-3 w-3 mr-1" />
                View More
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={undefined} alt={interview.position || "Interview"} />
                    <AvatarFallback>
                      <Brain className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-bold">{interview.position || "Position not specified"}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary" className="text-sm">
                        {interview.companyName || "Company not specified"}
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        {interview.interviewType || "Type not specified"}
                      </Badge>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Company Description</h4>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <p className="text-sm leading-relaxed">{interview.companyDescription || "No company description provided."}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Job Description</h4>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <p className="text-sm leading-relaxed">{interview.jobDescription || "No job description provided."}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Interview Details</h4>
                    <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getDifficultyColor(interview.difficulty || "medium")}>
                          Difficulty: {interview.difficulty || "Medium"}
                        </Badge>
                        <Badge variant="outline" className={getExperienceColor(interview.experienceLevel || "mid")}>
                          Level: {interview.experienceLevel || "Mid-level"}
                        </Badge>
                        <Badge variant="outline">
                          Industry: {interview.industry || "General"}
                        </Badge>
                        <Badge variant="outline">
                          Type: {interview.interviewType || "General"}
                        </Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          <strong>Position:</strong> {interview.position || "Not specified"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <strong>Company:</strong> {interview.companyName || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Actions</h4>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleConfirmStartInterview}
                        className="flex-1 cursor-pointer"
                        size="lg"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Interview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
                     </Dialog>

           {/* Confirmation Dialog */}
           <Dialog open={isConfirmDialogOpen} onOpenChange={(open) => {
             if (!open) {
               setIsConfirmDialogOpen(false)
             }
           }}>
             <DialogContent className="max-w-md" showCloseButton={false}>
               <DialogHeader>
                 <DialogTitle>Start Interview</DialogTitle>
               </DialogHeader>
               <div className="py-4">
                 <p className="text-sm text-muted-foreground">
                   Are you sure you want to start the interview for <strong>{interview.position || "this position"}</strong> at <strong>{interview.companyName || "this company"}</strong>?
                 </p>
               </div>
               <div className="flex justify-end space-x-2">
                 <Button
                   variant="outline"
                   onClick={() => setIsConfirmDialogOpen(false)}
                   className="cursor-pointer"
                 >
                   Cancel
                 </Button>
                 <Button
                   onClick={handleConfirmStartInterview}
                   className="cursor-pointer"
                 >
                   Start Interview
                 </Button>
          </div>
             </DialogContent>
           </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-background/80 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEditClick}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={undefined} alt={interview.position || "Interview"} />
              <AvatarFallback>
                <Brain className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-lg">{interview.position || "Position not specified"}</CardTitle>
              <div className="flex items-center space-x-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">
                  {interview.companyName || "Company not specified"}
                </Badge>
              </div>
            </div>
        </div>
      </CardHeader>
        <CardContent className="pt-0 flex-1 flex flex-col">
          <div className="mb-4 flex-1">
            <CardDescription>
              {truncateDescription(interview.companyDescription || "No company description available.")}
            </CardDescription>
          </div>
          <div className="space-y-2 mt-auto">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className={getDifficultyColor(interview.difficulty || "medium")}>
                {interview.difficulty || "Medium"}
          </Badge>
              <Badge variant="outline" className={getExperienceColor(interview.experienceLevel || "mid")}>
                {interview.experienceLevel || "Mid"}
          </Badge>
          <Badge variant="outline">
                {interview.interviewType || "General"}
          </Badge>
        </div>
            <div className="flex items-center justify-end">
          <Button
            size="sm"
                className="cursor-pointer hover:cursor-pointer"
                onClick={handleStartInterviewClick}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Interview
          </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
