#!/bin/bash

# SSL Certificate Setup Script for mivvo.life
# This script sets up Let's Encrypt SSL certificates using certbot

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

DOMAIN="mivvo.life"
EMAIL="admin@mivvo.life"  # Change this to your actual email

print_status "Setting up SSL certificates for $DOMAIN..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script with sudo privileges"
    echo "Usage: sudo ./scripts/setup-ssl.sh"
    exit 1
fi

# Check if domain resolves to this server
print_status "Checking if $DOMAIN resolves to this server..."
DOMAIN_IP=$(dig +short $DOMAIN A | head -1)
SERVER_IP=$(curl -s -4 ifconfig.me)

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    print_warning "Domain $DOMAIN does not resolve to this server's IP ($SERVER_IP)"
    print_warning "Current DNS resolution: $DOMAIN_IP"
    print_warning "Make sure your DNS is properly configured in Hostinger before running this script"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "SSL setup cancelled. Please configure DNS first."
        exit 1
    fi
fi

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    print_error "Nginx is not running. Please start Nginx first."
    exit 1
fi

# Check if certificates already exist
if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    print_warning "SSL certificates for $DOMAIN already exist"
    echo ""
    read -p "Renew certificates instead? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Renewing SSL certificates..."
        certbot renew --nginx
        print_success "SSL certificates renewed!"
        systemctl reload nginx
        exit 0
    else
        print_status "SSL setup cancelled."
        exit 1
    fi
fi

# Obtain SSL certificates
print_status "Obtaining SSL certificates from Let's Encrypt..."
certbot --nginx \
    --non-interactive \
    --agree-tos \
    --email $EMAIL \
    --domain $DOMAIN \
    --domain www.$DOMAIN \
    --redirect

# Check if certificate was obtained successfully
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    print_success "SSL certificates obtained successfully!"

    # Reload nginx to apply SSL configuration
    print_status "Reloading Nginx configuration..."
    systemctl reload nginx

    if systemctl is-active --quiet nginx; then
        print_success "Nginx reloaded successfully with SSL"
    else
        print_error "Failed to reload Nginx"
        exit 1
    fi

    # Test SSL
    print_status "Testing SSL connection..."
    if curl -s -I https://$DOMAIN | grep -q "HTTP/2 200"; then
        print_success "SSL is working correctly!"
        print_success "Your website is now accessible at: https://$DOMAIN"
    else
        print_warning "SSL test failed. Please check the configuration."
    fi

    # Set up automatic renewal
    print_status "Setting up automatic certificate renewal..."
    (crontab -l ; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    print_success "Automatic renewal configured (runs daily at noon)"

else
    print_error "Failed to obtain SSL certificates"
    exit 1
fi

echo ""
print_success "🎉 SSL setup completed successfully!"
print_status "Your website is now secure with HTTPS"
print_status "Certificate will auto-renew before expiration"
