# Mivvo - Next.js Authentication Demo

A modern Next.js application demonstrating authentication with NextAuth.js, Prisma ORM, MongoDB, and Google OAuth using Shadcn UI components and Server Actions.

## Features

- 🔐 **NextAuth.js Integration** - Complete authentication setup
- 🗄️ **Prisma ORM with MongoDB** - Database management and user storage
- 🔑 **Google OAuth** - Social authentication provider
- 🎨 **Shadcn UI** - Beautiful, accessible UI components
- ⚡ **Server Actions** - Modern Next.js server-side actions
- 🛡️ **Protected Routes** - Middleware-based route protection
- 👥 **Role-Based Access Control** - USER, COLLEGE_ADMIN, COLLEGE_STUDENT, and SUPERADMIN roles
- 🌙 **Dark/Light Theme** - System-aware theme switching
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB with Prisma ORM
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- Google OAuth credentials

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/mivvo"

# NextAuth
NEXTAUTH_URL="http://localhost:4500"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:4500/api/auth/callback/google` (development)
   - `https://mivvo.life/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your `.env` file

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:4500](http://localhost:4500) in your browser.

## Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth API routes
│   ├── dashboard/                 # Protected dashboard page
│   ├── lib/                       # Utility libraries
│   │   ├── auth.ts               # NextAuth configuration
│   │   └── prisma.ts             # Prisma client
│   ├── actions/                  # Server actions
│   └── layout.tsx                # Root layout with providers
├── components/
│   ├── auth/                     # Authentication components
│   ├── providers/                # Context providers
│   └── ui/                       # Shadcn UI components
├── prisma/
│   └── schema.prisma             # Database schema
└── middleware.ts                 # Route protection
```

## Usage

### Authentication Flow

1. **Sign In**: Click "Sign in with Google" on the homepage
2. **OAuth Flow**: Redirected to Google for authentication
3. **Callback**: Google redirects back with user data
4. **Database**: User information stored in MongoDB via Prisma
5. **Session**: JWT session created and managed by NextAuth

### Protected Routes

Routes under `/dashboard` require authentication. The middleware automatically redirects unauthenticated users to the homepage.

### Server Actions

Authentication actions are implemented as Server Actions for better performance and security:

- `signInWithGoogle()` - Initiates Google OAuth flow
- `signOutAction()` - Signs out the current user

## Database Schema

The application uses the following MongoDB collections:

- **users** - User account information
- **accounts** - OAuth provider accounts
- **sessions** - User sessions
- **verificationtokens** - Email verification tokens

## Deployment

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

```env
DATABASE_URL="mongodb://username:password@host:port/database"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-production-client-id"
GOOGLE_CLIENT_SECRET="your-production-client-secret"
```

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Nginx Deployment with Custom Domain

This project includes automated deployment scripts for easy updates using Nginx as a reverse proxy with SSL certificates.

### Prerequisites

1. **Domain**: `mivvo.life` configured in Hostinger
2. **Server**: Your server must be accessible from the internet
3. **DNS Configuration**: Point `mivvo.life` to your server's IP address

### Nginx Setup

Nginx is already installed and configured as a reverse proxy for your domain.

1. **Configuration**: `/etc/nginx/sites-available/mivvo.life`
   - Reverse proxy to `localhost:4500`
   - Automatic HTTP to HTTPS redirect
   - SSL termination with Let's Encrypt certificates
   - Gzip compression and security headers

2. **Domain Configuration in Hostinger**:
   - Create an A record pointing `mivvo.life` to your server's IP address
   - Optionally create a CNAME for `www.mivvo.life` pointing to `mivvo.life`

### Deployment Scripts

The project includes four convenient scripts:

#### Full Deployment (Updates & Rebuilds)
```bash
npm run deploy
# or
./scripts/deploy.sh
```
This script will:
- Pull latest changes (if git repo)
- Install/update dependencies
- Generate Prisma client
- Build the application
- Start the app on port 4500
- Reload Nginx configuration

#### Quick Start (No Rebuild)
```bash
npm run start-app
# or
./scripts/start.sh
```
Starts the application and reloads Nginx (assumes build already exists).

#### Stop Services
```bash
npm run stop-app
# or
./scripts/stop.sh
```
Stops the application (Nginx remains running).

#### SSL Certificate Setup
```bash
npm run setup-ssl
# or
sudo ./scripts/setup-ssl.sh
```
Sets up Let's Encrypt SSL certificates and configures automatic renewal.

### Production Environment Variables

For production deployment:

```env
DATABASE_URL="mongodb://username:password@host:port/database"
NEXTAUTH_URL="https://mivvo.life"
NEXTAUTH_SECRET="your-production-secret"
GOOGLE_CLIENT_ID="your-production-client-id"
GOOGLE_CLIENT_SECRET="your-production-client-secret"
```

### First Time Setup

1. **Configure DNS**:
   - In Hostinger, create an A record: `mivvo.life` → `YOUR_SERVER_IP`
   - Wait for DNS propagation (can take up to 24 hours)

2. **Deploy for the first time**:
   ```bash
   npm run deploy
   ```

3. **Set up SSL certificates** (after DNS is working):
   ```bash
   npm run setup-ssl
   ```

4. **Access your site**:
   - Local: http://localhost:4500
   - Public: https://mivvo.life

### SSL Certificate Management

- **Initial Setup**: Run `npm run setup-ssl` after DNS is configured
- **Automatic Renewal**: Certificates auto-renew before expiration
- **Manual Renewal**: `sudo certbot renew --nginx`

### Troubleshooting

- **Port already in use**: Run `npm run stop-app` first
- **502 Bad Gateway**: Check if app is running on port 4500
- **Domain not working**: Verify DNS settings point to your server IP
- **SSL issues**: Run `npm run setup-ssl` and check certificate status
- **Nginx errors**: Check `/var/log/nginx/error.log`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Next.js Documentation](https://nextjs.org/docs/)