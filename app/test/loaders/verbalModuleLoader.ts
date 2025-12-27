import { Module } from '../data/lessonsData';

// =============================================================================
// VERBAL ABILITY MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/verbal/module1/module-info';
import { moduleInfo as module2Info } from '../modules/verbal/module2/module-info';
import { moduleInfo as module3Info } from '../modules/verbal/module3/module-info';
import { moduleInfo as module4Info } from '../modules/verbal/module4/module-info';
import { moduleInfo as module5Info } from '../modules/verbal/module5/module-info';
import { moduleInfo as module6Info } from '../modules/verbal/module6/module-info';
import { moduleInfo as module7Info } from '../modules/verbal/module7/module-info';

// =============================================================================
// VERBAL ABILITY TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Verbal Ability
import { topic_1_1 } from '../modules/verbal/module1/topics/topic-1.1';

// Module 2 - Grammar Fundamentals
import { topic_2_1 } from '../modules/verbal/module2/topics/topic-2.1';
import { topic_2_2 } from '../modules/verbal/module2/topics/topic-2.2';
import { topic_2_3 } from '../modules/verbal/module2/topics/topic-2.3';
import { topic_2_4 } from '../modules/verbal/module2/topics/topic-2.4';
import { topic_2_5 } from '../modules/verbal/module2/topics/topic-2.5';
import { topic_2_6 } from '../modules/verbal/module2/topics/topic-2.6';
import { topic_2_7 } from '../modules/verbal/module2/topics/topic-2.7';
import { topic_2_8 } from '../modules/verbal/module2/topics/topic-2.8';
import { topic_2_9 } from '../modules/verbal/module2/topics/topic-2.9';

// Module 3 - Vocabulary Skills
import { topic_3_1 } from '../modules/verbal/module3/topics/topic-3.1';
import { topic_3_2 } from '../modules/verbal/module3/topics/topic-3.2';
import { topic_3_3 } from '../modules/verbal/module3/topics/topic-3.3';
import { topic_3_4 } from '../modules/verbal/module3/topics/topic-3.4';
import { topic_3_5 } from '../modules/verbal/module3/topics/topic-3.5';
import { topic_3_6 } from '../modules/verbal/module3/topics/topic-3.6';
import { topic_3_7 } from '../modules/verbal/module3/topics/topic-3.7';
import { topic_3_8 } from '../modules/verbal/module3/topics/topic-3.8';

// Module 4 - Sentence-Level Ability
import { topic_4_1 } from '../modules/verbal/module4/topics/topic-4.1';
import { topic_4_2 } from '../modules/verbal/module4/topics/topic-4.2';
import { topic_4_3 } from '../modules/verbal/module4/topics/topic-4.3';
import { topic_4_4 } from '../modules/verbal/module4/topics/topic-4.4';

// Module 5 - Paragraph & Flow
import { topic_5_1 } from '../modules/verbal/module5/topics/topic-5.1';
import { topic_5_2 } from '../modules/verbal/module5/topics/topic-5.2';
import { topic_5_3 } from '../modules/verbal/module5/topics/topic-5.3';
import { topic_5_4 } from '../modules/verbal/module5/topics/topic-5.4';

// Module 6 - Reading Comprehension
import { topic_6_1 } from '../modules/verbal/module6/topics/topic-6.1';
import { topic_6_2 } from '../modules/verbal/module6/topics/topic-6.2';
import { topic_6_3 } from '../modules/verbal/module6/topics/topic-6.3';
import { topic_6_4 } from '../modules/verbal/module6/topics/topic-6.4';
import { topic_6_5 } from '../modules/verbal/module6/topics/topic-6.5';

// Module 7 - Verbal Reasoning
import { topic_7_1 } from '../modules/verbal/module7/topics/topic-7.1';
import { topic_7_2 } from '../modules/verbal/module7/topics/topic-7.2';
import { topic_7_3 } from '../modules/verbal/module7/topics/topic-7.3';
import { topic_7_4 } from '../modules/verbal/module7/topics/topic-7.4';
import { topic_7_5 } from '../modules/verbal/module7/topics/topic-7.5';
import { topic_7_6 } from '../modules/verbal/module7/topics/topic-7.6';

// =============================================================================
// VERBAL ABILITY MODULE CONFIGURATIONS
// =============================================================================

/**
 * Configuration for Verbal Ability Module 1
 */
const MODULE_1_CONFIG = {
  info: module1Info,
  topics: [topic_1_1],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 2
 */
const MODULE_2_CONFIG = {
  info: module2Info,
  topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7, topic_2_8, topic_2_9],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 3
 */
const MODULE_3_CONFIG = {
  info: module3Info,
  topics: [topic_3_1, topic_3_2, topic_3_3, topic_3_4, topic_3_5, topic_3_6, topic_3_7, topic_3_8],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 4
 */
const MODULE_4_CONFIG = {
  info: module4Info,
  topics: [topic_4_1, topic_4_2, topic_4_3, topic_4_4],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 5
 */
const MODULE_5_CONFIG = {
  info: module5Info,
  topics: [topic_5_1, topic_5_2, topic_5_3, topic_5_4],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 6
 */
const MODULE_6_CONFIG = {
  info: module6Info,
  topics: [topic_6_1, topic_6_2, topic_6_3, topic_6_4, topic_6_5],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Configuration for Verbal Ability Module 7
 */
const MODULE_7_CONFIG = {
  info: module7Info,
  topics: [topic_7_1, topic_7_2, topic_7_3, topic_7_4, topic_7_5, topic_7_6],
  exercises: [], // No exercises for verbal ability yet
  formulas: [] // No formulas for verbal ability
};

/**
 * Array of all Verbal Ability modules with their configurations
 */
const VERBAL_MODULES = [
  MODULE_1_CONFIG,
  MODULE_2_CONFIG,
  MODULE_3_CONFIG,
  MODULE_4_CONFIG,
  MODULE_5_CONFIG,
  MODULE_6_CONFIG,
  MODULE_7_CONFIG
];

/**
 * Get modules that have formulas (for advanced features)
 * @returns Array of module IDs that contain formulas
 */
export const getVerbalModulesWithFormulas = () => {
  return VERBAL_MODULES
    .filter(m => m.formulas && m.formulas.length > 0)
    .map(m => m.info.id)
    .sort();
};

/**
 * Get verbal ability module configuration for advanced features
 * @param moduleId - The module ID to get configuration for
 * @returns The verbal ability module configuration or undefined
 */
export const getVerbalModuleConfig = (moduleId: number) => {
  return VERBAL_MODULES.find(config => config.info.id === moduleId);
};

/**
 * Loads Verbal Ability modules
 * @returns Promise<Module[]> - Array of loaded Verbal Ability modules
 */
export async function loadVerbalModules(): Promise<Module[]> {
  console.log('📚 Loading Verbal Ability modules using static imports...');

  const modules: Module[] = VERBAL_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} Verbal Ability modules:`, modules.map(m => m.title));
  return modules;
}
