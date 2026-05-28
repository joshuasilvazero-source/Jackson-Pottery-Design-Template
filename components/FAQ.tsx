'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/lib/data'

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="relative bg-[#F4EFE6] py-section">
      {/* Soft fade from dark section above */}
      <div className="absolute top-0 inset-x-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(12,10,8,0.08) 0%, transparent 100%)' }} />
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 lg:gap-20">

          {/* Left */}
          <div ref={ref} className="lg:sticky lg:top-36 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="section-label mb-3"
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="font-serif font-bold text-display-md text-ink leading-tight mb-5"
            >
              Questions about<br />our planters?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 }}
              className="w-10 h-0.5 bg-gold/60 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-sans text-muted text-sm leading-relaxed max-w-xs mb-8"
            >
              Everything you need to know about materials, durability, and care.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.28 }}
              href="#design-consultation"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-gold/70 hover:text-ink transition-colors duration-300"
            >
              Still have questions? →
            </motion.a>
          </div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="divide-y divide-border/50"
          >
            {faqs.map((faq, i) => (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className={`font-serif text-[1.0625rem] leading-snug transition-colors duration-300 ${openId === faq.id ? 'text-gold' : 'text-ink group-hover:text-gold'}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openId === faq.id ? 'border-gold bg-gold text-ink' : 'border-border text-muted group-hover:border-gold group-hover:text-gold'}`}>
                    {openId === faq.id ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-4 sm:pr-12 font-sans text-muted text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
