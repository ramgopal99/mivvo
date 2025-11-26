# Scripts Directory

This directory contains various utility scripts for managing the Mivvo application.

## Credit Management

### `update-user-credits.mjs`
**Purpose**: Reset/update credits for all users in the system

**Usage**:
```bash
node scripts/update-user-credits.mjs
```

**What it does**:
- Updates all users to have the default FREE tier credits (15 minutes = 180 credits)
- Resets used credits to 0
- Updates the credit allocation timestamp to current time
- Provides detailed console output of the update process

**Example Output**:
```
🔄 Starting credit update for all users...
📊 Found 5 users
✅ Updated credits for user@example.com: 15 minutes
✅ Updated credits for another@example.com: 15 minutes

🎉 Credit update completed!
📈 Updated: 5 users
💰 Each user now has: 15 minutes (180 credits)
```

**Use Cases**:
- Reset credits after changing credit policies
- Give all users a fresh start with credits
- Bulk credit allocation for promotional events

## Other Scripts

For information about other scripts, see their individual README files:
- [Course Data Cleanup](README-clean-course-data.md)
- [Module Migration](README-migrate-modules.md)
