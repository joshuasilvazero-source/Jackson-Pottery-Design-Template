'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Ruler, Palette, Truck, HeartHandshake } from 'lucide-react'

const includes = [
  { icon: Ruler,          label: 'Space Assessment',   sub: 'We review your dimensions and layout' },
  { icon: Palette,        label: 'Style Curation',      sub: 'Personalised piece recommendations' },
  { icon: Truck,          label: 'Logistics Planning', sub: 'Delivery, placement & installation advice' },
  { icon: HeartHandshake, label: 'Ongoing Support',    sub: 'Follow-up after your pieces arrive' },
]

export default function DesignConsultation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-6%' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <section className="bg-[#0C0A08] py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          position: 'absolute',
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(184,146,74,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(139,83,50,0.04) 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left — copy */}
          <div>
            <motion.div {...fade(0)} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold/50" />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase font-sans text-gold/70">
                Free Design Help
              </span>
            </motion.div>

            <motion.h2 {...fade(0.08)} className="font-serif font-bold text-display-lg text-white leading-tight mb-5">
              Designing your<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                dream space?
              </span>
            </motion.h2>

            <motion.p {...fade(0.14)} className="font-sans text-stone text-[0.9375rem] leading-relaxed mb-10 max-w-md">
              Whether you're transforming a backyard, refreshing a patio, or curating your home's indoor-outdoor flow — our design team will help you find the perfect pieces for your space and budget.
            </motion.p>

            <motion.div {...fade(0.2)} className="space-y-5">
              {includes.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.26 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={14} strokeWidth={1.5} className="text-gold/70" />
                  </div>
                  <div>
                    <p className="font-sans text-[0.78rem] font-medium text-white/80 tracking-wide mb-0.5">{item.label}</p>
                    <p className="font-sans text-stone/70 text-xs leading-relaxed">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-8 lg:p-10 backdrop-blur-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-5">
                    <Check size={22} strokeWidth={1.5} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-white text-xl mb-3">Request Received</h3>
                  <p className="font-sans text-stone text-sm leading-relaxed max-w-xs">
                    Our design team will reach out within one business day to schedule your complimentary consultation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase font-sans text-stone/60 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.09] text-white text-sm font-sans placeholder:text-stone/30 focus:outline-none focus:border-gold/30 transition-colors duration-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase font-sans text-stone/60 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.09] text-white text-sm font-sans placeholder:text-stone/30 focus:outline-none focus:border-gold/30 transition-colors duration-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase font-sans text-stone/60 mb-2">Project Type</label>
                    <select
                      required
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.09] text-sm font-sans focus:outline-none focus:border-gold/30 transition-colors duration-300 rounded-lg appearance-none text-stone/60"
                      style={{ color: form.type ? 'rgba(255,255,255,0.85)' : undefined }}
                    >
                      <option value="" disabled>Select project type</option>
                      <option value="residential" className="bg-[#1A1714] text-white">Home / Residential</option>
                      <option value="patio" className="bg-[#1A1714] text-white">Patio & Outdoor Living</option>
                      <option value="garden" className="bg-[#1A1714] text-white">Garden Project</option>
                      <option value="commercial" className="bg-[#1A1714] text-white">Commercial / Hospitality</option>
                      <option value="other" className="bg-[#1A1714] text-white">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.6rem] tracking-[0.3em] uppercase font-sans text-stone/60 mb-2">Tell Us About Your Space</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Space type, size, style goals, timeline..."
                      className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.09] text-white text-sm font-sans placeholder:text-stone/30 focus:outline-none focus:border-gold/30 transition-colors duration-300 rounded-lg resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-ink text-[0.72rem] tracking-[0.14em] uppercase font-sans font-medium hover:bg-ash-100 hover:shadow-[0_8px_28px_rgba(255,255,255,0.15)] hover:-translate-y-px transition-all duration-300 mt-2"
                  >
                    Request a Consultation
                    <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <p className="text-center text-[0.6rem] font-sans text-stone/35 tracking-wide">
                    No commitment required · Response within 1 business day
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
