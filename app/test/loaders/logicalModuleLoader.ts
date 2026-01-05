import { Module } from '../data/lessonsData';

// =============================================================================
// LOGICAL REASONING MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/logical/module1/module-info';
import { moduleInfo as module2Info } from '../modules/logical/module2/module-info';
import { moduleInfo as module3Info } from '../modules/logical/module3/module-info';
import { moduleInfo as module4Info } from '../modules/logical/module4/module-info';
import { moduleInfo as module5Info } from '../modules/logical/module5/module-info';
import { moduleInfo as module6Info } from '../modules/logical/module6/module-info';
import { moduleInfo as module7Info } from '../modules/logical/module7/module-info';
import { moduleInfo as module8Info } from '../modules/logical/module8/module-info';
import { moduleInfo as module9Info } from '../modules/logical/module9/module-info';

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

// Module 5 - Coding-Decoding
import { topic_5_1 } from '../modules/logical/module5/topics/topic-5.1';
import { topic_5_2 } from '../modules/logical/module5/topics/topic-5.2';
import { topic_5_3 } from '../modules/logical/module5/topics/topic-5.3';
import { topic_5_4 } from '../modules/logical/module5/topics/topic-5.4';
import { topic_5_5 } from '../modules/logical/module5/topics/topic-5.5';
import { topic_5_6 } from '../modules/logical/module5/topics/topic-5.6';
import { topic_5_7 } from '../modules/logical/module5/topics/topic-5.7';
import { topic_5_8 } from '../modules/logical/module5/topics/topic-5.8';
import { topic_5_9 } from '../modules/logical/module5/topics/topic-5.9';
import { topic_5_10 } from '../modules/logical/module5/topics/topic-5.10';

// Module 6 - Series
import { topic_6_1 } from '../modules/logical/module6/topics/topic-6.1';
import { topic_6_2 } from '../modules/logical/module6/topics/topic-6.2';
import { topic_6_3 } from '../modules/logical/module6/topics/topic-6.3';
import { topic_6_4 } from '../modules/logical/module6/topics/topic-6.4';
import { topic_6_5 } from '../modules/logical/module6/topics/topic-6.5';
import { topic_6_6 } from '../modules/logical/module6/topics/topic-6.6';
import { topic_6_7 } from '../modules/logical/module6/topics/topic-6.7';
import { topic_6_8 } from '../modules/logical/module6/topics/topic-6.8';
import { topic_6_9 } from '../modules/logical/module6/topics/topic-6.9';
import { topic_6_10 } from '../modules/logical/module6/topics/topic-6.10';
import { topic_6_11 } from '../modules/logical/module6/topics/topic-6.11';

// Module 7 - Direction Sense
import { topic_7_1 } from '../modules/logical/module7/topics/topic-7.1';
import { topic_7_2 } from '../modules/logical/module7/topics/topic-7.2';
import { topic_7_3 } from '../modules/logical/module7/topics/topic-7.3';
import { topic_7_4 } from '../modules/logical/module7/topics/topic-7.4';
import { topic_7_5 } from '../modules/logical/module7/topics/topic-7.5';
import { topic_7_6 } from '../modules/logical/module7/topics/topic-7.6';
import { topic_7_7 } from '../modules/logical/module7/topics/topic-7.7';
import { topic_7_8 } from '../modules/logical/module7/topics/topic-7.8';
import { topic_7_9 } from '../modules/logical/module7/topics/topic-7.9';
import { topic_7_10 } from '../modules/logical/module7/topics/topic-7.10';

// Module 8 - Logical Deductions
import { topic_8_1 } from '../modules/logical/module8/topics/topic-8.1';
import { topic_8_2 } from '../modules/logical/module8/topics/topic-8.2';
import { topic_8_3 } from '../modules/logical/module8/topics/topic-8.3';
import { topic_8_4 } from '../modules/logical/module8/topics/topic-8.4';
import { topic_8_5 } from '../modules/logical/module8/topics/topic-8.5';
import { topic_8_6 } from '../modules/logical/module8/topics/topic-8.6';
import { topic_8_7 } from '../modules/logical/module8/topics/topic-8.7';
import { topic_8_8 } from '../modules/logical/module8/topics/topic-8.8';

// Module 9 - Analytical Reasoning
import { topic_9_1 } from '../modules/logical/module9/topics/topic-9.1';
import { topic_9_2 } from '../modules/logical/module9/topics/topic-9.2';
import { topic_9_3 } from '../modules/logical/module9/topics/topic-9.3';
import { topic_9_4 } from '../modules/logical/module9/topics/topic-9.4';
import { topic_9_5 } from '../modules/logical/module9/topics/topic-9.5';
import { topic_9_6 } from '../modules/logical/module9/topics/topic-9.6';
import { topic_9_7 } from '../modules/logical/module9/topics/topic-9.7';
import { topic_9_8 } from '../modules/logical/module9/topics/topic-9.8';
import { topic_9_9 } from '../modules/logical/module9/topics/topic-9.9';
import { topic_9_10 } from '../modules/logical/module9/topics/topic-9.10';

// =============================================================================
// LOGICAL REASONING EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Logical Reasoning
// No MCQs for introduction module

// Module 2 - Blood Relations
import { exercise_2_6 } from '../modules/logical/module2/mcq/exercise-2.6';

// Module 3 - Seating Arrangement
import { exercise_3_10 } from '../modules/logical/module3/mcq/exercise-3.10';

// Module 4 - Puzzles
import { exercise_4_11 } from '../modules/logical/module4/mcq/exercise-4.11';

// Module 5 - Coding-Decoding
import { exercise_5_11 } from '../modules/logical/module5/mcq/exercise-5.11';

// Module 6 - Series
import { exercise_6_12 } from '../modules/logical/module6/mcq/exercise-6.12';

// Module 7 - Direction Sense
import { exercise_7_11 } from '../modules/logical/module7/mcq/exercise-7.11';

// Module 8 - Logical Deductions
import { exercise_8_9 } from '../modules/logical/module8/mcq/exercise-8.9';

// Module 9 - Analytical Reasoning
import { exercise_9_11 } from '../modules/logical/module9/mcq/exercise-9.11';

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
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5],
    exercises: [exercise_2_6],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module3Info,
    topics: [topic_3_1, topic_3_2, topic_3_3, topic_3_4, topic_3_5, topic_3_6, topic_3_7, topic_3_8, topic_3_9],
    exercises: [exercise_3_10],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module4Info,
    topics: [topic_4_1, topic_4_2, topic_4_3, topic_4_4, topic_4_5, topic_4_6, topic_4_7, topic_4_8, topic_4_9, topic_4_10],
    exercises: [exercise_4_11],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module5Info,
    topics: [topic_5_1, topic_5_2, topic_5_3, topic_5_4, topic_5_5, topic_5_6, topic_5_7, topic_5_8, topic_5_9, topic_5_10],
    exercises: [exercise_5_11],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module6Info,
    topics: [topic_6_1, topic_6_2, topic_6_3, topic_6_4, topic_6_5, topic_6_6, topic_6_7, topic_6_8, topic_6_9, topic_6_10, topic_6_11],
    exercises: [exercise_6_12],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module7Info,
    topics: [topic_7_1, topic_7_2, topic_7_3, topic_7_4, topic_7_5, topic_7_6, topic_7_7, topic_7_8, topic_7_9, topic_7_10],
    exercises: [exercise_7_11],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module8Info,
    topics: [topic_8_1, topic_8_2, topic_8_3, topic_8_4, topic_8_5, topic_8_6, topic_8_7, topic_8_8],
    exercises: [exercise_8_9],
    formulas: [] // No formulas for logical reasoning modules
  },
  {
    info: module9Info,
    topics: [topic_9_1, topic_9_2, topic_9_3, topic_9_4, topic_9_5, topic_9_6, topic_9_7, topic_9_8, topic_9_9, topic_9_10],
    exercises: [exercise_9_11],
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