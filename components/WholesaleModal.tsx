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
