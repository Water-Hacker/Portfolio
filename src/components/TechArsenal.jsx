import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const arsenal = [
  {
    id: 'SEC',
    label: 'Security Research',
    color: '#ff6b6b',
    icon: '◈',
    tags: [
      'Vulnerability Research',
      'CVE Disclosure',
      'Zero-Day Analysis',
      'Android Internals',
      'iOS Security Layer',
      'OSINT',
      'Responsible Disclosure',
      'Threat Modeling',
    ],
  },
  {
    id: 'MOB',
    label: 'Mobile & Cloud',
    color: '#00E5FF',
    icon: '◇',
    tags: [
      'Flutter',
      'Dart',
      'Firebase',
      'Google Cloud',
      'Real-Time Database',
      'Cross-Platform Deploy',
      'App Architecture',
      'Push Notifications',
    ],
  },
  {
    id: 'WEB',
    label: 'Web & Fullstack',
    color: '#00E5FF',
    icon: '⬡',
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Tailwind CSS',
      'Vite',
      'SaaS Architecture',
      'School Management Systems',
    ],
  },
  {
    id: 'CHAIN',
    label: 'Blockchain & Crypto',
    color: '#D4AF37',
    icon: '▣',
    tags: [
      'Solidity',
      'Rust',
      'Smart Contracts',
      'Multi-Sig Custody',
      'DeFi Protocols',
      'Cross-Chain Bridges',
      'BTC / ETH / SOL / BNB',
      'Cold Storage Logic',
    ],
  },
  {
    id: 'AI',
    label: 'AI & Agentic Systems',
    color: '#D4AF37',
    icon: '◈',
    tags: [
      'Prompt Engineering',
      'LLM Orchestration',
      'Agentic Coding',
      'AI Curriculum Pipelines',
      'Code Understanding',
      'System Logic Generation',
      'Model Chaining',
    ],
  },
  {
    id: 'LANG',
    label: 'Languages',
    color: '#00E5FF',
    icon: '◇',
    tags: [
      'Dart',
      'JavaScript',
      'TypeScript',
      'Python',
      'Solidity',
      'Rust',
      'Bash / Shell',
      '+ Any (agentic)',
    ],
  },
]

const tickerItems = [
  'Flutter', 'Dart', 'Firebase', 'React', 'Node.js', 'TypeScript',
  'Python', 'Solidity', 'Rust', 'Google Cloud', 'Prompt Engineering',
  'Vulnerability Research', 'Multi-Sig Custody', 'Zero-Day Analysis',
  'LLM Orchestration', 'Agentic Coding', 'AI Architecture', 'DeFi Protocols',
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

export default function TechArsenal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="arsenal" ref={ref} className="relative py-32 px-6 terminal-grid">
      <div className="section-divider mb-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(0,229,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel number="// 00" label="Tech Arsenal" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #0080FF 50%, #00E5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Arsenal
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Polyglot engineer with deep domain expertise across security, mobile, web, blockchain, and AI.
            Given a problem — any language, any stack.
          </p>
        </motion.div>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden mb-14 border-y border-[#00E5FF]/08 py-3">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="font-mono text-[9px] tracking-[0.3em] uppercase">
                <span style={{ color: i % 3 === 0 ? '#00E5FF40' : i % 3 === 1 ? '#D4AF3740' : '#ff6b6b40' }}>
                  {i % 2 === 0 ? '◈ ' : '⬡ '}
                </span>
                <span className="text-[#e0e0e0]/20">{item}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Arsenal grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arsenal.map((cat, i) => (
            <ArsenalCard key={cat.id} cat={cat} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-10 code-block"
        >
          <span className="text-[#00E5FF]/40 font-mono text-[10px]">&gt; </span>
          <span className="text-[#e0e0e0]/30 font-mono text-[10px]">
            PROFICIENCY_LEVEL=<span className="text-[#D4AF37]">ARCHITECT</span>{' '}
            // knowledge extends to reading, writing, debugging and deploying in any language using agentic tooling.
          </span>
        </motion.div>
      </div>
    </section>
  )
}

function ArsenalCard({ cat, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="relative border p-6 transition-all duration-300 group"
      style={{ borderColor: `${cat.color}18`, background: 'rgba(5,5,5,0.85)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cat.color}45`
        e.currentTarget.style.boxShadow = `0 0 24px ${cat.color}10`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${cat.color}18`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${cat.color}55, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xl" style={{ color: cat.color }}>{cat.icon}</span>
        <div>
          <div
            className="font-mono text-[8px] tracking-[0.4em] uppercase mb-0.5"
            style={{ color: `${cat.color}55` }}
          >
            {cat.id}
          </div>
          <div className="font-sans font-semibold text-sm text-white">{cat.label}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {cat.tags.map(tag => (
          <span
            key={tag}
            className="font-mono text-[9px] px-2 py-0.5 tracking-wide border"
            style={{
              borderColor: `${cat.color}20`,
              color: `${cat.color}65`,
              background: `${cat.color}05`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
