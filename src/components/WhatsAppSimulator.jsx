import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const FLOW_STEPS = [
  {
    id: 'tiktok',
    screen: 'tiktok',
    label: 'TikTok Video',
  },
  {
    id: 'entry',
    screen: 'whatsapp-entry',
    label: 'WhatsApp Opens',
  },
  {
    id: 'menu',
    screen: 'whatsapp-menu',
    label: 'Menu Shown',
  },
  {
    id: 'order',
    screen: 'whatsapp-order',
    label: 'Order Placed',
  },
  {
    id: 'captured',
    screen: 'whatsapp-captured',
    label: 'Customer Captured',
  },
]

export default function WhatsAppSimulator() {
  const [step, setStep] = useState(0)
  const [ref, isInView] = useInView(0.15)

  const next = () => setStep(s => Math.min(s + 1, FLOW_STEPS.length - 1))
  const prev = () => setStep(s => Math.max(s - 1, 0))

  return (
    <section className="section" id="demo" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">Interactive Demo</span>
          <h2>See the full customer journey</h2>
          <p>
            Click through each step — from TikTok discovery to captured customer. 
            This is exactly what your customers will experience.
          </p>
        </motion.div>

        <motion.div
          className="sim-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Progress bar */}
          <div className="sim-progress">
            {FLOW_STEPS.map((s, i) => (
              <button
                key={s.id}
                className={`sim-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                onClick={() => setStep(i)}
              >
                <span className="sim-dot-num">{i + 1}</span>
                <span className="sim-dot-label">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Simulator Phone */}
          <div className="sim-phone">
            <div className="sim-phone-frame">
              <div className="sim-notch" />
              <AnimatePresence mode="wait">
                {step === 0 && <TikTokScreen key="tt" onNext={next} />}
                {step === 1 && <WAEntryScreen key="entry" onNext={next} />}
                {step === 2 && <WAMenuScreen key="menu" onNext={next} />}
                {step === 3 && <WAOrderScreen key="order" onNext={next} />}
                {step === 4 && <WACapturedScreen key="cap" />}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="sim-nav">
            <button className="btn btn-secondary" onClick={prev} disabled={step === 0}>
              ← Previous
            </button>
            <span className="sim-step-label">
              Step {step + 1} of {FLOW_STEPS.length}
            </span>
            <button className="btn btn-primary" onClick={next} disabled={step === FLOW_STEPS.length - 1}>
              Next →
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .sim-wrapper {
          max-width: 480px;
          margin: 0 auto;
        }
        .sim-progress {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
          gap: 4px;
        }
        .sim-dot {
          flex: 1;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          position: relative;
        }
        .sim-dot::after {
          content: '';
          display: block;
          height: 3px;
          border-radius: 2px;
          background: var(--glass-border);
          margin-top: 0.5rem;
          transition: background 0.3s;
        }
        .sim-dot.done::after { background: var(--whatsapp); }
        .sim-dot.active::after { background: var(--accent-1); }
        .sim-dot-num {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-tertiary);
        }
        .sim-dot.active .sim-dot-num { color: var(--accent-1); }
        .sim-dot.done .sim-dot-num { color: var(--whatsapp); }
        .sim-dot-label {
          display: none;
          font-size: 0.65rem;
          color: var(--text-tertiary);
        }
        @media (min-width: 500px) {
          .sim-dot-label { display: block; }
        }
        .sim-phone {
          margin-bottom: var(--space-xl);
        }
        .sim-phone-frame {
          border-radius: 32px;
          border: 2px solid rgba(255,255,255,0.1);
          background: #0b141a;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(37,211,102,0.08);
          min-height: 480px;
        }
        .sim-notch {
          width: 100px;
          height: 22px;
          background: var(--bg-primary);
          margin: 0 auto;
          border-radius: 0 0 14px 14px;
        }
        .sim-screen { padding: 0; }
        .sim-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
        }
        .sim-step-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
        .sim-nav .btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* TikTok Screen */
        .tt-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 460px;
          background: linear-gradient(135deg, #000, #1a1a2e);
          color: white;
          text-align: center;
          padding: 2rem;
        }
        .tt-video-mock {
          width: 100%;
          aspect-ratio: 9/10;
          background: linear-gradient(135deg, #1a0a2e, #2d1b69, #1a0a2e);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }
        .tt-play { font-size: 3rem; opacity: 0.7; }
        .tt-heart { position: absolute; right: 12px; bottom: 80px; font-size: 1.5rem; }
        .tt-share { position: absolute; right: 12px; bottom: 40px; font-size: 1.5rem; }
        .tt-bio {
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .tt-bio:hover {
          background: rgba(37,211,102,0.2);
          border-color: rgba(37,211,102,0.4);
        }
        .tt-bio-arrow {
          font-size: 0.7rem;
          color: var(--whatsapp);
          opacity: 0.8;
          margin-top: 0.3rem;
        }

        /* WA Screens */
        .wa-sim-header {
          background: #1f2c34;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .wa-sim-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--whatsapp);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        .wa-sim-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #e9edef;
        }
        .wa-sim-status {
          font-size: 0.72rem;
          color: #8696a0;
        }
        .wa-sim-chat {
          padding: 1rem;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .wa-sim-bubble {
          max-width: 85%;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.82rem;
          line-height: 1.45;
          color: #e9edef;
        }
        .wa-sim-in {
          background: #1f2c34;
          align-self: flex-start;
          border-top-left-radius: 0;
        }
        .wa-sim-out {
          background: #005c4b;
          align-self: flex-end;
          border-top-right-radius: 0;
        }
        .wa-sim-action {
          margin-top: auto;
          padding: 0.75rem;
        }
        .wa-sim-action button {
          width: 100%;
          padding: 0.7rem;
          border-radius: 20px;
          border: none;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          background: var(--whatsapp);
          color: white;
          transition: all 0.2s;
        }
        .wa-sim-action button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37,211,102,0.3);
        }
        .wa-sim-typing {
          align-self: flex-start;
          color: #8696a0;
          font-size: 0.75rem;
          font-style: italic;
          padding: 0.3rem 0.8rem;
        }

        /* Captured screen */
        .captured-card {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem;
          text-align: center;
        }
        .captured-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
        .captured-title {
          font-size: 1rem;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 0.3rem;
        }
        .captured-sub {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }
        .captured-data {
          margin-top: 1rem;
          text-align: left;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .captured-row {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          border-bottom: 1px solid var(--glass-border);
        }
        .captured-label { color: var(--text-tertiary); }
        .captured-val { color: var(--text-primary); font-weight: 600; }
      `}</style>
    </section>
  )
}

/* --- Individual Screens --- */

function TikTokScreen({ onNext }) {
  return (
    <motion.div className="tt-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="tt-video-mock">
        <div className="tt-play">▶</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
          🔥 Korean Corn Dogs — SS15
        </div>
        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.25rem' }}>
          18.2k views
        </div>
        <div className="tt-heart">❤️</div>
        <div className="tt-share">↗️</div>
      </div>
      <div className="tt-bio" onClick={onNext}>
        💬 Order via WhatsApp — Reply "MENU"
      </div>
      <div className="tt-bio-arrow">↑ Tap to continue the journey</div>
    </motion.div>
  )
}

function WAEntryScreen({ onNext }) {
  return (
    <motion.div className="sim-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="wa-sim-header">
        <div className="wa-sim-avatar">🥡</div>
        <div>
          <div className="wa-sim-name">Korean Dogs SS15</div>
          <div className="wa-sim-status">online</div>
        </div>
      </div>
      <div className="wa-sim-chat">
        <motion.div
          className="wa-sim-bubble wa-sim-out"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          MENU
        </motion.div>
        <motion.div
          className="wa-sim-typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          typing...
        </motion.div>
        <motion.div
          className="wa-sim-bubble wa-sim-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Hey 👋 Welcome to Korean Dogs!<br /><br />
          Today's limited batch:<br />
          🌭 Classic Corn Dog — RM12<br />
          🧀 Cheese Pull — RM14<br />
          🌶️ Spicy Mozza — RM15<br /><br />
          Only 20 portions today!<br />
          Reply with a number to reserve 🔥
        </motion.div>
        <div className="wa-sim-action">
          <button onClick={onNext}>Reply "1" — Classic Corn Dog</button>
        </div>
      </div>
    </motion.div>
  )
}

function WAMenuScreen({ onNext }) {
  return (
    <motion.div className="sim-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="wa-sim-header">
        <div className="wa-sim-avatar">🥡</div>
        <div>
          <div className="wa-sim-name">Korean Dogs SS15</div>
          <div className="wa-sim-status">online</div>
        </div>
      </div>
      <div className="wa-sim-chat">
        <div className="wa-sim-bubble wa-sim-out">1</div>
        <motion.div
          className="wa-sim-bubble wa-sim-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Nice choice! 🔥<br /><br />
          Classic Corn Dog — RM12<br /><br />
          📍 Pickup at SS15, next to 7-Eleven<br />
          ⏰ Ready in 15 minutes<br /><br />
          To confirm, reply with:<br />
          <b>Your name + pickup time</b>
        </motion.div>
        <div className="wa-sim-action">
          <button onClick={onNext}>Reply "Sarah, 2:30 PM"</button>
        </div>
      </div>
    </motion.div>
  )
}

function WAOrderScreen({ onNext }) {
  return (
    <motion.div className="sim-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="wa-sim-header">
        <div className="wa-sim-avatar">🥡</div>
        <div>
          <div className="wa-sim-name">Korean Dogs SS15</div>
          <div className="wa-sim-status">online</div>
        </div>
      </div>
      <div className="wa-sim-chat">
        <div className="wa-sim-bubble wa-sim-out">Sarah, 2:30 PM</div>
        <motion.div
          className="wa-sim-bubble wa-sim-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          ✅ Confirmed, Sarah!<br /><br />
          🌭 1x Classic Corn Dog — RM12<br />
          📍 SS15 stall, next to 7-Eleven<br />
          ⏰ 2:30 PM<br /><br />
          See you soon! 🎉<br /><br />
          <i>P.S. Reply "VIP" to get early access to our weekly drops 👀</i>
        </motion.div>
        <motion.div
          className="wa-sim-bubble wa-sim-out"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          VIP
        </motion.div>
        <motion.div
          className="wa-sim-bubble wa-sim-in"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          🎉 You're now on our VIP list!<br />
          You'll get first access to limited drops every week.
        </motion.div>
        <div className="wa-sim-action">
          <button onClick={onNext}>See what you captured →</button>
        </div>
      </div>
    </motion.div>
  )
}

function WACapturedScreen() {
  return (
    <motion.div className="sim-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="captured-card">
        <div className="captured-icon">✅</div>
        <div className="captured-title">Customer Captured!</div>
        <div className="captured-sub">Sarah is now on your customer list forever</div>
        <div className="captured-data">
          <div className="captured-row">
            <span className="captured-label">Name</span>
            <span className="captured-val">Sarah</span>
          </div>
          <div className="captured-row">
            <span className="captured-label">Phone</span>
            <span className="captured-val">+60 12-XXX-XXXX</span>
          </div>
          <div className="captured-row">
            <span className="captured-label">Order</span>
            <span className="captured-val">Classic Corn Dog — RM12</span>
          </div>
          <div className="captured-row">
            <span className="captured-label">Pickup</span>
            <span className="captured-val">2:30 PM today</span>
          </div>
          <div className="captured-row">
            <span className="captured-label">Status</span>
            <span className="captured-val" style={{color:'#22c55e'}}>VIP Member ⭐</span>
          </div>
          <div className="captured-row">
            <span className="captured-label">Source</span>
            <span className="captured-val">TikTok → WhatsApp</span>
          </div>
          <div className="captured-row" style={{border:'none'}}>
            <span className="captured-label">Next action</span>
            <span className="captured-val" style={{color:'var(--accent-2)'}}>Weekly broadcast eligible</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 1rem 1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem' }}>
          This took 30 seconds. Without Tapau, this customer would be gone forever.
        </p>
      </div>
    </motion.div>
  )
}
