import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const LAYERS = [
  {
    id: 'surface',
    label: 'Customer Surface',
    subtitle: 'Quickin landing + WhatsApp capture',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.24)',
    summary:
      'The customer-facing layer is the investor demo surface that captures attention, explains the offer, and simulates the WhatsApp journey.',
    details: [
      'In the local repo, this is the React/Vite landing surface in tapau-landing with the hero, WhatsApp simulator, AI demo, pricing, and investor suite.',
      'It is intentionally replay-based: it shows how Quickin converts social discovery into a structured conversation without pretending to be the backend itself.',
    ],
    sources: [
      'tapau-landing/src/components/Hero.jsx',
      'tapau-landing/src/components/WhatsAppSimulator.jsx',
      'tapau-landing/src/components/AIDemo.jsx',
    ],
  },
  {
    id: 'triad',
    label: 'Agent Triad',
    subtitle: 'Aina -> Amir -> Lina',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.24)',
    summary:
      'The automation layer is the qualifying, nurturing, and closing triad that turns raw chat into a guided sales motion.',
    details: [
      'The agent roles already exist as backstory-rich CrewAI stubs in agent-sea-platform, with Aina qualifying, Amir nurturing, and Lina closing.',
      'The current swarm code is not fully wired to the landing demo yet, so this view presents the intended handoff sequence rather than claiming live execution.',
    ],
    sources: [
      'agent-sea-platform/swarm/agents/aina.py',
      'agent-sea-platform/swarm/agents/amir.py',
      'agent-sea-platform/swarm/agents/lina.py',
    ],
  },
  {
    id: 'bridge',
    label: 'Ghost Bridge',
    subtitle: 'Webhook + state machine + compliance',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.24)',
    summary:
      'The compliance bridge converts a sale conversation into the right e-invoice path without slowing the customer down.',
    details: [
      'The PHP repo already models the GhostBridge state machine, webhook entrypoints, and MyInvois compliance rules for amount-based routing.',
      'For the demo, we show the intended contract and fail-open behavior: the business keeps moving, and compliance follows the correct path in the background.',
    ],
    sources: [
      'agent-sea-platform/fiduciary/lib/GhostBridge.php',
      'agent-sea-platform/fiduciary/lib/MyInvoisCompliance.php',
      'agent-sea-platform/fiduciary/public_html/webhook.php',
    ],
  },
  {
    id: 'ledger',
    label: 'CE-Ledger',
    subtitle: 'Provenance + cryptographic audit trail',
    color: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.24)',
    summary:
      'The provenance layer records the conversation as tamper-evident evidence that can be exported, audited, and proved later.',
    details: [
      'CE-Ledger already exposes ingest, audit, and export workflows, with Ed25519 signing, Merkle structures, and a dashboard for imported conversations.',
      'The landing demo should treat it as the ledger of record: not every message is a payment, but every message can become evidence.',
    ],
    sources: [
      'CE-Ledger/server/ingest.ts',
      'CE-Ledger/server/export.ts',
      'CE-Ledger/client/src/pages/Dashboard.tsx',
    ],
  },
  {
    id: 'sovereignty',
    label: 'Sovereign Stack',
    subtitle: 'Mandates + receipts + enforcement',
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.22)',
    summary:
      'The governance layer enforces what the system is allowed to do and produces receipts for anything sensitive.',
    details: [
      'The sovereign-stack repo contains mandate creation, adapter wrapping, tau-gate verification, routing, and receipt chaining primitives.',
      'For Quickin, this is the moat behind the moat: a future control plane for payment, compliance, and agent authority rather than another chatbot feature.',
    ],
    sources: [
      'sovereign-ap2-reference/packages/adapter/src/adapter.ts',
      'sovereign-ap2-reference/packages/adapter/src/tau-gate.ts',
      'sovereign-ap2-reference/packages/mandate-engine/src/mandate-builder.ts',
    ],
  },
]

const MOATS = [
  {
    title: 'Manglish NLP corpus',
    tag: 'Data moat',
    body:
      'The landing experience already demonstrates multilingual, Malaysia-specific conversational handling. That history becomes a data advantage because the system learns local phrasing, intent, and sales patterns that generic tools do not model well.',
  },
  {
    title: 'LHDN integration and compliance logic',
    tag: 'Regulatory moat',
    body:
      'The PHP backend already encodes amount thresholds, industry rules, and fail-open compliance handling. Rebuilding that logic with the right operational nuance is more than wiring up an API call.',
  },
  {
    title: 'Informal-economy trust',
    tag: 'Distribution moat',
    body:
      'The product is shaped around Malaysian F&B and SME workflows, not enterprise abstractions. That makes the motion legible to small operators and harder for generic software to copy convincingly.',
  },
  {
    title: 'Cryptographic provenance chain',
    tag: 'Technical moat',
    body:
      'CE-Ledger gives Quickin a proof layer for conversations, orders, and compliance events. Once those artifacts are signed and chained, the product can show verifiable history instead of just screenshots.',
  },
]

const REPLAY_STEPS = [
  'Customer sends WhatsApp message',
  'Agent triad qualifies and closes',
  'Ghost Bridge checks compliance',
  'CE-Ledger anchors provenance',
  'Sovereign Stack enforces authority',
]

export default function InvestorStackView() {
  const [activeLayer, setActiveLayer] = useState(LAYERS[0].id)

  const active = useMemo(
    () => LAYERS.find(layer => layer.id === activeLayer) || LAYERS[0],
    [activeLayer]
  )

  return (
    <section className="section investor-stack-view" style={{ background: 'linear-gradient(180deg, rgba(17,17,24,0.2), rgba(10,10,15,0.95))' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Investor Stack View</span>
          <h2>How Quickin compounds the moat</h2>
          <p>
            This is a replay-based view of the intended architecture, grounded in the local repos that already exist today.
            It shows the system as investors should understand it: customer capture, agentic automation, compliance, provenance, and enforcement.
          </p>
        </motion.div>

        <div className="stack-grid">
          <div className="diagram-panel glass-card">
            <div className="diagram-head">
              <span className="diagram-kicker">Clickable layer diagram</span>
              <span className="diagram-mode">Replay mode</span>
            </div>

            <div className="stack-path">
              {LAYERS.map((layer, index) => {
                const isActive = activeLayer === layer.id
                return (
                  <div key={layer.id} className="layer-step-wrap">
                    <motion.button
                      type="button"
                      className={`layer-step ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveLayer(layer.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        borderColor: isActive ? layer.color : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 0 0 1px ${layer.glow}, 0 12px 40px rgba(0,0,0,0.28)` : 'none',
                      }}
                    >
                      <div className="layer-index">0{index + 1}</div>
                      <div className="layer-copy">
                        <div className="layer-label" style={{ color: layer.color }}>{layer.label}</div>
                        <div className="layer-subtitle">{layer.subtitle}</div>
                      </div>
                    </motion.button>

                    {index < LAYERS.length - 1 && <div className="layer-connector" aria-hidden="true" />}
                  </div>
                )
              })}
            </div>

            <div className="replay-strip">
              {REPLAY_STEPS.map((step, index) => (
                <motion.div
                  key={step}
                  className="replay-chip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index }}
                >
                  <span className="replay-dot" />
                  {step}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="detail-panel glass-card"
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="detail-top">
              <div>
                <span className="detail-kicker">Selected layer</span>
                <h3>{active.label}</h3>
              </div>
              <div className="detail-pill" style={{ borderColor: active.color, color: active.color }}>
                {active.subtitle}
              </div>
            </div>

            <p className="detail-summary">{active.summary}</p>

            <div className="detail-card-grid">
              {active.details.map((line, index) => (
                <div key={index} className="detail-card">
                  <div className="detail-card-mark" style={{ background: active.color }} />
                  <p>{line}</p>
                </div>
              ))}
            </div>

            <div className="source-box">
              <div className="source-label">Grounded in these local files</div>
              <div className="source-list">
                {active.sources.map(source => (
                  <span key={source} className="source-chip">{source}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="moat-panel glass-card">
          <div className="moat-head">
            <span className="diagram-kicker">Strategic moat</span>
            <span className="moat-caption">What a competitor would need to rebuild</span>
          </div>

          <div className="moat-grid">
            {MOATS.map(item => (
              <div key={item.title} className="moat-card">
                <div className="moat-tag">{item.tag}</div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .investor-stack-view {
          position: relative;
        }

        .stack-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: var(--space-xl);
          align-items: start;
        }

        .diagram-panel,
        .detail-panel,
        .moat-panel {
          position: relative;
          overflow: hidden;
        }

        .diagram-panel::before,
        .detail-panel::before,
        .moat-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(249,115,22,0.08), transparent 32%),
            radial-gradient(circle at bottom right, rgba(34,211,238,0.08), transparent 28%);
          pointer-events: none;
        }

        .diagram-head,
        .detail-top,
        .moat-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .diagram-kicker,
        .detail-kicker {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
        }

        .diagram-mode,
        .detail-pill {
          font-size: 0.78rem;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          background: rgba(255,255,255,0.02);
          white-space: nowrap;
        }

        .stack-path {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: var(--space-lg);
        }

        .layer-step-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .layer-step {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          color: var(--text-primary);
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
          position: relative;
          z-index: 1;
        }

        .layer-step:hover,
        .layer-step.active {
          background: rgba(255,255,255,0.06);
        }

        .layer-index {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-weight: 800;
          color: white;
          background: linear-gradient(135deg, rgba(249,115,22,0.9), rgba(34,211,238,0.75));
          flex-shrink: 0;
        }

        .layer-copy {
          min-width: 0;
        }

        .layer-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
        }

        .layer-subtitle {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .layer-connector {
          width: 2px;
          height: 18px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
          margin: 0.1rem 0;
        }

        .replay-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .replay-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.7rem;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          font-size: 0.78rem;
        }

        .replay-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--whatsapp);
          box-shadow: 0 0 0 4px rgba(37,211,102,0.08);
        }

        .detail-panel {
          min-height: 100%;
        }

        .detail-summary {
          margin-bottom: var(--space-lg);
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .detail-card-grid {
          display: grid;
          gap: 0.75rem;
          margin-bottom: var(--space-lg);
        }

        .detail-card {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.85rem 0.9rem;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
        }

        .detail-card-mark {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }

        .detail-card p {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .source-box {
          padding-top: var(--space-md);
          border-top: 1px solid var(--glass-border);
        }

        .source-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin-bottom: 0.7rem;
        }

        .source-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .source-chip {
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 0.38rem 0.6rem;
        }

        .moat-panel {
          margin-top: var(--space-xl);
        }

        .moat-caption {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .moat-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--space-md);
        }

        .moat-card {
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
        }

        .moat-tag {
          display: inline-flex;
          padding: 0.28rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-2);
          background: rgba(249,115,22,0.08);
          margin-bottom: 0.75rem;
        }

        .moat-card h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .moat-card p {
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        @media (max-width: 980px) {
          .stack-grid,
          .moat-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .diagram-head,
          .detail-top,
          .moat-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .layer-step {
            padding: 0.85rem;
          }
        }
      `}</style>
    </section>
  )
}
