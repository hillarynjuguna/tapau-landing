import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const FAQS = [
  {
    q: 'How is this different from just using WhatsApp Business?',
    a: 'WhatsApp Business gives you a profile. Tapau gives you a system — engineered CTAs that drive clicks, structured entry flows that eliminate customer hesitation, automated data capture, and weekly broadcast templates that bring customers back. The difference is between having a tool and having a retention loop.',
  },
  {
    q: 'Do I need any technical skills?',
    a: 'Zero. We handle everything — setup, configuration, link generation, QR codes. Your only job is: tell customers to click the link, reply to WhatsApp normally, and send one broadcast per week (which we can do for you on the Managed plan).',
  },
  {
    q: 'What if my customers speak different languages?',
    a: 'Our AI layer understands Manglish, Malay, Mandarin, Tamil, and English. It classifies customer intent regardless of language and suggests replies in the same register. Your customer writes "boss got ah?" — the system knows they\'re asking about availability.',
  },
  {
    q: 'What happens to my customer data?',
    a: 'You own it completely. Customer contacts are stored in your own Google Sheet. If you leave Tapau, you keep your entire customer list. We process data on your behalf under PDPA guidelines, but the list belongs to you — always.',
  },
  {
    q: 'Can this really be set up in 48 hours?',
    a: 'Yes — provided you complete our pre-onboarding checklist (menu, WhatsApp number, social links). We\'ve designed the system to deploy fast because F&B owners don\'t have time for long implementation cycles. Day 1: system built. Day 2: deployed and trained.',
  },
  {
    q: 'Will this work for my type of F&B business?',
    a: 'If your customers find you on social media and you want them to come back, yes. We\'ve designed Tapau for hawker stalls, food trucks, small cafés, home bakers, and any informal F&B business that relies on social media discovery. If you get TikTok views but no repeat customers, this is for you.',
  },
  {
    q: 'What about e-invoicing and compliance?',
    a: 'Tapau focuses on the customer layer first — capture and retention. But every order through our system creates structured transaction data. When e-invoicing becomes relevant for your business, the data is already organized. Phase 1: customers. Phase 2: compliance. In that order.',
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
                <span className="faq-toggle">{open === i ? '−' : '+'}</span>
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
