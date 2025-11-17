"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Zap,
  Shield,
  Globe,
  Maximize,
  Minimize
} from "lucide-react";

// Sample data for demonstration
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer", status: "Active", avatar: "AJ" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer", status: "Active", avatar: "BS" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Manager", status: "Inactive", avatar: "CB" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Analyst", status: "Active", avatar: "DP" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "Tester", status: "Active", avatar: "EW" },
];

const projects = [
  { name: "E-commerce Platform", progress: 85, team: 12, budget: "$250K", deadline: "2024-12-15" },
  { name: "Mobile App", progress: 67, team: 8, budget: "$180K", deadline: "2024-11-30" },
  { name: "Data Analytics", progress: 92, team: 15, budget: "$320K", deadline: "2024-12-01" },
  { name: "Cloud Migration", progress: 45, team: 6, budget: "$150K", deadline: "2025-01-15" },
];

const metrics = [
  { label: "Total Users", value: "12,345", change: "+12%", icon: Users },
  { label: "Revenue", value: "$543,210", change: "+8%", icon: DollarSign },
  { label: "Active Projects", value: "47", change: "+5%", icon: Activity },
  { label: "Performance Score", value: "94.2%", change: "+2%", icon: TrendingUp },
];

const stats = [
  { category: "Sales", q1: 12500, q2: 15200, q3: 18700, q4: 21300 },
  { category: "Marketing", q1: 8200, q2: 9100, q3: 10500, q4: 12100 },
  { category: "Development", q1: 15600, q2: 17200, q3: 19800, q4: 22400 },
  { category: "Support", q1: 6400, q2: 7100, q3: 7800, q4: 8500 },
];

export default function TestFPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };
  return (
    <div className="space-y-8">
      {/* Fullscreen Toggle Button */}
      <div className="flex justify-end">
        <Button
          onClick={toggleFullscreen}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 cursor-pointer"
        >
          {isFullscreen ? (
            <>
              <Minimize className="h-4 w-4" />
              Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize className="h-4 w-4" />
              Enter Fullscreen
            </>
          )}
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{metric.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Welcome Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Welcome to Test F Dashboard
                </CardTitle>
                <CardDescription>
                  A comprehensive demonstration of layout and data visualization components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Secure
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Global
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Targeted
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Award Winning
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
              <Button className="w-full justify-start cursor-pointer" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start cursor-pointer" variant="outline">
                <Briefcase className="h-4 w-4 mr-2" />
                View Projects
              </Button>
              <Button className="w-full justify-start cursor-pointer" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics Report
              </Button>
              <Button className="w-full justify-start cursor-pointer" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Alice Johnson updated project</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Bob Smith completed task</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Diana Prince joined team</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage and view all system users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="cursor-pointer">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.name}</span>
                    <Badge variant="outline">{project.progress}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={project.progress} className="w-full" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.team} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>On track</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Department Performance (2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Q1</TableHead>
                    <TableHead>Q2</TableHead>
                    <TableHead>Q3</TableHead>
                    <TableHead>Q4</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.map((stat, index) => {
                    const total = stat.q1 + stat.q2 + stat.q3 + stat.q4;
                    const growth = ((stat.q4 - stat.q1) / stat.q1 * 100).toFixed(1);
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{stat.category}</TableCell>
                        <TableCell>${stat.q1.toLocaleString()}</TableCell>
                        <TableCell>${stat.q2.toLocaleString()}</TableCell>
                        <TableCell>${stat.q3.toLocaleString()}</TableCell>
                        <TableCell>${stat.q4.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">${total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={parseFloat(growth) > 0 ? "default" : "destructive"}>
                            {growth}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Contact Information Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Mivvo Technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>www.mivvo.com</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>contact@mivvo.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Tech Interview Platform</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>Industry Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Enterprise Security</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Separator />
      <div className="text-center text-sm text-muted-foreground py-8">
        <p>© 2024 Mivvo Technologies. All rights reserved.</p>
        <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </div>
  );
}
