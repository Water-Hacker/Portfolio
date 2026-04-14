import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const frameworks = [
  {
    category: 'OPSEC PROTOCOLS', icon: '◈', color: '#00E5FF',
    items: [
      'Advanced Anonymity & Signature Reduction',
      'Operational Security Lifecycle Management',
      'Digital Footprint Minimization Techniques',
      'Threat Actor Modeling & Attribution Avoidance',
    ],
  },
  {
    category: 'DARKNET ARCHITECTURE', icon: '⬡', color: '#D4AF37',
    items: [
      'Technical Analysis of Decentralized P2P Systems',
      'Onion Routing Protocol Internals (Tor/I2P)',
      'Hidden Service Infrastructure Design',
      'Adversarial Network Traffic Analysis',
    ],
  },
  {
    category: 'SMART CONTRACTS', icon: '◇', color: '#3b82f6',
    items: [
      'Cross-Chain Liquidity Architecture',
      'Escrow Logic & Multi-Sig Flows (Solidity/Rust)',
      'DeFi Protocol Security Auditing',
      'Gas Optimization & Contract Hardening',
    ],
  },
  {
    category: 'SYSTEMS ENGINEERING', icon: '▣', color: '#D4AF37',
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
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em]">{number}</span>
      <div className="flex-1 h-px section-label-line" />
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em] uppercase">{label}</span>
    </div>
  )
}

export default function Library() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="library" ref={ref} className="relative py-32 px-6 terminal-grid">
      <div className="section-divider mb-0" />
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="// 03" label="The Library" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Knowledge{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #00E5FF)',
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

        {/* Bento grid — 24px gap */}
        <div className="grid sm:grid-cols-2 gap-6">
          {frameworks.map((fw, i) => (
            <motion.div
              key={fw.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="relative overflow-hidden group"
              style={{
                background:    'rgba(17,19,24,0.65)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border:        '1px solid rgba(255,255,255,0.07)',
                borderRadius:  '16px',
                boxShadow:     '0 8px 32px rgba(0,0,0,0.6)',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 0 0 1px ${fw.color}28, 0 12px 40px rgba(0,0,0,0.8)`,
                borderColor: `${fw.color}28`,
                transition: { ease: EASE },
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-px w-full"
                style={{ background: `linear-gradient(90deg, ${fw.color}50, transparent)` }}
              />

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
                      transition={{ delay: 0.3 + i * 0.1 + ii * 0.06, ease: EASE }}
                      className="flex items-start gap-2.5"
                    >
                      <span
                        className="font-mono text-[10px] mt-0.5 flex-shrink-0"
                        style={{ color: `${fw.color}50` }}
                      >
                        &gt;
                      </span>
                      <span className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom corner tag */}
              <div className="flex justify-end px-4 pb-3">
                <span
                  className="font-mono text-[8px] tracking-widest opacity-0 group-hover:opacity-60 transition-opacity duration-300"
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
