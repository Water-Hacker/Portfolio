import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em]">{number}</span>
      <div className="flex-1 h-px section-label-line" />
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em] uppercase">{label}</span>
    </div>
  )
}

export default function Mentorship() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="mentorship" aria-labelledby="mentorship-h" ref={ref} className="relative py-32 px-6" style={{ background: 'transparent' }}>
      <div className="section-divider mb-0" />

      <div className="max-w-4xl mx-auto">
        <SectionLabel number="// 05" label="Pedigree" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <h2 id="mentorship-h" className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Mentorship{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Lineage
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50">
            The architecture of expertise is built on foundations laid by masters of the craft.
          </p>
        </motion.div>

        {/* Glass mentorship panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative p-8 sm:p-12"
          style={{
            background:    'rgba(17,19,24,0.72)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border:        '1px solid rgba(212,175,55,0.2)',
            borderRadius:  '20px',
            boxShadow:     '0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.06)',
          }}
        >
          {/* Decorative gold corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50" style={{ borderRadius: '4px 0 0 0' }} />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50" style={{ borderRadius: '0 4px 0 0' }} />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50" style={{ borderRadius: '0 0 0 4px' }} />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50" style={{ borderRadius: '0 0 4px 0' }} />

          <div className="grid sm:grid-cols-2 gap-10 items-start">
            {/* Left: Mentor info */}
            <div>
              <div className="font-mono text-[9px] tracking-[0.4em] text-[#D4AF37]/50 uppercase mb-4">
                MENTOR // LINEAGE_RECORD
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <MentorHex />
                </div>
                <div>
                  <div
                    className="font-mono font-bold text-xl tracking-widest"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    7h3h4ckv157
                  </div>
                  <div className="font-mono text-[10px] text-[#e0e0e0]/40 tracking-widest uppercase mt-1">
                    HANDLE: [CLASSIFIED]
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="code-block">
                  <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">FOCUS DOMAIN:</div>
                  <div className="font-mono text-xs text-[#e0e0e0]/80">Advanced Security Methodology</div>
                </div>
                <div className="code-block">
                  <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-widest uppercase mb-1">SPECIALIZATION:</div>
                  <div className="font-mono text-xs text-[#e0e0e0]/80">Systemic Threat Modeling</div>
                </div>
              </div>
            </div>

            {/* Right: About the mentorship */}
            <div className="space-y-5">
              <div className="font-mono text-[9px] tracking-[0.4em] text-[#3b82f6]/50 uppercase">
                MENTORSHIP RECORD
              </div>

              <p className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">
                Underwent strategic mentorship and technical guidance under{' '}
                <span className="text-[#D4AF37] font-bold">7h3h4ckv157</span>,
                with a focus on advanced security methodology and systemic threat modeling.
              </p>

              <p className="font-mono text-xs text-[#e0e0e0]/60 leading-relaxed">
                This lineage informs the foundational approach to every system built:
                security is not a feature — it is the architecture.
              </p>

              <div className="pt-2 space-y-2">
                {[
                  'Advanced Threat Actor Profiling',
                  'Vulnerability Chain Analysis',
                  'Systemic Threat Modeling',
                  'Responsible Disclosure Strategy',
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08, ease: EASE }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                    <span className="font-mono text-[10px] text-[#e0e0e0]/55">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MentorHex() {
  const s  = 56
  const cx = s / 2
  const cy = s / 2
  const r  = s * 0.44
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <polygon points={pts} fill="rgba(212,175,55,0.08)" stroke="#D4AF37" strokeWidth="1.5" />
      <text
        x={cx} y={cy + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill="#D4AF37" fontSize="14" fontFamily="JetBrains Mono, monospace"
      >
        ?
      </text>
    </svg>
  )
}
