import { headerData as pythonHeaderData } from '../app/test/data/headerData';
import { headerData as javaHeaderData } from '../app/test/data/headerData-java';
import { headerData as cHeaderData } from '../app/test/data/headerData-c';
import { headerData as cppHeaderData } from '../app/test/data/headerData-cpp';
import { headerData as jsHeaderData } from '../app/test/data/headerData-javascript';

export interface HeaderData {
  title: string;
  completionPercentage: string;
}

// Header data configurations for different languages
const HEADER_DATA_CONFIG = {
  python: pythonHeaderData,
  java: javaHeaderData,
  c: cHeaderData,
  cpp: cppHeaderData,
  javascript: jsHeaderData,
};

/**
 * Gets header data for a specific programming language
 * @param language - The programming language ('python', 'java', etc.)
 * @returns HeaderData - Header data for the specified language
 */
export function getHeaderData(language: string = 'python'): HeaderData {
  const headerData = HEADER_DATA_CONFIG[language as keyof typeof HEADER_DATA_CONFIG];

  if (!headerData) {
    console.warn(`⚠️ Header data for language '${language}' not found. Using default Python header.`);
    return HEADER_DATA_CONFIG.python;
  }

  return headerData;
}

/**
 * Gets available languages for header data
 * @returns string[] - Array of available programming languages
 */
export function getAvailableHeaderLanguages(): string[] {
  return Object.keys(HEADER_DATA_CONFIG);
}

/**
 * To add header data for a new language:
 * 1. Create file: app/test/data/headerData-{language}.ts
 * 2. Export headerData with title and completionPercentage
 * 3. Add import to this file
 * 4. Add entry to HEADER_DATA_CONFIG object
 * 5. Header data will be automatically available!
 */
