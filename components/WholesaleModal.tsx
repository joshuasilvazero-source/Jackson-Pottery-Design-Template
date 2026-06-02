'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { X, Lock } from 'lucide-react'

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
      setError('Invalid email or password. Please try again.')
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
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-0 z-[71] flex items-center justify-center px-4 pointer-events-none"
            onClick={handleBackdropClick}
          >
            <div className="relative w-full max-w-[400px] pointer-events-auto overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18),0_4px_24px_rgba(0,0,0,0.08)]">

              {/* Gold accent bar at top */}
              <div
                className="h-[3px] w-full"
                style={{ background: 'linear-gradient(90deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)' }}
              />

              {/* Modal body — cream/white background */}
              <div className="bg-[#FDFAF5] px-8 pt-8 pb-8">

                {/* Close */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-ash-100 hover:bg-ash-200 flex items-center justify-center text-ink/40 hover:text-ink transition-all duration-200"
                >
                  <X size={13} strokeWidth={1.8} />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  {/* Logo mark */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/30 bg-gold/[0.06] mb-5">
                    <span className="text-gold text-base leading-none">✦</span>
                  </div>

                  {/* Brand line */}
                  <p className="font-sans text-[0.52rem] tracking-[0.38em] uppercase text-gold/70 mb-2">
                    Jackson Pottery
                  </p>

                  <h2 className="font-serif font-semibold text-[1.4rem] text-ink leading-tight mb-2">
                    Trade Account Access
                  </h2>

                  <p className="font-sans text-[0.78rem] text-muted leading-relaxed">
                    Sign in to unlock exclusive wholesale pricing.
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
                      <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                        <span className="text-red-400 text-sm mt-px flex-shrink-0">⚠</span>
                        <p className="font-sans text-[0.75rem] text-red-600 leading-relaxed">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">

                  {/* Email */}
                  <div>
                    <label className="block font-sans text-[0.62rem] tracking-[0.18em] uppercase text-ink/50 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError('') }}
                      placeholder="your@company.com"
                      required
                      autoComplete="email"
                      className="w-full h-12 px-4 bg-white border border-border rounded-xl font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block font-sans text-[0.62rem] tracking-[0.18em] uppercase text-ink/50 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError('') }}
                      placeholder="••••••••••"
                      required
                      autoComplete="current-password"
                      className={`w-full h-12 px-4 bg-white border rounded-xl font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 ${
                        error ? 'border-red-300 bg-red-50/30' : 'border-border'
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl font-sans text-[0.72rem] tracking-[0.18em] uppercase font-semibold text-ink transition-all duration-300 disabled:opacity-60 hover:-translate-y-px"
                      style={{
                        background: loading
                          ? '#d4a855'
                          : 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                        boxShadow: loading ? 'none' : '0 4px 20px rgba(184,146,74,0.35)',
                      }}
                    >
                      {loading ? 'Signing in…' : 'Sign In to Trade Portal'}
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-1.5 text-muted/50">
                    <Lock size={9} strokeWidth={1.5} />
                    <span className="font-sans text-[0.48rem] tracking-[0.2em] uppercase">Secure Login</span>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Footer */}
                <p className="text-center font-sans text-[0.65rem] text-muted/60 leading-relaxed">
                  Don&rsquo;t have an account?{' '}
                  <a
                    href="mailto:hello@jacksonpottery.com"
                    className="text-gold hover:text-ink transition-colors duration-200 font-medium"
                  >
                    Request wholesale access →
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
