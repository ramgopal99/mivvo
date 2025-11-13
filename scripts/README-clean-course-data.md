# Clean Course Data Script

This script completely removes all course-related data from the MongoDB database.

## What it deletes

The script deletes records in the following order to avoid foreign key constraint issues:

1. **MCQ Questions** - All multiple choice questions
2. **Code Questions** - All coding questions
3. **Exercises** - All exercise records
4. **Sub-Lessons** - All lesson content
5. **Modules** - All module records
6. **Courses** - All course records

## Usage

### Run the cleanup script

```bash
npm run clean-courses
```

### Alternative direct execution

```bash
npx tsx scripts/clean-course-data.ts
```

## Prerequisites

- **Database connection**: Ensure your `.env` file has the correct `DATABASE_URL`
- **Prisma client**: Make sure Prisma is set up (`npx prisma generate`)

## Safety

⚠️ **This script permanently deletes all course data without confirmation!**

### What it preserves

- All user accounts and authentication data
- All interview and assessment data
- All admin and college-related data
- All other application data

### What it removes

- All courses created through the migration script
- All modules and their content
- All lessons, exercises, and questions
- All course-related relationships

## Use cases

- **Testing**: Clean up test data before running migrations again
- **Reset**: Start fresh with course data
- **Development**: Clear out old/incorrect data

## Recovery

After running this script, you can:

1. **Re-migrate data**: Run `npm run migrate-modules` to import data again
2. **Import fresh data**: Use other import scripts if available
3. **Manual recreation**: Recreate courses through the application

## Output

The script shows detailed progress:
```
🧹 Starting cleanup of all course-related data...
🗑️  Deleting MCQ questions...
✅ Deleted 150 MCQ questions
🗑️  Deleting code questions...
✅ Deleted 0 code questions
...
🎉 Database cleanup completed successfully!
📊 Summary:
   - Courses deleted: 1
   - Modules deleted: 20
   - Total records deleted: 387
```

## Caution

- **No undo**: This operation cannot be reversed
- **Production**: Never run this in production without backups
- **Dependencies**: Make sure no other data depends on the course records
