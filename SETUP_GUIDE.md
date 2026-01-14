# HealthScript-Pro Setup & Deployment Guide

## 📋 Table of Contents

1. [Development Setup](#development-setup)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Development Setup

### System Requirements

**Minimum Requirements:**
- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x or pnpm 8.x
- PostgreSQL 14+ or MongoDB 6+
- Git
- 4GB RAM
- 10GB free disk space

**Recommended:**
- Node.js 20.x (LTS)
- PostgreSQL 15+
- 8GB RAM
- SSD storage

### Initial Setup

#### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/akhilthirunalveli/HealthScript-Pro.git

# Using SSH
git clone git@github.com:akhilthirunalveli/HealthScript-Pro.git

# Navigate to project directory
cd HealthScript-Pro
```

#### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

This will install:
- Next.js and React
- TypeScript and type definitions
- Prisma ORM
- NextAuth.js
- UI components (shadcn/ui)
- All other dependencies

#### 3. Install Development Tools (Optional)

```bash
# Install globally for better DX
npm install -g typescript
npm install -g prisma
npm install -g eslint
```

---

## 🔐 Environment Configuration

### Environment Files

Create the following environment files:

#### `.env.local` (Development)

```env
# ===================================
# APPLICATION
# ===================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===================================
# DATABASE
# ===================================
# PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/healthscript_dev?schema=public"

# MongoDB (Alternative)
# DATABASE_URL="mongodb://localhost:27017/healthscript_dev"

# ===================================
# AUTHENTICATION (NextAuth.js)
# ===================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Generate a secret key:
# openssl rand -base64 32

# ===================================
# OAUTH PROVIDERS (Optional)
# ===================================
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ===================================
# EMAIL SERVICE (Optional)
# ===================================
# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@healthscript-pro.com

# Resend (Alternative)
RESEND_API_KEY=your-resend-api-key

# SMTP (Alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM=noreply@healthscript-pro.com

# ===================================
# FILE STORAGE
# ===================================
# AWS S3
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=healthscript-documents

# CloudFlare R2 (Alternative)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_BUCKET_NAME=healthscript-documents

# ===================================
# PAYMENT PROCESSING (Optional)
# ===================================
STRIPE_PUBLIC_KEY=pk_test_your-public-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# ===================================
# ANALYTICS (Optional)
# ===================================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key

# ===================================
# FEATURE FLAGS
# ===================================
NEXT_PUBLIC_ENABLE_TEMPLATES=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_E_PRESCRIPTION=false
```

#### `.env.production` (Production)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://healthscript-pro.com
DATABASE_URL="postgresql://user:pass@production-host:5432/healthscript_prod"
NEXTAUTH_URL=https://healthscript-pro.com
NEXTAUTH_SECRET=very-strong-production-secret

# Add all other production values
```

### Environment Variables Guide

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Database connection string |
| `NEXTAUTH_URL` | Yes | Full URL of your app |
| `NEXTAUTH_SECRET` | Yes | Secret for session encryption |
| `SENDGRID_API_KEY` | No | For email notifications |
| `AWS_*` | No | For file storage |
| `STRIPE_*` | No | For payment processing |

---

## 💾 Database Setup

### Option 1: PostgreSQL

#### Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [PostgreSQL.org](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE healthscript_dev;

# Create user (optional)
CREATE USER healthscript WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE healthscript_dev TO healthscript;

# Exit
\q
```

#### Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

### Option 2: MongoDB

#### Install MongoDB

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```

**Windows:**
Download from [MongoDB.com](https://www.mongodb.com/try/download/community)

#### Setup Database

```bash
# Connect to MongoDB
mongosh

# Create database
use healthscript_dev

# MongoDB creates database automatically on first write
```

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name add_user_field

# Apply migrations
npx prisma migrate deploy

# Reset database (development only!)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### Database Seeding

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create sample medications
  await prisma.medication.createMany({
    data: [
      {
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        category: 'Antibiotic',
        defaultDosage: '500mg',
        unit: 'mg'
      },
      {
        name: 'Metformin',
        genericName: 'Metformin',
        category: 'Antidiabetic',
        defaultDosage: '500mg',
        unit: 'mg'
      }
    ]
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run seed:
```bash
npx prisma db seed
```

---

## 🚀 Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# With turbopack (faster)
npm run dev:turbo

# Open browser
# http://localhost:3000
```

The application will auto-reload when you make changes.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Available Scripts

```json
{
  "dev": "next dev",
  "dev:turbo": "next dev --turbo",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit",
  "format": "prettier --write .",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:e2e": "playwright test"
}
```

### Prisma Studio (Database GUI)

```bash
# Open Prisma Studio
npx prisma studio

# Opens at http://localhost:5555
```

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Install Playwright
npx playwright install

# Run E2E tests
npm run test:e2e

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test auth.spec.ts
```

### Type Checking

```bash
# Run TypeScript type checker
npm run type-check
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

---

## 🌐 Deployment

### Deployment Platforms

#### Option 1: Vercel (Recommended)

**Via CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Via GitHub:**
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on push

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.production`
- Deploy again to apply changes

#### Option 2: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to project
railway link

# Deploy
railway up

# Add environment variables
railway variables set DATABASE_URL="postgresql://..."
```

#### Option 3: AWS (EC2 + RDS)

**Setup EC2 Instance:**
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/akhilthirunalveli/HealthScript-Pro.git
cd HealthScript-Pro

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "healthscript" -- start
pm2 save
pm2 startup
```

**Setup RDS (PostgreSQL):**
1. Create RDS instance in AWS Console
2. Configure security groups
3. Update `DATABASE_URL` in environment variables

**Setup Nginx:**
```nginx
server {
    listen 80;
    server_name healthscript-pro.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Option 4: Docker

**Dockerfile:**
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/healthscript
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=healthscript
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Build and run:**
```bash
# Build
docker-compose build

# Run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate installed (HTTPS)
- [ ] Domain DNS configured
- [ ] Health check endpoint working
- [ ] Error monitoring configured (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Backup strategy implemented
- [ ] CDN configured (Cloudflare)
- [ ] Email service configured and tested

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Problem:** `PrismaClientInitializationError: Can't reach database server`

**Solution:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Verify DATABASE_URL in .env.local
# Make sure host, port, username, and password are correct

# Test connection
psql -h localhost -U postgres -d healthscript_dev
```

#### 2. Module Not Found

**Problem:** `Module not found: Can't resolve 'xyz'`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 3. Prisma Client Not Generated

**Problem:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
# Generate Prisma client
npx prisma generate

# Restart dev server
npm run dev
```

#### 4. Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

#### 5. Build Fails in Production

**Problem:** Build errors in production but works locally

**Solution:**
```bash
# Check TypeScript errors
npm run type-check

# Check ESLint errors
npm run lint

# Try production build locally
npm run build
```

### Debug Mode

Enable debug logging:

```env
# .env.local
DEBUG=*
NEXT_PUBLIC_DEBUG=true
```

---

## 📞 Support

If you encounter issues:

1. Check the [Documentation](DOCUMENTATION.md)
2. Search [GitHub Issues](https://github.com/akhilthirunalveli/HealthScript-Pro/issues)
3. Join our [Discord Community](#)
4. Email: support@healthscript-pro.com

---

## 🎉 Success!

Your HealthScript-Pro instance should now be running!

**Next Steps:**
1. Create your admin account
2. Configure system settings
3. Add medication database
4. Create your first prescription template
5. Invite team members

---

*Last updated: January 2026*
