"use client"

import { useState } from "react"
import { updateUserRole } from "@/app/actions/user"
import { UserRole } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface User {
  id: string
  name: string | null
  email: string
  role: UserRole
  emailVerified: Date | null
  createdAt: Date
}

interface UserManagementProps {
  users: User[]
}

export function UserManagement({ users }: UserManagementProps) {
  const [updating, setUpdating] = useState<string | null>(null)

  const handleRoleUpdate = async (userId: string, newRole: UserRole) => {
    setUpdating(userId)
    try {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        toast.success(`User role updated to ${newRole}`)
        window.location.reload() // Refresh to show updated data
      } else {
        toast.error(result.error || "Failed to update role")
      }
    } catch (error) {
      toast.error("An error occurred while updating the role")
    } finally {
      setUpdating(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>
          Update user roles (SUPERADMIN users only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{user.name || "No name"}</h4>
                  <Badge
                    variant={user.role === UserRole.SUPERADMIN ? "destructive" : "default"}
                  >
                    {user.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Select
                  defaultValue={user.role}
                  onValueChange={(value: UserRole) => handleRoleUpdate(user.id, value)}
                  disabled={updating === user.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.USER}>USER</SelectItem>
                    <SelectItem value={UserRole.SUPERADMIN}>SUPERADMIN</SelectItem>
                  </SelectContent>
                </Select>
                {updating === user.id && (
                  <div className="text-sm text-muted-foreground">Updating...</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
