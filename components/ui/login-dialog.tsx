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
import { LogIn } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push('/auth/login');
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
            <LogIn className="w-5 h-5" />
            Login Required
          </DialogTitle>
          <DialogDescription>
            You need to be logged in to track your progress. Please sign in to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleLogin} className="w-full">
            Sign In
          </Button>
          <Button onClick={handleSignUp} variant="outline" className="w-full">
            Create Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
