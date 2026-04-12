import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Intel', href: '#intel' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Library', href: '#library' },
  { label: 'Vault', href: '#vault' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString().replace('T', ' ').split('.')[0] + ' UTC')
    }
    updateTime()
    const t = setInterval(updateTime, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#00E5FF]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
          whileHover={{ x: 2 }}
        >
          <HexLogoSmall />
          <div className="text-left">
            <div className="font-mono text-[#00E5FF] text-xs tracking-[0.2em] uppercase leading-tight glow-cyan">
              THURAM NANA
            </div>
            <div className="font-mono text-[10px] text-[#D4AF37]/70 tracking-[0.15em] uppercase">
              SYS_ARCH :: SEC_RESEARCHER
            </div>
          </div>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} onClick={handleNav} active={activeSection === item.href.slice(1)} />
          ))}
        </div>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-4">
          <div className="font-mono text-[9px] text-[#00E5FF]/40 tracking-widest">
            {time}
          </div>
          <StatusDot />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden font-mono text-[#00E5FF] text-xs border border-[#00E5FF]/30 px-3 py-2 hover:border-[#00E5FF]/80 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#00E5FF]/10 bg-[#050505]/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(item.href)}
                  className="block w-full text-left font-mono text-xs text-[#00E5FF]/60 hover:text-[#00E5FF] tracking-widest uppercase py-2 border-b border-[#00E5FF]/05 hover:border-[#00E5FF]/20 transition-all"
                >
                  <span className="text-[#D4AF37]/50 mr-2">{String(i + 1).padStart(2, '0')}.</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({ item, onClick, active }) {
  return (
    <motion.button
      onClick={() => onClick(item.href)}
      className="relative font-mono text-xs tracking-widest uppercase group"
      whileHover="hover"
    >
      <motion.span
        className={`transition-colors duration-200 ${active ? 'text-[#00E5FF]' : 'text-[#e0e0e0]/50 hover:text-[#00E5FF]'}`}
      >
        {item.label}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-[#00E5FF]"
        initial={{ width: active ? '100%' : '0%' }}
        variants={{ hover: { width: '100%' } }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

function StatusDot() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 rounded-full bg-[#00E5FF] opacity-100" />
        <div className="absolute inset-0 rounded-full bg-[#00E5FF] animate-ping opacity-60" />
      </div>
      <span className="font-mono text-[9px] text-[#00E5FF]/60 tracking-widest">ONLINE</span>
    </div>
  )
}

function HexLogoSmall() {
  const s = 32
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.44
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
  const r2 = s * 0.28
  const pts2 = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r2 * Math.cos(a)},${cy + r2 * Math.sin(a)}`
  }).join(' ')
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <polygon points={pts} fill="none" stroke="#00E5FF" strokeWidth="1.2" opacity="0.9" />
      <polygon points={pts2} fill="rgba(0,229,255,0.08)" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={2.5} fill="#00E5FF" />
    </svg>
  )
}
