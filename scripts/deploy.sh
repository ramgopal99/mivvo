#!/bin/bash

# Mivvo Deployment Script
# This script updates, rebuilds, and redeploys the application with ngrok tunnel

set -e  # Exit on any error

echo "🚀 Starting Mivvo deployment..."

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Stop any existing processes
print_status "Stopping existing processes..."

# Kill processes more aggressively
print_status "Killing any processes on port 4500..."
fuser -k 4500/tcp 2>/dev/null || true
pkill -9 -f "next start" 2>/dev/null || true

# Wait for processes to die
print_status "Waiting for processes to terminate..."
sleep 3

# Double-check and force kill if still running
if lsof -Pi :4500 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 4500 still in use, force killing..."
    lsof -ti:4500 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Final check
if lsof -Pi :4500 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_error "Cannot free port 4500. Please manually kill the process."
    exit 1
fi

print_success "Port 4500 is now free"

# Pull latest changes if this is a git repository
# if [ -d ".git" ]; then
#     print_status "Pulling latest changes from git..."
#     git pull origin main || git pull origin master || print_warning "Could not pull from git. Continuing with current version..."
# else
#     print_warning "Not a git repository. Skipping git pull."
# fi

# Install/update dependencies
print_status "Installing/updating dependencies..."
npm install

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate

# Build the application
print_status "Building the application..."
npm run build

# Start the application in background
print_status "Starting the application..."
npm run start &
APP_PID=$!

# Wait a moment for the app to start
sleep 5

# Check if app is running
if ! kill -0 $APP_PID 2>/dev/null; then
    print_error "Failed to start the application"
    exit 1
fi

print_success "Application started successfully (PID: $APP_PID)"

# Configure Nginx
print_status "Configuring Nginx..."

# Test nginx configuration
if nginx -t; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration has errors. Please check /etc/nginx/sites-available/mivvo.life"
    exit 1
fi

# Reload nginx configuration
print_status "Reloading Nginx configuration..."
systemctl reload nginx || systemctl restart nginx

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    print_success "Nginx is running and configured"
else
    print_error "Failed to start Nginx"
    exit 1
fi

print_success "Deployment completed!"
print_success "Application is running on http://localhost:4500"
print_success "Website is accessible at https://mivvo.life"

# Save PID for cleanup
echo $APP_PID > .app_pid

print_status "PID saved to .app_pid for cleanup"

# Show status
print_status "Checking website status..."
curl -s -k https://mivvo.life/health 2>/dev/null && print_success "Website is responding" || print_warning "Website may not be accessible yet. Check DNS and SSL setup."

echo ""
print_success "🎉 Deployment completed successfully!"
print_status "To stop the application, run: ./scripts/stop.sh"
