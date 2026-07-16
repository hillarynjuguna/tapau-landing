import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from './useInView'

const EXAMPLE_MESSAGES = [
  { text: 'boss got today ah?', lang: 'Manglish' },
  { text: 'ada lagi ke nasi lemak?', lang: 'Malay' },
  { text: '还有吗？', lang: 'Mandarin' },
  { text: 'இருக்கா?', lang: 'Tamil' },
  { text: 'bro cheese one still got?', lang: 'Manglish' },
  { text: 'nak order 2, boleh tapau?', lang: 'Malay' },
  { text: '多少钱啊 corn dog?', lang: 'Mix (ZH+EN)' },
  { text: 'what time u close today', lang: 'English' },
]

// ── AI Classification via server-side proxy (API keys stay on Vercel, not in client bundle) ──
async function classifyWithAI(message) {
  try {
    const res = await fetch('/api/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.warn('Classify API error:', err.error || res.status)
      return { ...fallbackClassify(message), _provider: 'Local Heuristic (API unavailable)' }
    }

    const parsed = await res.json()
    return { ...parsed, _provider: `${parsed._provider || 'OpenRouter'} / ${parsed._model || 'unknown'}` }
  } catch {
    // Network error — fall back to local heuristic
    return { ...fallbackClassify(message), _provider: 'Local Heuristic' }
  }
}

function fallbackClassify(msg) {
  const lower = msg.toLowerCase()
  let intent = 'other', item = null, lang = 'English', reply = '', conf = 0.75

  if (/got|ada|还有|இருக்கா|available/.test(lower)) {
    intent = 'availability_check'
    reply = 'Yes, still available today! 👍 Want to reserve one?'
    conf = 0.88
  } else if (/order|nak|要|tapau|bungkus/.test(lower)) {
    intent = 'order_placement'
    reply = 'Nice! 🔥 How many you want? We\'ll set aside for you.'
    conf = 0.91
  } else if (/price|harga|多少|berapa/.test(lower)) {
    intent = 'pricing_inquiry'
    reply = 'Corn Dog RM12, Cheese Pull RM14 🌭 Which one you want?'
    conf = 0.85
  } else if (/time|masa|几点|close|tutup/.test(lower)) {
    intent = 'operating_hours'
    reply = 'We\'re open till 8PM today! 🕗 Come early, sell out fast!'
    conf = 0.82
  } else if (/menu/.test(lower)) {
    intent = 'menu_request'
    reply = 'Here\'s today\'s menu! 👇\n🌭 Classic RM12\n🧀 Cheese RM14\n🌶️ Spicy RM15'
    conf = 0.9
  }

  if (/ah|lah|bro|boss|mah/.test(lower)) lang = 'Manglish'
  else if (/ada|nak|ke|boleh/.test(lower)) lang = 'Malay'
  else if (/还|吗|多少|啊/.test(msg)) lang = 'Mandarin'
  else if (/இருக்கா|உள்ளது/.test(msg)) lang = 'Tamil'

  if (/cheese/.test(lower)) item = 'cheese corn dog'
  else if (/corn dog|corndog/.test(lower)) item = 'corn dog'
  else if (/nasi lemak/.test(lower)) item = 'nasi lemak'

  return { intent, item, language_register: lang, suggested_reply: reply, confidence: conf }
}

export default function AIDemo() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [ref, isInView] = useInView(0.15)

  const classify = async (msg) => {
    const text = msg || input
    if (!text.trim()) return
    setInput(text)
    setLoading(true)
    setResult(null)
    const res = await classifyWithAI(text)
    setResult(res)
    setLoading(false)
  }

  const intentColors = {
    availability_check: '#22c55e',
    order_placement: '#f97316',
    pricing_inquiry: '#8b5cf6',
    operating_hours: '#06b6d4',
    menu_request: '#eab308',
    greeting: '#ec4899',
    reservation: '#14b8a6',
    complaint: '#ef4444',
    other: '#64748b',
  }

  return (
    <section className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label">AI Intelligence Layer</span>
          <h2>Understands every language<br />your customers speak</h2>
          <p>
            Manglish, Malay, Mandarin, Tamil — type anything. 
            Our AI classifies intent in ~400ms and suggests the perfect reply.
          </p>
        </motion.div>

        <motion.div
          className="ai-demo-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Example chips */}
          <div className="ai-chips">
            <span className="ai-chips-label">Try these →</span>
            {EXAMPLE_MESSAGES.map((ex, i) => (
              <button
                key={i}
                className="ai-chip"
                onClick={() => classify(ex.text)}
              >
                <span className="chip-lang">{ex.lang}</span>
                {ex.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="ai-input-wrap">
            <input
              type="text"
              className="ai-input"
              placeholder='Type a message in any language... e.g. "boss got today ah?"'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && classify()}
            />
            <button
              className="ai-send"
              onClick={() => classify()}
              disabled={loading || !input.trim()}
            >
              {loading ? '⏳' : '🔍'} Classify
            </button>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                className="ai-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="ai-spinner" />
                Analyzing with Mistral AI...
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                className="ai-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="ai-result-grid">
                  {/* Friendly view */}
                  <div className="ai-result-friendly glass-card">
                    <div className="ai-intent-badge" style={{
                      background: `${intentColors[result.intent] || '#64748b'}15`,
                      borderColor: `${intentColors[result.intent] || '#64748b'}40`,
                      color: intentColors[result.intent] || '#64748b',
                    }}>
                      {result.intent?.replace(/_/g, ' ')}
                    </div>
                    {result.item && (
                      <div className="ai-item">🍴 Item: <strong>{result.item}</strong></div>
                    )}
                    <div className="ai-lang">
                      🌍 Language: <strong>{result.language_register}</strong>
                    </div>
                    <div className="ai-confidence">
                      <div className="confidence-bar">
                        <div className="confidence-fill" style={{ 
                          width: `${(result.confidence || 0) * 100}%`,
                          background: intentColors[result.intent] || '#64748b',
                        }} />
                      </div>
                      <span>{((result.confidence || 0) * 100).toFixed(0)}% confidence</span>
                    </div>
                    <div className="ai-reply-box">
                      <div className="ai-reply-label">💬 Suggested Reply:</div>
                      <div className="ai-reply-text">{result.suggested_reply}</div>
                    </div>
                  </div>

                  {/* JSON view */}
                  <div className="ai-result-json glass-card">
                    <div className="json-header">
                      <span className="json-dot" style={{background:'#ef4444'}} />
                      <span className="json-dot" style={{background:'#eab308'}} />
                      <span className="json-dot" style={{background:'#22c55e'}} />
                      <span className="json-title">API Response</span>
                    </div>
                    <pre className="json-code">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .ai-demo-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .ai-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: var(--space-lg);
        }
        .ai-chips-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          font-weight: 500;
          margin-right: 0.25rem;
        }
        .ai-chip {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 0.35rem 0.8rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .ai-chip:hover {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.3);
          color: var(--text-primary);
        }
        .chip-lang {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-4);
          margin-right: 0.4rem;
        }
        .ai-input-wrap {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
        }
        .ai-input {
          flex: 1;
          padding: 0.9rem 1.25rem;
          border-radius: var(--radius-full);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.2s;
        }
        .ai-input:focus {
          border-color: var(--accent-1);
        }
        .ai-input::placeholder { color: var(--text-tertiary); }
        .ai-send {
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, var(--accent-3), var(--accent-4));
          color: white;
          border: none;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .ai-send:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(139,92,246,0.3); }
        .ai-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .ai-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: var(--space-xl);
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }
        .ai-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--glass-border);
          border-top-color: var(--accent-3);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ai-result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-lg);
        }
        .ai-result-friendly { padding: var(--space-xl); }
        .ai-intent-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: capitalize;
          border: 1px solid;
          margin-bottom: var(--space-md);
        }
        .ai-item, .ai-lang {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-sm);
        }
        .ai-confidence {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }
        .confidence-bar {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--glass-bg);
          overflow: hidden;
        }
        .confidence-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease;
        }
        .ai-confidence span {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          white-space: nowrap;
        }
        .ai-reply-box {
          background: rgba(37,211,102,0.06);
          border: 1px solid rgba(37,211,102,0.15);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }
        .ai-reply-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--whatsapp);
          margin-bottom: 0.3rem;
        }
        .ai-reply-text {
          font-size: 0.9rem;
          color: var(--text-primary);
          line-height: 1.5;
          white-space: pre-line;
        }
        .ai-result-json { padding: 0; overflow: hidden; }
        .json-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--glass-border);
        }
        .json-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .json-title {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
        }
        .json-code {
          padding: 1rem;
          font-size: 0.75rem;
          font-family: 'SF Mono', 'Fira Code', monospace;
          color: var(--accent-5);
          overflow-x: auto;
          line-height: 1.6;
        }
        @media (max-width: 700px) {
          .ai-result-grid { grid-template-columns: 1fr; }
          .ai-input-wrap { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}
