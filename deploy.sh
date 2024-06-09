#!/bin/bash

# Ensure script is executed from the root directory of the project
cd "$(dirname "$0")"

# Build the React project
echo "Building the React project..."
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting."
  exit 1
fi

# Add all changes to git
echo "Adding changes to git..."
git add .

# Commit the changes
commit_message="$1"
if [ -z "$commit_message" ]; then
  echo "No commit message provided. Using default message."
  commit_message="Update build"
fi
echo "Committing changes with message: '$commit_message'"
git commit -m "$commit_message"

# Push the changes to the repository
echo "Pushing changes to the repository..."
git push

echo "Deployment complete!"

