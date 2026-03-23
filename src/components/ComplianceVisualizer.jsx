import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const FLOW_STEPS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    note: 'Customer sends the order intent',
    icon: '💬',
  },
  {
    id: 'webhook',
    label: 'Webhook',
    note: 'Agent SEA Ghost Bridge receives the event',
    icon: '🔗',
  },
  {
    id: 'compliance',
    label: 'Compliance Check',
    note: 'MyInvois rule engine classifies the transaction',
    icon: '🧾',
  },
  {
    id: 'lhdn',
    label: 'LHDN',
    note: 'Submission path is selected if required',
    icon: '🏛️',
  },
]

const THRESHOLDS = [
  {
    id: 'monthly',
    label: '< RM500',
    title: 'Monthly consolidation',
    desc: 'Background queue. Keep selling, consolidate later.',
    accent: '#22c55e',
  },
  {
    id: 'individual',
    label: 'RM500-10k',
    title: '30-day individual invoice',
    desc: 'Invoice is required within the compliance window.',
    accent: '#f97316',
  },
  {
    id: 'immediate',
    label: '> RM10k',
    title: 'Immediate e-invoice',
    desc: 'High-value transactions require immediate submission.',
    accent: '#ef4444',
  },
]

const STATE_MACHINE = [
  { state: 'DRAFT', label: 'Captured from WhatsApp' },
  { state: 'PENDING', label: 'Customer confirmed' },
  { state: 'CONFIRMED', label: 'Payment acknowledged' },
  { state: 'INVOICED', label: 'Compliance path completed' },
]

function getComplianceRule(amount) {
  if (amount < 500) {
    return {
      key: 'monthly',
      ...THRESHOLDS[0],
      status: 'Monthly consolidation queued',
      timeline: 'Consolidate at month end',
      lhdnMode: 'Deferred',
    }
  }

  if (amount <= 10000) {
    return {
      key: 'individual',
      ...THRESHOLDS[1],
      status: '30-day individual invoice required',
      timeline: 'Submit within 30 days',
      lhdnMode: 'Scheduled',
    }
  }

  return {
    key: 'immediate',
    ...THRESHOLDS[2],
    status: 'Immediate e-invoice required',
    timeline: 'Submit now',
    lhdnMode: 'Immediate',
  }
}

function buildReplayTrail(amount) {
  const rule = getComplianceRule(amount)
  const payload = {
    order_id: `ORD-${String(Math.round(amount)).padStart(4, '0')}`,
    platform: 'whatsapp',
    message: 'boss nak 2',
    amount,
    industry: 'food_beverage',
    customer_phone: '+60 12-345 6789',
  }

  return [
    {
      actor: 'WhatsApp',
      event: 'Inbound order intent',
      detail: payload.message,
    },
    {
      actor: 'Webhook',
      event: 'Normalized payload',
      detail: `order_id=${payload.order_id} • amount=RM${amount.toFixed(2)}`,
    },
    {
      actor: 'Compliance',
      event: 'Rule applied',
      detail: rule.status,
    },
    {
      actor: 'LHDN',
      event: 'Submission strategy',
      detail: rule.timeline,
    },
  ]
}

function FlowNode({ step, active, done }) {
  return (
    <motion.div
      className={`ghost-flow-node ${active ? 'active' : ''} ${done ? 'done' : ''}`}
      animate={{ scale: active ? 1.03 : 1, y: active ? -2 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="ghost-flow-icon">{step.icon}</div>
      <div className="ghost-flow-copy">
        <div className="ghost-flow-label">{step.label}</div>
        <div className="ghost-flow-note">{step.note}</div>
      </div>
      <div className="ghost-flow-state">{done ? 'Ready' : active ? 'Now' : 'Queued'}</div>
    </motion.div>
  )
}

export default function ComplianceVisualizer() {
  const [amount, setAmount] = useState(250)
  const [ref, isInView] = useInView(0.15)

  const rule = useMemo(() => getComplianceRule(amount), [amount])
  const replayTrail = useMemo(() => buildReplayTrail(amount), [amount])

  const amountLabel = amount.toLocaleString('en-MY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  const apiDown = true

  return (
    <section className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Compliance Layer</span>
          <h2>Ghost Bridge keeps commerce moving while compliance catches up.</h2>
          <p>
            Replay mode only. The thresholds below are derived from the real Ghost Bridge / MyInvois logic:
            monthly consolidation under RM500, 30-day invoices up to RM10k, and immediate e-invoice above RM10k.
          </p>
        </motion.div>

        <div className="ghost-grid">
          <motion.div
            className="glass-card ghost-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="panel-topline">
              <div>
                <div className="panel-kicker">Transaction replay</div>
                <h3>Amount: RM{amountLabel}</h3>
              </div>
              <div className={`fail-open-pill ${apiDown ? 'warn' : 'ok'}`}>
                {apiDown ? 'Fail-open enabled' : 'LHDN online'}
              </div>
            </div>

            <div className="slider-wrap">
              <div className="slider-meta">
                <span>Transaction amount</span>
                <strong>RM{amountLabel}</strong>
              </div>
              <input
                type="range"
                min="50"
                max="25000"
                step="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="amount-slider"
              />
            </div>

            <div className="rule-card" style={{ borderColor: `${rule.accent}40` }}>
              <div className="rule-tag" style={{ color: rule.accent, background: `${rule.accent}15` }}>
                {rule.label}
              </div>
              <h4>{rule.title}</h4>
              <p>{rule.desc}</p>
              <div className="rule-meta">
                <span>{rule.status}</span>
                <span>{rule.timeline}</span>
                <span>{rule.lhdnMode} path</span>
              </div>
            </div>

            <div className="threshold-grid">
              {THRESHOLDS.map((threshold) => {
                const selected = threshold.id === rule.key
                return (
                  <div
                    key={threshold.id}
                    className={`threshold-card ${selected ? 'selected' : ''}`}
                    style={{ borderColor: selected ? `${threshold.accent}55` : 'var(--glass-border)' }}
                  >
                    <div className="threshold-label" style={{ color: threshold.accent }}>
                      {threshold.label}
                    </div>
                    <div className="threshold-title">{threshold.title}</div>
                    <div className="threshold-desc">{threshold.desc}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            className="glass-card ghost-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="panel-kicker">Ghost Bridge flow</div>
            <h3>WhatsApp to LHDN, with no business interruption.</h3>

            <div className="flow-track">
              {FLOW_STEPS.map((step, index) => (
                <div key={step.id} className="flow-step-wrap">
                  <FlowNode
                    step={step}
                    active={index === 1}
                    done={index < 1}
                  />
                  {index < FLOW_STEPS.length - 1 && <div className="flow-link" />}
                </div>
              ))}
            </div>

            <div className="state-machine">
              <div className="panel-kicker">State machine</div>
              <div className="state-list">
                {STATE_MACHINE.map((item, index) => {
                  const active =
                    (amount < 500 && index === 0) ||
                    (amount >= 500 && amount <= 10000 && index === 1) ||
                    (amount > 10000 && index === 2)
                  return (
                    <div key={item.state} className={`state-item ${active ? 'active' : ''}`}>
                      <span className="state-badge">{item.state}</span>
                      <span className="state-text">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card ghost-panel full-width"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="panel-topline">
              <div>
                <div className="panel-kicker">Replay payload</div>
                <h3>Intended schema, not the broken wire state</h3>
              </div>
              <div className="schema-chip">source of truth: PHP compliance logic</div>
            </div>

            <div className="payload-grid">
              <div className="payload-column">
                <div className="payload-title">Normalized event</div>
                <pre className="payload-code">{JSON.stringify({
                  order_id: `ORD-${String(Math.round(amount)).padStart(4, '0')}`,
                  platform: 'whatsapp',
                  message: 'boss nak 2',
                  amount,
                  industry: 'food_beverage',
                  source: 'agent_sea_webhook',
                }, null, 2)}</pre>
              </div>
              <div className="payload-column">
                <div className="payload-title">Compliance trail</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={amount}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="replay-trail"
                  >
                    {replayTrail.map((entry, index) => (
                      <div key={`${entry.actor}-${index}`} className="trail-row">
                        <div className="trail-actor">{entry.actor}</div>
                        <div className="trail-body">
                          <div className="trail-event">{entry.event}</div>
                          <div className="trail-detail">{entry.detail}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="fail-open-banner">
              <strong>Fail-open indicator:</strong> Village keeps selling even if the LHDN API is down.
              Orders continue, retry queue absorbs the compliance work, and the customer never feels the outage.
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .ghost-grid {
          display: grid;
          gap: var(--space-xl);
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ghost-panel {
          padding: var(--space-xl);
        }

        .ghost-panel.full-width {
          grid-column: 1 / -1;
        }

        .panel-topline {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .panel-kicker {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent-4);
          margin-bottom: var(--space-sm);
          font-weight: 700;
        }

        .fail-open-pill,
        .schema-chip {
          border-radius: var(--radius-full);
          padding: 0.45rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .fail-open-pill.warn {
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .fail-open-pill.ok {
          background: rgba(34, 197, 94, 0.12);
          color: #86efac;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .schema-chip {
          background: rgba(6, 182, 212, 0.12);
          color: #67e8f9;
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .slider-wrap {
          margin-bottom: var(--space-lg);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
        }

        .slider-meta {
          display: flex;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .slider-meta strong {
          color: var(--text-primary);
        }

        .amount-slider {
          width: 100%;
          accent-color: var(--accent-1);
        }

        .rule-card {
          border: 1px solid;
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          margin-bottom: var(--space-lg);
          background: rgba(255, 255, 255, 0.025);
        }

        .rule-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
          font-size: 0.74rem;
          font-weight: 700;
          margin-bottom: var(--space-sm);
        }

        .rule-card h4 {
          margin-bottom: var(--space-sm);
        }

        .rule-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: var(--space-md);
          color: var(--text-tertiary);
          font-size: 0.8rem;
        }

        .threshold-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-sm);
        }

        .threshold-card {
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.02);
        }

        .threshold-card.selected {
          background: rgba(249, 115, 22, 0.08);
        }

        .threshold-label {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }

        .threshold-title {
          font-size: 0.92rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .threshold-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .flow-track {
          display: grid;
          gap: 0.75rem;
          margin: var(--space-lg) 0;
        }

        .flow-step-wrap {
          display: grid;
          gap: 0.55rem;
        }

        .ghost-flow-node {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          background: rgba(255, 255, 255, 0.02);
        }

        .ghost-flow-node.active {
          border-color: rgba(249, 115, 22, 0.35);
          background: rgba(249, 115, 22, 0.08);
        }

        .ghost-flow-node.done {
          border-color: rgba(34, 197, 94, 0.2);
        }

        .ghost-flow-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .ghost-flow-copy {
          flex: 1;
        }

        .ghost-flow-label {
          font-weight: 700;
          color: var(--text-primary);
        }

        .ghost-flow-note {
          font-size: 0.82rem;
          color: var(--text-tertiary);
        }

        .ghost-flow-state {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-2);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .flow-link {
          width: 2px;
          height: 18px;
          margin-left: 20px;
          background: linear-gradient(to bottom, rgba(249, 115, 22, 0.35), transparent);
        }

        .state-machine {
          margin-top: var(--space-lg);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--glass-border);
        }

        .state-list {
          display: grid;
          gap: 0.55rem;
        }

        .state-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.8rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
        }

        .state-item.active {
          border-color: rgba(249, 115, 22, 0.35);
          background: rgba(249, 115, 22, 0.08);
        }

        .state-badge {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--accent-2);
        }

        .state-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .payload-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: var(--space-lg);
        }

        .payload-column {
          min-width: 0;
        }

        .payload-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .payload-code {
          font-size: 0.76rem;
          line-height: 1.6;
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--glass-border);
          color: #cbd5e1;
          overflow: auto;
        }

        .replay-trail {
          display: grid;
          gap: 0.65rem;
        }

        .trail-row {
          display: grid;
          grid-template-columns: 95px 1fr;
          gap: 0.75rem;
          padding: 0.7rem 0.8rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
        }

        .trail-actor {
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--accent-4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .trail-event {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .trail-detail {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .fail-open-banner {
          margin-top: var(--space-lg);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          border: 1px solid rgba(34, 197, 94, 0.2);
          background: rgba(34, 197, 94, 0.08);
          color: var(--text-secondary);
          font-size: 0.88rem;
        }

        @media (max-width: 900px) {
          .ghost-grid,
          .payload-grid {
            grid-template-columns: 1fr;
          }

          .threshold-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .panel-topline,
          .trail-row {
            grid-template-columns: 1fr;
            display: grid;
          }

          .ghost-flow-node {
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
