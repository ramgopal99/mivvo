import * as z from "zod"

// Custom URL validation for GitHub and LinkedIn
const githubUrlSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true // Allow empty
      const url = val.trim()
      // Accept both full URLs and usernames
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return /^https?:\/\/(www\.)?(github\.com\/)[\w-]+(\/)?$/.test(url)
      }
      // Accept just username (will be converted to full URL)
      return /^[\w-]+$/.test(url)
    },
    {
      message: "Please enter a valid GitHub URL (e.g., https://github.com/username) or username",
    }
  )

const linkedInUrlSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true // Allow empty
      const url = val.trim()
      // Accept full LinkedIn URLs
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return /^https?:\/\/(www\.)?(linkedin\.com\/in\/)[\w-]+(\/)?$/.test(url)
      }
      // Accept just username (will be converted to full URL)
      return /^[\w-]+$/.test(url)
    },
    {
      message: "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username) or username",
    }
  )

export const settingsFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  careerGoals: z.string().optional(),
  linkedIn: linkedInUrlSchema,
  github: githubUrlSchema,
  rollNumber: z.string().optional(),
  branch: z.string().optional(),
  course: z.string().optional(),
  courseDuration: z.string().optional(),
  year: z.string().optional(),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

