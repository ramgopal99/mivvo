import { Module } from '../data/lessonsData';

// =============================================================================
// APTITUDE MODULE IMPORTS
// =============================================================================
import { moduleInfo as module1Info } from '../modules/aptitude/module1/module-info';
import { moduleInfo as module2Info } from '../modules/aptitude/module2/module-info';
import { moduleInfo as module3Info } from '../modules/aptitude/module3/module-info';
import { moduleInfo as module4Info } from '../modules/aptitude/module4/module-info';
import { moduleInfo as module5Info } from '../modules/aptitude/module5/module-info';
import { moduleInfo as module6Info } from '../modules/aptitude/module6/module-info';
import { moduleInfo as module7Info } from '../modules/aptitude/module7/module-info';
import { moduleInfo as module8Info } from '../modules/aptitude/module8/module-info';
import { moduleInfo as module9Info } from '../modules/aptitude/module9/module-info';
import { moduleInfo as module10Info } from '../modules/aptitude/module10/module-info';
import { moduleInfo as module11Info } from '../modules/aptitude/module11/module-info';
import { moduleInfo as module12Info } from '../modules/aptitude/module12/module-info';
import { moduleInfo as module13Info } from '../modules/aptitude/module13/module-info';
import { moduleInfo as module14Info } from '../modules/aptitude/module14/module-info';
import { moduleInfo as module15Info } from '../modules/aptitude/module15/module-info';

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

// Module 4 - Percentage
import { topic_4_1 } from '../modules/aptitude/module4/topics/topic-4.1';
import { topic_4_2 } from '../modules/aptitude/module4/topics/topic-4.2';
import { topic_4_3 } from '../modules/aptitude/module4/topics/topic-4.3';
import { topic_4_4 } from '../modules/aptitude/module4/topics/topic-4.4';
import { topic_4_5 } from '../modules/aptitude/module4/topics/topic-4.5';
import { topic_4_6 } from '../modules/aptitude/module4/topics/topic-4.6';
import { topic_4_7 } from '../modules/aptitude/module4/topics/topic-4.7';
import { topic_4_8 } from '../modules/aptitude/module4/topics/topic-4.8';
import { topic_4_9 } from '../modules/aptitude/module4/topics/topic-4.9';
import { topic_4_10 } from '../modules/aptitude/module4/topics/topic-4.10';
import { topic_4_11 } from '../modules/aptitude/module4/topics/topic-4.11';
import { topic_4_12 } from '../modules/aptitude/module4/topics/topic-4.12';

// Module 5 - Ratio & Proportion
import { topic_5_1 } from '../modules/aptitude/module5/topics/topic-5.1';
import { topic_5_2 } from '../modules/aptitude/module5/topics/topic-5.2';
import { topic_5_3 } from '../modules/aptitude/module5/topics/topic-5.3';
import { topic_5_4 } from '../modules/aptitude/module5/topics/topic-5.4';
import { topic_5_5 } from '../modules/aptitude/module5/topics/topic-5.5';
import { topic_5_6 } from '../modules/aptitude/module5/topics/topic-5.6';
import { topic_5_7 } from '../modules/aptitude/module5/topics/topic-5.7';
import { topic_5_8 } from '../modules/aptitude/module5/topics/topic-5.8';
import { topic_5_9 } from '../modules/aptitude/module5/topics/topic-5.9';
import { topic_5_10 } from '../modules/aptitude/module5/topics/topic-5.10';
import { topic_5_11 } from '../modules/aptitude/module5/topics/topic-5.11';
import { topic_5_12 } from '../modules/aptitude/module5/topics/topic-5.12';
import { topic_5_13 } from '../modules/aptitude/module5/topics/topic-5.13';

// Module 6 - Average
import { topic_6_1 } from '../modules/aptitude/module6/topics/topic-6.1';
import { topic_6_2 } from '../modules/aptitude/module6/topics/topic-6.2';
import { topic_6_3 } from '../modules/aptitude/module6/topics/topic-6.3';
import { topic_6_4 } from '../modules/aptitude/module6/topics/topic-6.4';
import { topic_6_5 } from '../modules/aptitude/module6/topics/topic-6.5';
import { topic_6_6 } from '../modules/aptitude/module6/topics/topic-6.6';
import { topic_6_7 } from '../modules/aptitude/module6/topics/topic-6.7';
import { topic_6_8 } from '../modules/aptitude/module6/topics/topic-6.8';
import { topic_6_9 } from '../modules/aptitude/module6/topics/topic-6.9';

// Module 7 - Profit & Loss
import { topic_7_1 } from '../modules/aptitude/module7/topics/topic-7.1';
import { topic_7_2 } from '../modules/aptitude/module7/topics/topic-7.2';
import { topic_7_3 } from '../modules/aptitude/module7/topics/topic-7.3';
import { topic_7_4 } from '../modules/aptitude/module7/topics/topic-7.4';
import { topic_7_5 } from '../modules/aptitude/module7/topics/topic-7.5';
import { topic_7_6 } from '../modules/aptitude/module7/topics/topic-7.6';
import { topic_7_7 } from '../modules/aptitude/module7/topics/topic-7.7';
import { topic_7_8 } from '../modules/aptitude/module7/topics/topic-7.8';
import { topic_7_9 } from '../modules/aptitude/module7/topics/topic-7.9';
import { topic_7_10 } from '../modules/aptitude/module7/topics/topic-7.10';
import { topic_7_11 } from '../modules/aptitude/module7/topics/topic-7.11';
import { topic_7_12 } from '../modules/aptitude/module7/topics/topic-7.12';
import { topic_7_13 } from '../modules/aptitude/module7/topics/topic-7.13';

// Module 8 - Simple Interest
import { topic_8_1 } from '../modules/aptitude/module8/topics/topic-8.1';
import { topic_8_2 } from '../modules/aptitude/module8/topics/topic-8.2';
import { topic_8_3 } from '../modules/aptitude/module8/topics/topic-8.3';
import { topic_8_4 } from '../modules/aptitude/module8/topics/topic-8.4';
import { topic_8_5 } from '../modules/aptitude/module8/topics/topic-8.5';
import { topic_8_6 } from '../modules/aptitude/module8/topics/topic-8.6';
import { topic_8_7 } from '../modules/aptitude/module8/topics/topic-8.7';
import { topic_8_8 } from '../modules/aptitude/module8/topics/topic-8.8';
import { topic_8_9 } from '../modules/aptitude/module8/topics/topic-8.9';
import { topic_8_10 } from '../modules/aptitude/module8/topics/topic-8.10';

// Module 9 - Compound Interest
import { topic_9_1 } from '../modules/aptitude/module9/topics/topic-9.1';
import { topic_9_2 } from '../modules/aptitude/module9/topics/topic-9.2';
import { topic_9_3 } from '../modules/aptitude/module9/topics/topic-9.3';
import { topic_9_4 } from '../modules/aptitude/module9/topics/topic-9.4';
import { topic_9_5 } from '../modules/aptitude/module9/topics/topic-9.5';
import { topic_9_6 } from '../modules/aptitude/module9/topics/topic-9.6';
import { topic_9_7 } from '../modules/aptitude/module9/topics/topic-9.7';
import { topic_9_8 } from '../modules/aptitude/module9/topics/topic-9.8';
import { topic_9_9 } from '../modules/aptitude/module9/topics/topic-9.9';
import { topic_9_10 } from '../modules/aptitude/module9/topics/topic-9.10';
import { topic_9_11 } from '../modules/aptitude/module9/topics/topic-9.11';
import { topic_9_12 } from '../modules/aptitude/module9/topics/topic-9.12';
import { topic_9_13 } from '../modules/aptitude/module9/topics/topic-9.13';

// Module 10 - Time & Work
import { topic_10_1 } from '../modules/aptitude/module10/topics/topic-10.1';
import { topic_10_2 } from '../modules/aptitude/module10/topics/topic-10.2';
import { topic_10_3 } from '../modules/aptitude/module10/topics/topic-10.3';
import { topic_10_4 } from '../modules/aptitude/module10/topics/topic-10.4';
import { topic_10_5 } from '../modules/aptitude/module10/topics/topic-10.5';
import { topic_10_6 } from '../modules/aptitude/module10/topics/topic-10.6';
import { topic_10_7 } from '../modules/aptitude/module10/topics/topic-10.7';
import { topic_10_8 } from '../modules/aptitude/module10/topics/topic-10.8';
import { topic_10_9 } from '../modules/aptitude/module10/topics/topic-10.9';
import { topic_10_10 } from '../modules/aptitude/module10/topics/topic-10.10';
import { topic_10_11 } from '../modules/aptitude/module10/topics/topic-10.11';

// Module 11 - Time, Speed & Distance
import { topic_11_1 } from '../modules/aptitude/module11/topics/topic-11.1';
import { topic_11_2 } from '../modules/aptitude/module11/topics/topic-11.2';
import { topic_11_3 } from '../modules/aptitude/module11/topics/topic-11.3';
import { topic_11_4 } from '../modules/aptitude/module11/topics/topic-11.4';
import { topic_11_5 } from '../modules/aptitude/module11/topics/topic-11.5';
import { topic_11_6 } from '../modules/aptitude/module11/topics/topic-11.6';
import { topic_11_7 } from '../modules/aptitude/module11/topics/topic-11.7';
import { topic_11_8 } from '../modules/aptitude/module11/topics/topic-11.8';
import { topic_11_9 } from '../modules/aptitude/module11/topics/topic-11.9';
import { topic_11_10 } from '../modules/aptitude/module11/topics/topic-11.10';
import { topic_11_11 } from '../modules/aptitude/module11/topics/topic-11.11';

// Module 12 - Mixture & Alligation
import { topic_12_1 } from '../modules/aptitude/module12/topics/topic-12.1';
import { topic_12_2 } from '../modules/aptitude/module12/topics/topic-12.2';
import { topic_12_3 } from '../modules/aptitude/module12/topics/topic-12.3';
import { topic_12_4 } from '../modules/aptitude/module12/topics/topic-12.4';
import { topic_12_5 } from '../modules/aptitude/module12/topics/topic-12.5';
import { topic_12_6 } from '../modules/aptitude/module12/topics/topic-12.6';
import { topic_12_7 } from '../modules/aptitude/module12/topics/topic-12.7';
import { topic_12_8 } from '../modules/aptitude/module12/topics/topic-12.8';
import { topic_12_9 } from '../modules/aptitude/module12/topics/topic-12.9';
import { topic_12_10 } from '../modules/aptitude/module12/topics/topic-12.10';

// Module 13 - Linear Equations
import { topic_13_1 } from '../modules/aptitude/module13/topics/topic-13.1';
import { topic_13_2 } from '../modules/aptitude/module13/topics/topic-13.2';
import { topic_13_3 } from '../modules/aptitude/module13/topics/topic-13.3';
import { topic_13_4 } from '../modules/aptitude/module13/topics/topic-13.4';
import { topic_13_5 } from '../modules/aptitude/module13/topics/topic-13.5';
import { topic_13_6 } from '../modules/aptitude/module13/topics/topic-13.6';
import { topic_13_7 } from '../modules/aptitude/module13/topics/topic-13.7';
import { topic_13_8 } from '../modules/aptitude/module13/topics/topic-13.8';
import { topic_13_9 } from '../modules/aptitude/module13/topics/topic-13.9';
import { topic_13_10 } from '../modules/aptitude/module13/topics/topic-13.10';

// Module 14 - Quadratic Equations
import { topic_14_1 } from '../modules/aptitude/module14/topics/topic-14.1';
import { topic_14_2 } from '../modules/aptitude/module14/topics/topic-14.2';
import { topic_14_3 } from '../modules/aptitude/module14/topics/topic-14.3';
import { topic_14_4 } from '../modules/aptitude/module14/topics/topic-14.4';
import { topic_14_5 } from '../modules/aptitude/module14/topics/topic-14.5';
import { topic_14_6 } from '../modules/aptitude/module14/topics/topic-14.6';
import { topic_14_7 } from '../modules/aptitude/module14/topics/topic-14.7';
import { topic_14_8 } from '../modules/aptitude/module14/topics/topic-14.8';
import { topic_14_9 } from '../modules/aptitude/module14/topics/topic-14.9';

// Module 15 - Data Interpretation
import { topic_15_1 } from '../modules/aptitude/module15/topics/topic-15.1';
import { topic_15_2 } from '../modules/aptitude/module15/topics/topic-15.2';
import { topic_15_3 } from '../modules/aptitude/module15/topics/topic-15.3';
import { topic_15_4 } from '../modules/aptitude/module15/topics/topic-15.4';
import { topic_15_5 } from '../modules/aptitude/module15/topics/topic-15.5';
import { topic_15_6 } from '../modules/aptitude/module15/topics/topic-15.6';
import { topic_15_7 } from '../modules/aptitude/module15/topics/topic-15.7';
import { topic_15_8 } from '../modules/aptitude/module15/topics/topic-15.8';
import { topic_15_9 } from '../modules/aptitude/module15/topics/topic-15.9';
import { topic_15_10 } from '../modules/aptitude/module15/topics/topic-15.10';
import { topic_15_11 } from '../modules/aptitude/module15/topics/topic-15.11';
import { topic_15_12 } from '../modules/aptitude/module15/topics/topic-15.12';
import { topic_15_13 } from '../modules/aptitude/module15/topics/topic-15.13';

// =============================================================================
// APTITUDE EXERCISE IMPORTS (Grouped by Module)
// =============================================================================

// Module 1 - Introduction to Quantitative Aptitude
// No MCQs for introduction module

// Module 2 - Number System
import { exercise_2_24 } from '../modules/aptitude/module2/mcq/exercise-2.24';

// Module 3 - Simplification
import { exercise_3_14 } from '../modules/aptitude/module3/mcq/exercise-3.14';

// Module 4 - Percentage
import { exercise_4_13 } from '../modules/aptitude/module4/mcq/exercise-4.13';

// Module 5 - Ratio & Proportion
import { exercise_5_14 } from '../modules/aptitude/module5/mcq/exercise-5.14';

// Module 6 - Average
import { exercise_6_10 } from '../modules/aptitude/module6/mcq/exercise-6.10';

// Module 7 - Profit & Loss
import { exercise_7_14 } from '../modules/aptitude/module7/mcq/exercise-7.14';

// Module 8 - Simple Interest
import { exercise_8_11 } from '../modules/aptitude/module8/mcq/exercise-8.11';

// Module 9 - Compound Interest
import { exercise_9_15 } from '../modules/aptitude/module9/mcq/exercise-9.15';

// Module 10 - Time & Work
import { exercise_10_14 } from '../modules/aptitude/module10/mcq/exercise-10.14';

// Module 11 - Time, Speed & Distance
import { exercise_11_14 } from '../modules/aptitude/module11/mcq/exercise-11.14';

// Module 12 - Mixture & Alligation
import { exercise_12_14 } from '../modules/aptitude/module12/mcq/exercise-12.14';

// Module 13 - Linear Equations
import { exercise_13_14 } from '../modules/aptitude/module13/mcq/exercise-13.14';

// Module 14 - Quadratic Equations
import { exercise_14_15 } from '../modules/aptitude/module14/mcq/exercise-14.15';

// Module 15 - Data Interpretation
import { exercise_15_16 } from '../modules/aptitude/module15/mcq/exercise-15.16';

// =============================================================================
// APTITUDE FORMULA IMPORTS (Grouped by Module)
// =============================================================================

// Module 2 - Number System Formulas
import formulasModule2 from '../modules/aptitude/module2/formulas';
// Module 3 - Simplification Formulas
import formulasModule3 from '../modules/aptitude/module3/formulas';
// Module 4 - Percentage Formulas
import formulasModule4 from '../modules/aptitude/module4/formulas';
// Module 5 - Ratio & Proportion Formulas
import formulasModule5 from '../modules/aptitude/module5/formulas';
// Module 6 - Average Formulas
import formulasModule6 from '../modules/aptitude/module6/formulas';
// Module 7 - Profit & Loss Formulas
import formulasModule7 from '../modules/aptitude/module7/formulas';
// Module 8 - Simple Interest Formulas
import formulasModule8 from '../modules/aptitude/module8/formulas';
// Module 9 - Compound Interest Formulas
import formulasModule9 from '../modules/aptitude/module9/formulas';
// Module 10 - Time & Work Formulas
import formulasModule10 from '../modules/aptitude/module10/formulas';
// Module 11 - Time, Speed & Distance Formulas
import formulasModule11 from '../modules/aptitude/module11/formulas';
// Module 12 - Mixture & Alligation Formulas
import formulasModule12 from '../modules/aptitude/module12/formulas';
// Module 13 - Linear Equations Formulas
import formulasModule13 from '../modules/aptitude/module13/formulas';
// Module 14 - Quadratic Equations Formulas
import formulasModule14 from '../modules/aptitude/module14/formulas';
// Module 15 - Data Interpretation Formulas
import formulasModule15 from '../modules/aptitude/module15/formulas';

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
  {
    info: module4Info,
    topics: [topic_4_1, topic_4_2, topic_4_3, topic_4_4, topic_4_5, topic_4_6, topic_4_7, topic_4_8, topic_4_9, topic_4_10, topic_4_11, topic_4_12],
    exercises: [exercise_4_13],
    formulas: formulasModule4
  },
  {
    info: module5Info,
    topics: [topic_5_1, topic_5_2, topic_5_3, topic_5_4, topic_5_5, topic_5_6, topic_5_7, topic_5_8, topic_5_9, topic_5_10, topic_5_11, topic_5_12, topic_5_13],
    exercises: [exercise_5_14],
    formulas: formulasModule5
  },
  {
    info: module6Info,
    topics: [topic_6_1, topic_6_2, topic_6_3, topic_6_4, topic_6_5, topic_6_6, topic_6_7, topic_6_8, topic_6_9],
    exercises: [exercise_6_10],
    formulas: formulasModule6
  },
  {
    info: module7Info,
    topics: [topic_7_1, topic_7_2, topic_7_3, topic_7_4, topic_7_5, topic_7_6, topic_7_7, topic_7_8, topic_7_9, topic_7_10, topic_7_11, topic_7_12, topic_7_13],
    exercises: [exercise_7_14],
    formulas: formulasModule7
  },
  {
    info: module8Info,
    topics: [topic_8_1, topic_8_2, topic_8_3, topic_8_4, topic_8_5, topic_8_6, topic_8_7, topic_8_8, topic_8_9, topic_8_10],
    exercises: [exercise_8_11],
    formulas: formulasModule8
  },
  {
    info: module9Info,
    topics: [topic_9_1, topic_9_2, topic_9_3, topic_9_4, topic_9_5, topic_9_6, topic_9_7, topic_9_8, topic_9_9, topic_9_10, topic_9_11, topic_9_12, topic_9_13],
    exercises: [exercise_9_15],
    formulas: formulasModule9
  },
  {
    info: module10Info,
    topics: [topic_10_1, topic_10_2, topic_10_3, topic_10_4, topic_10_5, topic_10_6, topic_10_7, topic_10_8, topic_10_9, topic_10_10, topic_10_11],
    exercises: [exercise_10_14],
    formulas: formulasModule10
  },
  {
    info: module11Info,
    topics: [topic_11_1, topic_11_2, topic_11_3, topic_11_4, topic_11_5, topic_11_6, topic_11_7, topic_11_8, topic_11_9, topic_11_10, topic_11_11],
    exercises: [exercise_11_14],
    formulas: formulasModule11
  },
  {
    info: module12Info,
    topics: [topic_12_1, topic_12_2, topic_12_3, topic_12_4, topic_12_5, topic_12_6, topic_12_7, topic_12_8, topic_12_9, topic_12_10],
    exercises: [exercise_12_14],
    formulas: formulasModule12
  },
  {
    info: module13Info,
    topics: [topic_13_1, topic_13_2, topic_13_3, topic_13_4, topic_13_5, topic_13_6, topic_13_7, topic_13_8, topic_13_9, topic_13_10],
    exercises: [exercise_13_14],
    formulas: formulasModule13
  },
  {
    info: module14Info,
    topics: [topic_14_1, topic_14_2, topic_14_3, topic_14_4, topic_14_5, topic_14_6, topic_14_7, topic_14_8, topic_14_9],
    exercises: [exercise_14_15],
    formulas: formulasModule14
  },
  {
    info: module15Info,
    topics: [topic_15_1, topic_15_2, topic_15_3, topic_15_4, topic_15_5, topic_15_6, topic_15_7, topic_15_8, topic_15_9, topic_15_10, topic_15_11, topic_15_12, topic_15_13],
    exercises: [exercise_15_16],
    formulas: formulasModule15
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