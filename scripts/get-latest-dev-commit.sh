#!/bin/bash

# Script to get the latest commit from dev branch and cherry-pick it to master
# Usage: ./scripts/get-latest-dev-commit.sh

echo "📋 Switching to dev branch..."
git checkout dev

echo "🔍 Getting the latest commit hash from dev..."
LATEST_COMMIT=$(git log --oneline -1 | cut -d' ' -f1)

echo "📝 Latest commit on dev: $LATEST_COMMIT"
git log --oneline -1

echo "🔄 Switching back to master..."
git checkout master

echo "🍒 Cherry-picking the latest commit from dev..."
git cherry-pick $LATEST_COMMIT

if [ $? -eq 0 ]; then
    echo "✅ Successfully applied the latest commit to master!"
    echo "📋 Current master branch status:"
    git log --oneline -3
else
    echo "❌ Cherry-pick failed. You may need to resolve conflicts manually."
    echo "💡 Use 'git cherry-pick --abort' to cancel, or resolve conflicts and run 'git cherry-pick --continue'"
    exit 1
fi
