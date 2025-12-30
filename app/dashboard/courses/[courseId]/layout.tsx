import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;

  return {
    title: `${courseId} Course - Dashboard`,
    description: `Interactive ${courseId} learning platform with hands-on exercises`,
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      {children}
    </div>
  );
}











