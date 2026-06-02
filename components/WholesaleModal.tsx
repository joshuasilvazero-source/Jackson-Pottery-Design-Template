'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { X, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

interface WholesaleModalProps {
  open: boolean
  onClose: () => void
}

export default function WholesaleModal({ open, onClose }: WholesaleModalProps) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset state on close
  useEffect(() => {
    if (!open) {
      setError('')
      setEmail('')
      setPassword('')
    }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      onClose()
    }
  }

  const bodyProps = { email, setEmail, password, setPassword, loading, error, onSubmit: handleSubmit, onClose }

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
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ── Mobile: slides up from bottom ── */}
          <motion.div
            key="modal-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-[71] rounded-t-3xl overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="bg-[#1E1E1E] flex justify-center pt-3.5 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <ModalBody {...bodyProps} />
          </motion.div>

          {/* ── Desktop: centered modal ── */}
          <motion.div
            key="modal-desktop"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="hidden sm:flex fixed inset-0 z-[71] items-center justify-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-[420px] pointer-events-auto rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
              <ModalBody {...bodyProps} />
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
  const [showPassword, setShowPassword] = useState(false)

  const inputBase =
    'w-full h-12 px-4 rounded-xl font-sans text-sm text-white placeholder:text-white/25 focus:outline-none transition-all duration-200'
  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.10)',
  }
  const inputErrorStyle = {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.30)',
  }
  const focusStyle  = { border: '1px solid rgba(212,168,85,0.55)', boxShadow: '0 0 0 3px rgba(212,168,85,0.10)' }
  const blurStyle   = (hasError: boolean) => hasError ? inputErrorStyle : inputStyle

  return (
    <div className="bg-[#1E1E1E] relative">
      {/* Gold accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #B8924A 0%, #e0b96a 50%, #B8924A 100%)' }}
      />

      <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-8 sm:pb-10">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close login"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
        >
          <X size={13} strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="text-center mb-7">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ background: 'rgba(212,168,85,0.10)', border: '1px solid rgba(212,168,85,0.22)' }}
          >
            <span className="text-[1.1rem] leading-none" style={{ color: '#d4a855' }}>✦</span>
          </div>

          <p
            className="font-sans text-[0.5rem] tracking-[0.4em] uppercase mb-2 font-medium"
            style={{ color: 'rgba(212,168,85,0.70)' }}
          >
            Jackson Pottery &nbsp;·&nbsp; Trade Portal
          </p>

          <h2 className="font-serif font-semibold text-[1.4rem] sm:text-[1.5rem] leading-tight mb-2.5"
            style={{ color: 'rgba(255,255,255,0.95)' }}
          >
            Dealer &amp; Distributor Access
          </h2>

          <p className="font-sans text-[0.76rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Sign in to unlock exclusive trade pricing and the full dealer catalog.
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
              <div
                className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <span className="text-sm mt-px flex-shrink-0" style={{ color: '#f87171' }}>⚠</span>
                <p className="font-sans text-[0.74rem] leading-relaxed" style={{ color: '#fca5a5' }}>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4" noValidate>

          {/* Email */}
          <div>
            <label className="block font-sans text-[0.57rem] tracking-[0.20em] uppercase mb-2"
              style={{ color: 'rgba(255,255,255,0.40)' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              required
              autoFocus
              autoComplete="email"
              className={inputBase}
              style={inputStyle}
              onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
              onBlur={e => Object.assign(e.currentTarget.style, blurStyle(false))}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-sans text-[0.57rem] tracking-[0.20em] uppercase mb-2"
              style={{ color: 'rgba(255,255,255,0.40)' }}>
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
                className={`${inputBase} pr-12`}
                style={error ? inputErrorStyle : inputStyle}
                onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={e => Object.assign(e.currentTarget.style, blurStyle(!!error))}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.30)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.30)' }}
              >
                {showPassword
                  ? <EyeOff size={15} strokeWidth={1.5} />
                  : <Eye size={15} strokeWidth={1.5} />
                }
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-sans text-[0.72rem] tracking-[0.18em] uppercase font-bold text-white flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-70 hover:-translate-y-px"
              style={{
                background: loading
                  ? '#c9a050'
                  : 'linear-gradient(135deg, #B8924A 0%, #d4a855 50%, #B8924A 100%)',
                boxShadow: loading ? 'none' : '0 6px 28px rgba(184,146,74,0.45)',
              }}
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                  Signing In…
                </>
              ) : (
                <>
                  Sign In to Portal
                  <ArrowRight size={13} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Secure divider */}
        <div className="flex items-center gap-3 mt-5 mb-4">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
            <Lock size={9} strokeWidth={1.5} />
            <span className="font-sans text-[0.44rem] tracking-[0.22em] uppercase">Secure · Encrypted</span>
          </div>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Footer */}
        <p className="text-center font-sans text-[0.65rem] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.32)' }}>
          Don&rsquo;t have an account?{' '}
          <a
            href="mailto:hello@jacksonpottery.com"
            className="font-semibold transition-colors duration-200"
            style={{ color: '#d4a855' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8c87a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#d4a855' }}
          >
            Request wholesale access →
          </a>
        </p>

      </div>
    </div>
  )
}
