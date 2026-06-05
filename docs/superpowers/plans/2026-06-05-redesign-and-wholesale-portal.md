# Jackson Pottery Redesign + Wholesale Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the consumer site to match the approved wireframe spec (8 sections, 3-color brand system, no gold), and build a dedicated B2B wholesale portal at `/wholesale`.

**Architecture:** Consumer homepage restructured to: Nav → Hero → SellingPoints → Featured → ShopByCollection → ShopByMaterial → Mission → FAQ → Footer. All gold (`#B8924A`, `#d4a855`) replaced with charcoal `#333333` or white. Serif font switched from Cormorant Garamond to Playfair Display. Wholesale portal at `/wholesale` uses `useSession` to render pre-login (trade benefits + login form) or post-login (B2B dashboard with wholesale product prices) states using the existing NextAuth credentials flow.

**Tech Stack:** Next.js 15 App Router, NextAuth.js + Prisma/SQLite, Framer Motion, Tailwind CSS, Google Fonts (Playfair Display + Manrope)

---

## File Map

**Create:**
- `components/SellingPoints.tsx` — standalone trust-badge strip (extracted from Hero)
- `components/MissionStatement.tsx` — single-sentence mission, no title
- `app/wholesale/page.tsx` — B2B portal with pre/post-login states

**Modify:**
- `tailwind.config.ts` — charcoal/ink → `#333333`, add `light-gray: #F4F4F4`, update soft-white, remove gold from font reference
- `app/globals.css` — update CSS vars, body bg, remove gold gradient utility
- `app/layout.tsx` — swap Cormorant Garamond → Playfair Display
- `app/page.tsx` — new section order, remove deleted imports
- `components/Navigation.tsx` — remove tagline, Dealer Login → `/wholesale` link, remove gold button
- `components/Hero.tsx` — remove warm overlays, remove dealer CTA button, remove trust-badge strip
- `components/FeaturedCollections.tsx` — bg → white, all gold → charcoal
- `components/ShopByCollection.tsx` — remove gold eyebrow + gold hover tint
- `components/ShopByMaterial.tsx` — bg → `#F4F4F4`, gold hover → charcoal
- `components/FAQ.tsx` — bg → white, gold active/hover → charcoal
- `components/Footer.tsx` — cohesive email unit, remove tagline, remove gold

---

## Task 1: Update Design Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update tailwind.config.ts**

Replace the entire colors block and fontFamily block:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:        '#333333',
        charcoal:   '#333333',
        graphite:   '#1F1F1F',
        'soft-white': '#F4F4F4',
        'light-gray': '#F4F4F4',
        'warm-gray':  '#D6D3CE',
        'stone-gray': '#B8B4AE',
        ash: {
          50:  '#F4F4F4',
          100: '#EFEFEB',
          200: '#E5E2DC',
          300: '#D6D3CE',
          400: '#B8B4AE',
        },
        warm: {
          50:  '#FFFFFF',
          100: '#F4F4F4',
          200: '#E5E2DC',
        },
        muted:  '#7A7672',
        border: '#D6D3CE',
        // gold kept only for ShopByCollection dark section accent; do not use elsewhere
        gold: '#333333',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw, 6.5rem)',      { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-xl':  ['clamp(2.5rem, 5vw, 5.5rem)',    { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-lg':  ['clamp(2rem, 4vw, 4rem)',         { lineHeight: '1.08', letterSpacing: '0em'     }],
        'display-md':  ['clamp(1.75rem, 3vw, 3rem)',      { lineHeight: '1.12', letterSpacing: '0em'     }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.18'                           }],
      },
      spacing: {
        section:      '7rem',
        'section-sm': '4rem',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'ken-burns': 'kenBurns 24s ease-in-out infinite alternate',
        marquee:     'marquee 55s linear infinite',
      },
      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04) translate(-0.5%, -0.5%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        card:        '0 2px 20px rgba(0,0,0,0.05)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.10)',
        nav:         '0 1px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update globals.css CSS variables and body background**

Replace the `:root` block and body rule, and remove the gold gradient utility:

```css
/* app/globals.css — update :root */
:root {
  --font-playfair: 'Playfair Display', Georgia, serif;
  --font-manrope:  'Manrope', system-ui, sans-serif;

  --ink:         #333333;
  --charcoal:    #333333;
  --graphite:    #1F1F1F;
  --soft-white:  #F4F4F4;
  --light-gray:  #F4F4F4;
  --warm-gray:   #D6D3CE;
  --stone-gray:  #B8B4AE;
  --muted:       #7A7672;
  --border:      #D6D3CE;
  --gold:        #333333;
}
```

Also update the body rule:
```css
body {
  background-color: #FFFFFF;
  color: var(--ink);
  font-family: var(--font-manrope), system-ui, sans-serif;
  overflow-x: hidden;
  font-size: 15px;
  line-height: 1.6;
}
```

Remove `.text-gradient-gold` entirely (lines 99–104). Keep `.text-gradient-charcoal`.

- [ ] **Step 3: Swap font in app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jackson Pottery — Designer Planters for Exceptional Spaces',
  description:
    'Premium handcrafted planters and outdoor décor designed to define space. Shop landscape planters, garden vessels, fountains, and accessories.',
  keywords:
    'designer planters, landscape planters, garden planters, premium outdoor decor, terracotta planters, cast stone urns',
  openGraph: {
    title: 'Jackson Pottery — Designer Planters',
    description: 'Premium designer planters that elevate every space they inhabit.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="bg-white text-ink font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx
git commit -m "feat: update brand tokens — #333333 charcoal, #F4F4F4 light-gray, Playfair Display serif, no gold"
```

---

## Task 2: Update Navigation

**Files:**
- Modify: `components/Navigation.tsx`

Remove the tagline "Designed to Define Space" from the logo area (both desktop and mobile). Replace the Dealer Login modal trigger with a `<Link href="/wholesale">`. Replace the gold "Shop Now" gradient button with a solid charcoal button. Remove the `WholesaleModal` import and its state/event handler. Update mega menu background from `#FDFAF5` to `#FFFFFF`.

- [ ] **Step 1: Remove WholesaleModal import and related state**

Delete these lines from the top of the file:
```tsx
// DELETE these imports:
import WholesaleModal from './WholesaleModal'
// DELETE these state declarations:
const [dealerOpen, setDealerOpen] = useState(false)
// DELETE this useEffect:
useEffect(() => {
  const handler = () => setDealerOpen(true)
  window.addEventListener('open-wholesale-modal', handler)
  return () => window.removeEventListener('open-wholesale-modal', handler)
}, [])
```

- [ ] **Step 2: Remove tagline from desktop logo area**

Find the desktop logo block (lines ~150–166) and remove the tagline `<div>`:
```tsx
{/* Desktop logo — no tagline */}
<Link href="/" className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center leading-none group">
  <Image
    src="/jackson-pottery-logo.png"
    alt="Jackson Pottery"
    width={1238}
    height={240}
    className={`h-14 w-auto transition-all duration-500 group-hover:opacity-80 ${t ? '' : 'brightness-0 invert'}`}
    priority
  />
</Link>
```

- [ ] **Step 3: Remove tagline from mobile menu panel header**

Find the mobile menu panel header (lines ~427–439) and remove the tagline `<span>`:
```tsx
<Link href="/" onClick={() => setMobileOpen(false)} className="flex group">
  <Image
    src="/jackson-pottery-logo.png"
    alt="Jackson Pottery"
    width={1238}
    height={240}
    className="h-11 w-auto brightness-0 invert group-hover:opacity-80 transition-opacity duration-300"
  />
</Link>
```

- [ ] **Step 4: Replace Dealer Login button with /wholesale link**

Replace the entire dealer button block (both `isDealer` and non-dealer states) in the desktop action row:
```tsx
{/* Wholesale portal link */}
{isDealer ? (
  <button
    onClick={() => signOut({ redirect: false })}
    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[0.68rem] tracking-[0.12em] uppercase font-semibold transition-all duration-300 hover:-translate-y-px ${
      t
        ? 'bg-[#333333] text-white hover:bg-[#1F1F1F]'
        : 'bg-white text-[#333333] hover:bg-white/90'
    }`}
  >
    <span className="text-[0.55rem]">✓</span>
    Dealer Active
    <span className={`text-[0.6rem] ${t ? 'opacity-50' : 'opacity-40'}`}>· Sign Out</span>
  </button>
) : (
  <Link
    href="/wholesale"
    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[0.68rem] tracking-[0.12em] uppercase font-semibold transition-all duration-300 hover:-translate-y-px ${
      t
        ? 'bg-[#333333] text-white hover:bg-[#1F1F1F] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
        : 'bg-white text-[#333333] hover:bg-white/90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]'
    }`}
  >
    Dealer Login
  </Link>
)}
```

- [ ] **Step 5: Replace gold "Shop Now" button with charcoal**

Replace the gold gradient Shop Now button (lines ~386–393):
```tsx
<Link
  href="/shop"
  className={`inline-flex items-center justify-center px-5 py-2 rounded-full text-[0.68rem] tracking-[0.14em] uppercase font-sans font-bold transition-all duration-300 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] ${
    t ? 'bg-[#333333] text-white' : 'bg-white text-[#333333]'
  }`}
>
  Shop Now
</Link>
```

- [ ] **Step 6: Update mega menu dropdown background**

Find `bg-[#FDFAF5]` inside the mega menu AnimatePresence block and replace with `bg-white`.

- [ ] **Step 7: Update mobile menu Dealer section to link to /wholesale**

Replace the mobile non-dealer dealer block:
```tsx
<Link
  href="/wholesale"
  onClick={() => setMobileOpen(false)}
  className="flex items-center justify-between w-full"
>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
      <span className="text-white/70 text-xs">↗</span>
    </div>
    <div>
      <p className="font-sans text-sm font-semibold text-white leading-tight">Dealer & Distributor</p>
      <p className="font-sans text-[0.58rem] text-white/40 mt-0.5">Wholesale pricing access</p>
    </div>
  </div>
  <ArrowUpRight size={14} strokeWidth={1.5} className="text-white/35 flex-shrink-0" />
</Link>
```

- [ ] **Step 8: Remove WholesaleModal render at bottom of component**

Delete the last line before the closing fragment:
```tsx
// DELETE this line:
<WholesaleModal open={dealerOpen} onClose={() => setDealerOpen(false)} />
```

- [ ] **Step 9: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: nav — remove tagline, dealer login links to /wholesale, charcoal buttons, no gold"
```

---

## Task 3: Update Hero

**Files:**
- Modify: `components/Hero.tsx`

Remove warm/beige color overlays. Remove the "Dealer & Distributor Login" CTA button. Remove the entire trust-badge strip (it moves to SellingPoints in Task 4).

- [ ] **Step 1: Replace overlays with dark-only gradient**

Find the overlay block (lines ~58–64) and replace:
```tsx
{/* Dark gradient only — no warm tint */}
<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/55 pointer-events-none" />
<div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent pointer-events-none" />
```
Delete the radial gradient `<div>` entirely.

- [ ] **Step 2: Remove Dealer CTA button from hero CTAs**

Find the CTAs block (lines ~112–140) and keep only the Shop CTA:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
  className="flex items-center justify-center"
>
  <Link
    href="/shop"
    className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-white text-[#333333] text-[11px] tracking-[0.18em] uppercase font-sans font-semibold hover:bg-[#F4F4F4] hover:shadow-[0_8px_28px_rgba(255,255,255,0.22)] hover:-translate-y-px transition-all duration-300"
  >
    Shop All Planters
  </Link>
</motion.div>
```

- [ ] **Step 3: Remove trust-badge strip**

Delete the entire `{/* ── Trust Badges Strip ── */}` section (lines ~144–174) from the Hero component. This section becomes `SellingPoints.tsx` in Task 4.

- [ ] **Step 4: Remove unused imports**

Remove `Award, Truck, ShieldCheck, Headphones` from the lucide-react import. Remove the `trustBadges` array. Keep `ArrowRight` only if it's still used (it's not after removing the dealer button — remove it too).

The final import line:
```tsx
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
```

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: hero — dark-only overlay, single shop CTA, remove dealer button and trust strip"
```

---

## Task 4: Create SellingPoints Component

**Files:**
- Create: `components/SellingPoints.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/SellingPoints.tsx
import { Award, Truck, ShieldCheck, Headphones } from 'lucide-react'

const points = [
  { icon: Award,       label: 'Premium Quality',  sub: 'Built to last a lifetime'    },
  { icon: Truck,       label: 'Reliable Shipping', sub: 'Free on orders over $499.99' },
  { icon: ShieldCheck, label: 'Secure Checkout',   sub: 'Safe and easy every time'    },
  { icon: Headphones,  label: 'Expert Support',    sub: "We're here to help"          },
]

export default function SellingPoints() {
  return (
    <div className="bg-[#F4F4F4] border-y border-[#D6D3CE]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <div
              key={point.label}
              className={`flex items-center gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-[#D6D3CE] ${[
                '',
                'border-l',
                'border-t lg:border-t-0 lg:border-l',
                'border-l border-t lg:border-t-0',
              ][i]}`}
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <point.icon size={16} className="text-[#333333]/70" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[0.68rem] sm:text-[0.72rem] font-semibold text-[#333333] tracking-wide leading-snug">
                  {point.label}
                </p>
                <p className="hidden sm:block font-sans text-[0.66rem] text-[#7A7672] mt-0.5 leading-relaxed">
                  {point.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SellingPoints.tsx
git commit -m "feat: add SellingPoints component — #F4F4F4 bg, charcoal icons, no gold"
```

---

## Task 5: Update FeaturedCollections

**Files:**
- Modify: `components/FeaturedCollections.tsx`

- [ ] **Step 1: Update section background and fade gradient**

Line 31 — change section bg and remove the warm fade:
```tsx
<section className="relative bg-white py-section">
```
Line 33 — remove the soft-fade `<div>` entirely (the `linear-gradient(to bottom, rgba(43,43,43,0.08)` div).

- [ ] **Step 2: Remove gold from "View All" link hover**

Line 59 — change `hover:text-gold` to `hover:text-[#333333]`:
```tsx
<Link href="/shop" className="hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-muted hover:text-[#333333] transition-colors duration-300 group py-2 px-3 -mr-3 rounded-lg hover:bg-black/[0.03]">
```

- [ ] **Step 3: Remove gold from product card badges**

In `ProductCard`, line 187 — "New" badge: `bg-gold text-ink` → `bg-[#333333] text-white`:
```tsx
{product.isNew && (
  <span className="bg-[#333333] text-white text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">New</span>
)}
```

- [ ] **Step 4: Remove gold from wishlist heart and hover states**

Line 200 — wishlist heart fill:
```tsx
<Heart size={13} strokeWidth={1.5} className={isWishlisted ? 'fill-[#333333] text-[#333333]' : 'text-muted'} />
```

Line 239 — product name hover:
```tsx
<h3 className="font-serif font-semibold text-ink text-sm sm:text-base group-hover:text-[#333333] transition-colors duration-300 leading-snug mb-1.5 line-clamp-2">
```

Line 238 — category label:
```tsx
<p className="font-sans text-[0.58rem] text-[#7A7672] tracking-[0.3em] uppercase mb-1.5">{product.category}</p>
```

- [ ] **Step 5: Remove gold from star ratings**

Line 251 — stars:
```tsx
{[...Array(5)].map((_, i) => (
  <Star key={i} size={10} className="fill-[#333333] text-[#333333]" strokeWidth={0} />
))}
```

- [ ] **Step 6: Remove gold from urgency tag**

Line 257:
```tsx
<p className="mt-2.5 font-sans text-[0.62rem] tracking-[0.15em] text-muted">
  · {urgencyTags[product.id]}
</p>
```

- [ ] **Step 7: Update QuickViewModal — remove gold**

In `QuickViewModal`:

Line 341 — category eyebrow:
```tsx
<p className="font-sans text-[0.58rem] text-[#7A7672] tracking-[0.3em] uppercase mb-2">{product.category}</p>
```

Line 350–355 — stars:
```tsx
<Star key={i} size={12} className="fill-[#333333] text-[#333333]" strokeWidth={0} />
```

Lines 328–333 — badges in modal image panel:
```tsx
{product.isNew && (
  <span className="bg-[#333333] text-white text-[0.56rem] tracking-widest uppercase font-sans px-3 py-1 rounded-full shadow-sm">New</span>
)}
```

Lines 387–399 — "Add to Cart" button: replace gold bg with charcoal:
```tsx
<button
  onClick={() => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }}
  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[0.72rem] tracking-[0.14em] uppercase font-sans font-medium transition-all duration-300 ${
    addedToCart
      ? 'bg-[#333333] text-white'
      : 'bg-[#333333] text-white hover:bg-[#1F1F1F] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-px'
  }`}
>
  {addedToCart ? (
    <><Check size={13} strokeWidth={2} /> Added to Cart</>
  ) : (
    <><ShoppingCart size={13} strokeWidth={1.8} /> Add to Cart</>
  )}
</button>
```

Line 404 — wishlist button border:
```tsx
className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
  isWishlisted
    ? 'border-[#333333] bg-[#333333]/5'
    : 'border-border hover:border-[#333333]/50'
}`}
```
```tsx
<Heart size={16} strokeWidth={1.5} className={isWishlisted ? 'fill-[#333333] text-[#333333]' : 'text-muted'} />
```

Line 415 — "View Full Details" link:
```tsx
className="flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-sans text-muted hover:text-[#333333] transition-colors duration-200 group"
```

- [ ] **Step 8: Commit**

```bash
git add components/FeaturedCollections.tsx
git commit -m "feat: FeaturedCollections — white bg, all gold replaced with charcoal"
```

---

## Task 6: Update ShopByCollection

**Files:**
- Modify: `components/ShopByCollection.tsx`

- [ ] **Step 1: Remove gold eyebrow label color**

Line 55 — change `text-gold/70` to `text-white/55`:
```tsx
className="text-[0.62rem] tracking-[0.38em] uppercase font-sans text-white/55 mb-2"
```

- [ ] **Step 2: Remove gold hover tint overlay**

Line 106 — remove the gold hover tint div:
```tsx
{/* Delete this line entirely: */}
<div className="absolute inset-0 bg-[#B8924A]/0 group-hover:bg-[#B8924A]/6 transition-all duration-500" />
```

- [ ] **Step 3: Remove gold subcategory hover**

Line 112 — change `group-hover:text-gold/70` to `group-hover:text-white/70`:
```tsx
className="font-sans text-[0.5rem] sm:text-[0.58rem] tracking-[0.2em] sm:tracking-[0.28em] uppercase text-white/55 mb-1 sm:mb-1.5 transition-colors duration-300 group-hover:text-white/70"
```

- [ ] **Step 4: Commit**

```bash
git add components/ShopByCollection.tsx
git commit -m "feat: ShopByCollection — remove gold eyebrow and hover tint"
```

---

## Task 7: Update ShopByMaterial

**Files:**
- Modify: `components/ShopByMaterial.tsx`

- [ ] **Step 1: Update section background**

Line 59:
```tsx
<section className="relative bg-[#F4F4F4] py-section">
```

Remove the soft-fade div (line 61) entirely.

- [ ] **Step 2: Remove gold hover on material names**

Line 110:
```tsx
<p className="font-serif font-semibold text-ink text-base group-hover:text-[#333333] transition-colors duration-300 mb-0.5">
```

- [ ] **Step 3: Replace gold "Shop Now" link color**

Line 114:
```tsx
<span className="inline-flex items-center gap-1 text-[0.65rem] tracking-[0.2em] uppercase font-sans text-[#333333]/60 group-hover:gap-2 transition-all duration-300">
```

- [ ] **Step 4: Commit**

```bash
git add components/ShopByMaterial.tsx
git commit -m "feat: ShopByMaterial — #F4F4F4 bg, gold hover states replaced with charcoal"
```

---

## Task 8: Update FAQ

**Files:**
- Modify: `components/FAQ.tsx`

- [ ] **Step 1: Update section background**

Line 14:
```tsx
<section className="relative bg-white py-section">
```
Remove the soft-fade div (line 16) entirely.

- [ ] **Step 2: Replace gold divider with charcoal**

Line 43:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ delay: 0.15 }}
  className="w-10 h-0.5 bg-[#333333]/30 mb-6"
/>
```

- [ ] **Step 3: Replace gold active/hover states on accordion items**

Line 76 — question text active color:
```tsx
<span className={`font-serif text-[1rem] sm:text-[1.0625rem] leading-snug transition-colors duration-300 flex-1 min-w-0 ${openId === faq.id ? 'text-[#333333]' : 'text-ink group-hover:text-[#333333]'}`}>
```

Line 79 — accordion toggle button:
```tsx
<span className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openId === faq.id ? 'border-[#333333] bg-[#333333] text-white' : 'border-border text-muted group-hover:border-[#333333] group-hover:text-[#333333]'}`}>
```

- [ ] **Step 4: Replace gold "Still have questions?" link**

Line 57:
```tsx
<motion.a
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
  transition={{ delay: 0.28 }}
  href="mailto:hello@jacksonpottery.com"
  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-[#333333]/60 hover:text-[#333333] transition-colors duration-300"
>
  Still have questions? →
</motion.a>
```

- [ ] **Step 5: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: FAQ — white bg, gold active/hover states replaced with charcoal"
```

---

## Task 9: Create MissionStatement Component

**Files:**
- Create: `components/MissionStatement.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/MissionStatement.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function MissionStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="bg-white py-20 lg:py-24">
      <div ref={ref} className="max-w-[1440px] mx-auto px-4 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-[#333333] text-display-sm lg:text-display-md max-w-3xl mx-auto leading-relaxed"
        >
          Every great space starts with a single piece.
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/MissionStatement.tsx
git commit -m "feat: add MissionStatement component — centered italic serif, no title"
```

---

## Task 10: Update Footer

**Files:**
- Modify: `components/Footer.tsx`

Redesign the newsletter strip as a cohesive single unit. Remove tagline. Replace gold column headers and dealer link with charcoal. Remove `FooterLogo` tagline.

- [ ] **Step 1: Update FooterLogo — remove tagline**

Replace the `FooterLogo` function:
```tsx
function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center group">
      <Image
        src="/jackson-pottery-logo.png"
        alt="Jackson Pottery"
        width={1238}
        height={240}
        className="h-14 w-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
    </Link>
  )
}
```

- [ ] **Step 2: Redesign newsletter strip as cohesive unit**

Replace the entire newsletter strip `<div>` (the `border-b border-white/[0.08]` section):
```tsx
{/* ── Newsletter strip — cohesive unit ── */}
<div className="border-b border-white/[0.08]">
  <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-12">
    <div className="max-w-2xl mx-auto">
      <p className="font-sans text-[0.58rem] tracking-[0.32em] uppercase text-white/40 text-center mb-3">
        Stay Connected
      </p>
      <h3 className="font-serif text-2xl lg:text-[1.9rem] text-white text-center mb-2">
        Stay in the world of Jackson Pottery
      </h3>
      <p className="font-sans text-white/45 text-sm text-center mb-6">
        New arrivals, design inspiration, and exclusive offers.
      </p>
      <form
        className="flex w-full rounded-full overflow-hidden border border-white/15 focus-within:border-white/35 transition-colors duration-300"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-6 py-4 bg-white/[0.06] text-white text-sm font-sans placeholder:text-white/30 focus:outline-none min-w-0"
        />
        <button
          type="submit"
          className="px-7 py-4 bg-white text-[#333333] text-[0.72rem] font-sans font-semibold tracking-[0.14em] uppercase hover:bg-[#F4F4F4] transition-colors flex-shrink-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Replace gold column headers with white/gray**

Replace all `text-gold/60` section headers:
```tsx
<h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">Collections</h4>
<h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">By Space</h4>
<h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">Support</h4>
```

- [ ] **Step 4: Replace gold dealer link in Support column**

Replace the dealer login button block in the Support column:
```tsx
<div className="mt-6 pt-5 border-t border-white/[0.06]">
  <Link
    href="/wholesale"
    className="group flex items-center gap-1.5 font-sans text-white/45 text-[0.82rem] hover:text-white transition-colors duration-200 py-1"
  >
    Dealer Login
    <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
  </Link>
  <p className="font-sans text-white/25 text-[0.7rem] mt-1.5 leading-relaxed">
    Verified dealer accounts.<br />Sign in for trade pricing.
  </p>
</div>
```

Also update the mobile grid dealer link from a `<button onClick dispatch>` to `<Link href="/wholesale">`.

- [ ] **Step 5: Update mobile footer "Since 2009" divider gradient to charcoal**

Lines 180–183 — update gradient colors:
```tsx
<div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))' }} />
<span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-white/25">Since 2009</span>
<div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.15))' }} />
```

- [ ] **Step 6: Add Link import if not present**

Ensure `import Link from 'next/link'` is at the top (it already is).

- [ ] **Step 7: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: footer — cohesive email unit, remove tagline, remove gold, dealer link → /wholesale"
```

---

## Task 11: Restructure app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx with new section order**

```tsx
// app/page.tsx
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SellingPoints from '@/components/SellingPoints'
import FeaturedCollections from '@/components/FeaturedCollections'
import ShopByCollection from '@/components/ShopByCollection'
import ShopByMaterial from '@/components/ShopByMaterial'
import MissionStatement from '@/components/MissionStatement'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />
      <Hero />
      <SellingPoints />
      <FeaturedCollections />
      <ShopByCollection />
      <ShopByMaterial />
      <MissionStatement />
      <FAQ />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: restructure homepage — 8-section wireframe order, remove deleted sections"
```

---

## Task 12: Create Wholesale Portal (/wholesale)

**Files:**
- Create: `app/wholesale/page.tsx`

The page is a client component. It reads `useSession()` to decide which state to render.

- [ ] **Step 1: Create the wholesale page**

```tsx
// app/wholesale/page.tsx
'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Tag, Headphones, Clock, Shield, Eye, EyeOff, Star, Package } from 'lucide-react'
import { products } from '@/lib/data'
import PriceDisplay from '@/components/PriceDisplay'

const benefits = [
  {
    icon: Tag,
    title: 'Trade Pricing',
    desc: 'Up to 40% below retail on the full catalog.',
  },
  {
    icon: Clock,
    title: 'Priority Fulfillment',
    desc: 'Dedicated fulfillment lane with shorter lead times.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Rep',
    desc: 'A single point of contact for quotes and orders.',
  },
  {
    icon: Shield,
    title: 'Verified Accounts',
    desc: 'Exclusive access for licensed dealers and distributors.',
  },
]

const resources = [
  { label: 'Full Product Catalog (PDF)', href: '#' },
  { label: 'Sizing & Specification Guide', href: '#' },
  { label: 'Care & Maintenance Manual', href: '#' },
  { label: 'Contact Your Account Rep', href: 'mailto:trade@jacksonpottery.com' },
]

export default function WholesalePage() {
  const { data: session, status } = useSession()
  const isLoggedIn = session?.user?.isWholesale === true

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#333333]/20 border-t-[#333333] animate-spin" />
      </div>
    )
  }

  return isLoggedIn ? <Dashboard session={session} /> : <LoginPage />
}

/* ── Pre-login: trade marketing + login form ── */
function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="border-b border-[#D6D3CE]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/jackson-pottery-logo.png"
              alt="Jackson Pottery"
              width={1238}
              height={240}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="font-sans text-[0.68rem] tracking-[0.14em] uppercase text-[#7A7672] hover:text-[#333333] transition-colors duration-200"
          >
            ← Back to Store
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: trade value prop */}
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.38em] uppercase text-[#7A7672] mb-4">
              Trade & Wholesale Portal
            </p>
            <h1 className="font-serif font-bold text-[#333333] text-display-lg leading-tight mb-5">
              Built for Dealers &amp; Distributors
            </h1>
            <div className="w-10 h-px bg-[#D6D3CE] mb-6" />
            <p className="font-sans text-[#7A7672] text-[0.9375rem] leading-relaxed max-w-md mb-12">
              Jackson Pottery's trade program gives verified dealers and distributors access to exclusive pricing, dedicated support, and priority fulfillment across our full catalog.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4 p-5 bg-[#F4F4F4] rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <b.icon size={16} className="text-[#333333]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-[#333333] mb-0.5">{b.title}</p>
                    <p className="font-sans text-[0.78rem] text-[#7A7672] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 font-sans text-[0.75rem] text-[#7A7672] leading-relaxed">
              Don't have a trade account?{' '}
              <a
                href="mailto:trade@jacksonpottery.com"
                className="text-[#333333] font-semibold hover:underline"
              >
                Apply for wholesale access →
              </a>
            </p>
          </div>

          {/* Right: login form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[#F4F4F4] rounded-2xl p-8 lg:p-10">
              <h2 className="font-serif font-semibold text-[#333333] text-[1.5rem] mb-1.5">
                Dealer Sign In
              </h2>
              <p className="font-sans text-[0.82rem] text-[#7A7672] mb-8">
                Enter your trade credentials to access wholesale pricing.
              </p>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Login form ── */
function LoginForm() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPassword, setShowPw] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('Invalid credentials. Please check your email and password.')
    }
    // On success, useSession() updates automatically — page re-renders to Dashboard
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="font-sans text-[0.78rem] text-red-600">{error}</p>
        </div>
      )}

      <div>
        <label className="block font-sans text-[0.6rem] tracking-[0.22em] uppercase text-[#7A7672] mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@company.com"
          required
          autoComplete="email"
          className="w-full h-12 px-4 bg-white border border-[#D6D3CE] rounded-xl font-sans text-sm text-[#333333] placeholder:text-[#B8B4AE] focus:outline-none focus:border-[#333333] transition-colors duration-200"
        />
      </div>

      <div>
        <label className="block font-sans text-[0.6rem] tracking-[0.22em] uppercase text-[#7A7672] mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            required
            autoComplete="current-password"
            className="w-full h-12 px-4 pr-12 bg-white border border-[#D6D3CE] rounded-xl font-sans text-sm text-[#333333] placeholder:text-[#B8B4AE] focus:outline-none focus:border-[#333333] transition-colors duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#B8B4AE] hover:text-[#333333] transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl bg-[#333333] text-white font-sans text-[0.72rem] tracking-[0.18em] uppercase font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-[#1F1F1F] disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Signing In…
          </>
        ) : (
          <>
            Sign In to Portal
            <ArrowRight size={13} strokeWidth={2.5} />
          </>
        )}
      </button>
    </form>
  )
}

/* ── Post-login: B2B dashboard ── */
function Dashboard({ session }: { session: { user?: { companyName?: string | null; email?: string | null; isWholesale?: boolean } | null } | null }) {
  const companyName = session?.user?.companyName ?? session?.user?.email ?? 'Trade Account'

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#D6D3CE]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/jackson-pottery-logo.png"
              alt="Jackson Pottery"
              width={1238}
              height={240}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="font-sans text-[0.68rem] tracking-[0.14em] uppercase text-[#7A7672] hover:text-[#333333] transition-colors duration-200"
            >
              Browse Full Catalog
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/wholesale' })}
              className="font-sans text-[0.68rem] tracking-[0.14em] uppercase text-[#7A7672] hover:text-[#333333] transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-14">

        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#333333] text-white rounded-2xl px-8 py-7 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.32em] uppercase text-white/45 mb-1">
              Trade Portal
            </p>
            <h1 className="font-serif font-semibold text-[1.6rem] text-white leading-tight">
              Welcome back, {companyName}
            </h1>
          </div>
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full self-start sm:self-auto">
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <span className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-white/80 font-medium">
              Wholesale Pricing Active
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8">

          {/* Product catalog */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="font-sans text-[0.58rem] tracking-[0.32em] uppercase text-[#7A7672] mb-1">
                  Trade Catalog
                </p>
                <h2 className="font-serif font-bold text-[#333333] text-display-sm">
                  All Products
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[0.68rem] tracking-[0.14em] uppercase text-[#7A7672] hover:text-[#333333] transition-colors duration-200"
              >
                Full Store
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-xl overflow-hidden border border-[#D6D3CE]/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-400"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="relative aspect-[4/3] bg-[#F4F4F4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-[#333333] text-white text-[0.52rem] tracking-widest uppercase font-sans px-2.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="px-5 py-4">
                      <p className="font-sans text-[0.56rem] tracking-[0.28em] uppercase text-[#7A7672] mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-serif font-semibold text-[#333333] text-base leading-snug mb-1">
                        {product.name}
                      </h3>
                      <p className="font-sans text-[#7A7672] text-xs mb-3">{product.subtitle}</p>
                      <div className="flex items-center justify-between border-t border-[#D6D3CE]/50 pt-3">
                        <PriceDisplay
                          price={product.price}
                          wholesalePrice={product.wholesalePrice}
                          originalPrice={product.originalPrice}
                          priceClassName="font-sans text-[#333333] font-semibold text-sm"
                        />
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={9} className="fill-[#333333]/40 text-[#333333]/40" strokeWidth={0} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: dealer resources */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[#D6D3CE]/60 p-6">
              <div className="flex items-center gap-2 mb-5">
                <Package size={15} className="text-[#333333]" strokeWidth={1.5} />
                <h3 className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-[#333333] font-semibold">
                  Dealer Resources
                </h3>
              </div>
              <ul className="space-y-1">
                {resources.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      className="flex items-center justify-between py-2.5 border-b border-[#D6D3CE]/40 last:border-0 group"
                    >
                      <span className="font-sans text-[0.8rem] text-[#7A7672] group-hover:text-[#333333] transition-colors duration-200">
                        {r.label}
                      </span>
                      <ArrowRight size={11} strokeWidth={1.5} className="text-[#D6D3CE] group-hover:text-[#333333] transition-colors duration-200 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#D6D3CE]/60 p-6">
              <h3 className="font-sans text-[0.62rem] tracking-[0.28em] uppercase text-[#333333] font-semibold mb-3">
                Your Account Rep
              </h3>
              <p className="font-sans text-[0.82rem] text-[#7A7672] leading-relaxed mb-4">
                Questions about an order, pricing, or availability?
              </p>
              <a
                href="mailto:trade@jacksonpottery.com"
                className="inline-flex items-center gap-2 font-sans text-[0.72rem] tracking-[0.14em] uppercase text-[#333333] font-semibold hover:underline"
              >
                trade@jacksonpottery.com
                <ArrowRight size={11} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify PriceDisplay works on the wholesale page**

The `PriceDisplay` component reads `useSession()` internally and shows wholesale prices when `session.user.isWholesale === true`. Since the dashboard is only rendered when the user is logged in with a wholesale session, `PriceDisplay` will automatically show trade prices on all product cards.

No code changes needed — this is already wired.

- [ ] **Step 3: Commit**

```bash
git add app/wholesale/page.tsx
git commit -m "feat: add /wholesale portal — pre-login trade benefits + login form, post-login B2B dashboard"
```

---

## Task 13: Verify Build

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visual checks — consumer site**

Navigate to `http://localhost:3000` and verify:
- [ ] Page order: Hero → SellingPoints → Featured → ShopByCollection → ShopByMaterial → Mission → FAQ → Footer
- [ ] No gold anywhere — all buttons, icons, text are charcoal/white/light-gray
- [ ] No tagline "Designed to Define Space" anywhere
- [ ] Hero has single "Shop All Planters" CTA, no warm/beige overlay
- [ ] SellingPoints strip is `#F4F4F4` bg with charcoal icons
- [ ] Footer email signup is a single cohesive pill/unit
- [ ] Serif font is Playfair Display (no decorative Q)
- [ ] Nav "Dealer Login" button navigates to `/wholesale`

- [ ] **Step 3: Visual checks — wholesale portal**

Navigate to `http://localhost:3000/wholesale` and verify:
- [ ] Shows trade marketing + login form (logged out)
- [ ] Benefits grid renders, all charcoal/white/light-gray
- [ ] Login form works with a valid wholesale credential
- [ ] After login: dashboard renders, company name shows, "Wholesale Pricing Active" badge shows
- [ ] Products show wholesale prices via `PriceDisplay`
- [ ] Resources sidebar renders
- [ ] Sign out returns to pre-login state
- [ ] Back to store link works

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete redesign — 3-color brand system, 8-section wireframe, /wholesale B2B portal"
```
