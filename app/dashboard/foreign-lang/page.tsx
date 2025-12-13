"use client";

import { useState } from "react";
import { Header } from "./components/header";
import { SkillCard } from "./components/skill-card";
import { type LanguageValue } from "./config";

export default function ForeignLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageValue>("english");

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as LanguageValue);
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      <div className="grid gap-4 grid-cols-2">
        <SkillCard type="reading" selectedLanguage={selectedLanguage} />
        <SkillCard type="writing" selectedLanguage={selectedLanguage} />
        <SkillCard type="speaking" selectedLanguage={selectedLanguage} />
        <SkillCard type="mcq" selectedLanguage={selectedLanguage} />
      </div>
    </div>
  );
}
