#!/bin/bash

# Mivvo Deployment Script using PM2
# This script performs a full deployment with rebuild and manages the app with PM2

set -e

echo "🚀 Starting Mivvo deployment with PM2..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Project directory
PROJECT_DIR="/root/mivvo"
cd "$PROJECT_DIR"

print_status "Stopping existing PM2 application..."
pm2 stop mivvo || pm2 delete mivvo || print_warning "No existing PM2 process found"

print_status "Pulling latest changes (if git repository)..."
if [ -d ".git" ]; then
    git pull origin main || print_warning "Git pull failed or not on main branch"
else
    print_warning "Not a git repository, skipping git pull"
fi

print_status "Installing/updating dependencies..."
npm install

print_status "Generating Prisma client..."
npx prisma generate

print_status "Building application..."
npm run build

print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production
pm2 save

print_success "Deployment completed successfully!"
print_status "PM2 Status:"
pm2 list

print_status ""
print_status "Your application should be available at:"
print_status "  - Local: http://localhost:3001"
print_status "  - Public: https://mivvo.life (after Nginx and SSL setup)"
print_status ""
print_status "Useful PM2 commands:"
print_status "  pm2 restart mivvo    - Restart the application"
print_status "  pm2 stop mivvo       - Stop the application"
print_status "  pm2 logs mivvo       - View application logs"
print_status "  pm2 monit            - Monitor all processes"
