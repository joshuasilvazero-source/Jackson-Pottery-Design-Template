'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Phone, ArrowRight } from 'lucide-react'

const collections = ['Landscape Planters', 'Garden Planters', 'Fountains', 'Accessories', 'New Arrivals', 'Sale']
const spaces = ['Patio & Terrace', 'Garden', 'Indoor Living', 'Balcony & Rooftop', 'Poolside', 'Office']
const support = ['Sizing Guide', 'Care Instructions', 'Shipping & Delivery', 'Returns & Exchanges', 'FAQ', 'Contact Us']

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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1.5 font-sans text-ash-400/55 text-[0.82rem] hover:text-white transition-colors duration-200 py-1"
    >
      {children}
      <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">

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

      {/* ── Main body ────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* ── DESKTOP layout (lg+) ─────────────────────────── */}
        <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 py-20">

          {/* Brand column */}
          <div>
            <div className="mb-7">
              <FooterLogo />
            </div>
            <p className="font-sans text-ash-400/60 text-sm leading-relaxed max-w-[260px] mb-8">
              Premium handcrafted planters and outdoor décor that elevate every space they inhabit.
            </p>
            <div className="space-y-3">
              <a href="tel:8775337687" className="flex items-center gap-2.5 text-ash-400/50 hover:text-white transition-colors duration-200">
                <Phone size={12} strokeWidth={1.5} />
                <span className="font-sans text-xs">(877) 533-7687</span>
              </a>
              <a href="mailto:hello@jacksonpottery.com" className="flex items-center gap-2.5 text-ash-400/50 hover:text-white transition-colors duration-200">
                <Mail size={12} strokeWidth={1.5} />
                <span className="font-sans text-xs">hello@jacksonpottery.com</span>
              </a>
              <a href="https://instagram.com/jacksonpottery" className="flex items-center gap-2.5 text-ash-400/50 hover:text-white transition-colors duration-200">
                <Instagram size={12} strokeWidth={1.5} />
                <span className="font-sans text-xs">@JacksonPottery</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">Collections</h4>
            <ul className="space-y-3.5">
              {collections.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Shop by Space */}
          <div>
            <h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">By Space</h4>
            <ul className="space-y-3.5">
              {spaces.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-[0.56rem] tracking-[0.38em] uppercase text-white/40 mb-6">Support</h4>
            <ul className="space-y-3.5">
              {support.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <Link
                href="/wholesale"
                className="group flex items-center gap-1.5 font-sans text-white/45 text-[0.82rem] hover:text-white transition-colors duration-200 py-1"
              >
                Dealer Login
                <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
              </Link>
              <p className="font-sans text-ash-400/35 text-[0.7rem] mt-1.5 leading-relaxed">
                Verified dealer accounts.<br />Sign in for trade pricing.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE layout (below lg) ──────────────────────── */}
        <div className="lg:hidden py-14 flex flex-col items-center text-center gap-10">

          {/* Logo */}
          <FooterLogo />

          {/* Tagline */}
          <p className="font-sans text-ash-400/55 text-sm leading-relaxed max-w-[280px]">
            Premium handcrafted planters and outdoor décor that elevate every space they inhabit.
          </p>

          {/* Contact icons */}
          <div className="flex items-center justify-center gap-6">
            <a href="tel:8775337687" aria-label="Call us" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ash-400/50 hover:text-white hover:border-white/25 transition-all duration-200">
              <Phone size={14} strokeWidth={1.5} />
            </a>
            <a href="mailto:hello@jacksonpottery.com" aria-label="Email us" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ash-400/50 hover:text-white hover:border-white/25 transition-all duration-200">
              <Mail size={14} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com/jacksonpottery" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ash-400/50 hover:text-white hover:border-white/25 transition-all duration-200">
              <Instagram size={14} strokeWidth={1.5} />
            </a>
          </div>

          {/* Divider with "Since 2009" */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))' }} />
            <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-ash-400/30">Since 2009</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.15))' }} />
          </div>

          {/* Compact link grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-3.5 w-full max-w-xs text-left">
            {[
              'Landscape Planters', 'Patio & Terrace',
              'Garden Planters',    'Indoor Living',
              'Fountains',          'Poolside',
              'Accessories',        'Contact Us',
              'FAQ',                'Shipping & Delivery',
            ].map((item) => (
              <Link
                key={item}
                href="/shop"
                className="font-sans text-ash-400/50 text-[0.78rem] hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/wholesale"
              className="font-sans text-white/45 text-[0.78rem] hover:text-white transition-colors duration-200 text-left"
            >
              ✦ Dealer Login
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-ash-400/30 text-[0.6rem] tracking-wide">
            © {new Date().getFullYear()} Jackson Pottery. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="font-sans text-ash-400/25 text-[0.6rem] hover:text-ash-400/60 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
