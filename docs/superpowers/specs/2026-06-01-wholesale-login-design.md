# Wholesale Login — Design Spec

**Date:** 2026-06-01
**Status:** Approved

---

## Overview

Jackson Pottery is primarily B2B but has a new B2C website. Existing wholesale customers need a clear, professional way to log in and see trade pricing instead of retail pricing. The feature must feel seamlessly integrated into the premium luxury aesthetic of the site without visually competing with the consumer shopping experience.

**Goal:** Wholesale customers land on the B2C site, find the Wholesale login quickly, authenticate with individual accounts, and see trade prices across all products.

---

## Architecture

### New files
| File | Purpose |
|---|---|
| `prisma/schema.prisma` | User model with wholesale flag |
| `prisma/seed.ts` | CLI script to create wholesale accounts |
| `lib/auth.ts` | NextAuth.js config — CredentialsProvider + session callback |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth route handler |
| `components/SessionProvider.tsx` | Client wrapper for NextAuth SessionProvider |
| `components/WholesaleModal.tsx` | Login modal component |
| `components/PriceDisplay.tsx` | Price display component — retail vs wholesale |

### Modified files
| File | Change |
|---|---|
| `lib/data.ts` | Add `wholesalePrice?: number` to `Product` interface and all products |
| `app/layout.tsx` | Wrap children in `SessionProvider` |
| `components/Navigation.tsx` | Add Wholesale link (desktop + mobile), render `WholesaleModal` |
| `components/Footer.tsx` | Add "Trade" column to footer |
| `app/shop/page.tsx` | Pass `wholesalePrice` to `PriceDisplay` in product grid |
| `app/products/[slug]/ProductPageClient.tsx` | Use `PriceDisplay` in detail panel |

---

## Data Layer

### Product type addition (`lib/data.ts`)
```ts
export interface Product {
  // ... existing fields
  wholesalePrice?: number  // trade price — ~40% off retail
}
```

Each product gets a `wholesalePrice`. The values below use 40% off retail as a placeholder — **the owner must confirm actual trade prices before implementation.**

- Montserrat Vessel: $485 retail → $291 wholesale
- Arcadia Planter: $620 retail → $372 wholesale
- Villa Urn: $1,240 retail → $744 wholesale
- Canyon Planter: $365 retail → $219 wholesale
- Meridian Vessel: $895 retail → $537 wholesale
- Solstice Bowl: $295 retail → $177 wholesale

### Database schema (`prisma/schema.prisma`)
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

`DATABASE_URL` in `.env.local` → `file:./dev.db` for development.

---

## Auth System

### NextAuth config (`lib/auth.ts`)
- Provider: `CredentialsProvider` with `email` + `password` fields
- On authorize: query Prisma for user by email, verify password with `bcryptjs.compare`
- Return `null` on failure (NextAuth handles the error state)
- Session callback: attach `isWholesale` and `companyName` to `session.user`
- JWT callback: persist `isWholesale` in the token

### Type augmentation
Extend `next-auth` module so `session.user.isWholesale: boolean` is typed site-wide — no casting required.

### Account management
Wholesale accounts are created via `prisma/seed.ts`:
```bash
npx ts-node prisma/seed.ts
```
The script prompts for email, company name, and password, hashes with bcrypt (12 rounds), and inserts the record. No admin UI in scope.

---

## Navigation

### Desktop — three states

**State 1: Logged out**
A gold pill `Wholesale ↗` sits between the category nav and the action icons (search / user / cart / Shop Now). Clicking opens the wholesale modal.

```
[Designer Planters] [Garden & Indoor] [Fountains] [Accessories]  [Wholesale ↗]  [🔍] [👤] [🛒] [Shop Now]
```

**State 2: Modal open**
Modal overlays the page with a dark backdrop + blur. Nav remains visible behind it.

**State 3: Logged in**
Pill becomes a solid gold chip: `✓ Trade Active · Sign Out`. Clicking "Sign Out" calls `signOut()` from NextAuth and resets prices to retail.

### Mobile drawer
A "Wholesale Login" entry appears at the bottom of the slide-out drawer, separated from category links by a subtle gold-tinted divider. Tapping it closes the drawer and opens the modal. When logged in, shows "Trade Active · Sign Out" in the same position.

### Footer
A `Wholesale Login` link and one-line descriptor (*"Verified B2B accounts. Sign in to access trade pricing."*) are added to the bottom of the existing **Support** column. This keeps the footer's 4-column grid layout unchanged. On mobile it appears in the compact link grid alongside the other support links.

---

## Wholesale Login Modal (`components/WholesaleModal.tsx`)

- Framer Motion entrance: backdrop fades in, modal scales up from 0.95 with spring easing — matching the existing mega-menu animation style
- Dark luxury styling: `#16130f` background, gold border at 22% opacity, `box-shadow` depth layers
- Close: `×` button top-right, clicking backdrop, or pressing Escape
- Fields: Email (type=email), Password (type=password) — both styled with dark glass treatment matching the site
- Submit button: gold gradient, `0 4px 14px rgba(184,146,74,0.35)` glow
- Loading state: button text becomes "Signing in…" with opacity pulse — no spinner to maintain luxury feel
- Error state: subtle red-tinted alert strip above the fields, password field border shifts to red
- Footer link: "Request wholesale access →" — `mailto:hello@jacksonpottery.com` — for new clients interested in a trade account

---

## Price Display (`components/PriceDisplay.tsx`)

Client component. Receives `price: number` and `wholesalePrice?: number` as props. Reads `useSession()`.

**Logged out / no wholesale session:**
```
$485
```
(existing retail price display — no change)

**Wholesale session active:**
```
● Wholesale Pricing Active
$291.00   ~~$485~~
You save $194.00 · 40% trade discount
```

The badge, strikethrough, and savings line use the gold accent palette. The component is drop-in replaceable wherever a price appears — shop grid cards and the product detail panel.

---

## Dependencies to install

```
next-auth
@auth/prisma-adapter
prisma
@prisma/client
bcryptjs
@types/bcryptjs
```

---

## Out of scope

- Admin UI for managing wholesale accounts (handled via seed script)
- Wholesale-only products (all products available to both tiers)
- Wholesale application/approval flow (owner onboards clients manually)
- Password reset (owner resets via seed script)
