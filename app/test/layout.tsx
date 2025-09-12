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
      {/* Desktop/Laptop View */}
      <div className="hidden lg:block h-full">
        {children}
      </div>
      
      {/* Mobile/Tablet View - Show message */}
      <div className="lg:hidden h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Desktop Required</h1>
            <p className="text-gray-600 mb-4">
              This demo is optimized for laptop and desktop screens. Please switch to a larger screen for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
