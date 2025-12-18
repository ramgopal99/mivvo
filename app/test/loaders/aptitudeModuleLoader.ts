import { Module } from '../data/lessonsData';

// =============================================================================
// APTITUDE MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/aptitude/module1/module-info';

// =============================================================================
// APTITUDE TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { topic_1_1 } from '../modules/aptitude/module1/topics/topic-1.1';
import { topic_1_2 } from '../modules/aptitude/module1/topics/topic-1.2';

// =============================================================================
// APTITUDE MODULE CONFIGURATION
// =============================================================================

const APTITUDE_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1, topic_1_2],
    exercises: []
  },
];

/**
 * Loads Aptitude modules
 * @returns Promise<Module[]> - Array of loaded Aptitude modules
 */
export async function loadAptitudeModules(): Promise<Module[]> {
  console.log('🧮 Loading Aptitude modules using static imports...');

  const modules: Module[] = APTITUDE_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} Aptitude modules:`, modules.map(m => m.title));
  return modules;
}