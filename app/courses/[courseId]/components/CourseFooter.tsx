/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";

interface CourseFooterProps {
  courseId?: string;
  onViewDemo?: () => void;
}

export default function CourseFooter({ courseId, onViewDemo }: CourseFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-background via-muted/20 to-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Transform Your Future?
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of successful learners who have accelerated their careers with our comprehensive courses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onViewDemo}
              size="lg"
              className="px-8 py-3 font-semibold shadow-lg hover:shadow-xl"
            >
              View Course Demo
            </Button>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} Mivvo Learning Platform. Empowering Education Through Technology.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}