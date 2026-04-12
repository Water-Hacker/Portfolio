import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Vault content is AES-256-GCM encrypted. Layout: [16B salt][12B IV][ciphertext+tag]
// Key derived with PBKDF2-SHA256 (600,000 iterations). No plaintext or hash stored.
const VAULT_CIPHERTEXT = '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'
const PBKDF2_ITERATIONS = 600_000

async function decryptVault(password) {
  const raw = Uint8Array.from(atob(VAULT_CIPHERTEXT), c => c.charCodeAt(0))
  const salt = raw.slice(0, 16)
  const iv = raw.slice(16, 28)
  const ciphertext = raw.slice(28)
  const keyMaterial = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  )
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
  return JSON.parse(new TextDecoder().decode(plaintext))
}


function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-[10px] text-[#00E5FF]/50 tracking-[0.4em]">{number}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00E5FF]/30 to-transparent" />
      <span className="font-mono text-[10px] text-[#00E5FF]/50 tracking-[0.4em] uppercase">{label}</span>
    </div>
  )
}

export default function Vault() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [unlocked, setUnlocked] = useState(false)
  const [modules, setModules] = useState(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [activeModule, setActiveModule] = useState(0)
  const [shake, setShake] = useState(false)
  const [decrypting, setDecrypting] = useState(false)

  const handleUnlock = async (e) => {
    e.preventDefault()
    setDecrypting(true)
    try {
      const decrypted = await decryptVault(input)
      setModules(decrypted)
      setUnlocked(true)
      setError('')
    } catch {
      setAttempts(a => a + 1)
      setError(`ACCESS DENIED — INVALID CREDENTIALS [ATTEMPT ${attempts + 1}]`)
      setInput('')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setDecrypting(false)
    }
  }

  return (
    <section id="vault" ref={ref} className="relative py-32 px-6 bg-[#050505]">
      <div className="section-divider mb-0" />

      {/* Subtle diagonal stripes bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(212,175,55,0.02) 40px, rgba(212,175,55,0.02) 80px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel number="// 04" label="Classified Vault" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Secure{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Operations Center
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Architecture over code. Clearance required for proprietary system blueprints.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <GateLock key="gate" inView={inView} input={input} setInput={setInput} error={error} shake={shake} onSubmit={handleUnlock} attempts={attempts} decrypting={decrypting} />
          ) : (
            <VaultContent key="vault" modules={modules} activeModule={activeModule} setActiveModule={setActiveModule} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function GateLock({ inView, input, setInput, error, shake, onSubmit, attempts, decrypting }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`relative border border-[#D4AF37]/20 p-10 max-w-2xl mx-auto ${shake ? 'animate-shake' : ''}`}
      style={{ background: 'rgba(5,5,5,0.95)' }}
    >
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60" />

      {/* Lock icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-[#D4AF37]/50 flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.05)', boxShadow: '0 0 30px rgba(212,175,55,0.1)' }}>
            <span className="text-3xl">⬡</span>
          </div>
          <div className="absolute -inset-3 border border-[#D4AF37]/15 animate-pulse" />
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="font-mono text-[9px] tracking-[0.5em] text-[#D4AF37]/50 uppercase mb-3">
          CLASSIFIED ARCHITECTURE VAULT
        </div>
        <h3 className="font-sans font-black text-2xl text-white mb-2">CLEARANCE REQUIRED</h3>
        <p className="font-mono text-xs text-[#e0e0e0]/40 leading-relaxed">
          The architectures described herein are protected under international NDA.<br />
          Full technical auditing available via secure physical terminal only.
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-2">
            ENTER ACCESS CODE:
          </div>
          <div className="relative">
            <input
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="••••••••••••••"
              autoComplete="off"
              className="w-full bg-[#0a0a0a] border border-[#D4AF37]/30 focus:border-[#D4AF37]/70 outline-none font-mono text-sm text-[#D4AF37] tracking-widest px-4 py-3 placeholder-[#D4AF37]/20 transition-all duration-300"
              style={{ caretColor: '#D4AF37' }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#D4AF37]/30 tracking-widest">
              {attempts > 0 ? `${attempts} ATTEMPT${attempts > 1 ? 'S' : ''}` : 'ENCRYPTED'}
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[10px] text-[#ff6b6b] tracking-widest border border-[#ff6b6b]/20 px-3 py-2"
            style={{ background: 'rgba(255,107,107,0.05)' }}
          >
            ⚠ {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={decrypting}
          className="w-full font-mono text-xs tracking-[0.3em] uppercase py-3 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="group-hover:tracking-[0.4em] transition-all duration-300">
            {decrypting ? 'DECRYPTING...' : 'REQUEST ACCESS'}
          </span>
        </button>
      </form>


    </motion.div>
  )
}

function VaultContent({ modules, activeModule, setActiveModule }) {
  const mod = modules[activeModule]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border border-[#00E5FF]/20"
      style={{ background: 'rgba(0,229,255,0.01)' }}
    >
      {/* SOC Header bar */}
      <div className="border-b border-[#00E5FF]/15 px-6 py-4 flex flex-wrap items-center justify-between gap-4"
        style={{ background: 'rgba(0,229,255,0.04)' }}>
        <div>
          <div className="font-mono text-[9px] text-[#00E5FF]/50 tracking-[0.4em] uppercase">
            SECURE OPERATIONS CENTER // ACCESS_GRANTED
          </div>
          <div className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold mt-0.5">
            SECURITY ARCHITECT LEVEL 5
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[9px] text-green-400 tracking-widest">SESSION ACTIVE</span>
        </div>
      </div>

      {/* Module tabs */}
      <div className="flex border-b border-[#00E5FF]/10 overflow-x-auto">
        {modules.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(i)}
            className={`flex-shrink-0 px-6 py-4 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 border-r border-[#00E5FF]/10 ${
              activeModule === i
                ? 'text-[#00E5FF] border-b-2 border-b-[#00E5FF]'
                : 'text-[#e0e0e0]/40 hover:text-[#e0e0e0]/70'
            }`}
            style={{ background: activeModule === i ? `${m.color}08` : 'transparent' }}
          >
            <span style={{ color: activeModule === i ? m.color : undefined }}>{m.id}</span>
            <span className="ml-2 hidden sm:inline">{m.title}</span>
          </button>
        ))}
      </div>

      {/* Module content */}
      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {/* Module header */}
            <div className="mb-8">
              <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${mod.color}60` }}>
                MODULE: {mod.id} // {mod.subtitle}
              </div>
              <h3 className="font-sans font-black text-3xl text-white mb-1">{mod.title}</h3>
              <div className="h-px mt-4" style={{ background: `linear-gradient(90deg, ${mod.color}40, transparent)` }} />
            </div>

            {/* Metrics strip */}
            <div className="grid grid-cols-3 gap-4 mb-10 p-5 border" style={{ borderColor: `${mod.color}15`, background: `${mod.color}04` }}>
              {mod.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="font-mono font-bold text-xl" style={{ color: mod.color }}>{m.value}</div>
                  <div className="font-mono text-[8px] text-[#e0e0e0]/40 tracking-widest uppercase mt-0.5">{m.unit}</div>
                  <div className="font-mono text-[8px] text-[#e0e0e0]/25 tracking-widest mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Content blocks */}
            <div className="space-y-6">
              {mod.content.map((block, bi) => (
                <motion.div
                  key={bi}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: bi * 0.1 }}
                  className="border-l-2 pl-5"
                  style={{ borderColor: `${mod.color}40` }}
                >
                  <div className="font-mono text-xs font-bold mb-2" style={{ color: mod.color }}>
                    &gt; {block.heading}
                  </div>
                  <p className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">
                    {block.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* NDA Statement */}
            <div className="mt-10 border border-[#D4AF37]/20 p-5" style={{ background: 'rgba(212,175,55,0.03)' }}>
              <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-[0.3em] uppercase mb-2">
                — PGP SIGNED STATEMENT —
              </div>
              <p className="font-mono text-[10px] text-[#e0e0e0]/60 leading-relaxed italic">
                "The architectures described herein are protected by international NDA.
                Full technical auditing is available only via secure physical terminal
                or authorized government-grade audit."
              </p>
              <div className="mt-3 font-mono text-[9px] text-[#D4AF37]/40 tracking-widest">
                SIG: 0xC1C4A87FEB4304DB9E6286A1F0136C58BB195F0C
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
