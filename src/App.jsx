import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorks from './components/HowItWorks'
import WhatsAppSimulator from './components/WhatsAppSimulator'
import AIDemo from './components/AIDemo'
import SocialProof from './components/SocialProof'
import PricingSection from './components/PricingSection'
import PaymentSection from './components/PaymentSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import DemoSuite from './pages/DemoSuite'

function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WhatsAppSimulator />
      <AIDemo />
      <SocialProof />
      <PricingSection />
      <PaymentSection />
      <FAQ />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoSuite />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
