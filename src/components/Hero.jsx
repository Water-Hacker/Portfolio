import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function HexSphere() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    const layers = [
      { radius: 24, count: 1, size: 22, color: '#00E5FF', alpha: 0.95 },
      { radius: 64, count: 6, size: 17, color: '#00E5FF', alpha: 0.7 },
      { radius: 118, count: 12, size: 13, color: '#00BFFF', alpha: 0.5 },
      { radius: 174, count: 18, size: 10, color: '#D4AF37', alpha: 0.28 },
    ]

    const drawHex = (x, y, size, color, alpha, time, offset) => {
      const pulse = Math.sin(time * 1.4 + offset) * 0.5 + 0.5
      context.save()
      context.globalAlpha = alpha * (0.55 + pulse * 0.45)
      context.beginPath()
      for (let index = 0; index < 6; index += 1) {
        const angle = (Math.PI / 3) * index - Math.PI / 6
        const pointX = x + size * Math.cos(angle)
        const pointY = y + size * Math.sin(angle)
        if (index === 0) {
          context.moveTo(pointX, pointY)
        } else {
          context.lineTo(pointX, pointY)
        }
      }
      context.closePath()
      context.strokeStyle = color
      context.lineWidth = 0.85
      context.stroke()
      context.restore()
    }

    const drawLine = (x1, y1, x2, y2, color, alpha) => {
      context.save()
      context.globalAlpha = alpha
      context.strokeStyle = color
      context.lineWidth = 0.45
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
      halo.addColorStop(0, 'rgba(0,229,255,0.08)')
      halo.addColorStop(0.45, 'rgba(0,229,255,0.03)')
      halo.addColorStop(1, 'transparent')
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)

      layers.forEach((layer, layerIndex) => {
        const points = []

        if (layer.count === 1) {
          points.push([centerX, centerY])
        } else {
          for (let index = 0; index < layer.count; index += 1) {
            const baseAngle = (Math.PI * 2 * index) / layer.count
            const wobble = Math.sin(time * 0.55 + layerIndex + index * 0.22) * 4
            const angle = baseAngle + time * (layerIndex % 2 === 0 ? 0.06 : -0.05)
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
            drawLine(centerX, centerY, x, y, '#00E5FF', 0.12)
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
      context.fillStyle = '#00E5FF'
      context.globalAlpha = 0.95
      context.fill()
      context.restore()

      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
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
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [text, speed, delay])

  return displayed
}

function Particles() {
  const particles = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#00E5FF]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const tagline = useTypewriter("I don't just build systems; I find the flaws in existing ones.", 34, 700)
  const subline = useTypewriter('To ensure the next generation is sovereign and secure.', 28, 2400)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center terminal-grid overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 45%, rgba(0,229,255,0.07) 0%, transparent 72%)',
        }}
      />

      <Particles />

      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent" />
        <div
          className="font-mono text-[9px] text-[#00E5FF]/40 tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          SOVEREIGN TRUST PROTOCOL
        </div>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent" />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
        <div
          className="font-mono text-[9px] text-[#D4AF37]/40 tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          CLEARANCE: ARCHITECT-5
        </div>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="font-mono text-[10px] text-[#00E5FF]/60 tracking-[0.4em] uppercase mb-3">
              IDENTITY_VERIFIED :: OPERATOR_NODE_001
            </div>
            <h1 className="font-sans font-black leading-none tracking-tight">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">JUNIOR</span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl"
                style={{
                  background: 'linear-gradient(135deg, #00E5FF 0%, #0080FF 50%, #00E5FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THURAM NANA
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="space-y-1"
          >
            <div className="font-mono text-[#D4AF37] text-sm tracking-[0.3em] uppercase glow-gold">
              Lead System Architect
            </div>
            <div className="font-mono text-[#D4AF37]/60 text-sm tracking-[0.3em] uppercase">
              Security Researcher &amp; Prompt Engineer
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="code-block"
          >
            <div className="text-[#e0e0e0]/90 font-mono text-sm leading-relaxed">
              &gt; <span className="text-[#00E5FF]">{tagline}</span>
              {tagline.length < 60 && (
                <span className="inline-block w-2 h-3.5 bg-[#00E5FF] ml-0.5 align-middle" />
              )}
            </div>
            {subline && (
              <div className="mt-2 text-[#e0e0e0]/60 font-mono text-sm leading-relaxed">
                &gt; <span>{subline}</span>
                {subline.length < 53 && (
                  <span className="inline-block w-2 h-3.5 bg-[#e0e0e0]/40 ml-0.5 align-middle" />
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap gap-4"
          >
            <CTAButton
              primary
              onClick={() => document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' })}
            >
              [EXPLORE INFRASTRUCTURE]
            </CTAButton>
            <CTAButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              [SECURE CHANNEL]
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-8 pt-2"
          >
            {[
              { value: '2B+', label: 'Users Impacted' },
              { value: '2', label: 'CVEs Filed' },
              { value: '4+', label: 'Chains Secured' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-xl font-bold text-[#00E5FF] glow-cyan">{stat.value}</div>
                <div className="font-mono text-[9px] text-[#e0e0e0]/40 tracking-widest uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
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

          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#00E5FF]/40 tracking-widest text-right leading-loose">
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="font-mono text-[9px] text-[#00E5FF]/40 tracking-[0.3em] uppercase">SCROLL</div>
        <div className="w-px h-8 bg-gradient-to-b from-[#00E5FF]/40 to-transparent" />
      </motion.div>
    </section>
  )
}

function CTAButton({ children, onClick, primary }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`font-mono text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300 relative overflow-hidden group ${
        primary
          ? 'bg-[#00E5FF]/10 border border-[#00E5FF]/60 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF] hover:shadow-lg hover:shadow-[#00E5FF]/20'
          : 'border border-[#00E5FF]/20 text-[#e0e0e0]/60 hover:border-[#00E5FF]/40 hover:text-[#e0e0e0]'
      }`}
    >
      <span className="relative z-10">{children}</span>
      {primary && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  )
}

function PulseRing({ delay }) {
  return (
    <motion.div
      className="absolute rounded-full border border-[#00E5FF]/20"
      style={{ width: 240 + delay * 80, height: 240 + delay * 80 }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.05, 0.3] }}
      transition={{ duration: 4, delay: delay * 1.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
