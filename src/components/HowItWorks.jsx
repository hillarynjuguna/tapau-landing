import { motion } from 'framer-motion'
import { useInView } from './useInView'

export default function HowItWorks() {
  const [ref, isInView] = useInView(0.15)

  const timeline = [
    {
      day: 'Day 0',
      title: 'Quick Onboarding',
      desc: '15-minute call. We collect your menu, WhatsApp number, and social links. That\'s it.',
      icon: '📋',
      time: '15 min',
    },
    {
      day: 'Day 1',
      title: 'System Built',
      desc: 'WhatsApp funnel live. Menu structured. Click-to-chat links generated. QR code ready.',
      icon: '⚡',
      time: '24 hrs',
    },
    {
      day: 'Day 2',
      title: 'Deployed & Trained',
      desc: 'Links in your TikTok/IG bio. QR code for your stall. 3 simple rules — no training needed.',
      icon: '🚀',
      time: '48 hrs',
    },
    {
      day: 'Week 1',
      title: 'First Customers Captured',
      desc: '20-50 contacts on your list. First broadcast sent. 15-30% response rate. Repeat loop started.',
      icon: '🔥',
      time: '7 days',
    },
  ]

  return (
    <section className="section" id="how-it-works" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">How It Works</span>
          <h2>Live in 48 hours.<br />First results in 7 days.</h2>
          <p>
            No technical skills needed. No learning curve. We handle everything — 
            you just tell customers "order via WhatsApp."
          </p>
        </motion.div>

        <div className="timeline">
          {timeline.map((step, i) => (
            <motion.div
              key={i}
              className="timeline-step glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              <div className="timeline-marker">
                <div className="timeline-icon">{step.icon}</div>
                {i < timeline.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-tag">
                  <span className="timeline-day">{step.day}</span>
                  <span className="timeline-time">{step.time}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .timeline {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
        .timeline-step {
          display: flex;
          gap: var(--space-xl);
          padding: var(--space-xl);
        }
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .timeline-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .timeline-line {
          width: 2px;
          flex: 1;
          min-height: 20px;
          background: linear-gradient(to bottom, rgba(249,115,22,0.3), transparent);
          margin-top: 0.5rem;
        }
        .timeline-content h3 {
          margin-bottom: var(--space-xs);
          font-size: 1.15rem;
        }
        .timeline-content p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .timeline-tag {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }
        .timeline-day {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-2);
          background: rgba(249,115,22,0.1);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .timeline-time {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
        }
        @media (max-width: 600px) {
          .timeline-step { flex-direction: column; gap: var(--space-md); }
          .timeline-marker { flex-direction: row; gap: var(--space-md); }
          .timeline-line { display: none; }
        }
      `}</style>
    </section>
  )
}
