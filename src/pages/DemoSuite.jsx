import { useState } from 'react'
import { motion } from 'framer-motion'
import AIDemo from '../components/AIDemo'
import WhatsAppSimulator from '../components/WhatsAppSimulator'

const TABS = [
  { id: 'flow', label: '💬 WhatsApp Flow', icon: '💬' },
  { id: 'ai', label: '🧠 AI Classifier', icon: '🧠' },
  { id: 'dashboard', label: '📊 Client Dashboard', icon: '📊' },
  { id: 'revenue', label: '💰 Revenue Model', icon: '💰' },
  { id: 'funnel', label: '🔄 Funnel Map', icon: '🔄' },
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
            <a href="/" className="demo-back">← Back to Landing Page</a>
            <h1>Tapau <span className="gradient-text">Investor Demo</span></h1>
            <p className="demo-subtitle">
              Interactive demonstration of the Tapau system — five components 
              that prove how we turn social media attention into retained customers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Market opportunity panel */}
      <div className="container">
        <motion.div
          className="market-panel glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>🇲🇾 Market Opportunity</h3>
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
            <strong>Thesis:</strong> Whoever owns the customer relationship layer 
            will later own the accounting, payments, and compliance layers. 
            Tapau starts with the highest-adoption entry point (customer capture) 
            and expands downstream.
          </p>
        </motion.div>
      </div>

      {/* Tab navigation */}
      <div className="container">
        <div className="demo-tabs">
          {TABS.map(tab => (
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

      {/* Tab content */}
      <div className="demo-content">
        {activeTab === 'flow' && <WhatsAppSimulator />}
        {activeTab === 'ai' && <AIDemo />}
        {activeTab === 'dashboard' && <DashboardDemo />}
        {activeTab === 'revenue' && <RevenueDemo />}
        {activeTab === 'funnel' && <FunnelDemo />}
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
          max-width: 600px;
        }
        .market-panel {
          margin: var(--space-2xl) 0;
          padding: var(--space-2xl);
        }
        .market-panel h3 { margin-bottom: var(--space-lg); font-size: 1.1rem; }
        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }
        .market-stat { text-align: center; }
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
          background: rgba(139,92,246,0.06);
          border: 1px solid rgba(139,92,246,0.15);
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
          .market-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  )
}

/* --- Dashboard Demo --- */
function DashboardDemo() {
  const contacts = [
    { name: 'Sarah L.', phone: '+60 12-xxx-1234', tag: 'VIP', orders: 5, last: 'Today' },
    { name: 'Ahmad K.', phone: '+60 11-xxx-5678', tag: 'Returning', orders: 3, last: 'Yesterday' },
    { name: 'Mei Ling', phone: '+60 16-xxx-9012', tag: 'New', orders: 1, last: '2 days ago' },
    { name: 'Raj P.', phone: '+60 17-xxx-3456', tag: 'VIP', orders: 8, last: 'Today' },
    { name: 'Nurul A.', phone: '+60 13-xxx-7890', tag: 'Returning', orders: 2, last: '3 days ago' },
  ]

  const tagColors = { VIP: '#f97316', Returning: '#8b5cf6', New: '#22c55e' }

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="label">Client Dashboard</span>
          <h2>Your customer command center</h2>
          <p>Real-time view of your captured contacts, order history, and broadcast performance.</p>
        </div>
        <div className="dash-grid">
          <div className="glass-card dash-stat-card">
            <div style={{fontSize:'0.8rem',color:'var(--text-tertiary)'}}>Total Contacts</div>
            <div style={{fontSize:'2.5rem',fontWeight:800,fontFamily:'var(--font-display)',color:'var(--whatsapp)'}}>247</div>
            <div style={{fontSize:'0.75rem',color:'#22c55e'}}>+18 this week</div>
          </div>
          <div className="glass-card dash-stat-card">
            <div style={{fontSize:'0.8rem',color:'var(--text-tertiary)'}}>Broadcasts Sent</div>
            <div style={{fontSize:'2.5rem',fontWeight:800,fontFamily:'var(--font-display)',color:'var(--accent-2)'}}>12</div>
            <div style={{fontSize:'0.75rem',color:'var(--text-tertiary)'}}>Avg 27% response</div>
          </div>
          <div className="glass-card dash-stat-card">
            <div style={{fontSize:'0.8rem',color:'var(--text-tertiary)'}}>Repeat Rate</div>
            <div style={{fontSize:'2.5rem',fontWeight:800,fontFamily:'var(--font-display)',color:'var(--accent-3)'}}>34%</div>
            <div style={{fontSize:'0.75rem',color:'#22c55e'}}>↑ 8% from last month</div>
          </div>
          <div className="glass-card" style={{gridColumn:'1/-1',overflow:'auto'}}>
            <h4 style={{marginBottom:'var(--space-md)'}}>Recent Contacts</h4>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Tag</th>
                  <th>Orders</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={i}>
                    <td style={{fontWeight:600}}>{c.name}</td>
                    <td style={{color:'var(--text-tertiary)'}}>{c.phone}</td>
                    <td>
                      <span style={{
                        background: `${tagColors[c.tag]}20`,
                        color: tagColors[c.tag],
                        padding: '0.15rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}>{c.tag}</span>
                    </td>
                    <td>{c.orders}</td>
                    <td style={{color:'var(--text-tertiary)'}}>{c.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
        .dash-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          max-width: 900px;
          margin: 0 auto;
        }
        .dash-stat-card {
          text-align: center;
          padding: var(--space-xl);
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .dash-table th {
          text-align: left;
          padding: 0.6rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-tertiary);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .dash-table td {
          padding: 0.6rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-secondary);
        }
        @media (max-width: 700px) {
          .dash-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

/* --- Revenue Demo --- */
function RevenueDemo() {
  const [clients, setClients] = useState(10)
  const [avgOrders, setAvgOrders] = useState(30)
  const [retention, setRetention] = useState(30)

  const setupRevPerClient = 225  // avg of RM150-300
  const monthlyRevPerClient = 115 // avg of RM80-150

  const months = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1
    const activeClients = Math.min(clients, Math.ceil(clients * (m / 6)))
    const setupRev = m <= 3 ? activeClients * setupRevPerClient : 0
    const recurringRev = activeClients * monthlyRevPerClient
    const broadcastRevenue = activeClients * avgOrders * 12 * (retention / 100) * 0.15
    return {
      month: m,
      label: `M${m}`,
      setup: setupRev,
      recurring: recurringRev,
      total: setupRev + recurringRev,
      clientValue: broadcastRevenue / 12,
    }
  })

  const totalYear = months.reduce((s, m) => s + m.total, 0)

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="label">Revenue Projector</span>
          <h2>Model the business</h2>
          <p>Adjust the sliders to see how Tapau's revenue scales with client count.</p>
        </div>

        <div className="revenue-container">
          <div className="revenue-sliders glass-card">
            <div className="slider-group">
              <label>Number of clients: <strong>{clients}</strong></label>
              <input type="range" min="1" max="100" value={clients} onChange={e => setClients(+e.target.value)} />
            </div>
            <div className="slider-group">
              <label>Avg orders/client/week: <strong>{avgOrders}</strong></label>
              <input type="range" min="5" max="100" value={avgOrders} onChange={e => setAvgOrders(+e.target.value)} />
            </div>
            <div className="slider-group">
              <label>Retention rate: <strong>{retention}%</strong></label>
              <input type="range" min="10" max="80" value={retention} onChange={e => setRetention(+e.target.value)} />
            </div>
            <div className="revenue-total">
              <div style={{fontSize:'0.8rem',color:'var(--text-tertiary)'}}>Projected Y1 Revenue</div>
              <div style={{fontSize:'2.2rem',fontWeight:800,fontFamily:'var(--font-display)',color:'var(--accent-2)'}}>
                RM {totalYear.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="revenue-chart glass-card">
            <h4 style={{marginBottom:'var(--space-md)'}}>Monthly Revenue Projection</h4>
            <div className="chart-bars">
              {months.map(m => {
                const maxVal = Math.max(...months.map(x => x.total))
                const height = maxVal > 0 ? (m.total / maxVal) * 200 : 0
                return (
                  <div key={m.month} className="chart-bar-wrap">
                    <div className="chart-bar" style={{height: `${height}px`}}>
                      <div className="chart-bar-tooltip">RM {m.total.toLocaleString()}</div>
                    </div>
                    <div className="chart-bar-label">{m.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .revenue-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--space-xl);
          max-width: 900px;
          margin: 0 auto;
        }
        .revenue-sliders { padding: var(--space-xl); }
        .slider-group {
          margin-bottom: var(--space-lg);
        }
        .slider-group label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .slider-group input[type="range"] {
          width: 100%;
          accent-color: var(--accent-1);
        }
        .revenue-total {
          padding: var(--space-lg);
          background: rgba(249,115,22,0.06);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: var(--radius-md);
          text-align: center;
        }
        .revenue-chart { padding: var(--space-xl); }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 240px;
          padding-top: 20px;
        }
        .chart-bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
        }
        .chart-bar {
          width: 100%;
          background: linear-gradient(to top, var(--accent-1), var(--accent-2));
          border-radius: 4px 4px 0 0;
          position: relative;
          min-height: 4px;
          transition: height 0.4s ease;
        }
        .chart-bar-tooltip {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.6rem;
          color: var(--text-tertiary);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .chart-bar-wrap:hover .chart-bar-tooltip { opacity: 1; }
        .chart-bar-label {
          margin-top: 4px;
          font-size: 0.65rem;
          color: var(--text-tertiary);
        }
        @media (max-width: 700px) {
          .revenue-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}

/* --- Funnel Demo --- */
function FunnelDemo() {
  const nodes = [
    { label: 'TikTok / IG Content', icon: '📱', color: '#ef4444', sub: 'Discovery layer' },
    { label: 'Engineered CTA', icon: '🔗', color: '#f97316', sub: '"Reply MENU on WhatsApp"' },
    { label: 'WhatsApp Entry', icon: '💬', color: '#25D366', sub: 'Prefilled message flow' },
    { label: 'Structured Menu', icon: '📋', color: '#22c55e', sub: 'Guided options, no hesitation' },
    { label: 'Order Captured', icon: '✅', color: '#06b6d4', sub: 'Name, phone, intent logged' },
    { label: 'Customer List', icon: '📊', color: '#8b5cf6', sub: 'Google Sheet / Airtable' },
    { label: 'Weekly Broadcast', icon: '📢', color: '#f97316', sub: 'Template → send → repeat' },
    { label: 'Returning Customer', icon: '🔥', color: '#ef4444', sub: 'The compound effect' },
  ]

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="label">Funnel Architecture</span>
          <h2>The complete retention loop</h2>
          <p>Each node solves a specific friction point identified through stress-testing.</p>
        </div>
        <div className="funnel-flow">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="funnel-node glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="funnel-icon" style={{borderColor: node.color}}>
                {node.icon}
              </div>
              <div className="funnel-info">
                <div className="funnel-label" style={{color: node.color}}>{node.label}</div>
                <div className="funnel-sub">{node.sub}</div>
              </div>
              {i < nodes.length - 1 && <div className="funnel-arrow">→</div>}
            </motion.div>
          ))}
        </div>
        <div className="funnel-loop-note glass-card" style={{maxWidth:500,margin:'var(--space-xl) auto',textAlign:'center',padding:'var(--space-lg)'}}>
          <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🔄</div>
          <p style={{fontSize:'0.85rem'}}>
            <strong>The loop closes:</strong> Returning customers generate word-of-mouth, 
            bringing new TikTok viewers into the funnel. The system compounds.
          </p>
        </div>
      </div>
      <style>{`
        .funnel-flow {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        .funnel-node {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
        }
        .funnel-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          background: rgba(255,255,255,0.02);
        }
        .funnel-info { flex: 1; }
        .funnel-label { font-weight: 700; font-size: 0.9rem; }
        .funnel-sub { font-size: 0.75rem; color: var(--text-tertiary); }
        .funnel-arrow {
          color: var(--text-tertiary);
          font-size: 1.1rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}
