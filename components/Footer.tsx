'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, Phone, ArrowRight } from 'lucide-react'

const collections = ['Landscape Planters', 'Garden Planters', 'Fountains', 'Accessories', 'New Arrivals', 'Sale']
const spaces      = ['Patio & Terrace', 'Garden', 'Indoor Living', 'Balcony & Rooftop', 'Poolside', 'Office']
const support     = ['Sizing Guide', 'Care Instructions', 'Shipping & Delivery', 'Returns & Exchanges', 'FAQ', 'Contact Us']

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1.5 font-sans text-[#333333] text-sm hover:text-[#333333] transition-colors duration-200 py-1"
    >
      {children}
      <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#F4F4F4] border-t border-[#D6D3CE]">

      {/* ── Newsletter strip ── */}
      <div className="border-b border-[#D6D3CE]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-12">
          <div className="max-w-2xl mx-auto">
            <p className="font-sans text-[0.62rem] tracking-[0.32em] uppercase text-[#333333]/40 text-center mb-3">
              Stay Connected
            </p>
            <h3 className="font-serif text-2xl lg:text-[1.9rem] text-[#333333] text-center mb-2">
              Stay in the world of Jackson Pottery
            </h3>
            <p className="font-sans text-[#333333]/45 text-sm text-center mb-6">
              New arrivals, design inspiration, and exclusive offers.
            </p>
            <form
              className="flex w-full rounded-full overflow-hidden border border-[#D6D3CE] focus-within:border-[#333333]/40 transition-colors duration-300 bg-white"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-transparent text-[#333333] text-sm font-sans placeholder:text-[#333333]/30 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="px-7 py-4 bg-[#333333] text-white text-[0.72rem] font-sans font-semibold tracking-[0.14em] uppercase hover:bg-[#1F1F1F] transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        {/* ── DESKTOP layout (lg+) ── */}
        <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 py-16">

          {/* Brand column */}
          <div>
            <div className="mb-7">
              <Link href="/" className="inline-flex items-center group">
                <Image
                  src="/jackson-pottery-logo.png"
                  alt="Jackson Pottery"
                  width={1238}
                  height={240}
                  className="h-12 w-auto opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </div>
            <p className="font-sans text-[#333333] text-sm leading-relaxed max-w-[260px] mb-8">
              Premium handcrafted planters and outdoor décor that elevate every space they inhabit.
            </p>
            <div className="space-y-3">
              <a href="tel:8775337687" className="flex items-center gap-2.5 text-[#333333] hover:text-[#333333] transition-colors duration-200">
                <Phone size={13} strokeWidth={1.5} />
                <span className="font-sans text-sm">(877) 533-7687</span>
              </a>
              <a href="mailto:hello@jacksonpottery.com" className="flex items-center gap-2.5 text-[#333333] hover:text-[#333333] transition-colors duration-200">
                <Mail size={13} strokeWidth={1.5} />
                <span className="font-sans text-sm">hello@jacksonpottery.com</span>
              </a>
              <a href="https://instagram.com/jacksonpottery" className="flex items-center gap-2.5 text-[#333333] hover:text-[#333333] transition-colors duration-200">
                <Instagram size={13} strokeWidth={1.5} />
                <span className="font-sans text-sm">@JacksonPottery</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/65 mb-6">Collections</h4>
            <ul className="space-y-3.5">
              {collections.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Shop by Space */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/65 mb-6">By Space</h4>
            <ul className="space-y-3.5">
              {spaces.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-[#333333]/65 mb-6">Support</h4>
            <ul className="space-y-3.5">
              {support.map((item) => (
                <li key={item}><NavLink href="/shop">{item}</NavLink></li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[#D6D3CE]">
              <Link
                href="/wholesale"
                className="group flex items-center gap-1.5 font-sans text-[#333333] text-sm hover:text-[#333333] transition-colors duration-200 py-1"
              >
                Dealer Login
                <ArrowRight size={10} strokeWidth={1.5} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
              </Link>
              <p className="font-sans text-[#333333]/60 text-xs mt-1.5 leading-relaxed">
                Verified dealer accounts.<br />Sign in for trade pricing.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE layout (below lg) ── */}
        <div className="lg:hidden py-12 flex flex-col items-center text-center gap-9">

          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/jackson-pottery-logo.png"
              alt="Jackson Pottery"
              width={1238}
              height={240}
              className="h-10 w-auto opacity-85"
            />
          </Link>

          {/* Tagline */}
          <p className="font-sans text-[#333333] text-sm leading-relaxed max-w-[280px]">
            Premium handcrafted planters and outdoor décor that elevate every space they inhabit.
          </p>

          {/* Contact icons */}
          <div className="flex items-center justify-center gap-5">
            <a href="tel:8775337687" aria-label="Call us" className="w-11 h-11 rounded-full border border-[#D6D3CE] flex items-center justify-center text-[#333333]/45 hover:text-[#333333] hover:border-[#333333]/40 transition-all duration-200">
              <Phone size={15} strokeWidth={1.5} />
            </a>
            <a href="mailto:hello@jacksonpottery.com" aria-label="Email us" className="w-11 h-11 rounded-full border border-[#D6D3CE] flex items-center justify-center text-[#333333]/45 hover:text-[#333333] hover:border-[#333333]/40 transition-all duration-200">
              <Mail size={15} strokeWidth={1.5} />
            </a>
            <a href="https://instagram.com/jacksonpottery" aria-label="Instagram" className="w-11 h-11 rounded-full border border-[#D6D3CE] flex items-center justify-center text-[#333333]/45 hover:text-[#333333] hover:border-[#333333]/40 transition-all duration-200">
              <Instagram size={15} strokeWidth={1.5} />
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="h-px flex-1 bg-[#D6D3CE]" />
            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#333333]/30">Since 1983</span>
            <div className="h-px flex-1 bg-[#D6D3CE]" />
          </div>

          {/* Compact link grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full max-w-xs text-left">
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
                className="font-sans text-[#333333] text-sm hover:text-[#333333] transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/wholesale"
              className="font-sans text-[#333333] text-sm hover:text-[#333333] transition-colors duration-200"
            >
              Dealer Login
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#D6D3CE]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[#333333]/60 text-xs tracking-wide">
            © {new Date().getFullYear()} Jackson Pottery. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="font-sans text-[#333333]/60 text-xs hover:text-[#333333] transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
