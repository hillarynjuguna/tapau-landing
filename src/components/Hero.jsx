import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      {/* Animated gradient orbs */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grain-overlay" />
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-dot" />
            Built for Malaysian F&B — deployed in 48 hours
          </motion.div>

          <h1>
            Your customers find you on TikTok.<br />
            <span className="gradient-text">Then they disappear.</span>
          </h1>

          <p className="hero-subtitle">
            Tapau turns every viral view into a returning customer — 
            a WhatsApp-native capture and retention system that gives F&B stalls 
            the customer infrastructure big brands take for granted.
          </p>

          <div className="hero-ctas">
            <a href="#waitlist" className="btn btn-primary btn-lg">
              Set up in 48 hours →
            </a>
            <a href="/demo" className="btn btn-secondary btn-lg">
              See how it works ↗
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">94%</span>
              <span className="stat-label">WhatsApp penetration in MY</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">48hr</span>
              <span className="stat-label">Setup to first customer</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">45-60%</span>
              <span className="stat-label">Conversion via WhatsApp</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="phone-mockup">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="wa-header">
                <div className="wa-header-left">
                  <div className="wa-avatar">🥡</div>
                  <div>
                    <div className="wa-name">Tapau • Korean Dogs</div>
                    <div className="wa-status">online</div>
                  </div>
                </div>
              </div>
              <div className="wa-messages">
                <motion.div
                  className="wa-bubble wa-incoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  Hey 👋 Welcome to Korean Dogs!<br /><br />
                  Today's special:<br />
                  🌭 Cheese Corn Dog – RM12<br />
                  🧀 Mozza Pull – RM14<br /><br />
                  Reply <b>1</b> to order
                </motion.div>
                <motion.div
                  className="wa-bubble wa-outgoing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  1
                </motion.div>
                <motion.div
                  className="wa-bubble wa-incoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 }}
                >
                  Nice 🔥 Reserved for you!<br /><br />
                  📍 Pickup at SS15 stall<br />
                  ⏰ Ready by 2:30 PM<br /><br />
                  Reply with your name 👍
                </motion.div>
                <motion.div
                  className="wa-bubble wa-outgoing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.6 }}
                >
                  Sarah 😊
                </motion.div>
                <motion.div
                  className="wa-bubble wa-incoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.2 }}
                >
                  ✅ Got it, Sarah! See you at 2:30 PM 🎉
                </motion.div>
              </div>
            </div>
            <div className="phone-glow" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
