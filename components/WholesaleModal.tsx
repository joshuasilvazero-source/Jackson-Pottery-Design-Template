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

          {/* ── Mobile: slides up from bottom ── */}
          <motion.div
            key="modal-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-[71] overflow-hidden rounded-t-3xl shadow-[0_-16px_60px_rgba(0,0,0,0.18)]"
          >
            {/* Drag handle */}
            <div className="bg-[#FDFAF5] flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <ModalBody
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              loading={loading} error={error}
              onSubmit={handleSubmit} onClose={onClose}
            />
          </motion.div>

          {/* ── Desktop: centered modal ── */}
          <motion.div
            key="modal-desktop"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="hidden sm:flex fixed inset-0 z-[71] items-center justify-center px-4 pointer-events-none"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
          >
            <div className="w-full max-w-[400px] pointer-events-auto overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18),0_4px_24px_rgba(0,0,0,0.08)]">
              <ModalBody
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                loading={loading} error={error}
                onSubmit={handleSubmit} onClose={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ModalBody({
  email, setEmail, password, setPassword,
  loading, error, onSubmit, onClose,
}: {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  loading: boolean
  error: string
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}) {
  return (
    <div className="bg-[#FDFAF5]">
      {/* Gold accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)' }}
      />

      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-7 sm:pb-8">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-ash-100 hover:bg-ash-200 flex items-center justify-center text-ink/40 hover:text-ink transition-all duration-200"
        >
          <X size={13} strokeWidth={1.8} />
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gold/30 bg-gold/[0.06] mb-4">
            <span className="text-gold text-base leading-none">✦</span>
          </div>
          <p className="font-sans text-[0.52rem] tracking-[0.38em] uppercase text-gold/70 mb-1.5">
            Jackson Pottery
          </p>
          <h2 className="font-serif font-semibold text-xl sm:text-[1.4rem] text-ink leading-tight mb-1.5">
            Dealer &amp; Distributor Access
          </h2>
          <p className="font-sans text-[0.75rem] sm:text-[0.78rem] text-muted leading-relaxed">
            Sign in to unlock exclusive trade pricing.
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 14 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-2.5 px-3.5 py-3 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-red-400 text-sm mt-px flex-shrink-0">⚠</span>
                <p className="font-sans text-[0.74rem] text-red-600 leading-relaxed">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block font-sans text-[0.6rem] tracking-[0.18em] uppercase text-ink/50 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              required
              autoComplete="email"
              className="w-full h-11 sm:h-12 px-4 bg-white border border-border rounded-xl font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block font-sans text-[0.6rem] tracking-[0.18em] uppercase text-ink/50 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              autoComplete="current-password"
              className={`w-full h-11 sm:h-12 px-4 bg-white border rounded-xl font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200 ${
                error ? 'border-red-300 bg-red-50/30' : 'border-border'
              }`}
            />
          </div>

          <div className="pt-1.5">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 sm:h-12 rounded-xl font-sans text-[0.7rem] sm:text-[0.72rem] tracking-[0.18em] uppercase font-semibold text-ink transition-all duration-300 disabled:opacity-60 hover:-translate-y-px"
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
        <div className="flex items-center gap-3 my-4 sm:my-5">
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-1.5 text-muted/50">
            <Lock size={9} strokeWidth={1.5} />
            <span className="font-sans text-[0.46rem] tracking-[0.2em] uppercase">Secure Login</span>
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Footer */}
        <p className="text-center font-sans text-[0.63rem] text-muted/60 leading-relaxed">
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
  )
}
