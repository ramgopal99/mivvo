export default function TestFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Test F - Full Screen Demo</h1>
          <p className="text-lg text-gray-600">Demonstrating a comprehensive layout with sample data</p>
        </div>
        {children}
      </div>
    </div>
  );
}
