# CelpipReady — AI-Powered CELPIP Test Prep

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in all values:
```bash
cp .env.example .env.local
```

Generate your NEXTAUTH_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Set up the database
```bash
npm run db:push
npm run db:seed
```

### 4. Run locally
```bash
npm run dev
```
Open http://localhost:3000

---

## Services to sign up for (all free tiers)

| Service | URL | What it's for |
|---------|-----|---------------|
| Neon | neon.tech | PostgreSQL database |
| Google Cloud | console.cloud.google.com | Google OAuth login |
| Google AI Studio | aistudio.google.com | Gemini AI scoring |
| Cloudinary | cloudinary.com | Speaking audio storage |
| Resend | resend.com | Magic link emails |
| Stripe | stripe.com | Payments |

## Project Structure
```
src/
  app/                  # Next.js App Router pages
    api/                # API routes
    dashboard/          # Dashboard page
    login/              # Login page
    pricing/            # Pricing page
    tests/              # All test pages
    settings/           # Settings page
    blog/               # SEO blog
  components/
    shared/             # Navbar etc
    ui/                 # ScoreBar, FeedbackCard, TimerBar, UpgradeModal
    test/               # WritingEditor, AudioRecorder
  lib/                  # gemini, stripe, resend, cloudinary, auth, prisma
prisma/
  schema.prisma         # Database schema
  seed.ts               # Sample questions
```

## Deployment (Vercel)
1. Push to GitHub
2. Import in vercel.com
3. Add all env variables from .env.example
4. Set up Stripe webhook: https://yourapp.vercel.app/api/stripe/webhook
