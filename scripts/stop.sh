#!/bin/bash

# Mivvo Stop Script
# This script stops the running application and ngrok tunnel

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

print_status "Stopping Mivvo application..."

# Read PID from file if it exists
if [ -f ".app_pid" ]; then
    APP_PID=$(cat .app_pid)
    if kill -0 $APP_PID 2>/dev/null; then
        print_status "Stopping application (PID: $APP_PID)..."
        kill $APP_PID
        sleep 2
        if kill -0 $APP_PID 2>/dev/null; then
            print_warning "Force killing application..."
            kill -9 $APP_PID
            sleep 1
        fi
        print_success "Application stopped"
    else
        print_warning "Application PID $APP_PID not found or already stopped"
    fi
    rm -f .app_pid
fi

# Also kill any remaining processes on port 4500
print_status "Cleaning up any remaining processes on port 4500..."
fuser -k 4500/tcp 2>/dev/null || true
pkill -9 -f "next start" 2>/dev/null || true

# Final verification
if lsof -Pi :4500 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Some processes may still be running on port 4500"
else
    print_success "Port 4500 is clean"
fi

print_success "Application stopped successfully"
print_status "Note: Nginx web server remains running to serve your domain"
