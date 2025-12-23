import { Module } from '../data/lessonsData';

// =============================================================================
// PYTHON MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/python/module1/module-info';
import { moduleInfo as module2Info } from '../modules/python/module2/module-info';
import { moduleInfo as module3Info } from '../modules/python/module3/module-info';
import { moduleInfo as module4Info } from '../modules/python/module4/module-info';
import { moduleInfo as module5Info } from '../modules/python/module5/module-info';
import { moduleInfo as module6Info } from '../modules/python/module6/module-info';
import { moduleInfo as module7Info } from '../modules/python/module7/module-info';
import { moduleInfo as module8Info } from '../modules/python/module8/module-info';
import { moduleInfo as module9Info } from '../modules/python/module9/module-info';
import { moduleInfo as module10Info } from '../modules/python/module10/module-info';
import { moduleInfo as module11Info } from '../modules/python/module11/module-info';
import { moduleInfo as module12Info } from '../modules/python/module12/module-info';
import { moduleInfo as module13Info } from '../modules/python/module13/module-info';
import { moduleInfo as module14Info } from '../modules/python/module14/module-info';
import { moduleInfo as module15Info } from '../modules/python/module15/module-info';
import { moduleInfo as module16Info } from '../modules/python/module16/module-info';
import { moduleInfo as module17Info } from '../modules/python/module17/module-info';
import { moduleInfo as module18Info } from '../modules/python/module18/module-info';
import { moduleInfo as module19Info } from '../modules/python/module19/module-info';
import { moduleInfo as module20Info } from '../modules/python/module20/module-info';

// =============================================================================
// PYTHON TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { topic_1_1 } from '../modules/python/module1/topics/topic-1.1';
import { topic_1_2 } from '../modules/python/module1/topics/topic-1.2';

// Module 2
import { topic_2_1 } from '../modules/python/module2/topics/topic-2.1';
import { topic_2_2 } from '../modules/python/module2/topics/topic-2.2';
import { topic_2_3 } from '../modules/python/module2/topics/topic-2.3';
import { topic_2_4 } from '../modules/python/module2/topics/topic-2.4';
import { topic_2_5 } from '../modules/python/module2/topics/topic-2.5';
import { topic_2_6 } from '../modules/python/module2/topics/topic-2.6';
import { topic_2_7 } from '../modules/python/module2/topics/topic-2.7';

// Module 3
import { topic_3_1 } from '../modules/python/module3/topics/topic-3.1';
import { topic_3_2 } from '../modules/python/module3/topics/topic-3.2';
import { topic_3_3 } from '../modules/python/module3/topics/topic-3.3';
import { topic_3_4 } from '../modules/python/module3/topics/topic-3.4';
import { topic_3_5 } from '../modules/python/module3/topics/topic-3.5';
import { topic_3_6 } from '../modules/python/module3/topics/topic-3.6';

// Module 4
import { topic_4_1 } from '../modules/python/module4/topics/topic-4.1';
import { topic_4_2 } from '../modules/python/module4/topics/topic-4.2';
import { topic_4_3 } from '../modules/python/module4/topics/topic-4.3';
import { topic_4_4 } from '../modules/python/module4/topics/topic-4.4';
import { topic_4_5 } from '../modules/python/module4/topics/topic-4.5';
import { topic_4_6 } from '../modules/python/module4/topics/topic-4.6';

// Module 5
import { topic_5_1 } from '../modules/python/module5/topics/topic-5.1';
import { topic_5_2 } from '../modules/python/module5/topics/topic-5.2';
import { topic_5_3 } from '../modules/python/module5/topics/topic-5.3';
import { topic_5_4 } from '../modules/python/module5/topics/topic-5.4';
import { topic_5_5 } from '../modules/python/module5/topics/topic-5.5';
import { topic_5_6 } from '../modules/python/module5/topics/topic-5.6';

// Module 6
import { topic_6_1 } from '../modules/python/module6/topics/topic-6.1';
import { topic_6_2 } from '../modules/python/module6/topics/topic-6.2';
import { topic_6_3 } from '../modules/python/module6/topics/topic-6.3';
import { topic_6_4 } from '../modules/python/module6/topics/topic-6.4';
import { topic_6_5 } from '../modules/python/module6/topics/topic-6.5';
import { topic_6_6 } from '../modules/python/module6/topics/topic-6.6';

// Module 7
import { topic_7_1 } from '../modules/python/module7/topics/topic-7.1';
import { topic_7_2 } from '../modules/python/module7/topics/topic-7.2';
import { topic_7_3 } from '../modules/python/module7/topics/topic-7.3';
import { topic_7_4 } from '../modules/python/module7/topics/topic-7.4';
import { topic_7_5 } from '../modules/python/module7/topics/topic-7.5';
import { topic_7_6 } from '../modules/python/module7/topics/topic-7.6';

// Module 8
import { topic_8_1 } from '../modules/python/module8/topics/topic-8.1';
import { topic_8_2 } from '../modules/python/module8/topics/topic-8.2';
import { topic_8_3 } from '../modules/python/module8/topics/topic-8.3';
import { topic_8_4 } from '../modules/python/module8/topics/topic-8.4';
import { topic_8_5 } from '../modules/python/module8/topics/topic-8.5';
import { topic_8_6 } from '../modules/python/module8/topics/topic-8.6';
import { topic_8_7 } from '../modules/python/module8/topics/topic-8.7';

// Module 9
import { topic_9_1 } from '../modules/python/module9/topics/topic-9.1';
import { topic_9_2 } from '../modules/python/module9/topics/topic-9.2';
import { topic_9_3 } from '../modules/python/module9/topics/topic-9.3';
import { topic_9_4 } from '../modules/python/module9/topics/topic-9.4';
import { topic_9_5 } from '../modules/python/module9/topics/topic-9.5';
import { topic_9_6 } from '../modules/python/module9/topics/topic-9.6';

// Module 10
import { topic_10_1 } from '../modules/python/module10/topics/topic-10.1';
import { topic_10_2 } from '../modules/python/module10/topics/topic-10.2';
import { topic_10_3 } from '../modules/python/module10/topics/topic-10.3';
import { topic_10_4 } from '../modules/python/module10/topics/topic-10.4';
import { topic_10_5 } from '../modules/python/module10/topics/topic-10.5';
import { topic_10_6 } from '../modules/python/module10/topics/topic-10.6';

// Module 11
import { topic_11_1 } from '../modules/python/module11/topics/topic-11.1';
import { topic_11_2 } from '../modules/python/module11/topics/topic-11.2';
import { topic_11_3 } from '../modules/python/module11/topics/topic-11.3';
import { topic_11_4 } from '../modules/python/module11/topics/topic-11.4';
import { topic_11_5 } from '../modules/python/module11/topics/topic-11.5';
import { topic_11_6 } from '../modules/python/module11/topics/topic-11.6';

// Module 12
import { topic_12_1 } from '../modules/python/module12/topics/topic-12.1';
import { topic_12_2 } from '../modules/python/module12/topics/topic-12.2';
import { topic_12_3 } from '../modules/python/module12/topics/topic-12.3';
import { topic_12_4 } from '../modules/python/module12/topics/topic-12.4';
import { topic_12_5 } from '../modules/python/module12/topics/topic-12.5';
import { topic_12_6 } from '../modules/python/module12/topics/topic-12.6';

// Module 13
import { topic_13_1 } from '../modules/python/module13/topics/topic-13.1';
import { topic_13_2 } from '../modules/python/module13/topics/topic-13.2';
import { topic_13_3 } from '../modules/python/module13/topics/topic-13.3';
import { topic_13_4 } from '../modules/python/module13/topics/topic-13.4';

// Module 14
import { topic_14_1 } from '../modules/python/module14/topics/topic-14.1';
import { topic_14_2 } from '../modules/python/module14/topics/topic-14.2';
import { topic_14_3 } from '../modules/python/module14/topics/topic-14.3';
import { topic_14_4 } from '../modules/python/module14/topics/topic-14.4';

// Module 15
import { topic_15_1 } from '../modules/python/module15/topics/topic-15.1';
import { topic_15_2 } from '../modules/python/module15/topics/topic-15.2';
import { topic_15_3 } from '../modules/python/module15/topics/topic-15.3';
import { topic_15_4 } from '../modules/python/module15/topics/topic-15.4';
import { topic_15_5 } from '../modules/python/module15/topics/topic-15.5';
import { topic_15_6 } from '../modules/python/module15/topics/topic-15.6';
import { topic_15_7 } from '../modules/python/module15/topics/topic-15.7';
import { topic_15_8 } from '../modules/python/module15/topics/topic-15.8';

// Module 16
import { topic_16_1 } from '../modules/python/module16/topics/topic-16.1';
import { topic_16_2 } from '../modules/python/module16/topics/topic-16.2';
import { topic_16_3 } from '../modules/python/module16/topics/topic-16.3';
import { topic_16_4 } from '../modules/python/module16/topics/topic-16.4';
import { topic_16_5 } from '../modules/python/module16/topics/topic-16.5';
import { topic_16_6 } from '../modules/python/module16/topics/topic-16.6';
import { topic_16_7 } from '../modules/python/module16/topics/topic-16.7';
import { topic_16_8 } from '../modules/python/module16/topics/topic-16.8';

// Module 17
import { topic_17_1 } from '../modules/python/module17/topics/topic-17.1';
import { topic_17_2 } from '../modules/python/module17/topics/topic-17.2';
import { topic_17_3 } from '../modules/python/module17/topics/topic-17.3';

// Module 18
import { topic_18_1 } from '../modules/python/module18/topics/topic-18.1';

// Module 19
import { topic_19_1 } from '../modules/python/module19/topics/topic-19.1';

// Module 20
import { topic_20_1 } from '../modules/python/module20/topics/topic-20.1';
import { topic_20_2 } from '../modules/python/module20/topics/topic-20.2';
import { topic_20_3 } from '../modules/python/module20/topics/topic-20.3';
import { topic_20_4 } from '../modules/python/module20/topics/topic-20.4';
import { topic_20_5 } from '../modules/python/module20/topics/topic-20.5';

// =============================================================================
// PYTHON EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { exercise_1_3 } from '../modules/python/module1/mcq/exercise-1.3';

// Module 2
import { exercise_2_8 } from '../modules/python/module2/mcq/excercise-2.8';
import { exercise_2_9 } from '../modules/python/module2/mcq/excercise-2.9';

// Module 3
import { exercise_3_7 } from '../modules/python/module3/mcq/exercise-3.7';
import { exercise_3_8 } from '../modules/python/module3/mcq/exercise-3.8';

// Module 4
import { exercise_4_7 } from '../modules/python/module4/mcq/exercise-4.7';
import { exercise_4_8 } from '../modules/python/module4/mcq/exercise-4.8';

// Module 5
import { exercise_5_7 } from '../modules/python/module5/mcq/exercise-5.7';
import { exercise_5_8 } from '../modules/python/module5/mcq/exercise-5.8';

// Module 6
import { exercise_6_7 } from '../modules/python/module6/mcq/exercise-6.7';
import { exercise_6_8 } from '../modules/python/module6/mcq/exercise-6.8';

// Module 7
import { exercise_7_7 } from '../modules/python/module7/mcq/exercise-7.7';
import { exercise_7_8 } from '../modules/python/module7/mcq/exercise-7.8';

// Module 8
import { exercise_8_8 } from '../modules/python/module8/mcq/exercise-8.8';
import { exercise_8_9 } from '../modules/python/module8/mcq/exercise-8.9';

// Module 9
import { exercise_9_7 } from '../modules/python/module9/mcq/exercise-9.7';
import { exercise_9_8 } from '../modules/python/module9/mcq/exercise-9.8';

// Module 10
import { exercise_10_7 } from '../modules/python/module10/mcq/exercise-10.7';
import { exercise_10_8 } from '../modules/python/module10/mcq/exercise-10.8';

// Module 11
import { exercise_11_7 } from '../modules/python/module11/mcq/exercise-11.7';
import { exercise_11_8 } from '../modules/python/module11/mcq/exercise-11.8';

// Module 12
import { exercise_12_7 } from '../modules/python/module12/mcq/exercise-12.7';
import { exercise_12_8 } from '../modules/python/module12/mcq/exercise-12.8';

// Module 13
import { exercise_13_5 } from '../modules/python/module13/mcq/exercise-13.5';
import { exercise_13_6 } from '../modules/python/module13/mcq/exercise-13.6';

// Module 14
import { exercise_14_5 } from '../modules/python/module14/mcq/exercise-14.5';
import { exercise_14_6 } from '../modules/python/module14/mcq/exercise-14.6';

// Module 15
import { exercise_15_9 } from '../modules/python/module15/mcq/exercise-15.9';
import { exercise_15_10 } from '../modules/python/module15/mcq/exercise-15.10';

// Module 16
import { exercise_16_9 } from '../modules/python/module16/mcq/exercise-16.9';
import { exercise_16_10 } from '../modules/python/module16/mcq/exercise-16.10';

// Module 17
import { exercise_17_4 } from '../modules/python/module17/mcq/exercise-17.4';

// =============================================================================
// PYTHON MODULE CONFIGURATION
// =============================================================================

const PYTHON_MODULES = [
  {
    info: module1Info,
    topics: [topic_1_1, topic_1_2],
    exercises: [exercise_1_3]
  },
  {
    info: module2Info,
    topics: [topic_2_1, topic_2_2, topic_2_3, topic_2_4, topic_2_5, topic_2_6, topic_2_7],
    exercises: [exercise_2_8, exercise_2_9]
  },
  {
    info: module3Info,
    topics: [topic_3_1, topic_3_2, topic_3_3, topic_3_4, topic_3_5, topic_3_6],
    exercises: [exercise_3_7, exercise_3_8]
  },
  {
    info: module4Info,
    topics: [topic_4_1, topic_4_2, topic_4_3, topic_4_4, topic_4_5, topic_4_6],
    exercises: [exercise_4_7, exercise_4_8]
  },
  {
    info: module5Info,
    topics: [topic_5_1, topic_5_2, topic_5_3, topic_5_4, topic_5_5, topic_5_6],
    exercises: [exercise_5_7, exercise_5_8]
  },
  {
    info: module6Info,
    topics: [topic_6_1, topic_6_2, topic_6_3, topic_6_4, topic_6_5, topic_6_6],
    exercises: [exercise_6_7, exercise_6_8]
  },
  {
    info: module7Info,
    topics: [topic_7_1, topic_7_2, topic_7_3, topic_7_4, topic_7_5, topic_7_6],
    exercises: [exercise_7_7, exercise_7_8]
  },
  {
    info: module8Info,
    topics: [topic_8_1, topic_8_2, topic_8_3, topic_8_4, topic_8_5, topic_8_6, topic_8_7],
    exercises: [exercise_8_8, exercise_8_9]
  },
  {
    info: module9Info,
    topics: [topic_9_1, topic_9_2, topic_9_3, topic_9_4, topic_9_5, topic_9_6],
    exercises: [exercise_9_7, exercise_9_8]
  },
  {
    info: module10Info,
    topics: [topic_10_1, topic_10_2, topic_10_3, topic_10_4, topic_10_5, topic_10_6],
    exercises: [exercise_10_7, exercise_10_8]
  },
  {
    info: module11Info,
    topics: [topic_11_1, topic_11_2, topic_11_3, topic_11_4, topic_11_5, topic_11_6],
    exercises: [exercise_11_7, exercise_11_8]
  },
  {
    info: module12Info,
    topics: [topic_12_1, topic_12_2, topic_12_3, topic_12_4, topic_12_5, topic_12_6],
    exercises: [exercise_12_7, exercise_12_8]
  },
  {
    info: module13Info,
    topics: [topic_13_1, topic_13_2, topic_13_3, topic_13_4],
    exercises: [exercise_13_5, exercise_13_6]
  },
  {
    info: module14Info,
    topics: [topic_14_1, topic_14_2, topic_14_3, topic_14_4],
    exercises: [exercise_14_5, exercise_14_6]
  },
  {
    info: module15Info,
    topics: [topic_15_1, topic_15_2, topic_15_3, topic_15_4, topic_15_5, topic_15_6, topic_15_7, topic_15_8],
    exercises: [exercise_15_9, exercise_15_10]
  },
  {
    info: module16Info,
    topics: [topic_16_1, topic_16_2, topic_16_3, topic_16_4, topic_16_5, topic_16_6, topic_16_7, topic_16_8],
    exercises: [exercise_16_9, exercise_16_10]
  },
  {
    info: module17Info,
    topics: [topic_17_1, topic_17_2, topic_17_3],
    exercises: [exercise_17_4]
  },
  {
    info: module18Info,
    topics: [topic_18_1],
    exercises: []
  },
  {
    info: module19Info,
    topics: [topic_19_1],
    exercises: []
  },
  {
    info: module20Info,
    topics: [topic_20_1, topic_20_2, topic_20_3, topic_20_4, topic_20_5],
    exercises: []
  },
];

/**
 * Loads Python modules
 * @returns Promise<Module[]> - Array of loaded Python modules
 */
export async function loadPythonModules(): Promise<Module[]> {
  console.log('🐍 Loading Python modules using static imports...');

  const modules: Module[] = PYTHON_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} Python modules:`, modules.map(m => m.title));
  return modules;
}
