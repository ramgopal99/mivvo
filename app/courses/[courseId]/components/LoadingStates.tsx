"use client";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        <p className="text-muted-foreground">
          Preparing your course content...
        </p>
      </div>
    </div>
  );
}

export function NotFoundState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-semibold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The course you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
