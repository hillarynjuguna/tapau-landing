import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const REPLAY_MESSAGES = [
  {
    role: 'user',
    speaker: 'Sarah',
    text: 'boss got today ah?',
    register: 'Manglish',
  },
  {
    role: 'assistant',
    speaker: 'Aina',
    text: 'Got boss, still available. Want me to reserve one for you?',
    register: 'Manglish',
  },
  {
    role: 'user',
    speaker: 'Sarah',
    text: 'how much ah?',
    register: 'English',
  },
  {
    role: 'assistant',
    speaker: 'Amir',
    text: 'Classic Corn Dog RM12. I can explain pickup and timing if you want.',
    register: 'English',
  },
  {
    role: 'user',
    speaker: 'Sarah',
    text: 'okay confirm 1',
    register: 'Manglish',
  },
  {
    role: 'assistant',
    speaker: 'Lina',
    text: 'Confirmed. Sovereign Handshake triggered, invoice trail anchored.',
    register: 'Formal',
  },
]

const NODE_POSITIONS = ['0/1', '1/2', '2/4', '3/8', '4/16', '5/32']

function toHex(bytes, length = 64) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length)
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return toHex(new Uint8Array(digest), 64)
}

function pseudoSignature(hexHash, index) {
  const seed = `${hexHash}:${index}:ed25519`
  let acc = 0
  for (let i = 0; i < seed.length; i += 1) {
    acc = (acc * 33 + seed.charCodeAt(i)) >>> 0
  }
  const prefix = hexHash.slice(0, 8)
  const suffix = (acc.toString(16) + hexHash.slice(-8)).padEnd(64, '0').slice(0, 64)
  return `${prefix}${suffix}`
}

function chunkHash(hash) {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`
}

function buildTreeLevels(messages) {
  const leaves = messages.map((message, index) => ({
    id: `leaf-${index}`,
    label: `${index + 1}`,
    hash: message.hash.slice(0, 12),
    active: true,
  }))

  const mid = []
  for (let i = 0; i < leaves.length; i += 2) {
    const left = leaves[i]
    const right = leaves[i + 1]
    mid.push({
      id: `mid-${i}`,
      label: right ? `${left.label}+${right.label}` : left.label,
      hash: right ? `${left.hash.slice(0, 4)}${right.hash.slice(-4)}` : left.hash,
      active: i < messages.length,
    })
  }

  return [leaves, mid]
}

export default function ProvenanceChainDemo() {
  const [ref, isInView] = useInView(0.15)
  const [visibleCount, setVisibleCount] = useState(1)
  const [replay, setReplay] = useState([])

  useEffect(() => {
    let cancelled = false

    async function hydrateReplay() {
      const rows = []

      for (let i = 0; i < REPLAY_MESSAGES.length; i += 1) {
        const message = REPLAY_MESSAGES[i]
        const canonical = `${message.role}|${message.speaker}|${message.text}|${i}`
        const hash = await sha256Hex(canonical)
        const signature = pseudoSignature(hash, i)
        const timestamp = new Date(Date.UTC(2026, 2, 23, 2, 14, 12 + i * 4)).toISOString()

        rows.push({
          ...message,
          index: i,
          hash,
          signature,
          timestamp,
          merklePath: NODE_POSITIONS[i] || `${i}/?`,
        })
      }

      if (!cancelled) {
        setReplay(rows)
      }
    }

    hydrateReplay()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (replay.length === 0) return undefined
    setVisibleCount(1)

    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= replay.length) {
          window.clearInterval(timer)
          return count
        }
        return count + 1
      })
    }, 1100)

    return () => window.clearInterval(timer)
  }, [replay])

  const visibleRows = replay.slice(0, visibleCount)
  const [treeLeaves, treeParents] = useMemo(() => buildTreeLevels(visibleRows), [visibleRows])
  const latest = visibleRows[visibleRows.length - 1]

  return (
    <section className="section" ref={ref} style={{ background: 'linear-gradient(180deg, var(--bg-secondary), var(--bg-primary))' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Provenance Chain</span>
          <h2>Every WhatsApp turn becomes a verifiable ledger event</h2>
          <p>
            This is a replay of the CE-Ledger concept: conversation turns are hashed, signed, chained, and exportable for audit.
            The artifacts below are simulated previews, but the structure mirrors the real vault architecture.
          </p>
        </motion.div>

        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ padding: 'var(--space-xl)' }}
        >
          <div className="prov-grid">
            <div className="prov-ledger">
              <div className="prov-ledger-head">
                <div>
                  <div className="prov-kicker">Conversation ledger</div>
                  <h3 style={{ marginBottom: '0.25rem' }}>SHA-256 + Ed25519 envelope preview</h3>
                  <p style={{ fontSize: '0.9rem' }}>Each new message extends the chain with a new Merkle position and signed provenance row.</p>
                </div>
                <div className="prov-status">
                  <span className="prov-dot" />
                  Replay active
                </div>
              </div>

              <div className="prov-stream">
                <AnimatePresence initial={false}>
                  {visibleRows.map((row, index) => (
                    <motion.article
                      key={`${row.index}-${row.hash.slice(0, 6)}`}
                      className="prov-row"
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                    >
                      <div className={`prov-role ${row.role === 'assistant' ? 'assistant' : 'user'}`}>
                        {row.speaker}
                      </div>
                      <div className="prov-body">
                        <div className="prov-meta">
                          <span>{row.register}</span>
                          <span>{row.timestamp}</span>
                        </div>
                        <div className="prov-text">{row.text}</div>
                        <div className="prov-fingerprint">
                          <span>SHA-256</span>
                          <code>{chunkHash(row.hash)}</code>
                          <span>Ed25519</span>
                          <code>{`${row.signature.slice(0, 10)}...${row.signature.slice(-10)}`}</code>
                          <span>Merkle</span>
                          <code>{row.merklePath}</code>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              <div className="prov-caption">
                Every customer interaction is tamper-evident. When you need to prove your business to a bank, the trail is already there.
              </div>
            </div>

            <div className="prov-side">
              <div className="prov-hero-card">
                <div className="prov-kicker">Latest anchor</div>
                <h3 style={{ margin: '0 0 0.5rem' }}>{latest ? latest.speaker : 'Waiting for replay'}</h3>
                <p style={{ marginBottom: '0.8rem' }}>{latest ? latest.text : 'Ledger is warming up...'}</p>
                <div className="prov-pillrow">
                  <span className="prov-pill">Immutable hash chain</span>
                  <span className="prov-pill">Merkle-proved sequence</span>
                  <span className="prov-pill">Export-ready audit trail</span>
                </div>
              </div>

              <div className="prov-tree">
                <div className="prov-tree-title">Merkle build</div>
                <div className="prov-level">
                  {treeLeaves.map((node) => (
                    <div key={node.id} className={`prov-node ${node.active ? 'active' : ''}`}>
                      <span>{node.label}</span>
                      <code>{node.hash}</code>
                    </div>
                  ))}
                </div>
                <div className="prov-bridge" />
                <div className="prov-level">
                  {treeParents.length > 0 ? treeParents.map((node) => (
                    <div key={node.id} className={`prov-node parent ${node.active ? 'active' : ''}`}>
                      <span>{node.label}</span>
                      <code>{node.hash}</code>
                    </div>
                  )) : (
                    <div className="prov-placeholder">Parent nodes appear as more messages arrive</div>
                  )}
                </div>
                <div className="prov-root">
                  <span>Root proof</span>
                  <code>{visibleRows.length > 0 ? visibleRows[visibleRows.length - 1].hash.slice(0, 24) : 'waiting...'}</code>
                </div>
              </div>

              <div className="prov-note">
                CE-Ledger today is best understood as a provenance vault: ingest, hash, sign, chain, and export. This demo visualizes that exact promise without pretending the backend is live-wired here.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .prov-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: var(--space-xl);
        }
        .prov-ledger-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }
        .prov-kicker {
          display: inline-block;
          margin-bottom: 0.4rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-4);
          font-weight: 700;
        }
        .prov-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(34, 197, 94, 0.08);
          color: #86efac;
          font-size: 0.82rem;
          white-space: nowrap;
        }
        .prov-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
          animation: prov-pulse 1.8s infinite;
        }
        .prov-stream {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .prov-row {
          display: grid;
          grid-template-columns: 84px 1fr;
          gap: 0.8rem;
          padding: 0.95rem 1rem;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .prov-role {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: fit-content;
          min-height: 36px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
        }
        .prov-role.assistant {
          background: linear-gradient(135deg, var(--accent-3), var(--accent-4));
        }
        .prov-meta,
        .prov-fingerprint,
        .prov-pillrow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .prov-meta {
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 0.45rem;
        }
        .prov-text {
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .prov-fingerprint {
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .prov-fingerprint code {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.2rem 0.45rem;
          border-radius: 9999px;
          color: var(--accent-5);
        }
        .prov-caption,
        .prov-note {
          margin-top: var(--space-lg);
          padding: 0.95rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
        }
        .prov-caption {
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.18);
          color: var(--text-secondary);
        }
        .prov-side {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .prov-hero-card,
        .prov-tree {
          padding: 1rem;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .prov-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.7rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        .prov-tree-title {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-4);
          margin-bottom: 0.75rem;
        }
        .prov-level {
          display: grid;
          gap: 0.65rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .prov-node,
        .prov-placeholder,
        .prov-root {
          padding: 0.75rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 76px;
        }
        .prov-node.active,
        .prov-root {
          border-color: rgba(249, 115, 22, 0.22);
          box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.05) inset;
        }
        .prov-node span,
        .prov-placeholder,
        .prov-root span {
          display: block;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin-bottom: 0.35rem;
        }
        .prov-node code,
        .prov-root code {
          display: block;
          color: var(--text-primary);
          font-size: 0.82rem;
          word-break: break-all;
        }
        .prov-bridge {
          height: 22px;
          margin: 0.7rem 0;
          border-left: 2px dashed rgba(249, 115, 22, 0.28);
          margin-left: 50%;
        }
        .prov-note {
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.16);
          color: var(--text-secondary);
        }
        @keyframes prov-pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
          70% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @media (max-width: 900px) {
          .prov-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .prov-ledger-head,
          .prov-row {
            grid-template-columns: 1fr;
            display: grid;
          }
          .prov-row {
            gap: 0.75rem;
          }
          .prov-level {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
