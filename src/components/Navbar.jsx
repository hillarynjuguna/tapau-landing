import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Problem', href: '#problem' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar-inner">
        <a href="/" className="navbar-brand">
          <span className="brand-icon">🥡</span>
          <span className="brand-text">tapau</span>
        </a>
        
        <div className="navbar-links">
          {links.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <a href="/demo" className="btn btn-secondary btn-sm">
            Investor Demo ↗
          </a>
          <a href="#waitlist" className="btn btn-primary btn-sm">
            Get Started
          </a>
        </div>

        <button 
          className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(link => (
              <a key={link.href} href={link.href} className="mobile-link"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="mobile-actions">
              <a href="/demo" className="btn btn-secondary" style={{width:'100%'}}>Investor Demo ↗</a>
              <a href="#waitlist" className="btn btn-primary" style={{width:'100%'}}>Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
