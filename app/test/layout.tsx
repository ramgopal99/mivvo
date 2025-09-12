import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Javascript Learning Platform - Test',
  description: 'Interactive Javascript learning platform with hands-on exercises',
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-white" data-theme="light">
      {children}
    </div>
  );
}
