# Wholesale Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a wholesale login system to the Jackson Pottery B2C site so verified trade accounts can authenticate and see discounted wholesale pricing across all product pages.

**Architecture:** NextAuth.js v4 CredentialsProvider validates individual wholesale accounts against a Prisma/SQLite database. A `PriceDisplay` client component reads the session and swaps retail prices for wholesale prices site-wide. The `WholesaleModal` component handles login UX via an animated overlay triggered from a new nav pill.

**Tech Stack:** next-auth@^4, prisma, @prisma/client, bcryptjs, @types/bcryptjs, tsx (dev)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `prisma/schema.prisma` | User model with isWholesale flag |
| Create | `prisma/seed.ts` | CLI to create wholesale accounts |
| Create | `.env.local` | DATABASE_URL + NEXTAUTH_SECRET |
| Create | `types/next-auth.d.ts` | Type augmentation for session.user.isWholesale |
| Create | `lib/auth.ts` | NextAuth config — CredentialsProvider + session callbacks |
| Create | `app/api/auth/[...nextauth]/route.ts` | NextAuth App Router handler |
| Create | `components/SessionProvider.tsx` | Client wrapper for NextAuth SessionProvider |
| Create | `components/WholesaleModal.tsx` | Login modal — Framer Motion, dark luxury styling |
| Create | `components/PriceDisplay.tsx` | Retail vs wholesale price switcher |
| Modify | `lib/data.ts` | Add `wholesalePrice?: number` to Product + all products |
| Modify | `app/layout.tsx` | Wrap children in SessionProvider |
| Modify | `components/Navigation.tsx` | Wholesale pill (desktop + mobile), modal trigger |
| Modify | `components/Footer.tsx` | Wholesale Login link in Support column |
| Modify | `app/shop/page.tsx` | Replace inline price with PriceDisplay |
| Modify | `app/products/[slug]/ProductPageClient.tsx` | Replace inline price with PriceDisplay |

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install next-auth prisma @prisma/client bcryptjs
```

Expected: packages added to `dependencies` in `package.json`.

- [ ] **Step 2: Install dev dependencies**

```bash
npm install --save-dev @types/bcryptjs tsx
```

Expected: `@types/bcryptjs` and `tsx` added to `devDependencies`.

- [ ] **Step 3: Verify installs**

```bash
npx next --version && npx prisma --version
```

Expected: Next.js version prints, Prisma version prints (5.x).

---

## Task 2: Environment variables

**Files:** `.env.local`

- [ ] **Step 1: Generate a NEXTAUTH_SECRET**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output — you'll use it in the next step.

- [ ] **Step 2: Create `.env.local`**

Create `.env.local` in the project root with this content (replace `<paste-secret-here>` with the value from Step 1):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=<paste-secret-here>
NEXTAUTH_URL=http://localhost:3000
```

- [ ] **Step 3: Add `.env.local` to `.gitignore`**

Open `.gitignore`. If `.env.local` is not already listed, add it:

```
.env.local
```

---

## Task 3: Prisma schema and database

**Files:** `prisma/schema.prisma`

- [ ] **Step 1: Create `prisma/schema.prisma`**

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id             String   @id @default(cuid())
  email          String   @unique
  hashedPassword String
  companyName    String
  isWholesale    Boolean  @default(true)
  createdAt      DateTime @default(now())
}
```

- [ ] **Step 2: Push schema to create the database**

```bash
npx prisma db push
```

Expected output includes:
```
✓ Generated Prisma Client
✓ Your database is now in sync with your schema.
```

A `dev.db` file appears in the `prisma/` directory.

- [ ] **Step 3: Add dev.db to .gitignore**

Open `.gitignore` and add:

```
prisma/dev.db
prisma/dev.db-journal
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma .gitignore
git commit -m "feat: add Prisma schema for wholesale user accounts"
```

---

## Task 4: NextAuth type augmentation

**Files:** `types/next-auth.d.ts`

- [ ] **Step 1: Create `types/next-auth.d.ts`**

```ts
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      isWholesale: boolean
      companyName: string
    }
  }

  interface User {
    isWholesale: boolean
    companyName: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isWholesale: boolean
    companyName: string
  }
}
```

- [ ] **Step 2: Verify TypeScript sees the augmentation**

```bash
npx tsc --noEmit
```

Expected: no errors. (There may be warnings about missing `lib/auth.ts` — those clear up in the next task.)

---

## Task 5: NextAuth auth config

**Files:** `lib/auth.ts`

- [ ] **Step 1: Create `lib/auth.ts`**

```ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Wholesale',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!user || !user.isWholesale) return null

        const valid = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          isWholesale: user.isWholesale,
          companyName: user.companyName,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.isWholesale = user.isWholesale
        token.companyName = user.companyName
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.isWholesale = token.isWholesale
        session.user.companyName = token.companyName
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors related to `lib/auth.ts`.

---

## Task 6: NextAuth route handler

**Files:** `app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Create the directory and route file**

Create `app/api/auth/[...nextauth]/route.ts`:

```ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- [ ] **Step 2: Verify the dev server starts without errors**

```bash
npm run dev
```

Open `http://localhost:3000/api/auth/providers` in a browser.
Expected: JSON response listing the `credentials` provider.

Stop the dev server (`Ctrl+C`).

- [ ] **Step 3: Commit**

```bash
git add lib/auth.ts app/api/auth types/next-auth.d.ts
git commit -m "feat: add NextAuth credentials provider for wholesale login"
```

---

## Task 7: SessionProvider wrapper

**Files:** `components/SessionProvider.tsx`, `app/layout.tsx`

- [ ] **Step 1: Create `components/SessionProvider.tsx`**

```tsx
'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
```

- [ ] **Step 2: Wrap layout in SessionProvider**

Open `app/layout.tsx`. Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jackson Pottery — Designer Planters for Exceptional Spaces',
  description:
    'Premium handcrafted planters and outdoor décor designed to define space. Shop landscape planters, garden vessels, fountains, and accessories.',
  keywords:
    'designer planters, landscape planters, garden planters, premium outdoor decor, terracotta planters, cast stone urns',
  openGraph: {
    title: 'Jackson Pottery — Designed to Define Space',
    description: 'Premium designer planters that elevate every space they inhabit.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-[#FDFAF5] text-ink font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Type-check and verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/SessionProvider.tsx app/layout.tsx
git commit -m "feat: wrap app in NextAuth SessionProvider"
```

---

## Task 8: Seed script — create wholesale accounts

**Files:** `prisma/seed.ts`, `package.json`

- [ ] **Step 1: Create `prisma/seed.ts`**

```ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

async function ask(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('\n── Jackson Pottery · Wholesale Account Manager ──\n')

  const email = await ask('Email address: ')
  const companyName = await ask('Company name: ')
  const password = await ask('Password: ')

  if (!email || !companyName || !password) {
    console.error('All fields are required.')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { hashedPassword, companyName },
    create: {
      email: email.toLowerCase(),
      hashedPassword,
      companyName,
      isWholesale: true,
    },
  })

  console.log(`\n✓ Wholesale account ready: ${user.email} (${user.companyName})\n`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
```

- [ ] **Step 2: Add seed command to `package.json`**

In `package.json`, add a `"prisma"` key alongside `"scripts"`:

```json
{
  "name": "jackson-pottery",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

- [ ] **Step 3: Create a test wholesale account**

```bash
npx tsx prisma/seed.ts
```

At the prompts enter:
- Email: `test@wholesale.com`
- Company: `Test Company`
- Password: `wholesale123`

Expected:
```
✓ Wholesale account ready: test@wholesale.com (Test Company)
```

- [ ] **Step 4: Commit**

```bash
git add prisma/seed.ts package.json
git commit -m "feat: add wholesale account seed script"
```

---

## Task 9: Add wholesalePrice to product data

**Files:** `lib/data.ts`

- [ ] **Step 1: Add `wholesalePrice` to the Product interface and all products**

Open `lib/data.ts`. Replace the `Product` interface and the entire `products` array with:

```ts
export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  wholesalePrice: number
  originalPrice?: number
  category: string
  tags: string[]
  image: string
  hoverImage: string
  description: string
  dimensions: string
  material: string
  finish: string
  drainage: string
  usage: string
  weight: string
  isNew: boolean
  isBestseller: boolean
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 'montserrat-terracotta-vessel',
    name: 'Montserrat Vessel',
    subtitle: 'Artisan Terracotta Series',
    price: 485,
    wholesalePrice: 291,
    category: 'Terracotta',
    tags: ['terracotta', 'handcrafted', 'outdoor', 'indoor'],
    image: '/products/montserrat-featured.png',
    hoverImage: '/products/living-room-terracotta.png',
    description:
      'A sculptural statement piece hand-thrown from premium red clay. Each vessel carries the fingerprints of its maker — subtle variations in glaze and form that make it entirely your own.',
    dimensions: '16″H × 14″Ø',
    material: 'Premium fired terracotta clay',
    finish: 'Natural matte earth',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '14 lbs',
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'arcadia-glazed-planter',
    name: 'Arcadia Planter',
    subtitle: 'Glazed Ceramic Collection',
    price: 620,
    wholesalePrice: 372,
    originalPrice: 780,
    category: 'Glazed',
    tags: ['glazed', 'ceramic', 'modern', 'indoor'],
    image: '/products/arcadia-featured.png',
    hoverImage: '/design-consultation.png',
    description:
      'Rich drip-glaze over high-fire stoneware — each piece unique where the glaze breaks and pools. The Arcadia embodies restrained elegance, equally at home in a modern interior or a sun-drenched garden.',
    dimensions: '14″H × 12″Ø',
    material: 'High-fire stoneware',
    finish: 'Reactive drip glaze',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '11 lbs',
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: 'villa-cast-stone-urn',
    name: 'Villa Urn',
    subtitle: 'Cast Stone Heritage Series',
    price: 1240,
    wholesalePrice: 744,
    category: 'Cast Stone',
    tags: ['cast stone', 'classical', 'outdoor', 'large'],
    image: '/products/villa-urn-featured.png',
    hoverImage: '/products/outdoor-planter-patio.png',
    description:
      'A grand classical urn cast in weather-resistant composite stone. Its timeless profile suits estate gardens, grand entrances, and any space demanding a true architectural statement.',
    dimensions: '28″H × 22″Ø',
    material: 'Composite cast stone',
    finish: 'Aged limestone patina',
    drainage: 'Integrated drainage system',
    usage: 'Outdoor only',
    weight: '68 lbs',
    isNew: false,
    isBestseller: true,
    inStock: true,
  },
  {
    id: 'canyon-lightweight-planter',
    name: 'Canyon Planter',
    subtitle: 'Lightweight Architectural Series',
    price: 365,
    wholesalePrice: 219,
    category: 'Lightweight',
    tags: ['lightweight', 'modern', 'balcony', 'rooftop'],
    image: '/products/canyon-featured.png',
    hoverImage: '/products/balcony-planter.png',
    description:
      'Engineered fiberglass with a hand-applied concrete finish. The Canyon brings sculptural warmth to balconies and rooftops where weight constraints demand a smarter solution.',
    dimensions: '18″H × 16″Ø',
    material: 'Fiberglass / concrete composite',
    finish: 'Raw concrete texture',
    drainage: 'Pre-drilled drainage hole',
    usage: 'Indoor / Outdoor',
    weight: '6 lbs',
    isNew: true,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'meridian-metal-vessel',
    name: 'Meridian Vessel',
    subtitle: 'Brushed Metal Collection',
    price: 895,
    wholesalePrice: 537,
    category: 'Metal',
    tags: ['metal', 'contemporary', 'indoor', 'designer'],
    image: '/products/meridian-featured.png',
    hoverImage: '/products/meridian-hover.png',
    description:
      'Dark hammered and etched metalwork with a hand-finished antique patina. The Meridian commands attention — an heirloom vessel for design-forward interiors and collector spaces.',
    dimensions: '24″H × 18″Ø',
    material: 'Hammered bronze-finish metal',
    finish: 'Antique dark patina',
    drainage: 'Integrated drainage channels',
    usage: 'Indoor / Outdoor',
    weight: '22 lbs',
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
  {
    id: 'solstice-glazed-bowl',
    name: 'Solstice Bowl',
    subtitle: 'Low Profile Artisan Series',
    price: 295,
    wholesalePrice: 177,
    category: 'Glazed',
    tags: ['glazed', 'bowl', 'indoor', 'tabletop'],
    image: '/products/solstice-featured.png',
    hoverImage: '/products/lawn-fountain.png',
    description:
      'A wide, low-profile bowl finished in a rich crimson glaze. Perfect for trailing plants, herbs, or a sculptural display — it brings warmth and colour to any surface it rests on.',
    dimensions: '7″H × 18″Ø',
    material: 'High-fire stoneware',
    finish: 'Crimson reactive glaze',
    drainage: 'Three drainage holes',
    usage: 'Indoor / Outdoor',
    weight: '9 lbs',
    isNew: false,
    isBestseller: false,
    inStock: true,
  },
]
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. (Any existing usages of `product.price` still compile — `wholesalePrice` is a new addition.)

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add wholesalePrice field to all products (40% trade discount)"
```

---

## Task 10: PriceDisplay component

**Files:** `components/PriceDisplay.tsx`

- [ ] **Step 1: Create `components/PriceDisplay.tsx`**

```tsx
'use client'

import { useSession } from 'next-auth/react'

interface PriceDisplayProps {
  price: number
  wholesalePrice: number
  priceClassName?: string
}

export default function PriceDisplay({
  price,
  wholesalePrice,
  priceClassName = 'font-sans font-medium text-ink',
}: PriceDisplayProps) {
  const { data: session } = useSession()
  const isWholesale = session?.user?.isWholesale === true

  if (!isWholesale) {
    return <span className={priceClassName}>${price.toLocaleString()}</span>
  }

  const savings = price - wholesalePrice
  const discountPct = Math.round((savings / price) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
        <span className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-gold/70">
          Wholesale Pricing Active
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className={priceClassName}>${wholesalePrice.toLocaleString()}</span>
        <span className="font-sans text-muted line-through text-sm">
          ${price.toLocaleString()}
        </span>
      </div>
      <p className="font-sans text-[0.6rem] text-gold/60 tracking-wide">
        You save ${savings.toLocaleString()} · {discountPct}% trade discount
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/PriceDisplay.tsx
git commit -m "feat: add PriceDisplay component with wholesale price switching"
```

---

## Task 11: WholesaleModal component

**Files:** `components/WholesaleModal.tsx`

- [ ] **Step 1: Create `components/WholesaleModal.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { X } from 'lucide-react'

interface WholesaleModalProps {
  open: boolean
  onClose: () => void
}

export default function WholesaleModal({ open, onClose }: WholesaleModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      setEmail('')
      setPassword('')
      onClose()
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-[6px]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className="fixed inset-0 z-[71] flex items-center justify-center px-4 pointer-events-none"
            onClick={handleBackdropClick}
          >
            <div className="relative bg-[#16130f] border border-[rgba(184,146,74,0.22)] rounded-2xl p-8 w-full max-w-[360px] shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(184,146,74,0.07)] pointer-events-auto">

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-7 h-7 rounded-full border border-white/[0.09] flex items-center justify-center text-white/28 hover:text-white/60 hover:border-white/20 transition-all duration-200"
              >
                <X size={12} strokeWidth={1.5} />
              </button>

              {/* Header */}
              <div className="text-center mb-7">
                <div className="text-gold/35 text-sm mb-3 tracking-[0.3em]">✦</div>
                <h2 className="font-serif font-normal text-xl tracking-[0.2em] uppercase text-warm-50 mb-2">
                  Trade Access
                </h2>
                <p className="font-sans text-xs text-white/28 tracking-wide leading-relaxed">
                  Sign in to view wholesale pricing
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 py-2.5 bg-red-500/[0.08] border border-red-500/25 rounded-lg">
                      <p className="font-sans text-xs text-red-400/85">⚠ {error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className="w-full h-11 px-4 bg-white/[0.045] border border-white/[0.09] rounded-lg font-sans text-xs text-warm-50 placeholder:text-white/22 focus:outline-none focus:border-gold/40 focus:bg-white/[0.055] transition-all duration-200"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className={`w-full h-11 px-4 bg-white/[0.045] border rounded-lg font-sans text-xs text-warm-50 placeholder:text-white/22 focus:outline-none focus:border-gold/40 focus:bg-white/[0.055] transition-all duration-200 ${
                    error ? 'border-red-500/30' : 'border-white/[0.09]'
                  }`}
                />

                {/* Divider */}
                <div className="flex items-center gap-3 py-0.5">
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span className="font-sans text-[0.48rem] tracking-[0.25em] uppercase text-white/18">
                    secure
                  </span>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg font-sans text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-ink transition-opacity duration-200 disabled:opacity-65"
                  style={{
                    background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                    boxShadow: loading ? 'none' : '0 4px 18px rgba(184,146,74,0.38)',
                  }}
                >
                  {loading ? 'Signing in…' : 'Sign In to Trade Portal'}
                </button>
              </form>

              {/* Footer link */}
              <p className="text-center mt-5 font-sans text-[0.58rem] text-gold/35 tracking-wide">
                <a
                  href="mailto:hello@jacksonpottery.com"
                  className="hover:text-gold/65 transition-colors duration-200"
                >
                  Request wholesale access →
                </a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/WholesaleModal.tsx
git commit -m "feat: add WholesaleModal component with Framer Motion login flow"
```

---

## Task 12: Navigation — desktop wholesale pill + mobile entry

**Files:** `components/Navigation.tsx`

- [ ] **Step 1: Add imports**

At the top of `components/Navigation.tsx`, add the following imports alongside the existing ones:

```tsx
import { useSession, signOut } from 'next-auth/react'
import WholesaleModal from './WholesaleModal'
```

- [ ] **Step 2: Add state and session hook inside the `Navigation` component**

Inside the `export default function Navigation()` body, after the existing `useState`/`useRef` declarations, add:

```tsx
const [wholesaleOpen, setWholesaleOpen] = useState(false)
const { data: session } = useSession()
const isWholesale = session?.user?.isWholesale === true
```

- [ ] **Step 3: Add the desktop Wholesale pill to the actions row**

Find the desktop actions row comment `{/* Right — search, account, cart, shop now */}` in `components/Navigation.tsx`. It renders a `<div className="flex items-center gap-3 flex-shrink-0">`.

Add the wholesale pill as the **first child** of that div (before the search block):

```tsx
{/* Wholesale pill */}
{isWholesale ? (
  <button
    onClick={() => signOut({ redirect: false })}
    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.58rem] tracking-[0.14em] uppercase font-sans font-semibold text-ink transition-all duration-300"
    style={{ background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)' }}
  >
    ✓ Trade Active · Sign Out
  </button>
) : (
  <button
    onClick={() => setWholesaleOpen(true)}
    className={`flex items-center gap-1 px-3 py-1 rounded-full text-[0.58rem] tracking-[0.14em] uppercase font-sans transition-all duration-300 border ${
      t
        ? 'border-gold/35 text-gold/80 hover:border-gold/60 hover:text-gold'
        : 'border-gold/28 text-gold/70 hover:border-gold/50 hover:text-gold'
    }`}
  >
    Wholesale ↗
  </button>
)}
```

- [ ] **Step 4: Add wholesale entry to the mobile drawer**

In the mobile drawer's `<nav>` section, find the `{/* Phone */}` motion block. Add a new wholesale entry **above** it:

```tsx
{/* Wholesale */}
<motion.div
  initial={{ opacity: 0, x: 28 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
  className="border-b border-[rgba(184,146,74,0.1)] bg-[rgba(184,146,74,0.04)]"
>
  {isWholesale ? (
    <button
      onClick={() => { setMobileOpen(false); signOut({ redirect: false }) }}
      className="flex items-center justify-between w-full px-6 py-4"
    >
      <span className="font-sans text-sm text-gold/75">✓ Trade Active · Sign Out</span>
    </button>
  ) : (
    <button
      onClick={() => { setMobileOpen(false); setWholesaleOpen(true) }}
      className="group flex items-center justify-between w-full px-6 py-4"
    >
      <div className="flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
        <span className="font-sans text-sm text-gold/65 group-hover:text-gold transition-colors duration-200 tracking-wide">
          Wholesale Login
        </span>
      </div>
      <ArrowUpRight size={14} strokeWidth={1.5} className="text-gold/30 group-hover:text-gold flex-shrink-0 ml-4 transition-colors duration-200" />
    </button>
  )}
</motion.div>
```

- [ ] **Step 5: Render the WholesaleModal**

At the very end of the component's return statement, after the closing `</AnimatePresence>` of the mobile menu (and before the final `</>`), add:

```tsx
<WholesaleModal open={wholesaleOpen} onClose={() => setWholesaleOpen(false)} />
```

- [ ] **Step 6: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Manual smoke test**

```bash
npm run dev
```

1. Open `http://localhost:3000`.
2. Verify the gold "Wholesale ↗" pill appears in the desktop nav between categories and the action icons.
3. Click it — the modal should animate in.
4. Click the backdrop — modal should close.
5. Open the mobile menu (resize browser or use DevTools) — verify "Wholesale Login" appears at the bottom of the drawer.

Stop dev server.

- [ ] **Step 8: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: add Wholesale pill and modal trigger to navigation"
```

---

## Task 13: Footer — wholesale link

**Files:** `components/Footer.tsx`

- [ ] **Step 1: Add Wholesale Login to the Support column**

In `components/Footer.tsx`, find the desktop Support column (the `<div>` with `<h4>` that says "Support"). Its `<ul>` currently maps over the `support` array.

Replace the entire Support column `<div>` with:

```tsx
{/* Support */}
<div>
  <h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-gold/60 mb-6">Support</h4>
  <ul className="space-y-3.5">
    {support.map((item) => (
      <li key={item}><NavLink href="/shop">{item}</NavLink></li>
    ))}
  </ul>
  <div className="mt-6 pt-5 border-t border-white/[0.06]">
    <button
      onClick={() => {/* modal trigger handled below */}}
      className="group flex items-center gap-1.5 font-sans text-gold/55 text-[0.82rem] hover:text-gold transition-colors duration-200 py-1"
      id="footer-wholesale-btn"
    >
      <span className="text-gold/40 text-xs">✦</span>
      Wholesale Login
      <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
    </button>
    <p className="font-sans text-ash-400/35 text-[0.7rem] mt-1.5 leading-relaxed">
      Verified B2B accounts.<br />Sign in for trade pricing.
    </p>
  </div>
</div>
```

- [ ] **Step 2: Wire the footer button to open the modal**

The footer is a server-rendered component, but the wholesale button needs to open the modal which lives in Navigation. The cleanest solution without global state is a `CustomEvent`. Replace `{/* modal trigger handled below */}` with a real handler:

```tsx
onClick={() => window.dispatchEvent(new CustomEvent('open-wholesale-modal'))}
```

- [ ] **Step 3: Listen for the event in Navigation.tsx**

In `components/Navigation.tsx`, add a `useEffect` inside the component body (alongside the existing scroll and overflow effects):

```tsx
useEffect(() => {
  const handler = () => setWholesaleOpen(true)
  window.addEventListener('open-wholesale-modal', handler)
  return () => window.removeEventListener('open-wholesale-modal', handler)
}, [])
```

- [ ] **Step 4: Apply same fix to the mobile compact link grid**

In `components/Footer.tsx`, find the mobile layout's compact link grid. Add a Wholesale entry after the existing links:

```tsx
{/* Mobile wholesale link */}
<button
  onClick={() => window.dispatchEvent(new CustomEvent('open-wholesale-modal'))}
  className="font-sans text-gold/50 text-[0.78rem] hover:text-gold transition-colors duration-200 text-left"
>
  ✦ Wholesale Login
</button>
```

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/Footer.tsx components/Navigation.tsx
git commit -m "feat: add Wholesale Login link to footer with event-based modal trigger"
```

---

## Task 14: Shop page — PriceDisplay integration

**Files:** `app/shop/page.tsx`

- [ ] **Step 1: Import PriceDisplay**

At the top of `app/shop/page.tsx`, add:

```tsx
import PriceDisplay from '@/components/PriceDisplay'
```

- [ ] **Step 2: Replace the inline price display**

Find this block in the product grid (around line 48):

```tsx
<div className="flex items-center gap-3">
  <span className="font-sans font-medium text-ink">${product.price.toLocaleString()}</span>
  {product.originalPrice && (
    <span className="font-sans text-muted text-sm line-through">${product.originalPrice.toLocaleString()}</span>
  )}
</div>
```

Replace it with:

```tsx
<PriceDisplay
  price={product.price}
  wholesalePrice={product.wholesalePrice}
  priceClassName="font-sans font-medium text-ink"
/>
```

`PriceDisplay` renders its own retail strikethrough in wholesale mode, so the `originalPrice` display block is no longer needed here.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/shop/page.tsx
git commit -m "feat: use PriceDisplay on shop grid — wholesale price switching"
```

---

## Task 15: Product detail page — PriceDisplay integration

**Files:** `app/products/[slug]/ProductPageClient.tsx`

- [ ] **Step 1: Import PriceDisplay**

At the top of `ProductPageClient.tsx`, add:

```tsx
import PriceDisplay from '@/components/PriceDisplay'
```

- [ ] **Step 2: Replace the inline price block**

Find the `{/* Price */}` section (around line 137):

```tsx
{/* Price */}
<div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
  <span className="font-serif font-bold text-3xl text-ink">${product.price.toLocaleString()}</span>
  {product.originalPrice && (
    <span className="font-sans text-muted text-lg line-through">${product.originalPrice.toLocaleString()}</span>
  )}
</div>
```

Replace it with:

```tsx
{/* Price */}
<div className="pb-6 border-b border-border mb-6">
  <PriceDisplay
    price={product.price}
    wholesalePrice={product.wholesalePrice}
    priceClassName="font-serif font-bold text-3xl text-ink"
  />
</div>
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/products/[slug]/ProductPageClient.tsx
git commit -m "feat: use PriceDisplay on product detail page"
```

---

## Task 16: End-to-end verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify logged-out state**

1. Open `http://localhost:3000`.
2. Confirm the gold "Wholesale ↗" pill is visible in the desktop nav.
3. Navigate to `http://localhost:3000/shop` — prices show retail values only.
4. Open any product — price shows retail.
5. Open the mobile menu — "Wholesale Login" appears at the bottom of the drawer.
6. Scroll to the footer — "Wholesale Login" link visible in the Support column.

- [ ] **Step 3: Verify login flow**

1. Click "Wholesale ↗" in the nav.
2. Confirm the modal animates in (spring scale + fade).
3. Enter wrong credentials (`bad@test.com` / `wrong`) — confirm error strip appears, password field border turns red.
4. Enter correct credentials (`test@wholesale.com` / `wholesale123`).
5. Confirm the modal closes.
6. Confirm the nav pill changes to solid gold "✓ Trade Active · Sign Out".

- [ ] **Step 4: Verify price switching**

1. Navigate to `http://localhost:3000/shop`.
2. Confirm every product shows the "Wholesale Pricing Active" badge, wholesale price, retail strikethrough, and savings line.
3. Open any product detail page — same wholesale price display in the detail panel.

- [ ] **Step 5: Verify sign-out**

1. Click "✓ Trade Active · Sign Out" in the nav.
2. Confirm the pill reverts to "Wholesale ↗".
3. Confirm all prices revert to retail.

- [ ] **Step 6: Run build to confirm no production errors**

```bash
npm run build
```

Expected: build completes with no errors. (Warnings about `<img>` or missing env vars in static generation are acceptable.)

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "feat: wholesale login system complete — trade pricing active on sign-in"
```

---

## Adding wholesale accounts in production

Run the seed script against your production database:

```bash
DATABASE_URL="file:./prod.db" npx tsx prisma/seed.ts
```

Or set `DATABASE_URL` in your environment and run:

```bash
npx tsx prisma/seed.ts
```
