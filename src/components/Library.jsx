import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const frameworks = [
  {
    category: 'OPSEC PROTOCOLS',
    icon: '◈',
    color: '#00E5FF',
    items: [
      'Advanced Anonymity & Signature Reduction',
      'Operational Security Lifecycle Management',
      'Digital Footprint Minimization Techniques',
      'Threat Actor Modeling & Attribution Avoidance',
    ],
  },
  {
    category: 'DARKNET ARCHITECTURE',
    icon: '⬡',
    color: '#D4AF37',
    items: [
      'Technical Analysis of Decentralized P2P Systems',
      'Onion Routing Protocol Internals (Tor/I2P)',
      'Hidden Service Infrastructure Design',
      'Adversarial Network Traffic Analysis',
    ],
  },
  {
    category: 'SMART CONTRACTS',
    icon: '◇',
    color: '#00E5FF',
    items: [
      'Cross-Chain Liquidity Architecture',
      'Escrow Logic & Multi-Sig Flows (Solidity/Rust)',
      'DeFi Protocol Security Auditing',
      'Gas Optimization & Contract Hardening',
    ],
  },
  {
    category: 'SYSTEMS ENGINEERING',
    icon: '▣',
    color: '#D4AF37',
    items: [
      'Polyglot Engineering — Any Language, Any Stack',
      'Flutter / Dart Cross-Platform Mobile Architecture',
      'Agentic Coding & AI-Assisted System Design',
      'Professional Prompt Engineering & LLM Orchestration',
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

export default function Library() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="library" ref={ref} className="relative py-32 px-6 terminal-grid">
      <div className="section-divider mb-0" />
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="// 03" label="The Library" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Knowledge{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #0080FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Base
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Studied frameworks that form the foundation of sovereign system architecture. Depth without over-disclosure.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {frameworks.map((fw, i) => (
            <motion.div
              key={fw.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border transition-all duration-300 hover:border-opacity-50 group"
              style={{
                borderColor: `${fw.color}15`,
                background: 'rgba(5,5,5,0.8)',
              }}
              whileHover={{ borderColor: `${fw.color}40` }}
            >
              {/* Top accent bar */}
              <div className="h-px" style={{ background: `linear-gradient(90deg, ${fw.color}50, transparent)` }} />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xl" style={{ color: fw.color }}>{fw.icon}</span>
                  <div>
                    <div
                      className="font-mono text-[9px] tracking-[0.35em] uppercase"
                      style={{ color: `${fw.color}70` }}
                    >
                      FRAMEWORK_MODULE
                    </div>
                    <h3
                      className="font-mono text-xs font-bold tracking-widest mt-0.5"
                      style={{ color: fw.color }}
                    >
                      {fw.category}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {fw.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + ii * 0.06 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: `${fw.color}50` }}>
                        &gt;
                      </span>
                      <span className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom corner */}
              <div className="flex justify-end px-4 pb-3">
                <span
                  className="font-mono text-[8px] tracking-widest opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ color: fw.color }}
                >
                  CLASSIFIED_DEPTH
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
