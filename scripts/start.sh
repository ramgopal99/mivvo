#!/bin/bash

# Mivvo Start Script
# This script starts the application and ngrok tunnel

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if nginx configuration exists
if [ ! -f "/etc/nginx/sites-available/mivvo.life" ]; then
    print_error "Nginx configuration not found. Please run the deploy script first."
    exit 1
fi

print_status "Starting Mivvo application..."

# Double-check port is free before starting
if lsof -Pi :4500 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_error "Port 4500 is still in use. Please run 'npm run stop-app' first."
    exit 1
fi

# Start the application
print_status "Starting application on port 4500..."
npm run start &
APP_PID=$!
echo $APP_PID > .app_pid

# Wait for app to start
print_status "Waiting for application to start..."
sleep 5

# Check if app is running
if ! kill -0 $APP_PID 2>/dev/null; then
    print_error "Failed to start the application"
    exit 1
fi

# Verify port is actually listening
if ! lsof -Pi :4500 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_error "Application started but port 4500 is not listening"
    kill -9 $APP_PID 2>/dev/null || true
    exit 1
fi

print_success "Application started successfully (PID: $APP_PID)"

# Reload nginx configuration
print_status "Reloading Nginx configuration..."
systemctl reload nginx || systemctl restart nginx

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    print_success "Nginx is running and configured"
else
    print_error "Failed to reload Nginx"
    exit 1
fi

print_success "Services started!"
print_success "Application: http://localhost:4500"
print_success "Public URL: https://mivvo.life"

# Show status
print_status "Website status:"
curl -s -k https://mivvo.life/health 2>/dev/null && print_success "Website is responding" || print_warning "Website may not be accessible yet. Check DNS and SSL setup."
