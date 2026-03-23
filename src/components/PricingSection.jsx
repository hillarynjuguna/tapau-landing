import { motion } from 'framer-motion'
import { useInView } from './useInView'

export default function PricingSection() {
  const [ref, isInView] = useInView(0.15)

  const tiers = [
    {
      name: 'Setup',
      frame: 'System installed',
      price: 'RM 150–300',
      period: 'one-time',
      features: [
        'WhatsApp funnel configured',
        'Click-to-chat links + QR code',
        'Menu structured in WhatsApp',
        'Bio links updated for TikTok/IG',
        '15-minute training session',
        'Google Sheet customer log',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Managed',
      frame: 'Customers guaranteed to return',
      price: 'RM 80–150',
      period: '/month',
      features: [
        'Everything in Setup',
        'Weekly broadcast written & sent for you',
        'Day 3 check-in + Day 7 review',
        'Broadcast template library access',
        'Reply script templates',
        'Monthly performance summary',
      ],
      cta: 'Most Popular →',
      highlight: true,
    },
    {
      name: 'Growth',
      frame: 'We run your retention',
      price: 'RM 150–300',
      period: '/month',
      features: [
        'Everything in Managed',
        'AI reply suggestions (multilingual)',
        'Customer tagging & segmentation',
        'VIP list management',
        'Cross-client broadcast optimization',
        'Priority WhatsApp support',
      ],
      cta: 'Contact Us',
      highlight: false,
    },
  ]

  return (
    <section className="section" id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Pricing</span>
          <h2>Choose your outcome</h2>
          <p>
            Not tiered by features — tiered by how much of the work we do for you.
            Start with Setup, upgrade when you see results.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`pricing-card glass-card ${tier.highlight ? 'highlighted' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              {tier.highlight && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-name">{tier.name}</div>
              <div className="pricing-frame">{tier.frame}</div>
              <div className="pricing-amount">
                <span className="pricing-price">{tier.price}</span>
                <span className="pricing-period">{tier.period}</span>
              </div>
              <ul className="pricing-features">
                {tier.features.map((f, j) => (
                  <li key={j}>
                    <span className="check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`btn ${tier.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{width:'100%'}}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          max-width: 1000px;
          margin: 0 auto;
        }
        .pricing-card {
          padding: var(--space-2xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing-card.highlighted {
          border-color: rgba(249,115,22,0.3);
          background: rgba(249,115,22,0.04);
          box-shadow: 0 0 60px rgba(249,115,22,0.08);
        }
        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
          color: white;
          padding: 0.3rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .pricing-name {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .pricing-frame {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: var(--space-lg);
        }
        .pricing-amount {
          margin-bottom: var(--space-xl);
        }
        .pricing-price {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .pricing-period {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-left: 0.25rem;
        }
        .pricing-features {
          list-style: none;
          flex: 1;
          margin-bottom: var(--space-xl);
        }
        .pricing-features li {
          padding: 0.4rem 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        .check {
          color: var(--whatsapp);
          font-weight: 700;
          flex-shrink: 0;
        }
        @media (max-width: 800px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
        }
      `}</style>
    </section>
  )
}
