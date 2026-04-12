import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// The vault password — in a real deploy, use env var + server-side check
const VAULT_PASSWORD = 'sovereign2025'

const vaultModules = [
  {
    id: 'M01',
    title: 'Financial Integrity Protocols',
    subtitle: 'The Escrow Logic',
    color: '#D4AF37',
    content: [
      {
        heading: 'Multi-Sig Authorization Flow',
        text: 'Threshold signature scheme requiring M-of-N keyholders for asset release. Keys distributed across air-gapped hardware wallets with geographically separated custody. Time-lock mechanisms prevent rushed withdrawals.',
      },
      {
        heading: 'Cold Storage Architecture',
        text: 'Hierarchical deterministic wallet structure. Hot-to-cold bridge with automated sweeping logic. Zero internet exposure for the cold layer; offline signing via QR-based air-gap protocol.',
      },
      {
        heading: 'Cross-Chain Compliance Triggers',
        text: 'Automated AML/KYC event hooks. Smart contract oracles feed real-time compliance data. Transaction freezing upon anomaly detection with audit trail generation.',
      },
    ],
    metrics: [
      { label: 'Chains Supported', value: '4', unit: 'BTC/ETH/SOL/BNB' },
      { label: 'Signature Threshold', value: '3-of-5', unit: 'Multi-Sig' },
      { label: 'Integrity Score', value: '100%', unit: 'Tested' },
    ],
  },
  {
    id: 'M02',
    title: 'State-Level RegTech Framework',
    subtitle: 'The Vision',
    color: '#00E5FF',
    content: [
      {
        heading: 'National Data Oversight System',
        text: 'Architectural blueprint for sovereign digital identity infrastructure. Hardened root certificate authority, distributed ledger for state record immutability, and access-tiered data classification engine.',
      },
      {
        heading: 'Regulatory Automation Layer',
        text: 'Smart contract-driven compliance workflows replace manual regulatory review. Real-time audit trails satisfy international financial reporting standards without exposing proprietary logic.',
      },
      {
        heading: 'Threat Intelligence Integration',
        text: 'Experience with global vulnerability disclosure (Meta, Samsung) informs hardened state-level threat modeling. Adversarial simulation and red team methodology baked into system design phase.',
      },
    ],
    metrics: [
      { label: 'Architecture Tier', value: 'State-Grade', unit: 'Infrastructure' },
      { label: 'Compliance Coverage', value: 'FATF/GDPR', unit: 'Aligned' },
      { label: 'Security Posture', value: 'Zero-Trust', unit: 'Model' },
    ],
  },
  {
    id: 'M03',
    title: 'Vulnerability Research Archive',
    subtitle: 'Deep Logic Findings',
    color: '#ff6b6b',
    content: [
      {
        heading: 'Meta/WhatsApp Logic Chain Analysis',
        text: 'The bypass leveraged the delta between client-side permission enforcement and server-side validation. Group admin flags were cached client-side without re-verification on forwarding actions, creating a race condition exploitable within the iOS message processing pipeline.',
      },
      {
        heading: 'Samsung Character Injection Methodology',
        text: 'Clipboard buffer handling failed to sanitize certain Unicode control characters before passing input to the dial processor. The misinterpretation chain: copy → clipboard → system paste → dialpad render → character evaluation mismatch at the USSD handler level.',
      },
      {
        heading: 'Disclosure Philosophy',
        text: '"The reason I cannot show you that code is the same reason your government\'s data will be safe with me — I never compromise a secure perimeter." Full technical auditing available via secure physical terminal or authorized government-grade audit.',
      },
    ],
    metrics: [
      { label: 'CVEs Filed', value: '2', unit: 'Verified' },
      { label: 'Global Impact', value: '2B+', unit: 'Users Affected' },
      { label: 'Disclosure', value: 'Responsible', unit: 'Protocol' },
    ],
  },
]

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
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [activeModule, setActiveModule] = useState(0)
  const [shake, setShake] = useState(false)

  const handleUnlock = (e) => {
    e.preventDefault()
    if (input === VAULT_PASSWORD) {
      setUnlocked(true)
      setError('')
    } else {
      setAttempts(a => a + 1)
      setError(`ACCESS DENIED — INVALID CREDENTIALS [ATTEMPT ${attempts + 1}]`)
      setInput('')
      setShake(true)
      setTimeout(() => setShake(false), 500)
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
            <GateLock key="gate" inView={inView} input={input} setInput={setInput} error={error} shake={shake} onSubmit={handleUnlock} attempts={attempts} />
          ) : (
            <VaultContent key="vault" modules={vaultModules} activeModule={activeModule} setActiveModule={setActiveModule} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function GateLock({ inView, input, setInput, error, shake, onSubmit, attempts }) {
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
          className="w-full font-mono text-xs tracking-[0.3em] uppercase py-3 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 transition-all duration-300 group"
        >
          <span className="group-hover:tracking-[0.4em] transition-all duration-300">
            REQUEST ACCESS
          </span>
        </button>
      </form>

      <div className="mt-6 text-center font-mono text-[9px] text-[#e0e0e0]/20 leading-relaxed">
        Hint: sovereign2025
      </div>
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
