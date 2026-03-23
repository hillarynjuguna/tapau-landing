import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from './useInView'

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView(0.5)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function SocialProof() {
  const [ref, isInView] = useInView(0.15)

  const metrics = [
    { value: 847, suffix: '+', label: 'Contacts captured', icon: '📱' },
    { value: 23, suffix: '', label: 'Broadcasts sent', icon: '📢' },
    { value: 27, suffix: '%', label: 'Avg response rate', icon: '💬' },
    { value: 48, suffix: 'hrs', label: 'Avg setup time', icon: '⚡' },
  ]

  return (
    <section className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Early Results</span>
          <h2>Numbers that speak</h2>
          <p>
            Early pilot data from Malaysian F&B businesses using the Tapau system.
          </p>
        </motion.div>

        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="metric-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="metric-icon">{m.icon}</div>
              <div className="metric-value">
                <AnimatedCounter end={m.value} suffix={m.suffix} />
              </div>
              <div className="metric-label">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="testimonial glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="testimonial-badge">Beta Program 🚀</div>
          <blockquote className="testimonial-quote">
            "Before Tapau, I was getting thousands of TikTok views but couldn't 
            keep track of a single customer. Now I have a list of 200+ people 
            who actually come back every week. The broadcast thing is genius — 
            I send one message and get 30 orders."
          </blockquote>
          <div className="testimonial-author">
            <div className="testimonial-avatar">👩‍🍳</div>
            <div>
              <div className="testimonial-name">Aisha R.</div>
              <div className="testimonial-role">Korean Street Food, SS15 Subang Jaya</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-3xl);
        }
        .metric-card {
          text-align: center;
          padding: var(--space-2xl) var(--space-lg);
        }
        .metric-icon { font-size: 2rem; margin-bottom: var(--space-md); }
        .metric-value {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }
        .metric-label {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .testimonial {
          max-width: 700px;
          margin: 0 auto;
          padding: var(--space-2xl);
          text-align: center;
          position: relative;
        }
        .testimonial-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.3);
          color: var(--accent-3);
          padding: 0.25rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .testimonial-quote {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: var(--space-xl);
          border: none;
          padding: 0;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          justify-content: center;
        }
        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(249,115,22,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .testimonial-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .testimonial-role {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 700px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .metrics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
