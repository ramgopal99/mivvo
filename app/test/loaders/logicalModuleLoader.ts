import { Module } from '../data/lessonsData';

// =============================================================================
// LOGICAL REASONING MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/logical/module1/module-info';
import { moduleInfo as module2Info } from '../modules/logical/module2/module-info';
import { moduleInfo as module3Info } from '../modules/logical/module3/module-info';
import { moduleInfo as module4Info } from '../modules/logical/module4/module-info';

// =============================================================================
// LOGICAL REASONING TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Logical Reasoning
import { topic_1_1 } from '../modules/logical/module1/topics/topic-1.1';

// Module 2 - Blood Relations
import { topic_2_1 } from '../modules/logical/module2/topics/topic-2.1';
import { topic_2_2 } from '../modules/logical/module2/topics/topic-2.2';
import { topic_2_3 } from '../modules/logical/module2/topics/topic-2.3';
import { topic_2_4 } from '../modules/logical/module2/topics/topic-2.4';
import { topic_2_5 } from '../modules/logical/module2/topics/topic-2.5';
import { topic_2_6 } from '../modules/logical/module2/topics/topic-2.6';
import { topic_2_7 } from '../modules/logical/module2/topics/topic-2.7';
import { topic_2_8 } from '../modules/logical/module2/topics/topic-2.8';
import { topic_2_9 } from '../modules/logical/module2/topics/topic-2.9';
import { topic_2_10 } from '../modules/logical/module2/topics/topic-2.10';

// Module 3 - Seating Arrangement
import { topic_3_1 } from '../modules/logical/module3/topics/topic-3.1';
import { topic_3_2 } from '../modules/logical/module3/topics/topic-3.2';
import { topic_3_3 } from '../modules/logical/module3/topics/topic-3.3';
import { topic_3_4 } from '../modules/logical/module3/topics/topic-3.4';
import { topic_3_5 } from '../modules/logical/module3/topics/topic-3.5';
import { topic_3_6 } from '../modules/logical/module3/topics/topic-3.6';
import { topic_3_7 } from '../modules/logical/module3/topics/topic-3.7';
import { topic_3_8 } from '../modules/logical/module3/topics/topic-3.8';
import { topic_3_9 } from '../modules/logical/module3/topics/topic-3.9';
import { topic_3_10 } from '../modules/logical/module3/topics/topic-3.10';

// Module 4 - Puzzles
import { topic_4_1 } from '../modules/logical/module4/topics/topic-4.1';
import { topic_4_2 } from '../modules/logical/module4/topics/topic-4.2';
import { topic_4_3 } from '../modules/logical/module4/topics/topic-4.3';
import { topic_4_4 } from '../modules/logical/module4/topics/topic-4.4';
import { topic_4_5 } from '../modules/logical/module4/topics/topic-4.5';
import { topic_4_6 } from '../modules/logical/module4/topics/topic-4.6';
import { topic_4_7 } from '../modules/logical/module4/topics/topic-4.7';
import { topic_4_8 } from '../modules/logical/module4/topics/topic-4.8';
import { topic_4_9 } from '../modules/logical/module4/topics/topic-4.9';
import { topic_4_10 } from '../modules/logical/module4/topics/topic-4.10';
import { topic_4_11 } from '../modules/logical/module4/topics/topic-4.11';

// =============================================================================
// LOGICAL REASONING EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Logical Reasoning
// No MCQs for introduction module

// Module 2 - Blood Relations
import { exercise_2_11 } from '../modules/logical/module2/mcq/exercise-2.11';

// Module 3 - Seating Arrangement
import { exercise_3_11 } from '../modules/logical/module3/mcq/exercise-3.11';

// Module 4 - Puzzles
import { exercise_4_12 } from '../modules/logical/module4/mcq/exercise-4.12';

// =============================================================================
// LOGICAL REASONING FORMULA IMPORTS (Grouped by Module)
// =============================================================================

// Logical Reasoning modules typically don't have formulas like aptitude modules
// No formulas for logical reasoning modules

// =============================================================================
// LOGICAL REASONING MODULE CONFIGURATION
// =============================================================================

const LOGICAL_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1],
    exercises: [], // No MCQs for introduction module
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7, topic_2_8, topic_2_9, topic_2_10],
    exercises: [exercise_2_11],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module3Info,
    topics: [topic_3_1, topic_3_2, topic_3_3, topic_3_4, topic_3_5, topic_3_6, topic_3_7, topic_3_8, topic_3_9, topic_3_10],
    exercises: [exercise_3_11],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module4Info,
    topics: [topic_4_1, topic_4_2, topic_4_3, topic_4_4, topic_4_5, topic_4_6, topic_4_7, topic_4_8, topic_4_9, topic_4_10, topic_4_11],
    exercises: [exercise_4_12],
    formulas: [] // No formulas for logical reasoning modules
  },
];

// =============================================================================
// FORMULA LOADING FUNCTIONS - Similar to topic/exercise loading
// =============================================================================

/**
 * Get formulas for a specific logical reasoning module
 * @param moduleId - The module ID to get formulas for
 * @returns Array of formulas for the module, or empty array (no formulas for logical reasoning)
 */
export const getFormulasForLogicalModule = (moduleId: number) => {
  const moduleConfig = LOGICAL_MODULES.find(m => m.info.id === moduleId);
  return moduleConfig?.formulas || []; // No formulas for logical reasoning modules
};

/**
 * Check if a logical reasoning module has specific formulas
 * @param moduleId - The module ID to check
 * @returns Always false since logical reasoning modules don't have formulas
 */
export const hasSpecificFormulasLogical = (moduleId: number) => {
  const moduleConfig = LOGICAL_MODULES.find(m => m.info.id === moduleId);
  return moduleConfig?.formulas && moduleConfig.formulas.length > 0;
};

/**
 * Get all logical reasoning modules that have formulas
 * @returns Empty array since logical reasoning modules don't have formulas
 */
export const getLogicalModulesWithFormulas = () => {
  return LOGICAL_MODULES
    .filter(m => m.formulas && m.formulas.length > 0)
    .map(m => m.info.id)
    .sort();
};

/**
 * Get logical reasoning module configuration for advanced features
 * @param moduleId - The module ID to get configuration for
 * @returns The logical reasoning module configuration or undefined
 */
export const getLogicalModuleConfig = (moduleId: number) => {
  return LOGICAL_MODULES.find(config => config.info.id === moduleId);
};

/**
 * Loads Logical Reasoning modules
 * @returns Promise<Module[]> - Array of loaded Logical Reasoning modules
 */
export async function loadLogicalModules(): Promise<Module[]> {
  console.log('🧠 Loading Logical Reasoning modules using static imports...');

  const modules: Module[] = LOGICAL_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} Logical Reasoning modules:`, modules.map(m => m.title));
  return modules;
}