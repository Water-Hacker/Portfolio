import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import Hero from './components/Hero'
import IntelBriefing from './components/IntelBriefing'
import Infrastructure from './components/Infrastructure'
import Library from './components/Library'
import Vault from './components/Vault'
import Mentorship from './components/Mentorship'
import PGP from './components/PGP'
import Footer from './components/Footer'
import BootSequence from './components/BootSequence'
import TechArsenal from './components/TechArsenal'

export default function App() {
  const [booted, setBooted] = useState(false)
  const handleComplete = useCallback(() => setBooted(true), [])

  return (
    <div className="relative bg-[#050505] min-h-screen overflow-x-hidden">
      {/* CRT scanline overlay */}
      <div className="crt-overlay" />

      {/* Main app — always mounted, never unmounted */}
      <ErrorBoundary>
        <Navbar />
        <main>
          <Hero />
          <TechArsenal />
          <IntelBriefing />
          <Infrastructure />
          <Library />
          <Vault />
          <Mentorship />
          <PGP />
        </main>
        <Footer />
      </ErrorBoundary>

      {/* Boot screen overlays everything until complete */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50"
          >
            <BootSequence onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
