import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from './useInView'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [ref, isInView] = useInView(0.1)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
      try {
        // Web3Forms — free, no backend needed. Replace access_key with yours from web3forms.com
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY',
            subject: '🥡 New Quickin Waitlist Signup',
            email,
            message: `New waitlist signup from Quickin landing page: ${email}`,
          }),
        })
        const data = await res.json()
        if (data.success) {
          setSubmitted(true)
        } else {
          // fallback: open mailto
          window.location.href = `mailto:hello@agentsea.co?subject=Quickin Waitlist&body=Add me to the waitlist: ${email}`
          setSubmitted(true)
        }
      } catch {
        // offline fallback
        window.location.href = `mailto:hello@agentsea.co?subject=Quickin Waitlist&body=Add me to the waitlist: ${email}`
        setSubmitted(true)
      } finally {
        setLoading(false)
      }
  }

  return (
    <footer className="footer-section" id="waitlist" ref={ref}>
      <div className="container">
        <motion.div
          className="footer-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to stop losing customers?</h2>
          <p>
            Join the waitlist for early access. We're onboarding 
            F&B businesses across Malaysia — first come, first served.
          </p>

          {!submitted ? (
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="waitlist-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending…' : 'Join Waitlist →'}
              </button>
            </form>
          ) : (
            <motion.div
              className="waitlist-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✅ You're on the list! We'll reach out soon.
            </motion.div>
          )}
        </motion.div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-icon">🥡</span>
            <span className="brand-text" style={{
              background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Quickin</span>
          </div>
          <div className="footer-tagline">
            The agentic growth engine for Malaysia's real economy.
          </div>
          <div className="footer-links">
            <a href="#problem">Problem</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#demo">Demo</a>
            <a href="#pricing">Pricing</a>
            <a href="#payment">Payment</a>
            <a href="#faq">FAQ</a>
            <a href="/demo">Investor Demo</a>
          </div>
          
          {/* Agent SEA parent brand */}
          <div className="parent-brand">
            <div className="parent-divider" />
            <div className="parent-label">A product by</div>
            <div className="parent-name">
              <span style={{fontSize:'1.1rem'}}>🌊</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, var(--accent-4), var(--accent-5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Agent SEA</span>
            </div>
            <div className="parent-sub">
              Agentic infrastructure for emerging economies
            </div>
          </div>

          <div className="footer-copy">
            © 2026 Tapau by Agent SEA. Built with care in Malaysia 🇲🇾
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          padding: var(--space-5xl) 0 var(--space-2xl);
          background: var(--bg-secondary);
          border-top: 1px solid var(--glass-border);
        }
        .footer-cta {
          text-align: center;
          max-width: 600px;
          margin: 0 auto var(--space-4xl);
        }
        .footer-cta h2 { margin-bottom: var(--space-md); }
        .footer-cta p {
          font-size: 1.05rem;
          margin-bottom: var(--space-xl);
        }
        .waitlist-form {
          display: flex;
          gap: var(--space-sm);
          max-width: 450px;
          margin: 0 auto;
        }
        .waitlist-input {
          flex: 1;
          padding: 0.875rem 1.25rem;
          border-radius: var(--radius-full);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: var(--font-body);
          outline: none;
        }
        .waitlist-input:focus { border-color: var(--accent-1); }
        .waitlist-input::placeholder { color: var(--text-tertiary); }
        .waitlist-success {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius-full);
          padding: 1rem 2rem;
          color: #22c55e;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-block;
        }
        .footer-bottom {
          text-align: center;
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--glass-border);
        }
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: var(--space-lg);
        }
        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }
        .footer-links a {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .footer-copy {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        .parent-brand {
          margin: var(--space-xl) 0;
        }
        .parent-divider {
          width: 60px;
          height: 1px;
          background: var(--glass-border);
          margin: 0 auto var(--space-md);
        }
        .parent-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-tertiary);
          margin-bottom: var(--space-xs);
        }
        .parent-name {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: var(--space-xs);
        }
        .parent-sub {
          font-size: 0.72rem;
          color: var(--text-tertiary);
          font-style: italic;
        }
        @media (max-width: 500px) {
          .waitlist-form { flex-direction: column; }
        }
      `}</style>
    </footer>
  )
}
