# 🥡 Tapau — Customer Retention for Malaysian F&B

> A product by **🌊 Agent SEA** — Agentic infrastructure for emerging economies

Tapau turns every TikTok view into a returning customer — a WhatsApp-native capture and retention system that gives Malaysian F&B stalls the customer infrastructure big brands take for granted.

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/hillarynjuguna/tapau-landing.git
cd tapau-landing

# Install
npm install

# Set up environment
cp .env.example .env
# Add your OpenRouter API key to .env

# Run
npm run dev
```

## 🏗 Tech Stack

- **Vite + React** — Fast builds, HMR
- **Vanilla CSS** — Custom design system with glassmorphism
- **Framer Motion** — Scroll-triggered animations
- **OpenRouter + Mistral** — Live AI intent classification
- **React Router** — Landing page + Demo suite routing

## 📁 Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Glass-morph scroll navbar
│   ├── Hero.jsx            # Animated hero with WhatsApp mockup
│   ├── ProblemSection.jsx  # Before/After visualization
│   ├── HowItWorks.jsx      # 48-hour deployment timeline
│   ├── WhatsAppSimulator.jsx # Interactive 5-step demo
│   ├── AIDemo.jsx          # Live multilingual AI classifier
│   ├── SocialProof.jsx     # Animated counters + testimonial
│   ├── PricingSection.jsx  # 3-tier outcome pricing
│   ├── PaymentSection.jsx  # DuitNow/TNG QR payment
│   ├── FAQ.jsx             # Accordion FAQ
│   ├── Footer.jsx          # Waitlist + Agent SEA branding
│   └── useInView.js        # IntersectionObserver hook
├── pages/
│   └── DemoSuite.jsx       # 5-tab investor demo suite
├── App.jsx                 # Router + page assembly
├── main.jsx                # Entry point
└── index.css               # Full design system
```

## 🌐 Deployment

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

Both work out of the box — Vite produces a static bundle in `dist/`.

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for AI demo |

## 📄 License

MIT — built with care in Malaysia 🇲🇾
