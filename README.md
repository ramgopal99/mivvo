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
NEXTAUTH_URL="http://localhost:3001"
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
   - `http://localhost:3001/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
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

Open [http://localhost:3001](http://localhost:3001) in your browser.

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