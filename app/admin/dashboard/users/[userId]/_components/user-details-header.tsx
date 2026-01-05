import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"

interface UserDetails {
  id: string
  name: string
  email: string
}

interface UserDetailsHeaderProps {
  userDetails: UserDetails
  onBack: () => void
}

export function UserDetailsHeader({ userDetails, onBack }: UserDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userDetails.name}</h1>
            <p className="text-muted-foreground">{userDetails.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
