"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoDialog({ open, onOpenChange }: DemoDialogProps) {
  const router = useRouter();

  const handleViewCourses = () => {
    onOpenChange(false);
    router.push('/courses');
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push('/auth/signup');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Demo Mode
          </DialogTitle>
          <DialogDescription>
            You are currently viewing this course in demo mode. Progress tracking is not available in demo mode.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleViewCourses} className="w-full">
            Browse All Courses
          </Button>
          <Button onClick={handleSignUp} variant="outline" className="w-full">
            Sign Up to Track Progress
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
