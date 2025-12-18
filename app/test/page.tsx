"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourseDisplayName, getAvailableCourses } from './config';
import { Code, BookOpen, Users } from 'lucide-react';

export default function TestHomePage() {
  const router = useRouter();
  const availableLanguages = getAvailableCourses();

  const handleLanguageSelect = (language: string) => {
    router.push(`/test/${language}`);
  };

  const getLanguageIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'python':
        return <Code className="w-8 h-8 text-blue-500" />;
      case 'java':
        return <BookOpen className="w-8 h-8 text-orange-500" />;
      case 'javascript':
        return <Code className="w-8 h-8 text-yellow-500" />;
      default:
        return <Code className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Programming Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your programming language and start your learning journey with interactive exercises and comprehensive modules.
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLanguages.map((language) => (
            <Card
              key={language}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
              onClick={() => handleLanguageSelect(language)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {getLanguageIcon(language)}
                </div>
                <CardTitle className="text-2xl capitalize">
                  {getCourseDisplayName(language)}
                </CardTitle>
                <CardDescription className="text-base">
                  Learn {language} programming with hands-on exercises
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLanguageSelect(language);
                  }}
                >
                  Start {language.charAt(0).toUpperCase() + language.slice(1)} Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            Interactive learning platform • Multiple programming languages • Hands-on exercises
          </div>
        </div>
      </div>
    </div>
  );
}