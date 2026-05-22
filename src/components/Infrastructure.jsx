import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const pillars = [
  {
    id: 'P1', number: '01', tag: 'VULNERABILITY RESEARCH',
    tagColor: '#ff6b6b', title: 'The Hunter', subtitle: 'Finding what others miss', icon: '◈',
    cases: [
      {
        id: 'CASE-META-001', client: 'Meta / WhatsApp', year: '2024',
        type: 'Logic Bypass — iOS Group Permissions', badge: 'PATCHED', badgeClass: 'badge-active',
        detail: 'Identified a permission escalation logic bypass in the WhatsApp iOS client. Non-admin users could forward screenshots within restricted group environments, circumventing broadcast controls. Disclosure triggered a global security policy update across the platform.',
        tech: ['iOS Security', 'Group Permission Logic', 'Responsible Disclosure'],
      },
      {
        id: 'CASE-SAM-002', client: 'Samsung Mobile', year: '2025',
        type: 'Character Injection — Clipboard-to-Dialpad', badge: 'ZERO-DAY', badgeClass: 'badge-zero-day',
        detail: 'Discovered a character misinterpretation flaw between the clipboard and system dialpad. Certain Unicode sequences caused unexpected behavior in the dialer input parser, creating a potential injection vector. Status: Reported. Persistent.',
        tech: ['Android Internals', 'Character Encoding', 'Zero-Day Research'],
      },
      {
        id: 'CASE-CRUCIBLE-001', client: 'CRUCIBLE — OBSIDIAN Agent', year: '2025–2026',
        type: 'Reasoning-Driven Offensive Security Framework', badge: 'ACTIVE', badgeClass: 'badge-active',
        detail: 'Designed and built a reusable multi-target framework for self-directed penetration testing and adversary emulation across every owned application. Drives an agent — OBSIDIAN — as a senior offensive security operator following a structured cognitive loop (observe → orient → hypothesise → test → update → critique → pivot) rather than a static checklist. Each engagement lives as a target instance under targets/<name>/, sharing playbooks, knowledge base, scripts, and templates. Standard-aligned to OWASP WSTG / ASVS / API Top 10 / LLM Top 10, MITRE ATT&CK, PTES, NIST 800-115, and PASTA — so findings translate cleanly to compliance and detection contexts. Built-in critique routines force the agent to ask "what am I missing?" at every phase boundary and every 30 minutes of stuck thread; pivot protocols generate alternatives systematically when blocked. Playbook coverage spans web, API, auth / identity, cloud, containers, CI/CD, microservices, mobile, LLM/AI, supply chain, source-code review, and post-exploitation.',
        tech: ['Agentic AI Engineering', 'Claude Code (Opus)', 'OWASP WSTG / ASVS', 'OWASP API Top 10', 'OWASP LLM Top 10', 'MITRE ATT&CK', 'PTES', 'NIST 800-115', 'PASTA', 'Adversary Emulation', 'Multi-Target Engagements'],
      },
    ],
  },
  {
    id: 'P2', number: '02', tag: 'DIGITAL ASSET INFRASTRUCTURE',
    tagColor: '#D4AF37', title: 'The Builder', subtitle: 'Sovereign custody architecture', icon: '⬡',
    cases: [
      {
        id: 'CASE-ESCROW-001', client: 'CLASSIFIED — NDA PROTECTED', year: '2024–2025',
        type: 'Multi-Chain Escrow Protocol', badge: 'CLASSIFIED', badgeClass: 'badge-classified',
        detail: 'Designed and engineered a secure multi-chain custody architecture for BTC, ETH, SOL, and BNB. Features cold-storage logic, multi-sig authorization flows, and automated compliance triggers. Full technical dossier available via secure audit pathway only.',
        tech: ['Solidity', 'Rust', 'Multi-Sig Auth', 'Cold Storage Logic', 'Cross-Chain Bridges'],
        redacted: true,
      },
      {
        id: 'CASE-BLOCKEARTH-001', client: 'BlockEarth — blockearth.app', year: '2025',
        type: 'Decentralised Web3 App — ETH Smart Contract & Token Sale', badge: 'LIVE', badgeClass: 'badge-active',
        detail: 'Built and deployed a fully decentralised Web3 application. Supports all wallet connections (MetaMask, WalletConnect, Coinbase Wallet, and more). Users purchase tokens directly with ETH through a Solidity smart contract that auto-forwards all received ETH to a designated custody wallet while issuing proportional tokens to buyers. Contract is time-locked with a 1-year operational window baked into the on-chain logic. Fully non-custodial, trustless, and permissionless.',
        tech: ['Solidity', 'Smart Contracts', 'Web3.js', 'WalletConnect', 'MetaMask', 'ETH', 'Time-Lock Logic', 'Token Issuance', 'Web3 Frontend'],
        link: 'https://blockearth.app/',
      },
    ],
  },
  {
    id: 'P3', number: '03', tag: 'AI & FULLSTACK SYSTEMS',
    tagColor: '#3b82f6', title: 'The Founder', subtitle: 'Building the sovereign stack', icon: '◇',
    cases: [
      {
        id: 'CASE-FLAIRE-001', client: 'FLAIRE — flaireapp.org', year: '2025',
        type: 'AI-Powered EdTech Cross-Platform App', badge: 'LIVE', badgeClass: 'badge-active',
        detail: 'Built and launched a full-stack AI-powered educational platform. Engineered cross-platform mobile with Flutter & Dart, Firebase backend for real-time data and auth, Google Cloud infrastructure for scalability. flaireapp.org is the official project website. Professional Agentic AI Engineering drives AI curriculum pipeline and system logic generation.',
        tech: ['Flutter', 'Dart', 'Firebase', 'Google Cloud', 'Agentic AI Engineering', 'AI Architecture'],
        link: 'https://www.flaireapp.org/',
      },
      {
        id: 'CASE-GUC-001', client: 'GUC — School Social System', year: '2024',
        type: 'School Management + Social Platform', badge: 'DEPLOYED', badgeClass: 'badge-active',
        detail: 'Built and deployed a comprehensive school management ecosystem integrating academic tracking, internal social networking, communication channels, and administrative tooling for educational institutions.',
        tech: ['Full-Stack Engineering', 'University Systems', 'Social Architecture', 'Admin Portals'],
      },
    ],
  },
  {
    id: 'P4', number: '04', tag: 'SOVEREIGN NATIONAL INFRASTRUCTURE',
    tagColor: '#10b981', title: 'The Sovereign', subtitle: 'Nation-scale platforms for the Republic of Cameroon', icon: '⬢',
    cases: [
      {
        id: 'CASE-VIGIL-001', client: 'VIGIL APEX SAS — CONAC Phase 1 Pilot', year: '2026',
        type: 'Real-Time Public Finance Compliance & Anti-Corruption Intelligence Platform', badge: 'SOVEREIGN', badgeClass: 'badge-sovereign',
        detail: 'Designed and built — as solo Sovereign Architect via agentic AI engineering — a forensic pipeline that ingests 26 public data sources (procurement portals, OFAC / EU sanctions, OpenCorporates, ARMP debarments, court extracts, satellite imagery, anonymous tips), runs 43 deterministic fraud patterns across 8 categories, and fuses signals through a Bayesian certainty engine targeting Expected Calibration Error < 5%. Findings escalate only on a 3-of-5 hardware-key (YubiKey + Shamir) council quorum, then ship as a deterministic bilingual (FR/EN) GPG-signed dossier to CONAC over SFTP. Every state transition is anchored to a triple-witness audit chain: Postgres hash chain + Polygon mainnet (VIGILAnchor.sol) + Hyperledger Fabric. Production posture: HPE DL380 Gen11 cluster, Caddy active-active + keepalived VRRP VIP, PgBouncer (480 slots / 6,000 clients), Redis Sentinel, 12 HPAs + 33 PDBs + KEDA, 46 Prometheus alerts, 9 Grafana dashboards. 552 pattern unit tests. Operates on public-domain data only.',
        tech: ['TypeScript', 'Next.js 14', 'Postgres + Drizzle', 'Neo4j', 'Redis Streams', 'Solidity', 'Polygon Mainnet', 'Hyperledger Fabric', 'Shamir Secret Sharing', 'YubiKey / FIDO2', 'Bayesian Inference', 'Anthropic Claude', 'Rasterio + STAC', 'OpenCV', 'Python', 'Rust', 'Kubernetes / Helm', 'Caddy + Keepalived', 'PgBouncer', 'KEDA', 'Prometheus + Grafana', 'Vault', 'Agentic AI Engineering'],
      },
      {
        id: 'CASE-RECOR-001', client: 'RÉCOR Consortium — BUNEC / ARMP / ANIF / DGI / BEAC', year: '2026',
        type: 'National Beneficial Ownership Registry — FATF R.24 / R.25', badge: 'SOVEREIGN', badgeClass: 'badge-sovereign',
        detail: 'Solo architect and developer of record on the national BO registry of Cameroon — sovereign-grade infrastructure designed to satisfy FATF Recommendations 24 and 25 and underpin grey-list remediation. Rust + TypeScript monorepo with a 9-stage adversarial verification pipeline (schema parity + Ed25519 attestation → identity gates → UN/EU/OFAC sanctions → PEP screening → adverse media via Claude → graph + ML pattern detection → Dempster-Shafer cross-source fusion → stakeholder review → public consultation). Every declaration is browser-signed (Ed25519 via Web Crypto), receipted with BLAKE3, and anchored to a Hyperledger Fabric audit channel. 5 Rust services (axum + sqlx + tonic), 12 shared crates, 890+ workspace tests, 40 migrations, 21 MADR ADRs, 42 runbooks, 32 promtool-clean alerts, 10 Pyrra SLOs, 9 Grafana dashboards, 15 k6 stress scenarios, 9 Litmus chaos experiments. Defence in depth: Cloudflare/CloudFront WAF → HAProxy 2.x (TLS 1.3 AEAD, per-IP stick-tables) → SPIFFE/mTLS (rustls) → PgBouncer transaction pool → Postgres writer/reader split. 24 binding engineering doctrines block merge on violation. SLSA Level 3 supply chain: pinned tooling, hermetic builds, cosign-signed images, branch-protection-as-code.',
        tech: ['Rust', 'TypeScript', 'axum', 'sqlx', 'tonic', 'React 19 + Vite 6', 'Tailwind v4', 'Web Crypto (Ed25519)', 'BLAKE3', 'Hyperledger Fabric', 'Dempster-Shafer Fusion', 'SPIFFE / SPIRE', 'rustls (mTLS)', 'HashiCorp Vault', 'HAProxy 2.x', 'Cloudflare + CloudFront', 'Kafka (KRaft)', 'PgBouncer', 'Redis Cluster + Sentinel', 'OpenTelemetry', 'Prometheus + Tempo + Loki', 'Pyrra SLOs', 'k6 + Litmus Chaos', 'Anthropic Claude (Tier-B)', 'SLSA Level 3', 'cosign + SBOM', 'Agentic AI Engineering'],
      },
      {
        id: 'CASE-MAMA-001', client: 'République du Cameroun — National Maternal Health Coordination', year: '2026',
        type: 'Sovereign Maternal & Neonatal Mobilization Architecture', badge: 'SOVEREIGN', badgeClass: 'badge-sovereign',
        detail: 'Sole architect and developer of record on MAMA — the national maternal and neonatal coordination platform of Cameroon. Sovereign, open-source (Apache 2.0), offline-first, and safety-critical. Eight architectural planes engineered against twelve binding doctrines (D-01 → D-12), spanning seven connectivity tiers (T1 fibre → T7 paper-of-record) so the platform degrades gracefully from urban facilities to rural sites with no network. V-Model discipline across every service, defence-in-depth security model, end-to-end audit chain with integrity proofs, and Phase-5 acceptance gates governing every release. Designed to coordinate facility readiness, referral logistics, neonatal transport, and field-level data capture for the country\'s maternal and child health programme.',
        tech: ['Safety-Critical Systems', 'Offline-First Architecture', 'V-Model Discipline', 'Multi-Tier Connectivity (T1–T7)', 'Audit Chain Integrity', 'Defence-in-Depth Security', 'National Coordination Platform', 'Sovereign Infrastructure', 'Apache 2.0 Open Source', 'Agentic AI Engineering'],
      },
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

export default function Infrastructure() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infrastructure" ref={ref} className="relative py-32 px-6" style={{ background: 'transparent' }}>
      <div className="section-divider mb-0" />

      {/* Subtle grid accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel number="// 02" label="Infrastructure Matrix" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20"
        >
          <h2 className="font-sans font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Three{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Pillars
            </span>
          </h2>
          <p className="font-mono text-sm text-[#e0e0e0]/50 max-w-xl">
            Hunter. Builder. Founder. Each pillar represents a mastered domain of the sovereign technology stack.
          </p>
        </motion.div>

        <div className="space-y-20">
          {pillars.map((pillar, pi) => (
            <PillarBlock key={pillar.id} pillar={pillar} index={pi} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarBlock({ pillar, index, inView }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
    >
      {/* Pillar header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="font-mono text-4xl font-black opacity-20 select-none" style={{ color: pillar.tagColor }}>
          {pillar.number}
        </div>
        <div className="flex-1 h-px" style={{ background: `${pillar.tagColor}25` }} />
        <div
          className="font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1.5"
          style={{
            border:       `1px solid ${pillar.tagColor}30`,
            color:        pillar.tagColor,
            background:   `${pillar.tagColor}08`,
            borderRadius: '6px',
          }}
        >
          {pillar.tag}
        </div>
        <div className="flex-1 h-px hidden sm:block" style={{ background: `${pillar.tagColor}15` }} />
      </div>

      <div className="mb-8 pl-0 sm:pl-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-3xl" style={{ color: pillar.tagColor }}>{pillar.icon}</span>
          <div>
            <h3 className="font-sans font-black text-3xl text-white">{pillar.title}</h3>
            <p className="font-mono text-xs text-[#e0e0e0]/40 tracking-widest uppercase">{pillar.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Bento case cards — 24px gap */}
      <div className="grid sm:grid-cols-2 gap-6 pl-0 sm:pl-16">
        {pillar.cases.map((c, ci) => (
          <CaseCard
            key={c.id}
            caseData={c}
            index={ci}
            tagColor={pillar.tagColor}
            expanded={expanded === ci}
            onToggle={() => setExpanded(expanded === ci ? null : ci)}
          />
        ))}
      </div>
    </motion.div>
  )
}

function CaseCard({ caseData, index, tagColor, expanded, onToggle }) {
  return (
    <motion.div
      className="cursor-pointer transition-all duration-400"
      style={{
        background:    expanded
          ? `rgba(17,19,24,0.82)`
          : 'rgba(17,19,24,0.60)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border:        `1px solid ${expanded ? `${tagColor}40` : 'rgba(255,255,255,0.07)'}`,
        borderRadius:  '16px',
        boxShadow:     expanded
          ? `0 0 0 1px ${tagColor}20, 0 12px 40px rgba(0,0,0,0.8), 0 0 32px ${tagColor}0a`
          : '0 8px 32px rgba(0,0,0,0.6)',
      }}
      whileHover={{
        scale: 1.015,
        boxShadow: `0 0 0 1px ${tagColor}30, 0 12px 40px rgba(0,0,0,0.8)`,
        transition: { ease: EASE },
      }}
      onClick={onToggle}
    >
      {/* Top accent bar */}
      <div
        className="h-px w-full"
        style={{
          background:   `linear-gradient(90deg, ${tagColor}60, transparent)`,
          borderRadius: '16px 16px 0 0',
        }}
      />

      <div className="p-5">
        {/* Case ID + badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-widest" style={{ color: `${tagColor}60` }}>
            {caseData.id}
          </span>
          <span className={`${caseData.badgeClass} font-mono text-[8px] px-2 py-0.5 tracking-widest uppercase`}>
            {caseData.badge}
          </span>
        </div>

        {/* Client + year */}
        <div className="font-mono text-[10px] text-[#e0e0e0]/40 tracking-widest uppercase mb-2">
          {caseData.year} //{' '}
          {caseData.redacted
            ? <span className="redacted px-2">{caseData.client}</span>
            : caseData.client
          }
        </div>

        {/* Type */}
        <h4 className="font-sans font-semibold text-base text-white mb-3 leading-tight">{caseData.type}</h4>

        {/* Expand indicator */}
        <div
          className="flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase"
          style={{ color: `${tagColor}60` }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >▶</span>
          {expanded ? 'COLLAPSE' : 'EXPAND DOSSIER'}
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                <div className="h-px" style={{ background: `${tagColor}20` }} />
                <p className="font-mono text-xs text-[#e0e0e0]/70 leading-relaxed">{caseData.detail}</p>
                <div>
                  <div
                    className="font-mono text-[9px] tracking-widest uppercase mb-2"
                    style={{ color: `${tagColor}60` }}
                  >
                    TECHNOLOGY STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caseData.tech.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[9px] px-2 py-0.5 tracking-wide"
                        style={{
                          borderRadius: '4px',
                          border:       `1px solid ${tagColor}25`,
                          color:        `${tagColor}80`,
                          background:   `${tagColor}06`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {caseData.link && (
                  <a
                    href={caseData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase mt-1 hover:opacity-80 transition-opacity"
                    style={{ color: tagColor }}
                    onClick={e => e.stopPropagation()}
                  >
                    ◈ VISIT LIVE DEPLOYMENT → {caseData.link.replace('https://', '')}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
