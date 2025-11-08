"use client";

import { Button } from '@/components/ui/button';

export default function CourseFooter() {
  return (
    <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold">Go from Zero to Hero</h3>
            <p className="text-sm text-muted-foreground">Start your learning journey today</p>
          </div>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Buy now for ₹399
          </Button>
        </div>
      </div>
    </div>
  );
}

