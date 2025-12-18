import { Module } from '../data/lessonsData';

// =============================================================================
// JAVA MODULE IMPORTS
// =============================================================================
import { moduleInfo as javaModule1Info } from '../modules/java/module1/module-info';
import { moduleInfo as javaModule2Info } from '../modules/java/module2/module-info';
import { moduleInfo as javaModule3Info } from '../modules/java/module3/module-info';
import { moduleInfo as javaModule4Info } from '../modules/java/module4/module-info';
import { moduleInfo as javaModule5Info } from '../modules/java/module5/module-info';
import { moduleInfo as javaModule6Info } from '../modules/java/module6/module-info';
import { moduleInfo as javaModule7Info } from '../modules/java/module7/module-info';
import { moduleInfo as javaModule8Info } from '../modules/java/module8/module-info';
import { moduleInfo as javaModule9Info } from '../modules/java/module9/module-info';
import { moduleInfo as javaModule10Info } from '../modules/java/module10/module-info';
import { moduleInfo as javaModule11Info } from '../modules/java/module11/module-info';
import { moduleInfo as javaModule12Info } from '../modules/java/module12/module-info';
import { moduleInfo as javaModule13Info } from '../modules/java/module13/module-info';
import { moduleInfo as javaModule14Info } from '../modules/java/module14/module-info';
import { moduleInfo as javaModule15Info } from '../modules/java/module15/module-info';
import { moduleInfo as javaModule16Info } from '../modules/java/module16/module-info';
import { moduleInfo as javaModule17Info } from '../modules/java/module17/module-info';
import { moduleInfo as javaModule18Info } from '../modules/java/module18/module-info';
import { moduleInfo as javaModule19Info } from '../modules/java/module19/module-info';
import { moduleInfo as javaModule20Info } from '../modules/java/module20/module-info';

// =============================================================================
// JAVA TOPIC IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { topic_1_1 as java_topic_1_1 } from '../modules/java/module1/topics/topic-1.1';
import { topic_1_2 as java_topic_1_2 } from '../modules/java/module1/topics/topic-1.2';

// Module 2
import { topic_2_1 as java_topic_2_1 } from '../modules/java/module2/topics/topic-2.1';
import { topic_2_2 as java_topic_2_2 } from '../modules/java/module2/topics/topic-2.2';
import { topic_2_3 as java_topic_2_3 } from '../modules/java/module2/topics/topic-2.3';
import { topic_2_4 as java_topic_2_4 } from '../modules/java/module2/topics/topic-2.4';
import { topic_2_5 as java_topic_2_5 } from '../modules/java/module2/topics/topic-2.5';
import { topic_2_6 as java_topic_2_6 } from '../modules/java/module2/topics/topic-2.6';
import { topic_2_7 as java_topic_2_7 } from '../modules/java/module2/topics/topic-2.7';

// Module 3
import { topic_3_1 as java_topic_3_1 } from '../modules/java/module3/topics/topic-3.1';
import { topic_3_2 as java_topic_3_2 } from '../modules/java/module3/topics/topic-3.2';
import { topic_3_3 as java_topic_3_3 } from '../modules/java/module3/topics/topic-3.3';
import { topic_3_4 as java_topic_3_4 } from '../modules/java/module3/topics/topic-3.4';
import { topic_3_5 as java_topic_3_5 } from '../modules/java/module3/topics/topic-3.5';
import { topic_3_6 as java_topic_3_6 } from '../modules/java/module3/topics/topic-3.6';

// Module 4
import { topic_4_1 as java_topic_4_1 } from '../modules/java/module4/topics/topic-4.1';
import { topic_4_2 as java_topic_4_2 } from '../modules/java/module4/topics/topic-4.2';
import { topic_4_3 as java_topic_4_3 } from '../modules/java/module4/topics/topic-4.3';
import { topic_4_4 as java_topic_4_4 } from '../modules/java/module4/topics/topic-4.4';
import { topic_4_5 as java_topic_4_5 } from '../modules/java/module4/topics/topic-4.5';
import { topic_4_6 as java_topic_4_6 } from '../modules/java/module4/topics/topic-4.6';

// Module 5
import { topic_5_1 as java_topic_5_1 } from '../modules/java/module5/topics/topic-5.1';
import { topic_5_2 as java_topic_5_2 } from '../modules/java/module5/topics/topic-5.2';
import { topic_5_3 as java_topic_5_3 } from '../modules/java/module5/topics/topic-5.3';
import { topic_5_4 as java_topic_5_4 } from '../modules/java/module5/topics/topic-5.4';
import { topic_5_5 as java_topic_5_5 } from '../modules/java/module5/topics/topic-5.5';
import { topic_5_6 as java_topic_5_6 } from '../modules/java/module5/topics/topic-5.6';

// Module 6
import { topic_6_1 as java_topic_6_1 } from '../modules/java/module6/topics/topic-6.1';
import { topic_6_2 as java_topic_6_2 } from '../modules/java/module6/topics/topic-6.2';
import { topic_6_3 as java_topic_6_3 } from '../modules/java/module6/topics/topic-6.3';
import { topic_6_4 as java_topic_6_4 } from '../modules/java/module6/topics/topic-6.4';
import { topic_6_5 as java_topic_6_5 } from '../modules/java/module6/topics/topic-6.5';
import { topic_6_6 as java_topic_6_6 } from '../modules/java/module6/topics/topic-6.6';

// Module 7
import { topic_7_1 as java_topic_7_1 } from '../modules/java/module7/topics/topic-7.1';
import { topic_7_2 as java_topic_7_2 } from '../modules/java/module7/topics/topic-7.2';
import { topic_7_3 as java_topic_7_3 } from '../modules/java/module7/topics/topic-7.3';
import { topic_7_4 as java_topic_7_4 } from '../modules/java/module7/topics/topic-7.4';
import { topic_7_5 as java_topic_7_5 } from '../modules/java/module7/topics/topic-7.5';
import { topic_7_6 as java_topic_7_6 } from '../modules/java/module7/topics/topic-7.6';

// Module 8
import { topic_8_1 as java_topic_8_1 } from '../modules/java/module8/topics/topic-8.1';

// Module 9
import { topic_9_1 as java_topic_9_1 } from '../modules/java/module9/topics/topic-9.1';

// Module 10
import { topic_10_1 as java_topic_10_1 } from '../modules/java/module10/topics/topic-10.1';

// Module 11
import { topic_11_1 as java_topic_11_1 } from '../modules/java/module11/topics/topic-11.1';

// Module 12
import { topic_12_1 as java_topic_12_1 } from '../modules/java/module12/topics/topic-12.1';
import { topic_12_2 as java_topic_12_2 } from '../modules/java/module12/topics/topic-12.2';
import { topic_12_3 as java_topic_12_3 } from '../modules/java/module12/topics/topic-12.3';
import { topic_12_4 as java_topic_12_4 } from '../modules/java/module12/topics/topic-12.4';
import { topic_12_5 as java_topic_12_5 } from '../modules/java/module12/topics/topic-12.5';
import { topic_12_6 as java_topic_12_6 } from '../modules/java/module12/topics/topic-12.6';

// Module 13
import { topic_13_1 as java_topic_13_1 } from '../modules/java/module13/topics/topic-13.1';
import { topic_13_2 as java_topic_13_2 } from '../modules/java/module13/topics/topic-13.2';
import { topic_13_3 as java_topic_13_3 } from '../modules/java/module13/topics/topic-13.3';
import { topic_13_4 as java_topic_13_4 } from '../modules/java/module13/topics/topic-13.4';

// Module 14
import { topic_14_1 as java_topic_14_1 } from '../modules/java/module14/topics/topic-14.1';
import { topic_14_2 as java_topic_14_2 } from '../modules/java/module14/topics/topic-14.2';
import { topic_14_3 as java_topic_14_3 } from '../modules/java/module14/topics/topic-14.3';
import { topic_14_4 as java_topic_14_4 } from '../modules/java/module14/topics/topic-14.4';

// Module 15
import { topic_15_1 as java_topic_15_1 } from '../modules/java/module15/topics/topic-15.1';
import { topic_15_2 as java_topic_15_2 } from '../modules/java/module15/topics/topic-15.2';

// Module 16
import { topic_16_1 as java_topic_16_1 } from '../modules/java/module16/topics/topic-16.1';

// Module 17
import { topic_17_1 as java_topic_17_1 } from '../modules/java/module17/topics/topic-17.1';

// Module 18
import { topic_18_1 as java_topic_18_1 } from '../modules/java/module18/topics/topic-18.1';

// Module 19
import { topic_19_1 as java_topic_19_1 } from '../modules/java/module19/topics/topic-19.1';

// Module 20
import { topic_20_1 as java_topic_20_1 } from '../modules/java/module20/topics/topic-20.1';

// =============================================================================
// JAVA EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1
import { exercise_1_3 as java_exercise_1_3 } from '../modules/java/module1/mcq/exercise-1.3';

// Module 2
import { exercise_2_8 as java_exercise_2_8 } from '../modules/java/module2/mcq/exercise-2.8';
import { exercise_2_9 as java_exercise_2_9 } from '../modules/java/module2/mcq/exercise-2.9';

// Module 3
import { exercise_3_7 as java_exercise_3_7 } from '../modules/java/module3/mcq/exercise-3.7';
import { exercise_3_8 as java_exercise_3_8 } from '../modules/java/module3/mcq/exercise-3.8';

// Module 4
import { exercise_4_7 as java_exercise_4_7 } from '../modules/java/module4/mcq/exercise-4.7';
import { exercise_4_8 as java_exercise_4_8 } from '../modules/java/module4/mcq/exercise-4.8';

// Module 5
import { exercise_5_7 as java_exercise_5_7 } from '../modules/java/module5/mcq/exercise-5.7';
import { exercise_5_8 as java_exercise_5_8 } from '../modules/java/module5/mcq/exercise-5.8';

// Module 6
import { exercise_6_7 as java_exercise_6_7 } from '../modules/java/module6/mcq/exercise-6.7';
import { exercise_6_8 as java_exercise_6_8 } from '../modules/java/module6/mcq/exercise-6.8';

// Module 7
import { exercise_7_7 as java_exercise_7_7 } from '../modules/java/module7/mcq/exercise-7.7';
import { exercise_7_8 as java_exercise_7_8 } from '../modules/java/module7/mcq/exercise-7.8';

// Module 8
import { exercise_8_1 as java_exercise_8_1 } from '../modules/java/module8/mcq/exercise-8.1';

// Module 9
import { exercise_9_1 as java_exercise_9_1 } from '../modules/java/module9/mcq/exercise-9.1';

// Module 10
import { exercise_10_1 as java_exercise_10_1 } from '../modules/java/module10/mcq/exercise-10.1';

// Module 11
import { exercise_11_1 as java_exercise_11_1 } from '../modules/java/module11/mcq/exercise-11.1';

// Module 12
import { exercise_12_1 as java_exercise_12_1 } from '../modules/java/module12/mcq/exercise-12.1';
import { exercise_12_2 as java_exercise_12_2 } from '../modules/java/module12/mcq/exercise-12.2';

// Module 13
import { exercise_13_5 as java_exercise_13_5 } from '../modules/java/module13/mcq/exercise-13.5';
import { exercise_13_6 as java_exercise_13_6 } from '../modules/java/module13/mcq/exercise-13.6';

// Module 14
import { exercise_14_1 as java_exercise_14_1 } from '../modules/java/module14/mcq/exercise-14.1';
import { exercise_14_2 as java_exercise_14_2 } from '../modules/java/module14/mcq/exercise-14.2';

// Module 15
import { exercise_15_1 as java_exercise_15_1 } from '../modules/java/module15/mcq/exercise-15.1';
import { exercise_15_2 as java_exercise_15_2 } from '../modules/java/module15/mcq/exercise-15.2';

// Module 16
import { exercise_16_1 as java_exercise_16_1 } from '../modules/java/module16/mcq/exercise-16.1';

// Module 17
import { exercise_17_1 as java_exercise_17_1 } from '../modules/java/module17/mcq/exercise-17.1';

// =============================================================================
// JAVA MODULE CONFIGURATION
// =============================================================================

const JAVA_MODULES = [
  {
    info: javaModule1Info,
    topics: [java_topic_1_1, java_topic_1_2],
    exercises: [java_exercise_1_3]
  },
  {
    info: javaModule2Info,
    topics: [java_topic_2_1, java_topic_2_2, java_topic_2_3, java_topic_2_4, java_topic_2_5, java_topic_2_6, java_topic_2_7],
    exercises: [java_exercise_2_8, java_exercise_2_9]
  },
  {
    info: javaModule3Info,
    topics: [java_topic_3_1, java_topic_3_2, java_topic_3_3, java_topic_3_4, java_topic_3_5, java_topic_3_6],
    exercises: [java_exercise_3_7, java_exercise_3_8]
  },
  {
    info: javaModule4Info,
    topics: [java_topic_4_1, java_topic_4_2, java_topic_4_3, java_topic_4_4, java_topic_4_5, java_topic_4_6],
    exercises: [java_exercise_4_7, java_exercise_4_8]
  },
  {
    info: javaModule5Info,
    topics: [java_topic_5_1, java_topic_5_2, java_topic_5_3, java_topic_5_4, java_topic_5_5, java_topic_5_6],
    exercises: [java_exercise_5_7, java_exercise_5_8]
  },
  {
    info: javaModule6Info,
    topics: [java_topic_6_1, java_topic_6_2, java_topic_6_3, java_topic_6_4, java_topic_6_5, java_topic_6_6],
    exercises: [java_exercise_6_7, java_exercise_6_8]
  },
  {
    info: javaModule7Info,
    topics: [java_topic_7_1, java_topic_7_2, java_topic_7_3, java_topic_7_4, java_topic_7_5, java_topic_7_6],
    exercises: [java_exercise_7_7, java_exercise_7_8]
  },
  {
    info: javaModule8Info,
    topics: [java_topic_8_1],
    exercises: [java_exercise_8_1]
  },
  {
    info: javaModule9Info,
    topics: [java_topic_9_1],
    exercises: [java_exercise_9_1]
  },
  {
    info: javaModule10Info,
    topics: [java_topic_10_1],
    exercises: [java_exercise_10_1]
  },
  {
    info: javaModule11Info,
    topics: [java_topic_11_1],
    exercises: [java_exercise_11_1]
  },
  {
    info: javaModule12Info,
    topics: [java_topic_12_1, java_topic_12_2, java_topic_12_3, java_topic_12_4, java_topic_12_5, java_topic_12_6],
    exercises: [java_exercise_12_1, java_exercise_12_2]
  },
  {
    info: javaModule13Info,
    topics: [java_topic_13_1, java_topic_13_2, java_topic_13_3, java_topic_13_4],
    exercises: [java_exercise_13_5, java_exercise_13_6]
  },
  {
    info: javaModule14Info,
    topics: [java_topic_14_1, java_topic_14_2, java_topic_14_3, java_topic_14_4],
    exercises: [java_exercise_14_1, java_exercise_14_2]
  },
  {
    info: javaModule15Info,
    topics: [java_topic_15_1, java_topic_15_2],
    exercises: [java_exercise_15_1, java_exercise_15_2]
  },
  {
    info: javaModule16Info,
    topics: [java_topic_16_1],
    exercises: [java_exercise_16_1]
  },
  {
    info: javaModule17Info,
    topics: [java_topic_17_1],
    exercises: [java_exercise_17_1]
  },
  {
    info: javaModule18Info,
    topics: [java_topic_18_1],
    exercises: []
  },
  {
    info: javaModule19Info,
    topics: [java_topic_19_1],
    exercises: []
  },
  {
    info: javaModule20Info,
    topics: [java_topic_20_1],
    exercises: []
  },
];

/**
 * Loads Java modules
 * @returns Promise<Module[]> - Array of loaded Java modules
 */
export async function loadJavaModules(): Promise<Module[]> {
  console.log('☕ Loading Java modules using static imports...');

  const modules: Module[] = JAVA_MODULES.map((moduleConfig) => ({
    ...moduleConfig.info,
    subLessons: moduleConfig.topics,
    exercises: moduleConfig.exercises
  }));

  console.log(`✅ Loaded ${modules.length} Java modules:`, modules.map(m => m.title));
  return modules;
}
