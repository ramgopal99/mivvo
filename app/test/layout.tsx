import { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';

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
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange
    >
      <div className="h-screen overflow-hidden bg-background text-foreground">
        {children}
      </div>
    </ThemeProvider>
  );
}
