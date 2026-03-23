import { useState } from 'react'
import { motion } from 'framer-motion'
import AIDemo from '../components/AIDemo'
import WhatsAppSimulator from '../components/WhatsAppSimulator'
import ComplianceVisualizer from '../components/ComplianceVisualizer'
import ProvenanceChainDemo from '../components/ProvenanceChainDemo'
import InvestorStackView from '../components/InvestorStackView'

const TABS = [
  { id: 'flow', label: 'Flow' },
  { id: 'ai', label: 'AI' },
  { id: 'triad', label: 'Agent Triad' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'provenance', label: 'Provenance' },
  { id: 'stack', label: 'Stack' },
]

export default function DemoSuite() {
  const [activeTab, setActiveTab] = useState('flow')

  return (
    <div className="demo-suite">
      <div className="demo-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="demo-back">Back to Landing Page</a>
            <h1>Quickin <span className="gradient-text">Investor Demo</span></h1>
            <p className="demo-subtitle">
              Replay-based walkthrough of the Quickin stack: customer capture, agentic automation,
              compliance routing, provenance, and sovereignty.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <motion.div
          className="market-panel glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Malaysia Market Opportunity</h3>
          <div className="market-grid">
            <div className="market-stat">
              <span className="market-val">80,000+</span>
              <span className="market-label">Registered F&B establishments in Malaysia</span>
            </div>
            <div className="market-stat">
              <span className="market-val">94%</span>
              <span className="market-label">WhatsApp penetration rate</span>
            </div>
            <div className="market-stat">
              <span className="market-val">45-60%</span>
              <span className="market-label">WhatsApp conversion rates vs 21% email</span>
            </div>
            <div className="market-stat">
              <span className="market-val">~RM 0</span>
              <span className="market-label">Current spend on retention tools by informal SMEs</span>
            </div>
          </div>
          <p className="market-thesis">
            <strong>Thesis:</strong> Whoever owns the customer relationship layer will own the compliance,
            payments, and sovereignty layers downstream.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="demo-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`demo-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="demo-content">
        {activeTab === 'flow' && <WhatsAppSimulator />}
        {activeTab === 'ai' && <AIDemo />}
        {activeTab === 'triad' && <AgentTriadDemo />}
        {activeTab === 'compliance' && <ComplianceVisualizer />}
        {activeTab === 'provenance' && <ProvenanceChainDemo />}
        {activeTab === 'stack' && <InvestorStackView />}
      </div>

      <style>{`
        .demo-suite {
          min-height: 100vh;
          padding-top: var(--nav-height);
        }
        .demo-header {
          padding: var(--space-3xl) 0 var(--space-2xl);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--glass-border);
        }
        .demo-back {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: var(--space-lg);
          display: inline-block;
        }
        .demo-header h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: var(--space-md);
        }
        .demo-subtitle {
          font-size: 1.05rem;
          max-width: 680px;
        }
        .market-panel {
          margin: var(--space-2xl) 0;
          padding: var(--space-2xl);
        }
        .market-panel h3 {
          margin-bottom: var(--space-lg);
          font-size: 1.1rem;
        }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }
        .market-stat {
          text-align: center;
        }
        .market-val {
          display: block;
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-2);
        }
        .market-label {
          font-size: 0.78rem;
          color: var(--text-tertiary);
        }
        .market-thesis {
          font-size: 0.9rem;
          padding: var(--space-md);
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.18);
          border-radius: var(--radius-md);
        }
        .demo-tabs {
          display: flex;
          gap: var(--space-sm);
          overflow-x: auto;
          padding: var(--space-md) 0;
          -webkit-overflow-scrolling: touch;
        }
        .demo-tab {
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-full);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .demo-tab:hover {
          background: var(--glass-hover);
          color: var(--text-primary);
        }
        .demo-tab.active {
          background: rgba(249,115,22,0.1);
          border-color: rgba(249,115,22,0.3);
          color: var(--accent-2);
        }
        .demo-content {
          padding-bottom: var(--space-4xl);
        }
        @media (max-width: 700px) {
          .market-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

function AgentTriadDemo() {
  const agents = [
    {
      name: 'Aina',
      role: 'Qualifier',
      score: 92,
      summary: 'Qualified the lead by detecting purchase intent and reading the Manglish register correctly.',
      flavor: 'Warm and culturally fluent, designed to open the conversation without sounding robotic or pushy.',
      output: 'Intent: order placement | register: Manglish | next move: hand to Amir',
    },
    {
      name: 'Amir',
      role: 'Nurturer',
      score: 88,
      summary: 'Handled the pricing objection, gave context, and built enough trust to keep the customer engaged.',
      flavor: 'Patient, context-aware, and optimized for the trust dynamics of the informal economy.',
      output: 'Objection handled: price clarity | trust signal: preserved context | next move: hand to Lina',
    },
    {
      name: 'Lina',
      role: 'Closer',
      score: 95,
      summary: 'Closed the deal and triggered the Sovereign Handshake before the compliance path takes over.',
      flavor: 'Polite but decisive, designed to reach a clear yes or no while staying compliance-aware.',
      output: 'Close status: yes | handshake: triggered | compliance handoff: ready',
    },
  ]

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="label">Agent Triad</span>
          <h2>Aina, Amir, and Lina form the operating spine.</h2>
          <p>
            Replay mode only. These cards reflect the real role definitions from the CrewAI swarm repo,
            presented as the intended handoff sequence rather than a live backend trace.
          </p>
        </div>

        <div className="triad-grid">
          {agents.map((agent, index) => (
            <motion.article
              key={agent.name}
              className="glass-card triad-card"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="triad-top">
                <div>
                  <div className="triad-name">{agent.name}</div>
                  <div className="triad-role">{agent.role}</div>
                </div>
                <div className="triad-score">{agent.score}%</div>
              </div>

              <p className="triad-summary">{agent.summary}</p>
              <p className="triad-flavor">{agent.flavor}</p>

              <div className="triad-meter-label">Confidence</div>
              <div className="triad-meter">
                <motion.div
                  className="triad-meter-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.score}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                />
              </div>

              <div className="triad-output">{agent.output}</div>
            </motion.article>
          ))}
        </div>

        <div className="glass-card triad-footer">
          <div className="triad-footer-kicker">Why this matters</div>
          <p>
            Quickin is not positioning one generic assistant as the product. The investor story is a role-based
            operating model: qualification, nurture, and close on top of a compliance and provenance backbone.
          </p>
        </div>
      </div>

      <style>{`
        .triad-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-lg);
        }
        .triad-card {
          padding: var(--space-xl);
        }
        .triad-top {
          display: flex;
          justify-content: space-between;
          gap: var(--space-md);
          align-items: flex-start;
          margin-bottom: var(--space-md);
        }
        .triad-name {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 800;
        }
        .triad-role {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .triad-score {
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-full);
          background: rgba(37,211,102,0.1);
          color: var(--whatsapp);
          font-size: 0.82rem;
          font-weight: 800;
        }
        .triad-summary {
          color: var(--text-primary);
          font-size: 0.96rem;
          margin-bottom: var(--space-sm);
        }
        .triad-flavor {
          color: var(--text-tertiary);
          font-size: 0.84rem;
          min-height: 4.5rem;
          margin-bottom: var(--space-lg);
        }
        .triad-meter-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-tertiary);
          margin-bottom: 0.35rem;
        }
        .triad-meter {
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
          margin-bottom: var(--space-lg);
        }
        .triad-meter-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent-1), var(--whatsapp));
        }
        .triad-output {
          font-size: 0.8rem;
          color: var(--accent-4);
          padding-top: var(--space-md);
          border-top: 1px solid var(--glass-border);
        }
        .triad-footer {
          margin-top: var(--space-xl);
          padding: var(--space-lg);
          background: rgba(6,182,212,0.08);
          border-color: rgba(6,182,212,0.16);
        }
        .triad-footer-kicker {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-4);
          margin-bottom: 0.4rem;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .triad-grid {
            grid-template-columns: 1fr;
          }
          .triad-flavor {
            min-height: 0;
          }
        }
      `}</style>
    </section>
  )
}
