import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const PGP_FINGERPRINT = 'C1C4 A87F EB43 04DB  9E62 86A1 F013 6C58  BB19 5F0C'
const PGP_KEY_BLOCK = `-----BEGIN PGP PUBLIC KEY BLOCK-----

[KEY CONTENT REDACTED — CONTACT VIA SECURE CHANNEL]

Fingerprint: C1C4 A87F EB43 04DB 9E62 86A1 F013 6C58 BB19 5F0C
Key ID: BB195F0C
Algorithm: RSA 4096-bit
Created: 2024
Owner: Junior Thuram Nana <thuram@thuramnana.com>

To obtain the full public key for encrypted communication,
send a signed request to: thuram@thuramnana.com

This key is used exclusively for:
- Encrypted correspondence
- Document signing & authentication
- Code signing & audit trail verification

"Trust is cryptographic, not assumed."

-----END PGP PUBLIC KEY BLOCK-----`

function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em]">{number}</span>
      <div className="flex-1 h-px section-label-line" />
      <span className="font-mono text-[10px] text-[#3b82f6]/50 tracking-[0.4em] uppercase">{label}</span>
    </div>
  )
}

const glassCard = {
  background:    'rgba(17,19,24,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border:        '1px solid rgba(255,255,255,0.07)',
  borderRadius:  '16px',
  boxShadow:     '0 8px 32px rgba(0,0,0,0.6)',
}

export default function PGP() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const copyFingerprint = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="pgp" aria-labelledby="pgp-h" ref={ref} className="relative py-32 px-6 terminal-grid">
      <div className="section-divider mb-0" />

      <div className="max-w-4xl mx-auto">
        <SectionLabel number="// 06" label="Cryptographic Identity" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <h2 id="pgp-h" className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            PGP{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #00E5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Authentication
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Cryptographic proof of identity. All critical communications should be PGP-verified.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Fingerprint card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="p-6"
            style={glassCard}
            whileHover={{
              scale: 1.01,
              boxShadow: '0 0 0 1px rgba(0,229,255,0.2), 0 12px 40px rgba(0,0,0,0.8)',
              borderColor: 'rgba(0,229,255,0.18)',
              transition: { ease: EASE },
            }}
          >
            {/* Top accent */}
            <div
              className="h-px -mx-6 -mt-6 mb-6"
              style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.4), transparent)' }}
            />

            <div className="font-mono text-[9px] text-[#00E5FF]/50 tracking-[0.4em] uppercase mb-4">
              PGP PUBLIC KEY FINGERPRINT
            </div>

            {/* Fingerprint display */}
            <div
              className="code-block mb-4 cursor-pointer transition-all"
              onClick={copyFingerprint}
              style={{
                borderColor: copied ? 'rgba(0,229,255,0.4)' : undefined,
                boxShadow:   copied ? '0 0 0 1px rgba(0,229,255,0.2)' : undefined,
              }}
            >
              <div className="font-mono text-xs text-[#00E5FF] tracking-[0.15em] leading-loose break-all select-all">
                {PGP_FINGERPRINT}
              </div>
            </div>

            <motion.button
              onClick={copyFingerprint}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease: EASE }}
              className="w-full font-mono text-[10px] tracking-[0.3em] uppercase py-2.5 transition-all duration-300"
              style={{
                borderRadius: '8px',
                border:       copied ? '1px solid rgba(0,229,255,0.5)' : '1px solid rgba(0,229,255,0.25)',
                color:        copied ? '#00E5FF' : 'rgba(0,229,255,0.6)',
                background:   copied ? 'rgba(0,229,255,0.08)' : 'rgba(0,229,255,0.03)',
              }}
            >
              {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY FINGERPRINT'}
            </motion.button>

            <div className="mt-4 space-y-2">
              {[
                { label: 'KEY ID',     value: 'BB195F0C'           },
                { label: 'ALGORITHM',  value: 'RSA 4096-bit'        },
                { label: 'OWNER',      value: 'Junior Thuram Nana'  },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#e0e0e0]/30 tracking-widest uppercase">{item.label}</span>
                  <span className="font-mono text-[10px] text-[#e0e0e0]/60">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key block card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="p-6"
            style={{
              ...glassCard,
              border: '1px solid rgba(212,175,55,0.15)',
            }}
            whileHover={{
              scale: 1.01,
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 12px 40px rgba(0,0,0,0.8)',
              borderColor: 'rgba(212,175,55,0.25)',
              transition: { ease: EASE },
            }}
          >
            {/* Top accent */}
            <div
              className="h-px -mx-6 -mt-6 mb-6"
              style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }}
            />

            <div className="font-mono text-[9px] text-[#D4AF37]/50 tracking-[0.4em] uppercase mb-4">
              KEY BLOCK — REDACTED
            </div>

            <div
              className="font-mono text-[9px] text-[#e0e0e0]/40 leading-relaxed overflow-y-auto"
              style={{ maxHeight: '200px', whiteSpace: 'pre-wrap' }}
            >
              {PGP_KEY_BLOCK}
            </div>

            <div
              className="mt-4 pt-4"
              style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
            >
              <p className="font-mono text-[9px] text-[#D4AF37]/50 leading-relaxed">
                "Trust is cryptographic, not assumed." — Full key available upon verified request.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Verification note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-6 p-5 flex items-start gap-4"
          style={{
            ...glassCard,
            border: '1px solid rgba(59,130,246,0.12)',
          }}
        >
          <div className="font-mono text-lg text-[#3b82f6]/60 flex-shrink-0 mt-0.5">⬡</div>
          <div>
            <div className="font-mono text-[9px] text-[#3b82f6]/50 tracking-widest uppercase mb-1">
              IDENTITY VERIFICATION PROTOCOL
            </div>
            <p className="font-mono text-[10px] text-[#e0e0e0]/55 leading-relaxed">
              This portal is the only verified digital footprint of Junior Thuram Nana. All other social profiles are considered unofficial or part of OPSEC anonymity protocols. Verification possible via PGP-signed correspondence only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
