import { Module } from '../app/test/data/lessonsData';

// Static imports for all modules - this ensures they work in browser
import { moduleInfo as module1Info } from '../app/test/modules/module1/module-info';
import { moduleInfo as module2Info } from '../app/test/modules/module2/module-info';

// Static imports for topics and exercises
import { topic_1_1 } from '../app/test/modules/module1/topics/topic-1.1';

import { exercise_1_2 } from '../app/test/modules/module1/mcq/exercise-1.2';

// Module 2 imports
import { topic_2_1 } from '../app/test/modules/module2/topics/topic-2.1';
import { topic_2_2 } from '../app/test/modules/module2/topics/topic-2.2';
import { topic_2_3 } from '../app/test/modules/module2/topics/topic-2.3';
import { topic_2_4 } from '../app/test/modules/module2/topics/topic-2.4';
import { topic_2_5 } from '../app/test/modules/module2/topics/topic-2.5';
import { topic_2_6 } from '../app/test/modules/module2/topics/topic-2.6';
import { topic_2_7 } from '../app/test/modules/module2/topics/topic-2.7';

// Module configuration - easy to add new modules
const MODULE_CONFIG = [
  {
    info: module1Info,
    topics: [topic_1_1],
    exercises: [exercise_1_2]
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7],
    exercises: []
  }
];

/**
 * Loads all modules using static imports (works reliably in browser)
 * @returns Promise<Module[]> - Array of loaded modules
 */
export async function loadModules(): Promise<Module[]> {
  console.log('🔍 Loading modules using static imports...');

  const modules: Module[] = MODULE_CONFIG.map((config) => ({
    ...config.info,
    subLessons: config.topics,
    exercises: config.exercises
  }));

  console.log(`✅ Loaded ${modules.length} modules:`, modules.map(m => m.title));
  return modules;
}

/**
 * To add a new module:
 * 1. Create folder: app/test/modules/module{N}/
 * 2. Add module-info.ts, topics/, exercises/ folders
 * 3. Add imports to this file
 * 4. Add entry to MODULE_CONFIG array
 * 5. Module will appear automatically!
 */
