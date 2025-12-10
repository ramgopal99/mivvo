"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCard } from "./skill-card";
import { levels, type LanguageValue } from "../config";

interface LevelTabsProps {
  selectedLanguage: LanguageValue;
}

export function LevelTabs({ selectedLanguage }: LevelTabsProps) {
  return (
    <Tabs defaultValue="A1" className="w-full">
      <TabsList className="grid w-full grid-cols-6 mb-6">
        {levels.map((level) => (
          <TabsTrigger key={level} value={level} className="text-sm">
            {level}
          </TabsTrigger>
        ))}
      </TabsList>

      {levels.map((level) => (
        <TabsContent key={level} value={level} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SkillCard type="reading" level={level} selectedLanguage={selectedLanguage} />
            <SkillCard type="writing" level={level} selectedLanguage={selectedLanguage} />
            <SkillCard type="speaking" level={level} selectedLanguage={selectedLanguage} />
            <SkillCard type="mcq" level={level} selectedLanguage={selectedLanguage} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
