// =============================================
// COURSE MODEL TYPES
// =============================================

export interface CourseModel {
  // Basic course info
  id: string;
  displayName: string;

  // Header data
  headerData: {
    title: string;
    completionPercentage: string;
  };

  // Code editor configuration (optional for theory courses)
  codeEditor?: {
    monacoLanguage: string;
    displayName: string;
    defaultCode: string;
    executionLanguage: string;
    executionVersion: string;
  };

  // AI Assistant configuration
  aiAssistant: {
    systemPrompt: string;
    name: string;
    description: string;
  };

  // Aptitude-specific configuration (optional)
  questionGenerationPrompt?: string;

  // UI configuration
  showCodeEditor: boolean;

  // Course behavior
  defaultModule: number;
  autoSelectFirstTopic: boolean;
  showCourseSwitcher: boolean;
}