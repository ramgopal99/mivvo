"use client";

export default function CourseFooter() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of students who have transformed their careers through our courses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start Learning Now
            </button>
            <button className="px-8 py-3 border border-border bg-card text-card-foreground rounded-lg font-medium hover:bg-muted transition-colors">
              View Course Preview
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 Learning Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}