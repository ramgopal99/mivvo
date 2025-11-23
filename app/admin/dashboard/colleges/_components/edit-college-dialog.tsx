"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { updateCollege, getCollegeById } from "@/app/actions/college"
import { toast } from "sonner"

const formSchema = z.object({
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  collegeId: z.string().min(2, "College ID must be at least 2 characters"),
  description: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  phone: z.string().optional(),
  establishedYear: z.number().optional(),
  monthlyRatePerUser: z.number().min(0, "Monthly rate must be non-negative"),
})

type FormData = z.infer<typeof formSchema>

interface EditCollegeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collegeId: string | null
  onCollegeUpdated?: () => void
}

export function EditCollegeDialog({ open, onOpenChange, collegeId, onCollegeUpdated }: EditCollegeDialogProps) {
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeName: "",
      collegeId: "",
      description: "",
      location: "",
      website: "",
      phone: "",
      establishedYear: undefined,
      monthlyRatePerUser: 150,
    },
  })

  // Fetch college data when dialog opens
  useEffect(() => {
    const fetchCollegeData = async () => {
      if (!collegeId || !open) return

      setFetchingData(true)
      try {
        const result = await getCollegeById(collegeId)
        if (result.success && result.data) {
          const college = result.data
          form.reset({
            collegeName: college.name,
            collegeId: college.collegeId,
            description: college.description || "",
            location: college.location || "",
            website: college.website || "",
            phone: college.phone || "",
            establishedYear: college.establishedYear || undefined,
            monthlyRatePerUser: college.monthlyRatePerUser,
          })
        } else {
          toast.error(result.error || "Failed to load college data")
        }
      } catch (error) {
        console.error("Error fetching college data:", error)
        toast.error("Failed to load college data")
      } finally {
        setFetchingData(false)
      }
    }

    fetchCollegeData()
  }, [collegeId, open, form])

  const onSubmit = async (data: FormData) => {
    if (!collegeId) return

    setLoading(true)
    try {
      const result = await updateCollege(collegeId, {
        collegeName: data.collegeName,
        collegeId: data.collegeId,
        description: data.description || undefined,
        location: data.location || undefined,
        website: data.website || undefined,
        phone: data.phone || undefined,
        establishedYear: data.establishedYear || undefined,
        monthlyRatePerUser: data.monthlyRatePerUser,
      })

      if (result.success) {
        toast.success("College updated successfully")
        form.reset()
        onOpenChange(false)
        onCollegeUpdated?.()
      } else {
        toast.error(result.error || "Failed to update college")
      }
    } catch (error) {
      console.error("Error updating college:", error)
      toast.error("An error occurred while updating the college")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
          <DialogDescription>
            Update college information and settings.
          </DialogDescription>
        </DialogHeader>

        {fetchingData ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground ml-2">Loading college data...</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* College Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">College Information</h4>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="collegeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collegeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College ID *</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC_UNIV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the college..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.example.edu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="establishedYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Established Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2020"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div></div> {/* Empty space for grid alignment */}
                </div>

                <FormField
                  control={form.control}
                  name="monthlyRatePerUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rate Per User (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="150.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 150)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update College"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
