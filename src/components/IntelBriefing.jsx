import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const events = [
  {
    year: '2024',
    code: 'CVE-META-001',
    title: 'Vulnerability Discovery — Global Messaging',
    entity: 'Meta / WhatsApp (iOS)',
    type: 'CRITICAL',
    description:
      'Logic bypass in iOS client Group Permission layer. Enabled non-admin screenshot forwarding in restricted broadcast environments. Triggered global shift in third-party client verification and account lockdown mechanisms.',
    impact: 'Global policy enforcement change across 2B+ users',
    status: 'PATCHED',
    color: '#00E5FF',
  },
  {
    year: '2025',
    code: 'CVE-SAM-002',
    title: 'Mobile OS Logic Flaw — Character Injection',
    entity: 'Samsung Mobile',
    type: 'ZERO-DAY',
    description:
      'Clipboard-to-Dialpad character misinterpretation flaw. Character injection vulnerability allowing potential code execution through unexpected dialpad character parsing.',
    impact: 'Reported. Persistent. Zero-Day status maintained.',
    status: 'UNPATCHED',
    color: '#ff6b6b',
  },
  {
    year: 'CURRENT',
    code: 'OPS-ACTIVE',
    title: 'Engineering Sovereign AI & RegTech Infrastructure',
    entity: 'Independent / Classified',
    type: 'ACTIVE',
    description:
      'FLAIRE EdTech App — LIVE at flaireapp.org. Built with Flutter, Dart, Firebase & Google Cloud. GUC School Management System deployed. Multi-chain escrow custody under NDA. Sovereign AI curriculum pipeline operational.',
    impact: 'Live deployments. Active engineering. Expanding across markets.',
    status: 'ACTIVE',
    color: '#D4AF37',
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

export default function IntelBriefing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="intel" ref={ref} className="relative py-32 px-6 terminal-grid">
      {/* Top section divider */}
      <div className="section-divider mb-0" />

      <div className="max-w-5xl mx-auto">
        <SectionLabel number="// 01" label="Intelligence Briefing" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Timeline of{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #0080FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Discovery
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Operational record of verified security research, infrastructure engineering, and system deployments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00E5FF]/40 via-[#D4AF37]/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {events.map((ev, i) => (
              <TimelineEvent key={i} event={ev} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({ event, index, inView }) {
  const typeColor = {
    CRITICAL: '#ff6b6b',
    'ZERO-DAY': '#ff4444',
    ACTIVE: '#D4AF37',
  }[event.type] || '#00E5FF'

  const statusBadge = {
    PATCHED: 'badge-active',
    UNPATCHED: 'badge-zero-day',
    ACTIVE: 'badge-classified',
  }[event.status] || 'badge-active'

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex gap-8 items-start group"
    >
      {/* Year */}
      <div className="flex-shrink-0 w-[76px] text-right hidden sm:block">
        <div
          className="font-mono text-xs tracking-widest font-bold"
          style={{ color: event.color }}
        >
          {event.year}
        </div>
        <div className="font-mono text-[9px] text-[#e0e0e0]/30 mt-1">{event.code}</div>
      </div>

      {/* Node dot */}
      <div className="flex-shrink-0 hidden sm:flex flex-col items-center mt-1">
        <div
          className="relative w-3 h-3 rounded-full border-2"
          style={{
            borderColor: event.color,
            boxShadow: `0 0 8px ${event.color}60`,
            backgroundColor: `${event.color}20`,
          }}
        >
          {event.status === 'ACTIVE' && (
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: `${event.color}30` }}
            />
          )}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 border border-[#00E5FF]/10 hover:border-[#00E5FF]/25 transition-all duration-500 p-5 relative group-hover:bg-[#00E5FF]/02"
        style={{ background: 'rgba(5,5,5,0.8)' }}
      >
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: event.color }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: event.color }} />

        {/* Mobile year */}
        <div className="sm:hidden mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-bold" style={{ color: event.color }}>{event.year}</span>
          <div className="flex-1 h-px" style={{ background: `${event.color}30` }} />
        </div>

        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1"
              style={{ color: typeColor }}
            >
              {event.type} // {event.entity}
            </div>
            <h3 className="font-sans font-semibold text-lg text-white leading-tight">
              {event.title}
            </h3>
          </div>
          <span className={`${statusBadge} font-mono text-[9px] px-2 py-1 tracking-widest uppercase flex-shrink-0`}>
            {event.status}
          </span>
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-[#e0e0e0]/60 leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Impact */}
        <div className="flex items-start gap-2">
          <span className="font-mono text-[9px] text-[#D4AF37]/60 tracking-widest uppercase flex-shrink-0 mt-0.5">
            IMPACT:
          </span>
          <span className="font-mono text-[10px] text-[#D4AF37]/80">{event.impact}</span>
        </div>
      </div>
    </motion.div>
  )
}
