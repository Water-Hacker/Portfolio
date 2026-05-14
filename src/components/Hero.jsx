import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// ─── HexSphere Canvas — unchanged ──────────────────────────────────────────
function HexSphere() {
  const canvasRef    = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined

    const width   = canvas.width
    const height  = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    const layers = [
      { radius: 24,  count: 1,  size: 22, color: '#00E5FF', alpha: 0.95 },
      { radius: 64,  count: 6,  size: 17, color: '#00E5FF', alpha: 0.7  },
      { radius: 118, count: 12, size: 13, color: '#3b82f6', alpha: 0.5  },
      { radius: 174, count: 18, size: 10, color: '#4f46e5', alpha: 0.28 },
    ]

    const drawHex = (x, y, size, color, alpha, time, offset) => {
      const pulse = Math.sin(time * 1.4 + offset) * 0.5 + 0.5
      context.save()
      context.globalAlpha = alpha * (0.55 + pulse * 0.45)
      context.beginPath()
      for (let index = 0; index < 6; index += 1) {
        const angle  = (Math.PI / 3) * index - Math.PI / 6
        const pointX = x + size * Math.cos(angle)
        const pointY = y + size * Math.sin(angle)
        if (index === 0) context.moveTo(pointX, pointY)
        else             context.lineTo(pointX, pointY)
      }
      context.closePath()
      context.strokeStyle = color
      context.lineWidth   = 0.85
      context.stroke()
      context.restore()
    }

    const drawLine = (x1, y1, x2, y2, color, alpha) => {
      context.save()
      context.globalAlpha  = alpha
      context.strokeStyle  = color
      context.lineWidth    = 0.45
      context.beginPath()
      context.moveTo(x1, y1)
      context.lineTo(x2, y2)
      context.stroke()
      context.restore()
    }

    const render = (frame) => {
      const time = frame / 1000
      context.clearRect(0, 0, width, height)

      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 220)
      halo.addColorStop(0,    'rgba(59,130,246,0.08)')
      halo.addColorStop(0.45, 'rgba(0,229,255,0.03)')
      halo.addColorStop(1,    'transparent')
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)

      layers.forEach((layer, layerIndex) => {
        const points = []
        if (layer.count === 1) {
          points.push([centerX, centerY])
        } else {
          for (let index = 0; index < layer.count; index += 1) {
            const baseAngle = (Math.PI * 2 * index) / layer.count
            const wobble    = Math.sin(time * 0.55 + layerIndex + index * 0.22) * 4
            const angle     = baseAngle + time * (layerIndex % 2 === 0 ? 0.06 : -0.05)
            const x = centerX + (layer.radius + wobble) * Math.cos(angle)
            const y = centerY + (layer.radius + wobble) * Math.sin(angle)
            points.push([x, y])
          }
        }
        points.forEach(([x, y], index) => {
          drawHex(x, y, layer.size, layer.color, layer.alpha, time, layerIndex * 20 + index)
        })
        if (points.length > 1) {
          points.forEach(([x, y], index) => {
            const next = points[(index + 1) % points.length]
            drawLine(x, y, next[0], next[1], layer.color, layer.alpha * 0.15)
          })
        }
        if (layerIndex === 1) {
          points.forEach(([x, y]) => {
            drawLine(centerX, centerY, x, y, '#3b82f6', 0.12)
          })
        }
      })

      const core = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 24)
      core.addColorStop(0, 'rgba(0,229,255,0.32)')
      core.addColorStop(1, 'transparent')
      context.fillStyle = core
      context.fillRect(centerX - 24, centerY - 24, 48, 48)

      context.save()
      context.beginPath()
      context.arc(centerX, centerY, 4, 0, Math.PI * 2)
      context.fillStyle   = '#00E5FF'
      context.globalAlpha = 0.95
      context.fill()
      context.restore()

      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      className="w-full max-w-[480px] aspect-square"
    />
  )
}

// ─── Typewriter ────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 36, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let characterIndex = 0
    let intervalId
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (characterIndex < text.length) {
          setDisplayed(text.slice(0, characterIndex + 1))
          characterIndex += 1
        } else {
          clearInterval(intervalId)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, delay])
  return displayed
}

// ─── Ambient Particles ─────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 24 }, (_, index) => ({
    id:       index,
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    size:     Math.random() * 1.5 + 0.5,
    duration: Math.random() * 8 + 6,
    delay:    Math.random() * 4,
    color:    index % 3 === 0 ? '#00E5FF' : index % 3 === 1 ? '#3b82f6' : '#4f46e5',
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const tagline = useTypewriter("I don't just build systems; I find the flaws in existing ones.", 34, 700)
  const subline  = useTypewriter('To ensure the next generation is sovereign and secure.', 28, 2400)

  const stats = [
    { value: '2B+', label: 'Users Impacted' },
    { value: '2',   label: 'CVEs Filed'     },
    { value: '4+',  label: 'Chains Secured' },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center terminal-grid overflow-hidden"
    >
      {/* Radial accent — blue/indigo tint behind hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(59,130,246,0.07) 0%, rgba(79,70,229,0.04) 50%, transparent 72%)',
        }}
      />

      <Particles />

      {/* Side labels */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="h-24 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)' }} />
        <div
          className="font-mono text-[9px] text-[#3b82f6]/40 tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          SOVEREIGN TRUST PROTOCOL
        </div>
        <div className="h-24 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)' }} />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="h-24 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)' }} />
        <div
          className="font-mono text-[9px] text-[#D4AF37]/40 tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          CLEARANCE: ARCHITECT-5
        </div>
        <div className="h-24 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left column ── */}
        <div className="space-y-8">
          {/* Status badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="inline-flex items-center gap-3"
          >
            <div className="flex items-center gap-2 badge-active px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              SYSTEM ONLINE
            </div>
            <div className="badge-classified px-3 py-1 text-[10px] font-mono tracking-widest uppercase">
              OPSEC ACTIVE
            </div>
          </motion.div>

          {/* Name block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <div className="font-mono text-[10px] text-[#3b82f6]/60 tracking-[0.4em] uppercase mb-3">
              IDENTITY_VERIFIED :: OPERATOR_NODE_001
            </div>
            <h1 className="font-sans font-black leading-none tracking-tight">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">JUNIOR</span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #00E5FF 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THURAM NANA
              </span>
            </h1>
          </motion.div>

          {/* Titles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="space-y-1"
          >
            <div className="font-mono text-[#D4AF37] text-sm tracking-[0.3em] uppercase glow-gold">
              Lead System Architect
            </div>
            <div className="font-mono text-[#D4AF37]/60 text-sm tracking-[0.3em] uppercase">
              Security Researcher &amp; Agentic AI Engineer
            </div>
          </motion.div>

          {/* Glass code block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="code-block"
          >
            <div className="text-[#e0e0e0]/90 font-mono text-sm leading-relaxed">
              &gt;{' '}
              <span className="text-[#00E5FF]">{tagline}</span>
              {tagline.length < 60 && (
                <span className="inline-block w-2 h-3.5 bg-[#00E5FF] ml-0.5 align-middle" />
              )}
            </div>
            {subline && (
              <div className="mt-2 text-[#e0e0e0]/60 font-mono text-sm leading-relaxed">
                &gt;{' '}
                <span>{subline}</span>
                {subline.length < 53 && (
                  <span className="inline-block w-2 h-3.5 bg-[#e0e0e0]/40 ml-0.5 align-middle" />
                )}
              </div>
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="flex flex-wrap gap-4"
          >
            <CTAButton
              primary
              onClick={() => document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' })}
            >
              [EXPLORE INFRASTRUCTURE]
            </CTAButton>
            <CTAButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              [SECURE CHANNEL]
            </CTAButton>
          </motion.div>

          {/* Bento stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, ease: EASE }}
            className="flex gap-4 pt-2"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex-1 text-center px-4 py-3"
                style={{
                  background:   'rgba(17,19,24,0.6)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border:       '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 0 1px rgba(59,130,246,0.3), 0 8px 24px rgba(0,0,0,0.6)',
                  borderColor: 'rgba(59,130,246,0.25)',
                  transition: { ease: EASE },
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.08, ease: EASE }}
              >
                <div className="font-mono text-xl font-bold text-[#00E5FF] glow-cyan">{stat.value}</div>
                <div className="font-mono text-[9px] text-[#e0e0e0]/40 tracking-widest uppercase mt-0.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column: Hex Sphere ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative flex justify-center items-center min-h-[420px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <PulseRing delay={0} />
            <PulseRing delay={1} />
            <PulseRing delay={2} />
          </div>

          <div className="relative z-10 animate-float">
            <HexSphere />
          </div>

          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#3b82f6]/40 tracking-widest text-right leading-loose">
            <div>NODE: 0x4A7F</div>
            <div>MESH: ACTIVE</div>
            <div>SYNC: 99.7%</div>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#D4AF37]/40 tracking-widest leading-loose">
            <div>LAYER: ARCHITECT-5</div>
            <div>TRUST: SOVEREIGN</div>
          </div>
        </motion.div>
      </div>

      {/* Fade-out bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0C10, transparent)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="font-mono text-[9px] text-[#3b82f6]/40 tracking-[0.3em] uppercase">SCROLL</div>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

// ─── CTA Button ────────────────────────────────────────────────────────────
function CTAButton({ children, onClick, primary }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: EASE }}
      className="font-mono text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300 relative overflow-hidden"
      style={primary ? {
        background:   'rgba(59,130,246,0.1)',
        border:       '1px solid rgba(59,130,246,0.5)',
        color:        '#93c5fd',
        borderRadius: '10px',
        boxShadow:    '0 4px 16px rgba(0,0,0,0.4)',
      } : {
        background:   'rgba(255,255,255,0.03)',
        border:       '1px solid rgba(255,255,255,0.08)',
        color:        'rgba(224,224,224,0.6)',
        borderRadius: '10px',
      }}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <motion.span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.12), transparent)',
            borderRadius: '10px',
          }}
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      )}
    </motion.button>
  )
}

// ─── Pulse Rings ───────────────────────────────────────────────────────────
function PulseRing({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width:  240 + delay * 80,
        height: 240 + delay * 80,
        border: '1px solid rgba(59,130,246,0.15)',
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.05, 0.3] }}
      transition={{ duration: 4, delay: delay * 1.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
