import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const bootLines = [
  '> INITIALIZING SECURE KERNEL v4.7.2...',
  '> LOADING CRYPTOGRAPHIC MODULES... [OK]',
  '> VERIFYING SYSTEM INTEGRITY... [OK]',
  '> ESTABLISHING OPSEC PERIMETER... [OK]',
  '> MOUNTING ENCRYPTED VOLUMES... [OK]',
  '> LOADING THURAM_NANA.PROFILE...',
  '> CLEARANCE LEVEL: ARCHITECT-5',
  '> PGP FINGERPRINT: C1C4 A87F EB43 04DB 9E62...',
  '> SOVEREIGN TRUST PROTOCOL: ACTIVE',
  '> SYSTEM READY. ENTERING SECURE TERMINAL.',
]

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const currentLine = bootLines[i]
        setLines(prev => [...prev, currentLine])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setDone(true), 600)
        setTimeout(() => onComplete(), 1400)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505]">
      {/* Hex logo center */}
      <div className="mb-10">
        <HexLogo size={80} animated />
      </div>

      <div className="w-full max-w-xl px-6">
        <div className="code-block space-y-1 min-h-[260px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`font-mono text-xs leading-relaxed ${
                line.includes('[OK]')
                  ? 'text-[#00E5FF]'
                  : line.includes('CLEARANCE') || line.includes('PGP')
                  ? 'text-[#D4AF37]'
                  : line.includes('SOVEREIGN') || line.includes('READY')
                  ? 'text-[#00E5FF] font-bold'
                  : 'text-green-400/80'
              }`}
            >
              {line}
              {i === lines.length - 1 && !done && (
                <span className="inline-block w-2 h-3 bg-[#00E5FF] ml-1 animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center font-mono text-[#00E5FF] text-xs tracking-[0.3em] uppercase"
          >
            ACCESS GRANTED
          </motion.div>
        )}
      </div>
    </div>
  )
}

function HexLogo({ size = 60, animated = false }) {
  const s = size
  const cx = s / 2
  const cy = s / 2
  const r = s * 0.44
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')

  const r2 = s * 0.3
  const pts2 = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r2 * Math.cos(a)},${cy + r2 * Math.sin(a)}`
  }).join(' ')

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <polygon
        points={pts}
        fill="none"
        stroke="#00E5FF"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <polygon
        points={pts2}
        fill="rgba(0,229,255,0.06)"
        stroke="#D4AF37"
        strokeWidth="1"
        opacity="0.9"
      />
      <circle cx={cx} cy={cy} r={s * 0.08} fill="#00E5FF" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6
        const x1 = cx + s * 0.08 * Math.cos(a)
        const y1 = cy + s * 0.08 * Math.sin(a)
        const x2 = cx + r2 * Math.cos(a)
        const y2 = cy + r2 * Math.sin(a)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00E5FF" strokeWidth="0.5" opacity="0.4" />
        )
      })}
    </svg>
  )
}

export { HexLogo }
