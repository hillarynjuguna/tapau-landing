import { motion } from 'framer-motion'
import { useInView } from './useInView'

export default function ProblemSection() {
  const [ref, isInView] = useInView(0.2)

  const steps = [
    { icon: '1', label: 'TikTok goes viral', sub: '20k views', color: '#ef4444' },
    { icon: '2', label: 'Viewers watch', sub: 'attention captured', color: '#f97316' },
    { icon: '3', label: 'Hesitation zone', sub: '"should I order?"', color: '#eab308' },
    { icon: '4', label: 'They scroll away', sub: 'customer lost forever', color: '#64748b' },
  ]

  const afterSteps = [
    { icon: '1', label: 'TikTok goes viral', sub: '20k views', color: '#22c55e' },
    { icon: '2', label: 'Reply MENU', sub: 'engineered CTA', color: '#22c55e' },
    { icon: '3', label: 'WhatsApp opens', sub: 'prefilled message', color: '#25D366' },
    { icon: '4', label: 'Customer captured', sub: 'on your list forever', color: '#f97316' },
  ]

  return (
    <section className="section" id="problem" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">The Problem</span>
          <h2>Attention does not equal customers</h2>
          <p>
            Malaysian F&B brands can win attention on social platforms and still fail to capture a single
            repeatable customer relationship.
          </p>
        </motion.div>

        <div className="problem-grid">
          <motion.div
            className="flow-card glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="flow-title" style={{ color: '#ef4444' }}>Without Quickin</h3>
            <div className="flow-steps">
              {steps.map((step, i) => (
                <div key={i} className="flow-step">
                  <div className="flow-icon" style={{ borderColor: step.color }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flow-label">{step.label}</div>
                    <div className="flow-sub">{step.sub}</div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flow-arrow" style={{ color: step.color }}>↓</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flow-result loss">
              <span className="result-number">0</span> customers captured
            </div>
          </motion.div>

          <motion.div
            className="flow-card glass-card"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="flow-title" style={{ color: '#22c55e' }}>With Quickin</h3>
            <div className="flow-steps">
              {afterSteps.map((step, i) => (
                <div key={i} className="flow-step">
                  <div className="flow-icon" style={{ borderColor: step.color }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flow-label">{step.label}</div>
                    <div className="flow-sub">{step.sub}</div>
                  </div>
                  {i < afterSteps.length - 1 && (
                    <div className="flow-arrow" style={{ color: step.color }}>↓</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flow-result win">
              <span className="result-number">50+</span> customers captured in week 1
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          max-width: 900px;
          margin: 0 auto;
        }
        .flow-card { padding: var(--space-xl); }
        .flow-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: var(--space-xl);
        }
        .flow-steps {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .flow-step {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          position: relative;
        }
        .flow-icon {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid;
          background: rgba(255,255,255,0.03);
          font-size: 1rem;
          font-weight: 800;
        }
        .flow-label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .flow-sub {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        .flow-arrow {
          position: absolute;
          left: 20px;
          bottom: -16px;
          font-size: 1rem;
          opacity: 0.5;
        }
        .flow-result {
          margin-top: var(--space-xl);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.95rem;
          text-align: center;
        }
        .flow-result.loss {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #ef4444;
        }
        .flow-result.win {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          color: #22c55e;
        }
        .result-number {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-right: 0.3rem;
        }
        @media (max-width: 700px) {
          .problem-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
