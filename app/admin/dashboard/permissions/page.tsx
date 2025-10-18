"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  UserCheck,
  Shield,
  Users,
  Building2,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react"
import { useState } from "react"

// Dummy permissions data
const rolePermissions = {
  super_admin: {
    name: "Super Admin",
    description: "Full platform access and control",
    users: 3,
    permissions: {
      userManagement: true,
      collegeManagement: true,
      systemSettings: true,
      billingAccess: true,
      analyticsAccess: true,
      deleteData: true,
      systemHealth: true,
      auditLogs: true
    }
  },
  college_admin: {
    name: "College Admin",
    description: "Manage their college and students",
    users: 12,
    permissions: {
      userManagement: false,
      collegeManagement: true,
      systemSettings: false,
      billingAccess: true,
      analyticsAccess: true,
      deleteData: false,
      systemHealth: false,
      auditLogs: false
    }
  },
  user: {
    name: "User",
    description: "Basic platform access",
    users: 1235,
    permissions: {
      userManagement: false,
      collegeManagement: false,
      systemSettings: false,
      billingAccess: false,
      analyticsAccess: false,
      deleteData: false,
      systemHealth: false,
      auditLogs: false
    }
  }
}

const permissionCategories = [
  {
    category: "User Management",
    permissions: [
      { key: "userManagement", label: "Manage Users", description: "Create, edit, and delete user accounts" },
      { key: "bulkUserActions", label: "Bulk User Actions", description: "Import/export users, bulk operations" },
      { key: "userRoles", label: "Assign User Roles", description: "Change user roles and permissions" }
    ]
  },
  {
    category: "College Management",
    permissions: [
      { key: "collegeManagement", label: "Manage Colleges", description: "Create, edit, and configure colleges" },
      { key: "collegeSettings", label: "College Settings", description: "Modify college-specific settings" },
      { key: "collegeAnalytics", label: "College Analytics", description: "Access college performance data" }
    ]
  },
  {
    category: "System Access",
    permissions: [
      { key: "systemSettings", label: "System Settings", description: "Modify platform-wide settings" },
      { key: "systemHealth", label: "System Health", description: "Monitor system status and health" },
      { key: "auditLogs", label: "Audit Logs", description: "Access system audit logs" }
    ]
  },
  {
    category: "Financial",
    permissions: [
      { key: "billingAccess", label: "Billing Access", description: "View and manage billing information" },
      { key: "paymentProcessing", label: "Payment Processing", description: "Handle payment transactions" },
      { key: "financialReports", label: "Financial Reports", description: "Access financial analytics" }
    ]
  }
]

export default function AdminPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<keyof typeof rolePermissions>("user")
  const [permissions, setPermissions] = useState(rolePermissions)

  const handlePermissionChange = (role: keyof typeof rolePermissions, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        permissions: {
          ...prev[role].permissions,
          [permission]: value
        }
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Permissions</h1>
          <p className="text-muted-foreground">
            Manage user roles and access permissions across the platform
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Role Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(permissions).map(([key, role]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all ${
              selectedRole === key ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedRole(key as keyof typeof rolePermissions)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <Badge variant={key === 'super_admin' ? 'default' : 'outline'}>
                  {role.users} users
                </Badge>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Permissions</span>
                  <span className="font-medium">
                    {Object.values(role.permissions).filter(Boolean).length} / {Object.keys(role.permissions).length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(Object.values(role.permissions).filter(Boolean).length / Object.keys(role.permissions).length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permission Settings - {permissions[selectedRole].name}
          </CardTitle>
          <CardDescription>
            Configure what actions users with this role can perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user-management" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user-management">User Management</TabsTrigger>
              <TabsTrigger value="college-management">College Management</TabsTrigger>
              <TabsTrigger value="system-access">System Access</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>

            {permissionCategories.map((category) => (
              <TabsContent key={category.category.toLowerCase().replace(/\s+/g, '-')} value={category.category.toLowerCase().replace(/\s+/g, '-')} className="space-y-4">
                <div className="space-y-4">
                  {category.permissions.map((permission) => (
                    <div key={permission.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <Label htmlFor={permission.key} className="text-base font-medium cursor-pointer">
                          {permission.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {permission.description}
                        </p>
                      </div>
                      <Switch
                        id={permission.key}
                        checked={permissions[selectedRole].permissions[permission.key as keyof typeof permissions.super_admin.permissions] || false}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(selectedRole, permission.key, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Role Statistics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>
              Current distribution of users across roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(permissions).map(([key, role]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">{role.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{role.users}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({Math.round((role.users / Object.values(permissions).reduce((acc, r) => acc + r.users, 0)) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permission Summary</CardTitle>
            <CardDescription>
              Overview of permissions across all roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(permissions.super_admin.permissions).filter(Boolean).length}
                </div>
                <div className="text-sm text-muted-foreground">Super Admin Permissions</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(permissions.college_admin.permissions).filter(Boolean).length}
                </div>
                <div className="text-sm text-muted-foreground">College Admin Permissions</div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Regular users have access to basic platform features only.
                All permissions are carefully audited and logged.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common permission management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <UserCheck className="h-6 w-6" />
              <span className="text-sm">Audit Permissions</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Security Review</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Bulk Update</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Eye className="h-6 w-6" />
              <span className="text-sm">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
