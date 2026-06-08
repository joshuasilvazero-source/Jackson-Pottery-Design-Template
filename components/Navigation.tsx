'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, ShoppingCart, User, Phone, X, Menu, ArrowUpRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

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

export default function Navigation() {
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen]         = useState(false)
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { data: session }                   = useSession()
  const isDealer                            = session?.user?.isWholesale === true

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_14px_rgba(0,0,0,0.08)]">

        {/* ── Brand row ── */}
        <div className="border-b border-[#D6D3CE]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[4.4rem] flex items-center">

            {/* Mobile: logo + hamburger */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <Link href="/" className="flex items-center">
                <Image
                  src="/jackson-pottery-logo.png"
                  alt="Jackson Pottery"
                  width={1238}
                  height={240}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-[#333333]/60 hover:text-[#333333] transition-colors duration-200"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Desktop: logo centered */}
            <Link href="/" className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center leading-none group">
              <Image
                src="/jackson-pottery-logo.png"
                alt="Jackson Pottery"
                width={1238}
                height={240}
                className="h-11 w-auto group-hover:opacity-70 transition-opacity duration-300"
                priority
              />
            </Link>
          </div>
        </div>

        {/* ── Category + actions row (desktop) ── */}
        <div className="hidden lg:block border-b border-[#D6D3CE]">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between gap-6">

            {/* Left — phone */}
            <div className="flex items-center gap-2 flex-shrink-0 text-[#7A7672]">
              <Phone size={13} strokeWidth={1.5} />
              <div>
                <p className="text-[0.58rem] tracking-widest uppercase font-sans leading-tight">Call Us</p>
                <p className="text-[0.72rem] font-sans font-medium leading-tight text-[#333333]">(877) 533-7687</p>
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
                    dropdownTimer.current = setTimeout(() => setActiveDropdown(cat.label), 160)
                  }}
                  onMouseLeave={() => {
                    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
                    setActiveDropdown(null)
                  }}
                >
                  <Link
                    href={cat.href}
                    className={`flex items-center gap-1.5 px-4 h-12 text-[0.72rem] tracking-[0.14em] uppercase font-sans font-medium transition-colors duration-200 ${
                      activeDropdown === cat.label
                        ? 'text-[#333333]'
                        : 'text-[#333333] hover:text-[#333333]'
                    }`}
                  >
                    {cat.short}
                    <ChevronDown
                      size={9}
                      strokeWidth={2.5}
                      className={`transition-all duration-300 ${activeDropdown === cat.label ? 'rotate-180 opacity-100' : 'opacity-40'}`}
                    />
                  </Link>

                  {activeDropdown === cat.label && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#333333]"
                      transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                    />
                  )}

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeDropdown === cat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute top-full z-20 flex overflow-hidden bg-white border border-[#D6D3CE] shadow-[0_24px_60px_rgba(0,0,0,0.12)] rounded-b-xl ${
                          idx >= categories.length - 2 ? 'right-0' : 'left-0'
                        }`}
                        style={{ minWidth: '500px' }}
                      >
                        <div className="flex-1 py-8 px-8">
                          <div className="flex items-center gap-2 mb-5">
                            <div className="h-px w-5 bg-[#B8B4AE]/60" />
                            <p className="text-[0.58rem] tracking-[0.4em] uppercase text-[#B8B4AE] font-sans font-medium">
                              {cat.short}
                            </p>
                          </div>
                          <ul className="space-y-0">
                            {cat.sub.map((item, subIdx) => (
                              <li key={item}>
                                <Link
                                  href={cat.subHrefs[subIdx]}
                                  className="group/item flex items-center justify-between py-3.5 border-b border-[#D6D3CE]/50 last:border-0 transition-colors duration-150"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="font-serif text-[0.95rem] text-[#333333] transition-colors duration-150">
                                      {item}
                                    </span>
                                    {cat.newItem === item && (
                                      <span className="text-[0.52rem] tracking-[0.25em] uppercase font-sans text-white bg-[#333333] px-2 py-0.5 rounded-full">
                                        New
                                      </span>
                                    )}
                                  </div>
                                  <ArrowUpRight size={12} strokeWidth={1.5} className="text-[#B8B4AE] opacity-0 -translate-x-1.5 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={cat.href}
                            className="group/all inline-flex items-center gap-1.5 mt-5 text-[0.62rem] tracking-[0.25em] uppercase font-sans text-[#333333] hover:text-[#333333] transition-colors duration-200"
                          >
                            View All {cat.short}
                            <ArrowUpRight size={10} strokeWidth={1.5} className="group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform duration-200" />
                          </Link>
                        </div>

                        <div className="w-48 flex-shrink-0 relative overflow-hidden group/panel">
                          <Image
                            src={cat.image}
                            alt={cat.label}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover/panel:scale-[1.04]"
                            sizes="192px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="font-serif italic text-white/85 text-sm leading-snug mb-2.5">{cat.featured}</p>
                            <div className="flex items-center gap-1.5 text-[0.58rem] tracking-[0.22em] uppercase font-sans text-white/60 group-hover/panel:text-white transition-colors duration-200">
                              Shop Collection
                              <ArrowUpRight size={9} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right — dealer login, search, account, cart, shop */}
            <div className="flex items-center gap-2.5 flex-shrink-0">

              {/* Dealer button */}
              {isDealer ? (
                <button
                  onClick={() => signOut({ redirect: false })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-[0.68rem] tracking-[0.12em] uppercase font-semibold bg-[#333333] text-white hover:bg-[#1F1F1F] transition-all duration-300 hover:-translate-y-px"
                >
                  <span className="text-[0.6rem]">✓</span>
                  Dealer
                  <span className="text-[0.6rem] opacity-50">· Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/wholesale"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-[0.68rem] tracking-[0.12em] uppercase font-semibold bg-[#333333] text-white hover:bg-[#1F1F1F] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-px"
                >
                  Dealer Login
                </Link>
              )}

              {/* Search */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    <motion.div
                      key="search-open"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <Search size={12} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7672]" />
                        <input
                          autoFocus
                          type="search"
                          placeholder="Search planters..."
                          onBlur={() => setSearchOpen(false)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs font-sans border rounded-full focus:outline-none bg-[#F4F4F4] border-[#D6D3CE] text-[#333333] placeholder:text-[#7A7672]/50 focus:border-[#B8B4AE] transition-colors duration-200"
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
                      className="w-9 h-9 flex items-center justify-center rounded-full text-[#333333]/45 hover:text-[#333333] transition-colors duration-200"
                      aria-label="Search"
                    >
                      <Search size={16} strokeWidth={1.5} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="w-9 h-9 flex items-center justify-center rounded-full text-[#333333]/45 hover:text-[#333333] transition-colors duration-200"
                aria-label="Account"
              >
                <User size={16} strokeWidth={1.5} />
              </button>

              <Link
                href="#"
                className="flex items-center gap-1.5 text-[#333333]/55 hover:text-[#333333] transition-colors duration-200"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart size={16} strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#333333] text-white text-[0.48rem] flex items-center justify-center font-sans font-semibold">
                    0
                  </span>
                </div>
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[0.68rem] tracking-[0.14em] uppercase font-sans font-bold bg-[#333333] text-white hover:bg-[#1F1F1F] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-[85vw] max-w-sm bg-white flex flex-col shadow-[-12px_0_40px_rgba(0,0,0,0.12)]"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-[4.5rem] border-b border-[#D6D3CE] flex-shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex">
                  <Image
                    src="/jackson-pottery-logo.png"
                    alt="Jackson Pottery"
                    width={1238}
                    height={240}
                    className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#D6D3CE] flex items-center justify-center text-[#333333]/45 hover:text-[#333333] hover:border-[#333333]/40 transition-all duration-200"
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
                    className="border-b border-[#D6D3CE]/70"
                  >
                    <Link
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between px-6 py-5"
                    >
                      <div>
                        <span className="font-sans text-sm font-medium text-[#333333] group-hover:text-[#333333] transition-colors duration-200 block">
                          {cat.label}
                        </span>
                        <span className="font-serif italic text-[0.72rem] text-[#333333]/45 group-hover:text-[#333333]/70 transition-colors duration-200 mt-0.5 block">
                          {cat.featured}
                        </span>
                      </div>
                      <ArrowUpRight size={14} strokeWidth={1.5} className="text-[#333333]/30 group-hover:text-[#333333]/70 flex-shrink-0 ml-4 transition-colors duration-200" />
                    </Link>
                  </motion.div>
                ))}

                {/* Dealer & Distributor */}
                <motion.div
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[#D6D3CE] bg-[#F4F4F4] px-6 py-4"
                >
                  {isDealer ? (
                    <button
                      onClick={() => { setMobileOpen(false); signOut({ redirect: false }) }}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#333333]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#333333] text-xs">✓</span>
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-[#333333] leading-tight">Dealer Active</p>
                          <p className="font-sans text-[0.62rem] text-[#333333]/50 mt-0.5">Wholesale pricing enabled</p>
                        </div>
                      </div>
                      <span className="font-sans text-[0.62rem] tracking-[0.12em] uppercase text-[#333333]/50">Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      href="/wholesale"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#333333]/10 border border-[#333333]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#333333]/70 text-xs">↗</span>
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-[#333333] leading-tight">Dealer & Distributor</p>
                          <p className="font-sans text-[0.62rem] text-[#333333]/50 mt-0.5">Wholesale pricing access</p>
                        </div>
                      </div>
                      <ArrowUpRight size={14} strokeWidth={1.5} className="text-[#333333]/40 flex-shrink-0" />
                    </Link>
                  )}
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.36 }}
                  className="flex items-center gap-3 px-6 py-5 border-b border-[#D6D3CE]/60"
                >
                  <Phone size={13} strokeWidth={1.5} className="text-[#333333]/45" />
                  <div>
                    <p className="text-[0.58rem] tracking-widest uppercase font-sans text-[#333333]/45">Call Us</p>
                    <p className="text-sm font-sans font-medium text-[#333333]">(877) 533-7687</p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="p-6 space-y-3"
                >
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-[#333333] text-white text-[0.72rem] tracking-[0.14em] uppercase font-sans font-semibold hover:bg-[#1F1F1F] transition-colors duration-200"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom */}
              <div className="px-6 py-5 border-t border-[#D6D3CE] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#D6D3CE]" />
                  <span className="text-[0.52rem] tracking-[0.4em] uppercase font-sans text-[#333333]/35">Since 2009</span>
                  <div className="h-px flex-1 bg-[#D6D3CE]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
