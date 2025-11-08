# Migrate Test Modules to Database

This script migrates all the static module data from `/app/test/modules` to the MongoDB database using Prisma.

## What it does

1. **Loads modules**: Uses the existing `moduleLoader.ts` utility to load all module data from static TypeScript files
2. **Creates database structure**: Creates/updates the course, modules, lessons, and exercises in the database
3. **Transforms data**: Converts static data formats to database schema formats
4. **Handles relationships**: Properly creates relationships between courses, modules, lessons, and exercises

## Database Models Created

- **Course**: Main container with title and description
- **Module**: Contains sub-lessons and exercises
- **SubLesson**: Individual lessons with content
- **Exercise**: Practice exercises (MCQ or Code)
- **MCQQuestion**: Multiple choice questions
- **CodeQuestion**: Coding questions (if any exist)

## Usage

### Prerequisites

1. **Database connection**: Ensure your `.env` file has the correct `DATABASE_URL`
2. **Prisma client**: Make sure Prisma is set up and the client is generated

```bash
npm run postinstall  # or npx prisma generate
```

### Run the migration

```bash
npm run migrate-modules
```

### Alternative direct execution

```bash
npx tsx scripts/migrate-test-modules-to-db.ts
```

## What gets migrated

### From each module folder:
- `module-info.ts`: Basic module information (title, demo status, etc.)
- `topics/*.ts`: All sub-lessons with their content
- `mcq/*.ts`: All MCQ exercises with questions and answers

### Data transformations:
- Status: `'demo'|'locked'|'completed'` → `'DEMO'|'LOCKED'|'COMPLETED'`
- Exercise type: `'mcq'|'code'` → `'MCQ'|'CODE'`
- IDs: Numeric IDs → String UUIDs for database compatibility

## Output

The script will show:
- ✅ Which modules are being processed
- 📊 Summary of lessons and exercises migrated
- 🎉 Final completion status

## Safety features

- **Upsert operations**: Uses `upsert` to create or update existing records
- **Data clearing**: Deletes old related records before creating new ones
- **Error handling**: Comprehensive error handling with rollback on failure
- **Idempotent**: Can be run multiple times safely

## After migration

Once migrated, you can:

1. **View in test4**: Navigate to `/test4` to see the database-driven course viewer
2. **API access**: Use `/api/courses` to fetch course data
3. **Database queries**: Directly query the database using Prisma

## Troubleshooting

### Common issues:

1. **Prisma client not generated**: Run `npx prisma generate`
2. **Database connection failed**: Check your `DATABASE_URL` in `.env`
3. **Module loading failed**: Ensure all module files are properly formatted

### Re-running migration:

The migration is designed to be idempotent, so you can run it multiple times. It will update existing records rather than create duplicates.
