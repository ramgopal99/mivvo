# Course Data Migration Script

This script migrates all course-related data from one MongoDB database to another. It handles the complete course structure including modules, sub-lessons, exercises, questions, and code templates. **User progress data is excluded** to avoid transferring development/testing data to production.

## Features

- **Selective Data Migration**: Migrates course structure data only (excludes user progress)
- **Create-Only Strategy**: Only creates new records, skips existing data to avoid conflicts
- **Production-Safe**: Designed for dev-to-production migrations without overwriting existing data
- **Preserves Relationships**: Maintains all foreign key relationships
- **Progress Tracking**: Provides detailed logging of migration progress
- **Error Handling**: Comprehensive error handling with graceful skipping of duplicates

## What Gets Migrated

The script migrates the following entities in the correct dependency order:

1. **Courses** - Main course records
2. **Modules** - Course modules/sections
3. **SubLessons** - Individual lessons within modules
4. **Exercises** - Practice exercises (MCQ and Code)
5. **MCQ Questions** - Multiple choice questions
6. **Code Questions** - Coding exercise questions
7. **Code Templates** - Code snippets/templates for courses

**Note**: User progress data is intentionally excluded to prevent transferring development/testing progress data to production environments.

## Usage

### Prerequisites

- Node.js installed
- TypeScript installed (`npm install -g typescript`)
- Access to both source and target MongoDB databases
- Database URLs for both databases

### Command Syntax

```bash
ts-node migrate-courses.ts <source-database-url> <target-database-url>
```

### Examples

#### Local Development Migration
```bash
ts-node migrate-courses.ts "mongodb://localhost:27017/dev-db" "mongodb://localhost:27017/prod-db"
```

#### MongoDB Atlas Migration
```bash
ts-node migrate-courses.ts "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dev-db" "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/prod-db"
```

#### With Authentication
```bash
ts-node migrate-courses.ts "mongodb://username:password@localhost:27017/source-db" "mongodb://username:password@localhost:27017/target-db"
```

## Migration Process

1. **Connects** to both source and target databases
2. **Exports** all course data from source database with full relationships
3. **Imports** data to target database using upsert operations
4. **Validates** that all data was migrated successfully
5. **Disconnects** from both databases

## Important Notes

### Data Integrity
- The script uses **create operations** with error handling, which means:
  - If a record doesn't exist in the target database, it will be created
  - If a record already exists, it will be skipped (no updates)
- This ensures the migration is safe for production environments and can be run multiple times without overwriting existing data

### Performance Considerations
- For large datasets, the migration might take some time
- The script processes data sequentially to maintain data integrity
- Consider running the migration during low-traffic periods

### Database Permissions
- Ensure the database user has read access to the source database
- Ensure the database user has write access to the target database
- The script requires permissions for all course-related collections

### Environment Variables
If your application uses environment variables for database connections, you can use them:

```bash
ts-node migrate-courses.ts "$SOURCE_DATABASE_URL" "$TARGET_DATABASE_URL"
```

## Troubleshooting

### Connection Issues
- Verify database URLs are correct
- Check network connectivity to MongoDB instances
- Ensure authentication credentials are valid
- Confirm databases exist and are accessible

### Memory Issues
For very large datasets, you might need to increase Node.js memory:

```bash
NODE_OPTIONS="--max-old-space-size=4096" ts-node migrate-courses.ts <source-url> <target-url>
```

### Timeout Issues
If the migration times out, you can increase the timeout:

```bash
ts-node --compiler-options '{"timeout": 300000}' migrate-courses.ts <source-url> <target-url>
```

## Output Example

```
🚀 Starting course data migration...
📤 Source Database: mongodb://localhost:27017/dev-db
📥 Target Database: mongodb://localhost:27017/prod-db

📤 Exporting data from source database...
📊 Found 3 courses to migrate

📥 Importing data to target database...

📚 Migrating course: Complete Python Programming Course
  📖 Migrating module: Introduction to Python
  📖 Migrating module: Data Types and Variables

📚 Migrating course: Advanced JavaScript Concepts
  📖 Migrating module: Closures and Scope

🎉 Migration completed successfully!
📊 Migration Summary:
   - Courses migrated: 3
   - Modules migrated: 8
   - Sub-lessons migrated: 24
   - Exercises migrated: 16
   - MCQ questions migrated: 48
   - Code questions migrated: 12
   - Code templates migrated: 6
   - User progress records migrated: 156
   - Total records migrated: 273
✅ Migration script completed successfully
```

## Use Cases

### Development to Production Migration
This script is specifically designed for migrating course content from development/staging environments to production:

- ✅ **Course Structure Only**: Migrates course content without user progress data
- ✅ **Safe for Production**: Only creates new records, never updates existing ones
- ✅ **Idempotent**: Can be run multiple times safely
- ✅ **No Data Loss**: Won't overwrite existing production data

### When to Use This Script
- Moving course content from dev to production
- Adding new courses to an existing production database
- Syncing course structures between environments
- One-way data migration (dev → prod, not prod → dev)

## Safety Precautions

- **Backup First**: Always backup your target database before running the migration
- **Test Environment**: Test the migration in a development environment first
- **Verify Data**: After migration, verify that data was migrated correctly
- **Rollback Plan**: Have a plan to restore from backup if needed
- **Production-Ready**: This script is designed to be safe for production use

## Related Scripts

- `clean-course-data.ts` - Removes all course data from a database
- `migrate-test-modules-to-db.ts` - Migrates static module data to database
- `seed-code-templates.ts` - Seeds code templates for courses
