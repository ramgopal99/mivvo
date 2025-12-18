"use client";

import { Button } from '@/components/ui/button';
import { getCourseDisplayName, getAvailableCourses } from '../config';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const availableLanguages = getAvailableCourses();

  return (
    <div className="flex gap-2 p-4 border-b border-border">
      <span className="text-sm font-medium text-muted-foreground mr-2">Course:</span>
      {availableLanguages.map((language) => (
        <Button
          key={language}
          variant={currentLanguage === language ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(language)}
          className="capitalize"
        >
          {getCourseDisplayName(language)}
        </Button>
      ))}
    </div>
  );
}
