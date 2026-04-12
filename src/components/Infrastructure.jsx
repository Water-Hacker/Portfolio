import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const pillars = [
  {
    id: 'P1',
    number: '01',
    tag: 'VULNERABILITY RESEARCH',
    tagColor: '#ff6b6b',
    title: 'The Hunter',
    subtitle: 'Finding what others miss',
    icon: '◈',
    cases: [
      {
        id: 'CASE-META-001',
        client: 'Meta / WhatsApp',
        year: '2024',
        type: 'Logic Bypass — iOS Group Permissions',
        badge: 'PATCHED',
        badgeClass: 'badge-active',
        detail:
          'Identified a permission escalation logic bypass in the WhatsApp iOS client. Non-admin users could forward screenshots within restricted group environments, circumventing broadcast controls. Disclosure triggered a global security policy update across the platform.',
        tech: ['iOS Security', 'Group Permission Logic', 'Responsible Disclosure'],
      },
      {
        id: 'CASE-SAM-002',
        client: 'Samsung Mobile',
        year: '2025',
        type: 'Character Injection — Clipboard-to-Dialpad',
        badge: 'ZERO-DAY',
        badgeClass: 'badge-zero-day',
        detail:
          'Discovered a character misinterpretation flaw between the clipboard and system dialpad. Certain Unicode sequences caused unexpected behavior in the dialer input parser, creating a potential injection vector. Status: Reported. Persistent.',
        tech: ['Android Internals', 'Character Encoding', 'Zero-Day Research'],
      },
    ],
  },
  {
    id: 'P2',
    number: '02',
    tag: 'DIGITAL ASSET INFRASTRUCTURE',
    tagColor: '#D4AF37',
    title: 'The Builder',
    subtitle: 'Sovereign custody architecture',
    icon: '⬡',
    cases: [
      {
        id: 'CASE-ESCROW-001',
        client: 'CLASSIFIED — NDA PROTECTED',
        year: '2024–2025',
        type: 'Multi-Chain Escrow Protocol',
        badge: 'CLASSIFIED',
        badgeClass: 'badge-classified',
        detail:
          'Designed and engineered a secure multi-chain custody architecture for BTC, ETH, SOL, and BNB. Features cold-storage logic, multi-sig authorization flows, and automated compliance triggers. Full technical dossier available via secure audit pathway only.',
        tech: ['Solidity', 'Rust', 'Multi-Sig Auth', 'Cold Storage Logic', 'Cross-Chain Bridges'],
        redacted: true,
      },
    ],
  },
  {
    id: 'P3',
    number: '03',
    tag: 'AI & FULLSTACK SYSTEMS',
    tagColor: '#00E5FF',
    title: 'The Founder',
    subtitle: 'Building the sovereign stack',
    icon: '◇',
    cases: [
      {
        id: 'CASE-FLAIRE-001',
        client: 'FLAIRE — flaireapp.org',
        year: '2025',
        type: 'AI-Powered EdTech Cross-Platform App',
        badge: 'LIVE',
        badgeClass: 'badge-active',
        detail:
          'Built and launched a full-stack AI-powered educational platform. Engineered cross-platform mobile with Flutter & Dart, Firebase backend for real-time data and auth, Google Cloud infrastructure for scalability. flaireapp.org is the official project website. Professional prompt engineering drives AI curriculum pipeline and system logic generation.',
        tech: ['Flutter', 'Dart', 'Firebase', 'Google Cloud', 'Prompt Engineering', 'AI Architecture'],
        link: 'https://www.flaireapp.org/',
      },
      {
        id: 'CASE-GUC-001',
        client: 'GUC — School Social System',
        year: '2024',
        type: 'School Management + Social Platform',
        badge: 'DEPLOYED',
        badgeClass: 'badge-active',
        detail:
          'Built and deployed a comprehensive school management ecosystem integrating academic tracking, internal social networking, communication channels, and administrative tooling for educational institutions.',
        tech: ['Full-Stack Engineering', 'University Systems', 'Social Architecture', 'Admin Portals'],
      },
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

export default function Infrastructure() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infrastructure" ref={ref} className="relative py-32 px-6 bg-[#050505]">
      <div className="section-divider mb-0" />

      {/* Background grid accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel number="// 02" label="Infrastructure Matrix" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Three{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Pillars
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Hunter. Builder. Founder. Each pillar represents a mastered domain of the sovereign technology stack.
          </p>
        </motion.div>

        <div className="space-y-20">
          {pillars.map((pillar, pi) => (
            <PillarBlock key={pillar.id} pillar={pillar} index={pi} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarBlock({ pillar, index, inView }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {/* Pillar header */}
      <div className="flex items-center gap-6 mb-8">
        <div
          className="font-mono text-4xl font-black opacity-20 select-none"
          style={{ color: pillar.tagColor }}
        >
          {pillar.number}
        </div>
        <div className="flex-1 h-px" style={{ background: `${pillar.tagColor}30` }} />
        <div
          className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 border"
          style={{
            borderColor: `${pillar.tagColor}40`,
            color: `${pillar.tagColor}`,
            background: `${pillar.tagColor}08`,
          }}
        >
          {pillar.tag}
        </div>
        <div className="flex-1 h-px hidden sm:block" style={{ background: `${pillar.tagColor}20` }} />
      </div>

      <div className="mb-8 pl-0 sm:pl-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-3xl" style={{ color: pillar.tagColor }}>{pillar.icon}</span>
          <div>
            <h3 className="font-sans font-black text-3xl text-white">{pillar.title}</h3>
            <p className="font-mono text-xs text-[#e0e0e0]/40 tracking-widest uppercase">{pillar.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Cases */}
      <div className="grid sm:grid-cols-2 gap-5 pl-0 sm:pl-16">
        {pillar.cases.map((c, ci) => (
          <CaseCard
            key={c.id}
            caseData={c}
            index={ci}
            tagColor={pillar.tagColor}
            expanded={expanded === ci}
            onToggle={() => setExpanded(expanded === ci ? null : ci)}
          />
        ))}
      </div>
    </motion.div>
  )
}

function CaseCard({ caseData, index, tagColor, expanded, onToggle }) {
  return (
    <div
      className="border transition-all duration-400 cursor-pointer group"
      style={{
        borderColor: expanded ? `${tagColor}50` : `${tagColor}15`,
        background: expanded ? `${tagColor}05` : 'rgba(5,5,5,0.6)',
        boxShadow: expanded ? `0 0 20px ${tagColor}15` : 'none',
      }}
      onClick={onToggle}
    >
      {/* Card top bar */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${tagColor}60, transparent)` }} />

      <div className="p-5">
        {/* Case ID + badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: `${tagColor}60` }}>{caseData.id}</span>
          <span className={`${caseData.badgeClass} font-mono text-[8px] px-2 py-0.5 tracking-widest uppercase`}>
            {caseData.badge}
          </span>
        </div>

        {/* Client + year */}
        <div className="font-mono text-[10px] text-[#e0e0e0]/40 tracking-widest uppercase mb-2">
          {caseData.year} // {caseData.redacted ? <span className="redacted px-2">{caseData.client}</span> : caseData.client}
        </div>

        {/* Type */}
        <h4 className="font-sans font-semibold text-base text-white mb-3 leading-tight">
          {caseData.type}
        </h4>

        {/* Expand indicator */}
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase" style={{ color: `${tagColor}60` }}>
          <span className="transition-transform duration-200" style={{ display: 'inline-block', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
          {expanded ? 'COLLAPSE' : 'EXPAND DOSSIER'}
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                <div className="h-px" style={{ background: `${tagColor}20` }} />
                <p className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">
                  {caseData.detail}
                </p>
                <div>
                  <div className="font-mono text-[9px] tracking-widest uppercase mb-2" style={{ color: `${tagColor}60` }}>
                    TECHNOLOGY STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caseData.tech.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[9px] px-2 py-0.5 border tracking-wide"
                        style={{
                          borderColor: `${tagColor}25`,
                          color: `${tagColor}80`,
                          background: `${tagColor}06`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {caseData.link && (
                  <a
                    href={caseData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase mt-1 hover:opacity-80 transition-opacity"
                    style={{ color: tagColor }}
                    onClick={e => e.stopPropagation()}
                  >
                    ◈ VISIT LIVE DEPLOYMENT → {caseData.link.replace('https://', '')}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
