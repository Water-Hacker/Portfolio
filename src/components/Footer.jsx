import { useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Intel', href: '#intel' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Library', href: '#library' },
  { label: 'Vault', href: '#vault' },
  { label: 'Mentorship', href: '#mentorship' },
  { label: 'PGP', href: '#pgp' },
]

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('thuram@thuramnana.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const handleNav = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative border-t border-[#00E5FF]/10 bg-[#050505]">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-12">
        {/* Brand col */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FooterHex />
              <div>
                <div className="font-mono text-[#00E5FF] text-xs tracking-[0.2em] uppercase glow-cyan">
                  THURAM NANA
                </div>
                <div className="font-mono text-[9px] text-[#D4AF37]/60 tracking-widest uppercase">
                  SOVEREIGN TRUST
                </div>
              </div>
            </div>
            <p className="font-mono text-[10px] text-[#e0e0e0]/40 leading-relaxed">
              Lead System Architect &amp; Security Researcher.
              Building the sovereign technology stack.
            </p>
          </div>

          {/* OPSEC notice */}
          <div className="border border-[#00E5FF]/10 p-3" style={{ background: 'rgba(0,229,255,0.02)' }}>
            <div className="font-mono text-[8px] text-[#00E5FF]/40 tracking-widest uppercase mb-1">⬡ OPSEC NOTICE</div>
            <p className="font-mono text-[8px] text-[#e0e0e0]/30 leading-relaxed">
              This portal is the only verified digital footprint of Junior Thuram Nana.
              All other social profiles are considered unofficial.
            </p>
          </div>
        </div>

        {/* Nav col */}
        <div>
          <div className="font-mono text-[9px] text-[#00E5FF]/40 tracking-[0.4em] uppercase mb-5">
            NAVIGATION
          </div>
          <div className="space-y-2.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="block font-mono text-[10px] text-[#e0e0e0]/40 hover:text-[#00E5FF] tracking-widest uppercase transition-colors duration-200 text-left"
              >
                <span className="text-[#00E5FF]/20 mr-2">›</span>
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact col */}
        <div>
          <div className="font-mono text-[9px] text-[#00E5FF]/40 tracking-[0.4em] uppercase mb-5">
            SECURE CHANNEL
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <div className="font-mono text-[8px] text-[#e0e0e0]/30 tracking-widest uppercase mb-1.5">EMAIL</div>
              <motion.button
                onClick={copyEmail}
                whileHover={{ x: 2 }}
                className="font-mono text-xs text-[#00E5FF]/80 hover:text-[#00E5FF] transition-colors track-wide break-all text-left"
              >
                thuram@thuramnana.com
              </motion.button>
              {emailCopied && (
                <div className="font-mono text-[9px] text-green-400 mt-1">✓ copied</div>
              )}
            </div>

            {/* Domain */}
            <div>
              <div className="font-mono text-[8px] text-[#e0e0e0]/30 tracking-widest uppercase mb-1.5">DOMAIN</div>
              <div className="font-mono text-xs text-[#e0e0e0]/60">thuramnana.com</div>
            </div>

            {/* Flaire */}
            <div>
              <div className="font-mono text-[8px] text-[#e0e0e0]/30 tracking-widest uppercase mb-1.5">PROJECT SITE</div>
              <a
                href="https://www.flaireapp.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
              >
                flaireapp.org
              </a>
              <div className="font-mono text-[9px] text-[#e0e0e0]/25 mt-0.5">Flaire EdTech — App Website</div>
            </div>

            {/* PGP */}
            <div>
              <div className="font-mono text-[8px] text-[#e0e0e0]/30 tracking-widest uppercase mb-1.5">PGP FINGERPRINT</div>
              <div className="font-mono text-[9px] text-[#D4AF37]/60 tracking-wide leading-relaxed break-all">
                C1C4 A87F EB43 04DB<br />
                9E62 86A1 F013 6C58<br />
                BB19 5F0C
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#00E5FF]/08 px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[9px] text-[#e0e0e0]/25 tracking-widest">
            © {year} JUNIOR THURAM NANA — ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6">
            <div className="font-mono text-[9px] text-[#e0e0e0]/20 tracking-widest">
              BUILD: v1.0 // SOVEREIGN STACK
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="font-mono text-[9px] text-[#00E5FF]/40 tracking-widest">SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterHex() {
  const s = 28
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.44
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <polygon points={pts} fill="rgba(0,229,255,0.07)" stroke="#00E5FF" strokeWidth="1" opacity="0.8" />
      <circle cx={cx} cy={cy} r={2} fill="#00E5FF" opacity="0.8" />
    </svg>
  )
}
