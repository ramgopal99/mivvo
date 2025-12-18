import { Module } from '../data/lessonsData';

// =============================================================================
// APTITUDE MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/aptitude/module1/module-info';
import { moduleInfo as module2Info } from '../modules/aptitude/module2/module-info';
import { moduleInfo as module3Info } from '../modules/aptitude/module3/module-info';

// =============================================================================
// APTITUDE TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Quantitative Aptitude
import { topic_1_1 } from '../modules/aptitude/module1/topics/topic-1.1';
import { topic_1_2 } from '../modules/aptitude/module1/topics/topic-1.2';
import { topic_1_3 } from '../modules/aptitude/module1/topics/topic-1.3';

// Module 2 - Number System
import { topic_2_1 } from '../modules/aptitude/module2/topics/topic-2.1';
import { topic_2_2 } from '../modules/aptitude/module2/topics/topic-2.2';
import { topic_2_3 } from '../modules/aptitude/module2/topics/topic-2.3';
import { topic_2_4 } from '../modules/aptitude/module2/topics/topic-2.4';
import { topic_2_5 } from '../modules/aptitude/module2/topics/topic-2.5';
import { topic_2_6 } from '../modules/aptitude/module2/topics/topic-2.6';
import { topic_2_7 } from '../modules/aptitude/module2/topics/topic-2.7';
import { topic_2_8 } from '../modules/aptitude/module2/topics/topic-2.8';
import { topic_2_9 } from '../modules/aptitude/module2/topics/topic-2.9';
import { topic_2_10 } from '../modules/aptitude/module2/topics/topic-2.10';
import { topic_2_11 } from '../modules/aptitude/module2/topics/topic-2.11';
import { topic_2_12 } from '../modules/aptitude/module2/topics/topic-2.12';
import { topic_2_13 } from '../modules/aptitude/module2/topics/topic-2.13';
import { topic_2_14 } from '../modules/aptitude/module2/topics/topic-2.14';
import { topic_2_15 } from '../modules/aptitude/module2/topics/topic-2.15';
import { topic_2_16 } from '../modules/aptitude/module2/topics/topic-2.16';
import { topic_2_17 } from '../modules/aptitude/module2/topics/topic-2.17';
import { topic_2_18 } from '../modules/aptitude/module2/topics/topic-2.18';
import { topic_2_19 } from '../modules/aptitude/module2/topics/topic-2.19';
import { topic_2_20 } from '../modules/aptitude/module2/topics/topic-2.20';
import { topic_2_21 } from '../modules/aptitude/module2/topics/topic-2.21';
import { topic_2_22 } from '../modules/aptitude/module2/topics/topic-2.22';
import { topic_2_23 } from '../modules/aptitude/module2/topics/topic-2.23';

// Module 3 - Simplification
import { topic_3_1 } from '../modules/aptitude/module3/topics/topic-3.1';
import { topic_3_2 } from '../modules/aptitude/module3/topics/topic-3.2';
import { topic_3_3 } from '../modules/aptitude/module3/topics/topic-3.3';
import { topic_3_4 } from '../modules/aptitude/module3/topics/topic-3.4';
import { topic_3_5 } from '../modules/aptitude/module3/topics/topic-3.5';
import { topic_3_6 } from '../modules/aptitude/module3/topics/topic-3.6';
import { topic_3_7 } from '../modules/aptitude/module3/topics/topic-3.7';
import { topic_3_8 } from '../modules/aptitude/module3/topics/topic-3.8';
import { topic_3_9 } from '../modules/aptitude/module3/topics/topic-3.9';
import { topic_3_10 } from '../modules/aptitude/module3/topics/topic-3.10';
import { topic_3_11 } from '../modules/aptitude/module3/topics/topic-3.11';
import { topic_3_12 } from '../modules/aptitude/module3/topics/topic-3.12';
import { topic_3_13 } from '../modules/aptitude/module3/topics/topic-3.13';

// =============================================================================
// APTITUDE EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Quantitative Aptitude
// No MCQs for introduction module

// Module 2 - Number System
import { exercise_2_24 } from '../modules/aptitude/module2/mcq/exercise-2.24';

// Module 3 - Simplification
import { exercise_3_14 } from '../modules/aptitude/module3/mcq/exercise-3.14';

// =============================================================================
// APTITUDE FORMULA IMPORTS (Grouped by Module)
// =============================================================================

// Module 2 - Number System Formulas
import formulasModule2 from '../modules/aptitude/module2/formulas';
// Module 3 - Simplification Formulas
import formulasModule3 from '../modules/aptitude/module3/formulas';
// Future modules: Add imports here when new modules get formulas
// import formulasModule4 from '../modules/aptitude/module4/formulas';

// =============================================================================
// APTITUDE MODULE CONFIGURATION
// =============================================================================

const APTITUDE_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1, topic_1_2, topic_1_3],
    exercises: [], // No MCQs for introduction module
    formulas: [] // No formulas for introduction module
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7, topic_2_8, topic_2_9, topic_2_10, topic_2_11, topic_2_12, topic_2_13, topic_2_14, topic_2_15, topic_2_16, topic_2_17, topic_2_18, topic_2_19, topic_2_20, topic_2_21, topic_2_22, topic_2_23],
    exercises: [exercise_2_24],
    formulas: formulasModule2
  },
  {
    info: module3Info,
    topics: [topic_3_1, topic_3_2, topic_3_3, topic_3_4, topic_3_5, topic_3_6, topic_3_7, topic_3_8, topic_3_9, topic_3_10, topic_3_11, topic_3_12, topic_3_13],
    exercises: [exercise_3_14],
    formulas: formulasModule3
  },
];

// =============================================================================
// FORMULA LOADING FUNCTIONS - Similar to topic/exercise loading
// =============================================================================

/**
 * Get formulas for a specific module
 * @param moduleId - The module ID to get formulas for
 * @returns Array of formulas for the module, or fallback to comprehensive formulas
 */
export const getFormulasForModule = (moduleId: number) => {
  const moduleConfig = APTITUDE_MODULES.find(m => m.info.id === moduleId);
  return moduleConfig?.formulas || formulasModule2; // Fallback to comprehensive formulas
};

/**
 * Check if a module has specific formulas
 * @param moduleId - The module ID to check
 * @returns True if the module has specific formulas configured
 */
export const hasSpecificFormulas = (moduleId: number) => {
  const moduleConfig = APTITUDE_MODULES.find(m => m.info.id === moduleId);
  return moduleConfig?.formulas && moduleConfig.formulas.length > 0;
};

/**
 * Get all modules that have formulas
 * @returns Array of module IDs that have formulas
 */
export const getModulesWithFormulas = () => {
  return APTITUDE_MODULES
    .filter(m => m.formulas && m.formulas.length > 0)
    .map(m => m.info.id)
    .sort();
};

/**
 * Get formula module configuration for advanced features
 * @param moduleId - The module ID to get configuration for
 * @returns The formula module configuration or undefined
 */
export const getFormulaModuleConfig = (moduleId: number) => {
  return APTITUDE_MODULES.find(config => config.info.id === moduleId);
};

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