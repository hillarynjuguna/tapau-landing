import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from './useInView'

export default function PaymentSection() {
  const [selectedPlan, setSelectedPlan] = useState('setup')
  const [ref, isInView] = useInView(0.15)

  const plans = {
    setup: { label: 'Setup', price: 'RM 225', desc: 'One-time system install' },
    managed: { label: 'Managed', price: 'RM 115/mo', desc: 'We handle your broadcasts' },
    growth: { label: 'Growth', price: 'RM 225/mo', desc: 'Full retention management' },
  }

  return (
    <section className="section" id="payment" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Easy Payment</span>
          <h2>Pay the Malaysian way</h2>
          <p>
            DuitNow, Touch 'n Go, or bank transfer — scan the QR and you're set. 
            No credit card needed. No complicated checkout.
          </p>
        </motion.div>

        <motion.div
          className="payment-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Plan selector */}
          <div className="plan-selector">
            {Object.entries(plans).map(([key, plan]) => (
              <button
                key={key}
                className={`plan-btn ${selectedPlan === key ? 'active' : ''}`}
                onClick={() => setSelectedPlan(key)}
              >
                <span className="plan-btn-label">{plan.label}</span>
                <span className="plan-btn-price">{plan.price}</span>
              </button>
            ))}
          </div>

          <div className="payment-grid">
            {/* QR Code display */}
            <div className="qr-card glass-card">
              <div className="qr-header">
                <div className="qr-method-tabs">
                  <span className="qr-method active">DuitNow</span>
                  <span className="qr-method">Touch 'n Go</span>
                  <span className="qr-method">Bank Transfer</span>
                </div>
              </div>
              
              <div className="qr-display">
                {/* Stylized QR placeholder */}
                <div className="qr-code">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                    {/* QR Grid pattern */}
                    <rect width="200" height="200" rx="12" fill="#ffffff"/>
                    {/* Corner squares */}
                    <rect x="10" y="10" width="50" height="50" rx="4" fill="#1a1a2e"/>
                    <rect x="16" y="16" width="38" height="38" rx="2" fill="#ffffff"/>
                    <rect x="22" y="22" width="26" height="26" rx="2" fill="#1a1a2e"/>
                    
                    <rect x="140" y="10" width="50" height="50" rx="4" fill="#1a1a2e"/>
                    <rect x="146" y="16" width="38" height="38" rx="2" fill="#ffffff"/>
                    <rect x="152" y="22" width="26" height="26" rx="2" fill="#1a1a2e"/>
                    
                    <rect x="10" y="140" width="50" height="50" rx="4" fill="#1a1a2e"/>
                    <rect x="16" y="146" width="38" height="38" rx="2" fill="#ffffff"/>
                    <rect x="22" y="152" width="26" height="26" rx="2" fill="#1a1a2e"/>
                    
                    {/* Data modules - scattered blocks */}
                    {Array.from({ length: 80 }, (_, i) => {
                      const x = 70 + (i % 10) * 8
                      const y = 10 + Math.floor(i / 10) * 8
                      const show = Math.sin(i * 2.7) > -0.3
                      return show ? (
                        <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#1a1a2e" opacity="0.9"/>
                      ) : null
                    })}
                    {Array.from({ length: 60 }, (_, i) => {
                      const x = 10 + (i % 8) * 8
                      const y = 70 + Math.floor(i / 8) * 8
                      const show = Math.cos(i * 1.9) > -0.4
                      return show ? (
                        <rect key={`b${i}`} x={x} y={y} width="6" height="6" rx="1" fill="#1a1a2e" opacity="0.85"/>
                      ) : null
                    })}
                    {Array.from({ length: 48 }, (_, i) => {
                      const x = 75 + (i % 8) * 8
                      const y = 75 + Math.floor(i / 8) * 8
                      const show = Math.sin(i * 3.1 + 0.5) > -0.2
                      return show ? (
                        <rect key={`c${i}`} x={x} y={y} width="6" height="6" rx="1" fill="#f97316" opacity="0.9"/>
                      ) : null
                    })}
                    
                    {/* Center logo area */}
                    <rect x="78" y="78" width="44" height="44" rx="8" fill="#ffffff"/>
                    <text x="100" y="107" textAnchor="middle" fontSize="24">🥡</text>
                  </svg>
                </div>
                
                <div className="qr-amount">
                  <span className="qr-price">{plans[selectedPlan].price}</span>
                  <span className="qr-plan">{plans[selectedPlan].desc}</span>
                </div>
              </div>

              <div className="qr-instructions">
                <div className="qr-step">
                  <span className="qr-step-num">1</span>
                  Open your banking app or e-wallet
                </div>
                <div className="qr-step">
                  <span className="qr-step-num">2</span>
                  Scan this QR code
                </div>
                <div className="qr-step">
                  <span className="qr-step-num">3</span>
                  Confirm payment — we'll WhatsApp your receipt
                </div>
              </div>
            </div>

            {/* Payment methods + trust signals */}
            <div className="payment-info">
              <div className="glass-card payment-methods-card">
                <h4>Accepted Payment Methods</h4>
                <div className="payment-methods-grid">
                  <div className="payment-method">
                    <div className="pm-icon">🏦</div>
                    <span>DuitNow QR</span>
                  </div>
                  <div className="payment-method">
                    <div className="pm-icon">📱</div>
                    <span>Touch 'n Go</span>
                  </div>
                  <div className="payment-method">
                    <div className="pm-icon">💳</div>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="payment-method">
                    <div className="pm-icon">🟢</div>
                    <span>GrabPay</span>
                  </div>
                  <div className="payment-method">
                    <div className="pm-icon">🔵</div>
                    <span>Boost</span>
                  </div>
                  <div className="payment-method">
                    <div className="pm-icon">🏦</div>
                    <span>Maybank QR</span>
                  </div>
                </div>
              </div>

              <div className="glass-card trust-card">
                <h4>Why it's safe</h4>
                <div className="trust-items">
                  <div className="trust-item">
                    <span className="trust-icon">🔒</span>
                    <div>
                      <div className="trust-title">Bank-grade security</div>
                      <div className="trust-sub">DuitNow QR is regulated by BNM (Bank Negara Malaysia)</div>
                    </div>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">📱</span>
                    <div>
                      <div className="trust-title">Instant confirmation</div>
                      <div className="trust-sub">Receipt sent via WhatsApp within 60 seconds</div>
                    </div>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">🔄</span>
                    <div>
                      <div className="trust-title">Money-back guarantee</div>
                      <div className="trust-sub">Full refund within 7 days if not satisfied</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .payment-container { max-width: 900px; margin: 0 auto; }
        .plan-selector {
          display: flex;
          gap: var(--space-sm);
          justify-content: center;
          margin-bottom: var(--space-xl);
          background: var(--glass-bg);
          border-radius: var(--radius-full);
          padding: 4px;
          border: 1px solid var(--glass-border);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: var(--space-2xl);
        }
        .plan-btn {
          flex: 1;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-full);
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .plan-btn.active {
          background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
          box-shadow: 0 4px 15px rgba(249,115,22,0.25);
        }
        .plan-btn-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .plan-btn.active .plan-btn-label { color: white; }
        .plan-btn-price {
          display: block;
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }
        .plan-btn.active .plan-btn-price { color: rgba(255,255,255,0.8); }
        .payment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
        }
        .qr-card { padding: 0; overflow: hidden; }
        .qr-header {
          padding: var(--space-md) var(--space-lg);
          border-bottom: 1px solid var(--glass-border);
        }
        .qr-method-tabs {
          display: flex;
          gap: var(--space-md);
        }
        .qr-method {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-tertiary);
          cursor: pointer;
          padding-bottom: 0.3rem;
          transition: all 0.2s;
        }
        .qr-method.active {
          color: var(--accent-2);
          border-bottom: 2px solid var(--accent-1);
        }
        .qr-display {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }
        .qr-code {
          padding: var(--space-md);
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .qr-amount { text-align: center; }
        .qr-price {
          display: block;
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-2);
        }
        .qr-plan {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .qr-instructions {
          padding: var(--space-lg);
          border-top: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .qr-step {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .qr-step-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(249,115,22,0.15);
          color: var(--accent-2);
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .payment-info { display: flex; flex-direction: column; gap: var(--space-lg); }
        .payment-methods-card h4, .trust-card h4 {
          margin-bottom: var(--space-md);
          font-size: 1rem;
        }
        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
        }
        .payment-method {
          text-align: center;
          padding: var(--space-md) var(--space-sm);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          transition: all 0.2s;
        }
        .payment-method:hover {
          border-color: rgba(249,115,22,0.3);
          background: rgba(249,115,22,0.04);
        }
        .pm-icon { font-size: 1.5rem; margin-bottom: 0.3rem; }
        .payment-method span {
          font-size: 0.72rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
        .trust-items { display: flex; flex-direction: column; gap: var(--space-md); }
        .trust-item { display: flex; gap: var(--space-md); align-items: flex-start; }
        .trust-icon { font-size: 1.3rem; flex-shrink: 0; }
        .trust-title { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
        .trust-sub { font-size: 0.75rem; color: var(--text-tertiary); }
        @media (max-width: 700px) {
          .payment-grid { grid-template-columns: 1fr; }
          .payment-methods-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  )
}
