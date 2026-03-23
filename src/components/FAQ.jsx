import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const FAQS = [
  {
    q: 'How is this different from just using WhatsApp Business?',
    a: 'WhatsApp Business gives you a profile. Quickin gives you a system - engineered CTAs that drive clicks, structured entry flows that eliminate customer hesitation, automated data capture, and weekly broadcast templates that bring customers back.',
  },
  {
    q: 'Do I need any technical skills?',
    a: 'Zero. We handle setup, configuration, link generation, and QR codes. Your job is to point customers into the thread and keep serving the product well.',
  },
  {
    q: 'What if my customers speak different languages?',
    a: 'Our AI layer understands Manglish, Malay, Mandarin, Tamil, and English. It classifies customer intent regardless of language and suggests replies in the same register.',
  },
  {
    q: 'What happens to my customer data?',
    a: 'You own it completely. If you leave Quickin, you keep your customer list. We process data on your behalf under PDPA-oriented operating assumptions, but the relationship layer remains yours.',
  },
  {
    q: 'Can this really be set up in 48 hours?',
    a: 'Yes, provided the onboarding inputs are complete. The system is intentionally designed for fast deployment because small operators do not have time for long implementation cycles.',
  },
  {
    q: 'Will this work for my type of F&B business?',
    a: 'If your customers find you on social media and you want them to come back, yes. Quickin is designed for hawker stalls, food trucks, small cafes, home bakers, and other informal F&B businesses that rely on discovery and repeat demand.',
  },
  {
    q: 'What about e-invoicing and compliance?',
    a: 'Quickin starts by owning the customer layer, but every order creates structured transaction data. That means the compliance layer can follow downstream without forcing the merchant to change how they sell.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, isInView] = useInView(0.1)

  return (
    <section className="section" id="faq" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">FAQ</span>
          <h2>Got questions?</h2>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-item glass-card ${open === i ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-toggle">{open === i ? '-' : '+'}</span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-list {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .faq-item {
          padding: var(--space-lg) var(--space-xl);
          cursor: pointer;
          user-select: none;
        }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .faq-toggle {
          font-size: 1.3rem;
          color: var(--accent-2);
          flex-shrink: 0;
          width: 28px;
          text-align: center;
        }
        .faq-answer {
          overflow: hidden;
        }
        .faq-answer p {
          padding-top: var(--space-md);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .faq-item.open {
          border-color: rgba(249,115,22,0.2);
          background: rgba(249,115,22,0.03);
        }
      `}</style>
    </section>
  )
}
