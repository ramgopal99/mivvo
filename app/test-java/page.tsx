"use client";

import TestPage from '../test/page';

// Import all necessary components from the test directory
import '../test/components/index';

export default function TestJavaPage() {
  // Pass 'java' as the language prop to show Java content
  return <TestPage language="java" />;
}

