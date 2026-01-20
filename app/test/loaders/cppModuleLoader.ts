import { Module } from '../data/lessonsData';

// =============================================================================
// C++ MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/cpp/module1/module-info';
import { moduleInfo as module2Info } from '../modules/cpp/module2/module-info';
import { moduleInfo as module3Info } from '../modules/cpp/module3/module-info';
import { moduleInfo as module4Info } from '../modules/cpp/module4/module-info';
import { moduleInfo as module5Info } from '../modules/cpp/module5/module-info';
import { moduleInfo as module6Info } from '../modules/cpp/module6/module-info';
import { moduleInfo as module7Info } from '../modules/cpp/module7/module-info';
import { moduleInfo as module8Info } from '../modules/cpp/module8/module-info';
import { moduleInfo as module9Info } from '../modules/cpp/module9/module-info';
import { moduleInfo as module10Info } from '../modules/cpp/module10/module-info';
import { moduleInfo as module11Info } from '../modules/cpp/module11/module-info';
import { moduleInfo as module12Info } from '../modules/cpp/module12/module-info';
import { moduleInfo as module13Info } from '../modules/cpp/module13/module-info';
import { moduleInfo as module14Info } from '../modules/cpp/module14/module-info';
import { moduleInfo as module15Info } from '../modules/cpp/module15/module-info';
import { moduleInfo as module16Info } from '../modules/cpp/module16/module-info';
import { moduleInfo as module17Info } from '../modules/cpp/module17/module-info';
import { moduleInfo as module18Info } from '../modules/cpp/module18/module-info';
import { moduleInfo as module19Info } from '../modules/cpp/module19/module-info';
import { moduleInfo as module20Info } from '../modules/cpp/module20/module-info';

// =============================================================================
// C++ TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { topic_1_1 } from '../modules/cpp/module1/topics/topic-1.1';
import { topic_1_2 } from '../modules/cpp/module1/topics/topic-1.2';
import { topic_1_3 } from '../modules/cpp/module1/topics/topic-1.3';
import { topic_1_4 } from '../modules/cpp/module1/topics/topic-1.4';

// Module 2
import { topic_2_1 } from '../modules/cpp/module2/topics/topic-2.1';
import { topic_2_2 } from '../modules/cpp/module2/topics/topic-2.2';
import { topic_2_3 } from '../modules/cpp/module2/topics/topic-2.3';
import { topic_2_4 } from '../modules/cpp/module2/topics/topic-2.4';
import { topic_2_5 } from '../modules/cpp/module2/topics/topic-2.5';
import { topic_2_6 } from '../modules/cpp/module2/topics/topic-2.6';

// Module 3
import { topic_3_1 } from '../modules/cpp/module3/topics/topic-3.1';

// Module 4
import { topic_4_1 } from '../modules/cpp/module4/topics/topic-4.1';
import { topic_4_2 } from '../modules/cpp/module4/topics/topic-4.2';
import { topic_4_3 } from '../modules/cpp/module4/topics/topic-4.3';

// =============================================================================
// C++ EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { exercise_1_3 } from '../modules/cpp/module1/mcq/exercise-1.3';

// Module 2
import { exercise_2_8 } from '../modules/cpp/module2/mcq/exercise-2.8';
import { exercise_2_9 } from '../modules/cpp/module2/mcq/exercise-2.9';

// Module 3
import { exercise_3_7 } from '../modules/cpp/module3/mcq/exercise-3.7';
import { exercise_3_8 } from '../modules/cpp/module3/mcq/exercise-3.8';

// Module 4
import { exercise_4_7 } from '../modules/cpp/module4/mcq/exercise-4.7';
import { exercise_4_8 } from '../modules/cpp/module4/mcq/exercise-4.8';

// Module 5
import { exercise_5_7 } from '../modules/cpp/module5/mcq/exercise-5-7';
import { exercise_5_8 } from '../modules/cpp/module5/mcq/exercise-5-8';

// Module 6
import { exercise_6_7 } from '../modules/cpp/module6/mcq/exercise-6-7';
import { exercise_6_8 } from '../modules/cpp/module6/mcq/exercise-6-8';

// Module 7
import { exercise_7_7 } from '../modules/cpp/module7/mcq/exercise-7-7';
import { exercise_7_8 } from '../modules/cpp/module7/mcq/exercise-7-8';

// Module 8
import { exercise_8_7 } from '../modules/cpp/module8/mcq/exercise-8-7';
import { exercise_8_8 } from '../modules/cpp/module8/mcq/exercise-8-8';

// Module 9
import { exercise_9_7 } from '../modules/cpp/module9/mcq/exercise-9-7';
import { exercise_9_8 } from '../modules/cpp/module9/mcq/exercise-9-8';

// Module 10
import { exercise_10_7 } from '../modules/cpp/module10/mcq/exercise-10-7';
import { exercise_10_8 } from '../modules/cpp/module10/mcq/exercise-10-8';

// Module 11
import { exercise_11_7 } from '../modules/cpp/module11/mcq/exercise-11-7';
import { exercise_11_8 } from '../modules/cpp/module11/mcq/exercise-11-8';

// Module 12
import { exercise_12_7 } from '../modules/cpp/module12/mcq/exercise-12-7';
import { exercise_12_8 } from '../modules/cpp/module12/mcq/exercise-12-8';

// Module 13
import { exercise_13_7 } from '../modules/cpp/module13/mcq/exercise-13-7';
import { exercise_13_8 } from '../modules/cpp/module13/mcq/exercise-13-8';

// Module 14
import { exercise_14_7 } from '../modules/cpp/module14/mcq/exercise-14-7';
import { exercise_14_8 } from '../modules/cpp/module14/mcq/exercise-14-8';

// Module 15
import { exercise_15_7 } from '../modules/cpp/module15/mcq/exercise-15-7';
import { exercise_15_8 } from '../modules/cpp/module15/mcq/exercise-15-8';

// Module 16
import { exercise_16_7 } from '../modules/cpp/module16/mcq/exercise-16-7';
import { exercise_16_8 } from '../modules/cpp/module16/mcq/exercise-16-8';

// Module 17
import { exercise_17_7 } from '../modules/cpp/module17/mcq/exercise-17-7';
import { exercise_17_8 } from '../modules/cpp/module17/mcq/exercise-17-8';

// Module 18
import { exercise_18_7 } from '../modules/cpp/module18/mcq/exercise-18-7';
import { exercise_18_8 } from '../modules/cpp/module18/mcq/exercise-18-8';

// Module 19
import { exercise_19_7 } from '../modules/cpp/module19/mcq/exercise-19-7';
import { exercise_19_8 } from '../modules/cpp/module19/mcq/exercise-19-8';

// Module 20
import { exercise_20_7 } from '../modules/cpp/module20/mcq/exercise-20-7';
import { exercise_20_8 } from '../modules/cpp/module20/mcq/exercise-20-8';

// =============================================================================
// C++ MODULE CONFIGURATION
// =============================================================================

const CPP_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1, topic_1_2],
    exercises: [exercise_1_3]
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6],
    exercises: [exercise_2_7, exercise_2_8]
  },
  {
    info: module3Info,
    topics: [topic_3_1],
    exercises: []
  }
];

/**
 * Loads C++ modules
 * @returns Promise<Module[]> - Array of loaded C++ modules
 */
export async function loadCppModules(): Promise<Module[]> {
  console.log('⚡ Loading C++ modules using static imports...');

  const modules: Module[] = CPP_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} C++ modules:`, modules.map(m => m.title));
  return modules;
}