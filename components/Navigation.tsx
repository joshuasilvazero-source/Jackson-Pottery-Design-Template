'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, ShoppingCart, User, Phone, X, Menu, ArrowUpRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import WholesaleModal from './WholesaleModal'

const categories = [
  {
    label: 'Landscape / Designer Planters',
    short: 'Designer Planters',
    href: '/shop?category=Cast+Stone',
    sub: ['Tall Planters', 'Urns & Pedestals', 'Column Planters', 'Trough Planters'],
    subHrefs: ['/shop?category=Cast+Stone', '/shop?category=Cast+Stone', '/shop?category=Cast+Stone', '/shop?category=Lightweight'],
    image: '/collection-designer-planters.png',
    featured: 'Curated for grand outdoor spaces',
    newItem: 'Tall Planters',
  },
  {
    label: 'Garden / Indoor Planters',
    short: 'Garden & Indoor',
    href: '/shop?category=Terracotta',
    sub: ['Terracotta', 'Glazed Ceramic', 'Cast Stone', 'Lightweight'],
    subHrefs: ['/shop?category=Terracotta', '/shop?category=Glazed', '/shop?category=Cast+Stone', '/shop?category=Lightweight'],
    image: '/collection-indoors.png',
    featured: 'Natural beauty, every setting',
    newItem: 'Glazed Ceramic',
  },
  {
    label: 'Fountains',
    short: 'Fountains',
    href: '/shop?category=Fountains',
    sub: ['Wall Fountains', 'Tiered Fountains', 'Bowl Fountains', 'Pond Kits'],
    subHrefs: ['/shop?category=Fountains', '/shop?category=Fountains', '/shop?category=Fountains', '/shop?category=Fountains'],
    image: '/collection-fountains.png',
    featured: 'The sound of serenity',
    newItem: null,
  },
  {
    label: 'Accessories',
    short: 'Accessories',
    href: '/shop',
    sub: ['Saucers & Liners', 'Plant Stands', 'Potting Mix', 'Tools'],
    subHrefs: ['/shop', '/shop', '/shop', '/shop'],
    image: '/collection-accessories.png',
    featured: 'The finishing details',
    newItem: null,
  },
]

const ticker = [
  'SPRING COLLECTION · 10% OFF SITEWIDE · CODE: PLANT10',
  '✦',
  'FREE SHIPPING ON ORDERS OVER $499.99',
  '✦',
  'NEW ARRIVALS — SHOP NOW →',
  '✦',
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [wholesaleOpen, setWholesaleOpen] = useState(false)
  const { data: session } = useSession()
  const isWholesale = session?.user?.isWholesale === true

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handler = () => setWholesaleOpen(true)
    window.addEventListener('open-wholesale-modal', handler)
    return () => window.removeEventListener('open-wholesale-modal', handler)
  }, [])

  const t = scrolled // shorthand for conditional classes

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          t ? 'bg-white/97 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.07)]' : 'bg-transparent'
        }`}
      >

        {/* ── Ticker — collapses on scroll ─────────────────────── */}
        <div className={`overflow-hidden transition-all duration-500 ${t ? 'h-0' : 'bg-black/40 backdrop-blur-sm h-8'}`}>
          <div className="flex items-center h-full">
            <div className="flex animate-marquee whitespace-nowrap will-change-transform">
              {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
                <span
                  key={i}
                  className={`mx-8 text-[0.6rem] tracking-[0.3em] uppercase font-sans ${
                    item === '✦' ? 'text-gold/55' : 'text-white/60'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Brand row ────────────────────────────────────────── */}
        <div className={`transition-colors duration-500 ${t ? 'border-b border-border' : 'border-b border-white/[0.08]'}`}>
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[4.2rem] flex items-center">

            {/* ── Mobile: logo left · hamburger right ── */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <Link href="/" className="flex items-center group">
                <span className={`font-serif font-bold text-[1.05rem] tracking-[0.2em] uppercase transition-colors duration-500 ${t ? 'text-ink group-hover:text-gold' : 'text-white group-hover:text-gold'}`}>
                  Jackson
                </span>
                <Image
                  src="/logo.png"
                  alt="Jackson Pottery"
                  width={30}
                  height={30}
                  className="object-contain flex-shrink-0"
                  style={{ margin: '0 -1px' }}
                />
                <span className={`font-serif font-bold text-[1.05rem] uppercase tracking-[0.2em] transition-colors duration-500 ${t ? 'text-ink group-hover:text-gold' : 'text-white group-hover:text-gold'}`}>
                  Pottery
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-300 ${t ? 'text-ink/70 hover:text-ink' : 'text-white/70 hover:text-white'}`}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Desktop: logo absolutely centered ── */}
            <Link
              href="/"
              className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center leading-none group"
            >
              <div className="flex items-center">
                <span className={`font-serif font-bold text-[1.18rem] tracking-[0.2em] uppercase transition-colors duration-500 ${t ? 'text-ink group-hover:text-gold' : 'text-white group-hover:text-gold'}`}>
                  Jackson
                </span>
                <Image
                  src="/logo.png"
                  alt="Jackson Pottery logo"
                  width={36}
                  height={36}
                  className="object-contain flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                  style={{ margin: '0 -1px' }}
                />
                <span className={`font-serif font-bold text-[1.18rem] uppercase tracking-[0.2em] transition-colors duration-500 ${t ? 'text-ink group-hover:text-gold' : 'text-white group-hover:text-gold'}`}>
                  Pottery
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={`h-px w-4 transition-colors duration-500 ${t ? 'bg-gold/30' : 'bg-gold/25'}`} />
                <span className={`font-sans text-[0.56rem] tracking-[0.32em] uppercase transition-colors duration-500 ${t ? 'text-muted' : 'text-white/38'}`}>
                  Designed to Define Space
                </span>
                <div className={`h-px w-4 transition-colors duration-500 ${t ? 'bg-gold/30' : 'bg-gold/25'}`} />
              </div>
            </Link>

          </div>
        </div>

        {/* ── Category + actions row (desktop only) ────────────── */}
        <div className={`hidden lg:block transition-colors duration-500 ${t ? 'border-b border-border' : 'border-b border-white/[0.07]'}`}>
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between gap-6">

            {/* Left — phone */}
            <div className={`flex items-center gap-2 flex-shrink-0 transition-colors duration-500 ${t ? 'text-muted' : 'text-white/50'}`}>
              <Phone size={13} strokeWidth={1.5} />
              <div>
                <p className="text-[0.55rem] tracking-widest uppercase font-sans leading-tight">Call Us</p>
                <p className={`text-[0.7rem] font-sans font-medium leading-tight transition-colors duration-500 ${t ? 'text-ink' : 'text-white/85'}`}>
                  (877) 533-7687
                </p>
              </div>
            </div>

            {/* Center — category nav */}
            <nav className="flex items-center">
              {categories.map((cat, idx) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
                    dropdownTimer.current = setTimeout(() => setActiveDropdown(cat.label), 150)
                  }}
                  onMouseLeave={() => {
                    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
                    setActiveDropdown(null)
                  }}
                >
                  <Link
                    href={cat.href}
                    className={`flex items-center gap-1.5 px-4 h-12 text-[0.72rem] tracking-[0.14em] uppercase font-sans transition-colors duration-200 ${
                      activeDropdown === cat.label
                        ? t ? 'text-ink' : 'text-white'
                        : t ? 'text-ink/60 hover:text-ink' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {cat.short}
                    <ChevronDown
                      size={9}
                      strokeWidth={2.5}
                      className={`transition-all duration-300 ${activeDropdown === cat.label ? 'rotate-180 opacity-100' : 'opacity-50'}`}
                    />
                  </Link>

                  {activeDropdown === cat.label && (
                    <motion.div
                      layoutId="cat-underline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5`}
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, #B8924A 40%, #d4a855 60%, transparent 100%)',
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                    />
                  )}

                  {/* ── Mega Menu ── */}
                  <AnimatePresence>
                    {activeDropdown === cat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute top-full z-20 flex overflow-hidden bg-white border border-border/60 shadow-[0_32px_80px_rgba(0,0,0,0.14)] rounded-b-2xl ${
                          idx >= categories.length - 2 ? 'right-0' : 'left-0'
                        }`}
                        style={{ minWidth: '520px' }}
                      >
                        <div className="flex-1 py-8 px-8">
                          <div className="flex items-center gap-2 mb-6">
                            <div className="h-px w-5 bg-gold/50" />
                            <p className="text-[0.54rem] tracking-[0.4em] uppercase text-gold font-sans">
                              {cat.short}
                            </p>
                          </div>
                          <ul className="space-y-0">
                            {cat.sub.map((item, subIdx) => (
                              <li key={item}>
                                <Link
                                  href={cat.subHrefs[subIdx]}
                                  className="group/item flex items-center justify-between py-3.5 border-b border-border/35 last:border-0 transition-colors duration-150"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="font-serif text-[1rem] text-ink/65 group-hover/item:text-ink transition-colors duration-150">
                                      {item}
                                    </span>
                                    {cat.newItem === item && (
                                      <span className="text-[0.5rem] tracking-[0.25em] uppercase font-sans text-ink bg-gold px-2 py-0.5 rounded-full">
                                        New
                                      </span>
                                    )}
                                  </div>
                                  <ArrowUpRight
                                    size={13}
                                    strokeWidth={1.5}
                                    className="text-gold opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={cat.href}
                            className="group/all inline-flex items-center gap-1.5 mt-6 text-[0.6rem] tracking-[0.25em] uppercase font-sans text-gold/80 hover:text-ink transition-colors duration-200"
                          >
                            View All {cat.short}
                            <ArrowUpRight
                              size={11}
                              strokeWidth={1.5}
                              className="group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform duration-200"
                            />
                          </Link>
                        </div>

                        <div className="w-52 flex-shrink-0 relative overflow-hidden group/panel">
                          <Image
                            src={cat.image}
                            alt={cat.label}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover/panel:scale-[1.05]"
                            sizes="208px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="font-serif italic text-white/85 text-sm leading-snug mb-3">
                              {cat.featured}
                            </p>
                            <div className="flex items-center gap-1.5 text-[0.58rem] tracking-[0.22em] uppercase font-sans text-gold/80 group-hover/panel:text-gold transition-colors duration-200">
                              Shop Collection
                              <ArrowUpRight size={10} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right — search, account, cart, shop now */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Wholesale button */}
              {isWholesale ? (
                <button
                  onClick={() => signOut({ redirect: false })}
                  className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-sans text-[0.7rem] tracking-[0.14em] uppercase font-semibold text-ink transition-all duration-300 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(184,146,74,0.35)]"
                  style={{ background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)' }}
                >
                  <span className="text-[0.6rem]">✓</span>
                  Trade Active
                  <span className="opacity-60 text-[0.62rem]">· Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => setWholesaleOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-sans text-[0.7rem] tracking-[0.14em] uppercase font-semibold transition-all duration-300 hover:-translate-y-px"
                  style={{
                    background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                    color: '#0C0A08',
                    boxShadow: '0 3px 16px rgba(184,146,74,0.38)',
                  }}
                >
                  <span className="text-[0.55rem]">✦</span>
                  Wholesale
                </button>
              )}

              {/* Search */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.div
                      key="search-open"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <Search size={13} strokeWidth={1.5} className={`absolute left-3 top-1/2 -translate-y-1/2 ${t ? 'text-muted' : 'text-white/40'}`} />
                        <input
                          autoFocus
                          type="search"
                          placeholder="Search planters..."
                          onBlur={() => setSearchOpen(false)}
                          className={`w-full pl-8 pr-3 py-1.5 text-xs font-sans border rounded-full focus:outline-none transition-all duration-300 ${
                            t
                              ? 'bg-ash-50 border-border text-ink placeholder:text-muted/60 focus:border-gold/40'
                              : 'bg-white/10 border-white/20 text-white placeholder:text-white/35 focus:border-white/40'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="search-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSearchOpen(true)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 ${t ? 'text-ink/55 hover:text-ink' : 'text-white/60 hover:text-white'}`}
                      aria-label="Search"
                    >
                      <Search size={17} strokeWidth={1.5} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <button
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 ${t ? 'text-ink/55 hover:text-ink' : 'text-white/60 hover:text-white'}`}
                aria-label="Account"
              >
                <User size={17} strokeWidth={1.5} />
              </button>

              <Link
                href="#"
                className={`flex items-center gap-1.5 transition-colors duration-300 ${t ? 'text-ink/65 hover:text-ink' : 'text-white/65 hover:text-white'}`}
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart size={17} strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-ink text-[0.5rem] flex items-center justify-center font-sans font-medium">
                    0
                  </span>
                </div>
                <span className={`text-xs font-sans transition-colors duration-300 ${t ? 'text-ink/50' : 'text-white/45'}`}>
                  Cart
                </span>
              </Link>

              <Link
                href="/shop"
                className={`inline-flex items-center justify-center px-5 py-1.5 rounded-full text-[0.7rem] tracking-[0.14em] uppercase font-sans font-medium transition-all duration-300 ${
                  t
                    ? 'bg-ink text-white hover:bg-ink-soft hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] hover:-translate-y-px'
                    : 'bg-white/12 text-white border border-white/22 hover:bg-white hover:text-ink'
                }`}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Gold shimmer line — appears on scroll */}
        <motion.div
          initial={false}
          animate={{ scaleX: t ? 1 : 0, opacity: t ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px origin-center"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(184,146,74,0.4) 30%, rgba(212,168,85,0.7) 50%, rgba(184,146,74,0.4) 70%, transparent 100%)' }}
        />
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[59] bg-black/65 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[85vw] max-w-sm bg-[#0C0A08] flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-[4.5rem] border-b border-white/[0.06] flex-shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex flex-col group">
                  <div className="flex items-center">
                    <span className="font-serif font-bold text-sm tracking-[0.2em] uppercase text-white group-hover:text-gold transition-colors duration-300">
                      Jackson
                    </span>
                    <Image
                      src="/logo.png"
                      alt="Jackson Pottery logo"
                      width={22}
                      height={22}
                      className="object-contain"
                      style={{ margin: '0 1px' }}
                    />
                    <span className="font-serif font-bold text-sm tracking-[0.2em] uppercase text-white group-hover:text-gold transition-colors duration-300">
                      Pottery
                    </span>
                  </div>
                  <span className="text-[0.5rem] tracking-[0.3em] text-white/22 uppercase mt-0.5">
                    Designed to Define Space
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/[0.09] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>

              {/* Category links */}
              <nav className="flex-1 overflow-y-auto">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/[0.05]"
                  >
                    <Link
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between px-6 py-5"
                    >
                      <div>
                        <span className="font-sans text-sm text-white/60 group-hover:text-white transition-colors duration-200 block">
                          {cat.label}
                        </span>
                        <span className="font-serif italic text-[0.7rem] text-white/22 group-hover:text-white/40 transition-colors duration-200 mt-0.5 block">
                          {cat.featured}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="text-gold/25 group-hover:text-gold flex-shrink-0 ml-4 transition-colors duration-200"
                      />
                    </Link>
                  </motion.div>
                ))}

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

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.36 }}
                  className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.05]"
                >
                  <Phone size={13} strokeWidth={1.5} className="text-white/22" />
                  <div>
                    <p className="text-[0.54rem] tracking-widest uppercase font-sans text-white/22">Call Us</p>
                    <p className="text-sm font-sans font-medium text-white/60">(877) 533-7687</p>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="p-6 space-y-3"
                >
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-white text-ink text-[0.72rem] tracking-[0.14em] uppercase font-sans font-medium hover:bg-ash-100 transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom accent */}
              <div className="px-6 py-5 border-t border-white/[0.05] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className="h-px flex-1"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(184,146,74,0.25))' }}
                  />
                  <span className="text-[0.5rem] tracking-[0.4em] uppercase font-sans text-white/18">
                    Since 2009
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: 'linear-gradient(270deg, transparent, rgba(184,146,74,0.25))' }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <WholesaleModal open={wholesaleOpen} onClose={() => setWholesaleOpen(false)} />
    </>
  )
}
