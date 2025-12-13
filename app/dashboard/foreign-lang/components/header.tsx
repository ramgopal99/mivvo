"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "../config";
import { ProgressBar } from "./progress-bar";

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function Header({ selectedLanguage, onLanguageChange }: HeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Foreign Language</h1>
        <div className="flex items-center gap-4">
          <ProgressBar />
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
    </div>
  );
}
