"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { SkillCard } from "./components/skill-card";
import { type LanguageValue } from "./config";
import { getActiveLanguages } from "./config";
import { getAuthHeaders } from "@/lib/auth-utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ForeignLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageValue>("english");
  const [loading, setLoading] = useState(true);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  // Load user's preferred language on component mount
  useEffect(() => {
    const loadUserLanguagePreference = async () => {
      try {
        const response = await fetch('/api/foreign-language/user/preferences/language', {
          headers: getAuthHeaders()
        });
        const result = await response.json();

        if (result.success && result.data.preferredLanguage) {
          // Convert database identifier to lowercase for component state
          const preferredLang = result.data.preferredLanguage.toLowerCase();
          const availableLanguages = getActiveLanguages();

          // Check if the preferred language is available
          const languageExists = availableLanguages.some(lang => lang.language.toLowerCase() === preferredLang);
          if (languageExists) {
            setSelectedLanguage(preferredLang as LanguageValue);
          }
        }
      } catch (error) {
        console.error('Error loading user language preference:', error);
        // Keep default language (english)
      } finally {
        setLoading(false);
      }
    };

    loadUserLanguagePreference();
  }, []);

  const handleLanguageChange = (language: string) => {
    // Show confirmation dialog
    setPendingLanguage(language);
    setLanguageDialogOpen(true);
  };

  const confirmLanguageChange = async () => {
    if (!pendingLanguage) return;

    const language = pendingLanguage;
    setSelectedLanguage(language as LanguageValue);
    setLanguageDialogOpen(false);
    setPendingLanguage(null);

    // Save to user's preferences
    try {
      await fetch('/api/foreign-language/user/preferences/language', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language.toUpperCase(), // Save in uppercase format
        }),
      });
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const cancelLanguageChange = () => {
    setLanguageDialogOpen(false);
    setPendingLanguage(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4 space-y-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Preparing your learning experience...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get the display name for the pending language
  const getPendingLanguageName = () => {
    if (!pendingLanguage) return '';
    const languages = getActiveLanguages();
    const language = languages.find(lang => lang.language.toLowerCase() === pendingLanguage.toLowerCase());
    return language ? language.name : pendingLanguage;
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <Header selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} languages={getActiveLanguages()} />
      <div className="grid gap-4 grid-cols-2">
        <SkillCard type="reading" selectedLanguage={selectedLanguage} />
        <SkillCard type="writing" selectedLanguage={selectedLanguage} />
        <SkillCard type="speaking" selectedLanguage={selectedLanguage} />
        <SkillCard type="mcq" selectedLanguage={selectedLanguage} />
      </div>

      {/* Language Change Confirmation Dialog */}
      <AlertDialog open={languageDialogOpen} onOpenChange={setLanguageDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Language</AlertDialogTitle>
            <AlertDialogDescription>
              Ready to switch your learning journey to <strong>{getPendingLanguageName()}</strong>?
              <br />
              <br />
              Your preferred language will be updated, and this may reset your current progress tracking for a fresh start in your new language.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelLanguageChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLanguageChange}>
              Start Learning
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
