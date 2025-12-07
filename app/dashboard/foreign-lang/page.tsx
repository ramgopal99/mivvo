"use client";

import { useState } from "react";
import { Header } from "./components/header";
import { LevelTabs } from "./components/level-tabs";
import { type LanguageValue } from "./config";

export default function ForeignLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageValue>("english");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as LanguageValue);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <LevelTabs
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
}
