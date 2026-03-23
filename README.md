# Quickin - Investor Demo

> A product by **Agent SEA** - Agentic infrastructure for emerging economies

Quickin turns every TikTok view into a returning customer - a WhatsApp-native capture, compliance, and retention system that gives Malaysian F&B and SME businesses the customer infrastructure big brands take for granted.

## Quick Start

```bash
# Clone
git clone <quickin-repo-url>
cd quickin-landing

# Install
npm install

# Set up environment
cp .env.example .env
# Add your OpenRouter API key to .env

# Run
npm run dev
```

## Tech Stack

- `Vite + React` - Fast builds, HMR
- `Vanilla CSS` - Custom design system with glassmorphism
- `Framer Motion` - Scroll-triggered animations
- `OpenRouter + Mistral` - Live AI intent classification
- `React Router` - Landing page + demo suite routing

## Structure

```text
src/
|-- components/
|   |-- Navbar.jsx              # Glass-morph scroll navbar
|   |-- Hero.jsx                # Rebranded Quickin hero
|   |-- ProblemSection.jsx      # Before/after visualization
|   |-- HowItWorks.jsx          # 48-hour deployment timeline
|   |-- WhatsAppSimulator.jsx   # Interactive 6-step replay flow
|   |-- AIDemo.jsx              # Live multilingual AI classifier
|   |-- ComplianceVisualizer.jsx # Ghost Bridge compliance replay
|   |-- ProvenanceChainDemo.jsx # CE-Ledger provenance replay
|   |-- InvestorStackView.jsx   # Full stack architecture replay
|   |-- SocialProof.jsx         # Animated counters + testimonial
|   |-- PricingSection.jsx      # 3-tier outcome pricing
|   |-- PaymentSection.jsx      # DuitNow/TNG QR payment
|   |-- FAQ.jsx                 # Accordion FAQ
|   |-- Footer.jsx              # Waitlist + Agent SEA branding
|   `-- useInView.js            # IntersectionObserver hook
|-- pages/
|   `-- DemoSuite.jsx           # 6-tab investor demo suite
|-- App.jsx                     # Router + page assembly
|-- main.jsx                    # Entry point
`-- index.css                   # Full design system
```

## Deployment

### Vercel

```bash
npm run build
# Deploy dist/ folder or connect GitHub repo to Vercel
```

### Hostinger

```bash
npm run build
# Upload dist/ folder to public_html via File Manager
```

`vercel.json` is included for SPA routing.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for AI demo |
| `VITE_MISTRAL_API_KEY` | Optional fallback key for the AI classifier |

## License

MIT - built with care in Malaysia
