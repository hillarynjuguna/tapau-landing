# Tapau Landing — Quickin Investor Demo

> **Tapau** is the product platform brand. **Quickin** is the current customer-facing iteration — a WhatsApp-native capture, compliance, and retention system for Malaysian F&B and SME businesses.
>
> A product by **Agent SEA** — Agentic infrastructure for emerging economies

Quickin turns every TikTok view into a returning customer — giving Malaysian F&B businesses the customer infrastructure big brands take for granted.

## Quick Start

```bash
# Clone
git clone https://github.com/hillarynjuguna/tapau-landing.git
cd tapau-landing

# Install
npm install

# Run (frontend only — AI demo uses local heuristic fallback)
npm run dev
```

> **Note:** The AI intent classifier demo requires a Vercel deployment with `OPENROUTER_API_KEY` set as an environment variable. When running locally with just `npm run dev`, the classifier falls back to a built-in heuristic so the UI still works.

## Tech Stack

- `Vite + React` — Fast builds, HMR
- `Vanilla CSS` — Custom design system with glassmorphism
- `Framer Motion` — Scroll-triggered animations
- `OpenRouter + Mistral` — Live AI intent classification (via server-side proxy)
- `React Router` — Landing page + demo suite routing

## Architecture Glossary

Two internal components are referenced throughout the demo and may be unfamiliar:

- **Ghost Bridge** — A compliance middleware layer that lets transactions proceed immediately while regulatory checks (like Malaysia's MyInvois e-invoicing) run asynchronously in the background. It prevents compliance latency from blocking the customer experience. The ComplianceVisualizer component demonstrates this flow.

- **CE-Ledger** (Conversational Evidence Ledger) — A provenance system that hashes, signs, and chains conversation turns into an auditable record. Think of it as a receipt chain for WhatsApp conversations — every message exchange gets a cryptographic proof that can be exported for disputes or audits. The ProvenanceChainDemo component visualizes this.

## Structure

```text
src/
├── components/
│   ├── Navbar.jsx              # Glass-morph scroll navbar
│   ├── Hero.jsx                # Quickin hero section
│   ├── ProblemSection.jsx      # Before/after visualization
│   ├── HowItWorks.jsx          # 48-hour deployment timeline
│   ├── WhatsAppSimulator.jsx   # Interactive 6-step replay flow
│   ├── AIDemo.jsx              # Live multilingual AI classifier
│   ├── ComplianceVisualizer.jsx # Ghost Bridge compliance replay
│   ├── ProvenanceChainDemo.jsx  # CE-Ledger provenance replay
│   ├── InvestorStackView.jsx   # Full stack architecture replay
│   ├── SocialProof.jsx         # Animated counters + testimonial
│   ├── PricingSection.jsx      # 3-tier outcome pricing
│   ├── PaymentSection.jsx      # DuitNow/TNG QR payment
│   ├── FAQ.jsx                 # Accordion FAQ
│   ├── Footer.jsx              # Waitlist + branding
│   └── useInView.js            # IntersectionObserver hook
├── pages/
│   └── DemoSuite.jsx           # 6-tab investor demo suite
├── App.jsx                     # Router + page assembly
├── main.jsx                    # Entry point
└── index.css                   # Full design system
api/
└── classify.js                 # Vercel serverless proxy for AI classification
```

## Deployment

### Vercel (recommended)

```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in the Vercel dashboard:
# OPENROUTER_API_KEY — for the AI classifier demo
```

`vercel.json` is included for SPA routing and API function routing.

### Static hosting (limited)

```bash
npm run build
# Upload dist/ folder — AI demo will use local heuristic fallback only
```

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `OPENROUTER_API_KEY` | Vercel env vars (server-side) | OpenRouter API key for AI intent classification |

> **Security note:** API keys are never bundled into the client-side JavaScript. The AI classifier calls go through `/api/classify`, a Vercel serverless function that reads the key from `process.env`.

## License

MIT — built with care in Malaysia 🇲🇾
