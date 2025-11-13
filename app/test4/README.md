# Test4 - Database-Driven Course Viewer

## Overview

Test4 is a database-driven version of the test application. While `test` is designed for creating and editing courses visually, `test4` displays courses that have been saved to the database.

## Key Differences from Test

### Data Source
- **Test**: Uses static data files (`modules/` directory and `lessonsData.ts`)
- **Test4**: Fetches data from MongoDB database via API endpoints

### IDs
- **Test**: Uses numeric IDs for modules, lessons, and exercises
- **Test4**: Uses string UUIDs for database compatibility

### Data Loading
- **Test**: Loads data synchronously from static files
- **Test4**: Loads data asynchronously from `/api/courses` endpoint

## Database Models

Test4 uses the following database models (defined in Prisma schema):

- `Course`: Main container for learning content
- `Module`: Sections within a course
- `SubLesson`: Individual lessons within modules
- `Exercise`: Practice exercises within modules
- `MCQQuestion`: Multiple choice questions within exercises
- `CodeQuestion`: Coding questions within exercises

## API Endpoints

- `GET /api/courses`: Fetch all courses with full module/lesson structure
- `POST /api/courses`: Create sample course data (for testing)

## Usage

1. **Seed Database**: Run the seeding script to populate test data:
   ```bash
   npx tsx scripts/seed-test4-data.ts
   ```

2. **View Courses**: Navigate to `/test4` to see the database-driven course viewer

3. **Database Integration**: Courses created in `test` can be saved to the database and viewed in `test4`

## Development Notes

- All components are identical to `test` but adapted for string IDs and async data loading
- Error handling includes fallbacks for missing data
- Loading states are implemented for better UX during data fetching
- The piston API integration remains the same for code execution functionality
