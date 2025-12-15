# Database Cleanup Scripts

This directory contains utility scripts for cleaning up database data during development and testing.

## clear-reading-data.js

**Purpose:** Removes all reading-related data from the database.

**What it deletes:**
- ReadingComprehensionResult (individual question results)
- ReadingRearrangeResult (individual task results)
- ReadingOverallResult (session overall results)
- ReadingAttempt (user attempts)
- ReadingComprehension (comprehension questions)
- ReadingRearrange (rearranging tasks)
- ReadingSession (reading practice sessions)
- UserLevelProgress entries for READING skill type

**Usage:**
```bash
# Using npm script (recommended)
npm run clear-reading-data

# Or directly with node
node scripts/clear-reading-data.js
```

**Safety Notes:**
- ⚠️ This script permanently deletes data - use with caution!
- Only affects reading-related tables, other data remains intact
- Useful for development/testing when you want a clean slate for reading features

**Order of Deletion:**
The script deletes data in reverse dependency order to avoid foreign key constraint errors:
1. Results → 2. Attempts → 3. Questions/Tasks → 4. Sessions → 5. Progress

## clear-mcq-data.js

**Purpose:** Removes all MCQ-related data from the database.

**What it deletes:**
- McqOverallResult (session overall results)
- McqResult (individual question results)
- McqAttempt (user attempts)
- McqQuestion (MCQ questions)
- McqSession (MCQ practice sessions)
- UserLevelProgress entries for MCQ skill type

**Usage:**
```bash
# Using npm script (recommended)
npm run clear-mcq-data

# Or directly with node
node scripts/clear-mcq-data.js
```

**Safety Notes:**
- ⚠️ This script permanently deletes data - use with caution!
- Only affects MCQ-related tables, other data remains intact
- Useful for development/testing when you want a clean slate for MCQ features

**Order of Deletion:**
The script deletes data in reverse dependency order to avoid foreign key constraint errors:
1. Overall Results → 2. Individual Results → 3. Attempts → 4. Questions → 5. Sessions → 6. Progress

## clear-writing-data.js

**Purpose:** Removes all writing-related data from the database.

**What it deletes:**
- WritingTopicResult (individual topic results)
- WritingChatResult (individual chat conversation results)
- WritingOverallResult (session overall results)
- WritingAttempt (user attempts)
- WritingTopic (writing practice topics)
- WritingChatScenario (AI chat scenarios)
- WritingSession (writing practice sessions)
- UserLevelProgress entries for WRITING skill type

**Usage:**
```bash
# Using npm script (recommended)
npm run clear-writing-data

# Or directly with node
node scripts/clear-writing-data.js
```

**Safety Notes:**
- ⚠️ This script permanently deletes data - use with caution!
- Only affects writing-related tables, other data remains intact
- Useful for development/testing when you want a clean slate for writing features

**Order of Deletion:**
The script deletes data in reverse dependency order to avoid foreign key constraint errors:
1. Topic Results → 2. Chat Results → 3. Overall Results → 4. Attempts → 5. Topics → 6. Chat Scenarios → 7. Sessions → 8. Progress