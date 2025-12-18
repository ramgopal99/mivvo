import { Module } from '../data/lessonsData';

// =============================================================================
// APTITUDE MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/aptitude/module1/module-info';
import { moduleInfo as module2Info } from '../modules/aptitude/module2/module-info';

// =============================================================================
// APTITUDE TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { topic_1_1 } from '../modules/aptitude/module1/topics/topic-1.1';
import { topic_1_2 } from '../modules/aptitude/module1/topics/topic-1.2';
import { topic_1_3 } from '../modules/aptitude/module1/topics/topic-1.3';
import { topic_1_4 } from '../modules/aptitude/module1/topics/topic-1.4';
import { topic_1_5 } from '../modules/aptitude/module1/topics/topic-1.5';
import { topic_1_6 } from '../modules/aptitude/module1/topics/topic-1.6';
import { topic_1_7 } from '../modules/aptitude/module1/topics/topic-1.7';
import { topic_1_8 } from '../modules/aptitude/module1/topics/topic-1.8';
import { topic_1_9 } from '../modules/aptitude/module1/topics/topic-1.9';
import { topic_1_10 } from '../modules/aptitude/module1/topics/topic-1.10';
import { topic_1_11 } from '../modules/aptitude/module1/topics/topic-1.11';
import { topic_1_12 } from '../modules/aptitude/module1/topics/topic-1.12';
import { topic_1_13 } from '../modules/aptitude/module1/topics/topic-1.13';
import { topic_1_14 } from '../modules/aptitude/module1/topics/topic-1.14';
import { topic_1_15 } from '../modules/aptitude/module1/topics/topic-1.15';
import { topic_1_16 } from '../modules/aptitude/module1/topics/topic-1.16';
import { topic_1_17 } from '../modules/aptitude/module1/topics/topic-1.17';
import { topic_1_18 } from '../modules/aptitude/module1/topics/topic-1.18';
import { topic_1_19 } from '../modules/aptitude/module1/topics/topic-1.19';
import { topic_1_20 } from '../modules/aptitude/module1/topics/topic-1.20';
import { topic_1_21 } from '../modules/aptitude/module1/topics/topic-1.21';
import { topic_1_22 } from '../modules/aptitude/module1/topics/topic-1.22';
import { topic_1_23 } from '../modules/aptitude/module1/topics/topic-1.23';

// Module 2
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

// =============================================================================
// APTITUDE EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { exercise_1_24 } from '../modules/aptitude/module1/mcq/exercise-1.24';

// Module 2
import { exercise_2_14 } from '../modules/aptitude/module2/mcq/exercise-2.14';

// =============================================================================
// APTITUDE MODULE CONFIGURATION
// =============================================================================

const APTITUDE_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1, topic_1_2, topic_1_3, topic_1_4, topic_1_5, topic_1_6, topic_1_7, topic_1_8, topic_1_9, topic_1_10, topic_1_11, topic_1_12, topic_1_13, topic_1_14, topic_1_15, topic_1_16, topic_1_17, topic_1_18, topic_1_19, topic_1_20, topic_1_21, topic_1_22, topic_1_23],
    exercises: [exercise_1_24]
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7, topic_2_8, topic_2_9, topic_2_10, topic_2_11, topic_2_12, topic_2_13],
    exercises: [exercise_2_14]
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