"use client";

import { useState } from 'react';
import LanguageSelector from './language-selector';
import TestPage from './page';
import { CURRENT_COURSE } from './course-config';

export default function LanguageTestWrapper() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(CURRENT_COURSE);

  return (
    <div className="h-screen flex flex-col">
      <LanguageSelector
        currentLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      <div className="flex-1">
        <TestPage language={selectedLanguage} />
      </div>
    </div>
  );
}
